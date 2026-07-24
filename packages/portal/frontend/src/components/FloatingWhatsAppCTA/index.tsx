import React, { useState, useEffect, memo } from "react";
import { WhatsAppOutlined } from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { useTranslation } from "../../i18n";
import TrackedClick from "../TrackedClick";
import { FloatingWhatsAppCTAProps } from "./FloatingWhatsAppCTA.types";
import {
  FloatingCTAContainer,
  WhatsAppButton,
  IconWrapper,
  BadgeText,
} from "./FloatingWhatsAppCTA.styles";

const FloatingWhatsAppCTA: React.FC<FloatingWhatsAppCTAProps> = memo(({
  whatsappUrl,
  defaultMessage,
  delayMs = 2000,
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const baseWhatsAppUrl = whatsappUrl || BRAND_CONFIG.whatsappUrl;

  if (!baseWhatsAppUrl) {
    return null;
  }

  const messageText = defaultMessage || t("pages.home.whatsappDefaultMessage");
  const finalWhatsAppUrl = baseWhatsAppUrl.includes("?")
    ? `${baseWhatsAppUrl}&text=${encodeURIComponent(messageText)}`
    : `${baseWhatsAppUrl}?text=${encodeURIComponent(messageText)}`;

  return (
    <FloatingCTAContainer $isVisible={isVisible}>
      <TrackedClick
        label="Floating WhatsApp CTA"
        action="click_whatsapp_floating"
        category="marketing"
      >
        <WhatsAppButton
          href={finalWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWrapper>
            <ZnIcon icon={WhatsAppOutlined} />
          </IconWrapper>
          <BadgeText>{t("pages.home.whatsappFloatingBadge")}</BadgeText>
        </WhatsAppButton>
      </TrackedClick>
    </FloatingCTAContainer>
  );
});

FloatingWhatsAppCTA.displayName = "FloatingWhatsAppCTA";

export default FloatingWhatsAppCTA;
