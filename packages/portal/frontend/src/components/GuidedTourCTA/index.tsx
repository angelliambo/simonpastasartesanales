import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  SoundOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ForwardOutlined,
  BackwardOutlined,
  CloseOutlined,
  AudioMutedOutlined,
  CompassOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { useTranslation } from "../../i18n";
import TrackedClick from "../TrackedClick";
import { GuidedTourCTAProps, GuidedTourStep } from "./GuidedTourCTA.types";
import {
  FloatingTourContainer,
  FloatingTourButton,
  TourIconWrapper,
  TourBadgeLabel,
  AudioWavesContainer,
  AudioWaveBar,
  FloatingSpeechCard,
  CardHeader,
  CardTitleGroup,
  CardTitle,
  StepCounterBadge,
  CloseIconButton,
  CardBody,
  SpeechTextContainer,
  ControlsRow,
  PlayControlsGroup,
  ControlButton,
  TourWhatsAppWrapper,
} from "./GuidedTourCTA.styles";

const TOUR_STEPS: GuidedTourStep[] = [
  { id: "step1", targetId: "hero", speechKey: "guidedTourStep1Text" },
  { id: "step2", targetId: "features", speechKey: "guidedTourStep2Text" },
  { id: "step3", targetId: "stats", speechKey: "guidedTourStep3Text" },
  { id: "step4", targetId: "stats", speechKey: "guidedTourStep4Text" },
  { id: "step5", targetId: "cta", speechKey: "guidedTourStep5Text" },
];

const GuidedTourCTA: React.FC<GuidedTourCTAProps> = memo(() => {
  const { t, lang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;

  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scrollToTarget = useCallback((targetId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tour:step-changed", { detail: { targetId } }));
    }
    const element = document.getElementById(targetId);
    if (element) {
      const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
      const headerOffset = isMobile ? 65 : 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = undefined;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const playStepAudio = useCallback(
    (index: number) => {
      stopAudio();

      const step = TOUR_STEPS[index] || TOUR_STEPS[0];
      if (!step) return;

      scrollToTarget(step.targetId);

      const textToSpeak = t(`pages.home.${step.speechKey}`);

      if (
        !isMuted &&
        typeof window !== "undefined" &&
        "speechSynthesis" in window
      ) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = lang?.startsWith("en") ? "en-US" : "es-AR";
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          if (!isPlayingRef.current) return;
          if (index < TOUR_STEPS.length - 1) {
            fallbackTimerRef.current = setTimeout(() => {
              if (isPlayingRef.current) {
                const next = index + 1;
                setCurrentStepIndex(next);
                playStepAudio(next);
              }
            }, 800);
          } else {
            setIsPlaying(false);
          }
        };

        utterance.onerror = () => {
          if (!isPlayingRef.current) return;
          if (index < TOUR_STEPS.length - 1) {
            fallbackTimerRef.current = setTimeout(() => {
              if (isPlayingRef.current) {
                const next = index + 1;
                setCurrentStepIndex(next);
                playStepAudio(next);
              }
            }, 8000);
          } else {
            setIsPlaying(false);
          }
        };

        window.speechSynthesis.speak(utterance);
      } else {
        // Modo silenciado o sin voz nativa: temporizador fijo por paso para auto-avance
        if (index < TOUR_STEPS.length - 1) {
          fallbackTimerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              const next = index + 1;
              setCurrentStepIndex(next);
              playStepAudio(next);
            }
          }, 7000);
        } else {
          setIsPlaying(false);
        }
      }
    },
    [isMuted, lang, scrollToTarget, stopAudio, t]
  );

  const handleStartTour = useCallback(() => {
    stopAudio();
    setIsOpen(true);
    setIsPlaying(true);
    isPlayingRef.current = true;
    setCurrentStepIndex(0);
    playStepAudio(0);
  }, [playStepAudio, stopAudio]);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      playStepAudio(currentStepIndex);
    }
  }, [currentStepIndex, isPlaying, playStepAudio, stopAudio]);

  const handleNextStep = useCallback(() => {
    stopAudio();
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      if (isPlaying) {
        playStepAudio(nextIndex);
      } else {
        const step = TOUR_STEPS[nextIndex];
        if (step) scrollToTarget(step.targetId);
      }
    }
  }, [currentStepIndex, isPlaying, playStepAudio, scrollToTarget, stopAudio]);

  const handlePrevStep = useCallback(() => {
    stopAudio();
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      if (isPlaying) {
        playStepAudio(prevIndex);
      } else {
        const step = TOUR_STEPS[prevIndex];
        if (step) scrollToTarget(step.targetId);
      }
    }
  }, [currentStepIndex, isPlaying, playStepAudio, scrollToTarget, stopAudio]);

  const handleToggleMute = useCallback(() => {
    stopAudio();
    setIsMuted((prev) => {
      const nextMute = !prev;
      if (isPlaying) {
        setTimeout(() => playStepAudio(currentStepIndex), 50);
      }
      return nextMute;
    });
  }, [currentStepIndex, isPlaying, playStepAudio, stopAudio]);

  const handleCloseTour = useCallback(() => {
    stopAudio();
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsOpen(false);
  }, [stopAudio]);

  // Cancelar audio cuando el usuario cambia de pestaña
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAudio();
        setIsPlaying(false);
        isPlayingRef.current = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopAudio();
    };
  }, [stopAudio]);

  const safeStepIndex = Math.min(Math.max(0, currentStepIndex), TOUR_STEPS.length - 1);
  const currentStep = TOUR_STEPS[safeStepIndex] || TOUR_STEPS[0];
  const currentScript = currentStep ? t(`pages.home.${currentStep.speechKey}`) : "";

  const whatsappMessage = `${t("pages.home.whatsappDefaultMessage")}`;
  const whatsappUrl = BRAND_CONFIG.whatsappUrl
    ? BRAND_CONFIG.whatsappUrl.includes("?")
      ? `${BRAND_CONFIG.whatsappUrl}&text=${encodeURIComponent(whatsappMessage)}`
      : `${BRAND_CONFIG.whatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`
    : "#";

  return (
    <>
      <FloatingTourContainer>
        <TrackedClick
          label="Guided Tour Floating Button"
          action="click_guided_tour_button"
          category="marketing"
        >
          <FloatingTourButton
            onClick={isOpen ? handleCloseTour : handleStartTour}
            $isActive={isOpen}
            type="button"
            aria-label={t("pages.home.guidedTourBadge")}
          >
            <TourIconWrapper>
              {isPlaying && !isMuted ? (
                <AudioWavesContainer>
                  <AudioWaveBar $delay={0} />
                  <AudioWaveBar $delay={0.2} />
                  <AudioWaveBar $delay={0.4} />
                </AudioWavesContainer>
              ) : (
                <ZnIcon icon={CompassOutlined} />
              )}
            </TourIconWrapper>
            <TourBadgeLabel>{t("pages.home.guidedTourBadge")}</TourBadgeLabel>
          </FloatingTourButton>
        </TrackedClick>
      </FloatingTourContainer>

      <FloatingSpeechCard $isOpen={isOpen}>
        <CardHeader>
          <CardTitleGroup>
            <ZnIcon icon={SoundOutlined} />
            <CardTitle>{t("pages.home.guidedTourBadge")}</CardTitle>
          </CardTitleGroup>
          <StepCounterBadge>
            {t("pages.home.guidedTourStepCount", {
              current: safeStepIndex + 1,
              total: TOUR_STEPS.length,
            })}
          </StepCounterBadge>
          <CloseIconButton
            onClick={handleCloseTour}
            aria-label={t("pages.home.guidedTourClose")}
            type="button"
          >
            <ZnIcon icon={CloseOutlined} />
          </CloseIconButton>
        </CardHeader>

        <CardBody>
          <SpeechTextContainer>
            {currentScript}
          </SpeechTextContainer>
        </CardBody>

        <ControlsRow>
          <PlayControlsGroup>
            <ControlButton
              onClick={handlePrevStep}
              disabled={safeStepIndex === 0}
              type="button"
              aria-label={t("pages.home.guidedTourPrev")}
            >
              <ZnIcon icon={BackwardOutlined} />
            </ControlButton>

            <ControlButton
              onClick={handleTogglePlay}
              $primary={true}
              type="button"
            >
              <ZnIcon
                icon={isPlaying ? PauseCircleOutlined : PlayCircleOutlined}
              />
              {isPlaying
                ? t("pages.home.guidedTourPause")
                : t("pages.home.guidedTourPlay")}
            </ControlButton>

            <ControlButton
              onClick={handleNextStep}
              disabled={safeStepIndex === TOUR_STEPS.length - 1}
              type="button"
              aria-label={t("pages.home.guidedTourNext")}
            >
              <ZnIcon icon={ForwardOutlined} />
            </ControlButton>
          </PlayControlsGroup>

          <ControlButton
            onClick={handleToggleMute}
            type="button"
            aria-label={
              isMuted
                ? t("pages.home.guidedTourUnmute")
                : t("pages.home.guidedTourMute")
            }
          >
            <ZnIcon icon={isMuted ? SoundOutlined : AudioMutedOutlined} />
          </ControlButton>
        </ControlsRow>

        <TourWhatsAppWrapper>
          <TrackedClick label="Tour WhatsApp CTA" action="click_whatsapp_tour" category="marketing">
            <ControlButton
              as="a"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", justifyContent: "center", textDecoration: "none", backgroundColor: "#25D366", color: "#FFFFFF", borderColor: "#25D366" }}
            >
              <ZnIcon icon={WhatsAppOutlined} />
              <span>{t("pages.home.guidedTourWhatsAppBtn")}</span>
            </ControlButton>
          </TrackedClick>
        </TourWhatsAppWrapper>
      </FloatingSpeechCard>
    </>
  );
});

GuidedTourCTA.displayName = "GuidedTourCTA";

export default GuidedTourCTA;
