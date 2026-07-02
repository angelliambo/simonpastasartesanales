export interface GoogleSignInButtonProps {
  size?: "small" | "medium" | "large";
  theme?: "outline" | "filled_blue" | "filled_black";
  shape?: "rectangular" | "pill" | "circle" | "square";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  width?: string;
  oneTap?: boolean;
  onSuccess?: () => void;
}

export interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void | Promise<void>;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "small" | "medium" | "large";
              shape?: "rectangular" | "pill" | "circle" | "square";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              width?: string;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}
