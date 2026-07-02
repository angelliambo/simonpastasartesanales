import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useGetProfileQuery } from "../../services/api/userService";
import { setCredentials } from "../../store/slices/authSlice";
import { useTranslation } from "../../i18n/I18nProvider";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import {
  PageContainer,
  GlassCard,
  SpinnerContainer,
  LoadingSpinner,
  SuccessIcon,
  Title,
  Subtitle,
  ActionButton,
} from "./BillingPage.styles";

const BillingPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetPlan = searchParams.get("plan");

  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [isSuccess, setIsSuccess] = useState(false);

  // Poll profile details every 3 seconds to check for plan updates
  const { data } = useGetProfileQuery(undefined, {
    pollingInterval: isSuccess ? 0 : 3000,
    skip: !loggedInUser || isSuccess,
  });

  useEffect(() => {
    if (!loggedInUser) {
      // If not logged in, they shouldn't be on billing page
      navigate("/");
      return;
    }

    if (data?.success && data?.profile) {
      const userProfile = data.profile;
      // Wait until the user's plan matches the target plan they just purchased
      const hasPurchased = targetPlan ? userProfile.plan === targetPlan : userProfile.plan !== "free";

      if (hasPurchased) {
        if (!isSuccess) {
          setIsSuccess(true);
        }
        if (token && loggedInUser?.plan !== userProfile.plan) {
          dispatch(
            setCredentials({
              user: {
                _id: userProfile._id,
                email: userProfile.email,
                role: userProfile.role,
                plan: userProfile.plan,
                isAdmin: userProfile.isAdmin,
              },
              token,
            })
          );
        }
      }
    }
  }, [data, loggedInUser, token, dispatch, navigate, isSuccess]);

  const handleGoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <AnimatedBackground />
      <PageContainer>
        <GlassCard>
          <SpinnerContainer>
            {isSuccess ? (
              <SuccessIcon>✓</SuccessIcon>
            ) : (
              <LoadingSpinner />
            )}
          </SpinnerContainer>

          <Title>
            {isSuccess
              ? t("pages.pricing.billingSuccess") || "¡Pago Confirmado!"
              : t("pages.pricing.billingTitle") || "Esperando tu compra"}
          </Title>

          <Subtitle>
            {isSuccess
              ? t("pages.pricing.billingSuccessSubtitle") ||
                "Tu plan ha sido activado con éxito. Ya eres miembro Premium."
              : t("pages.pricing.billingSubtitle") ||
                "Por favor, finaliza el proceso de pago en la nueva pestaña que abrimos. Esta pantalla se actualizará automáticamente tan pronto termines."}
          </Subtitle>

          {isSuccess && (
            <ActionButton onClick={handleGoDashboard}>
              {t("pages.pricing.billingButton") || "Ir al Panel de Control"}
            </ActionButton>
          )}
        </GlassCard>
      </PageContainer>
    </>
  );
};

export default BillingPage;
