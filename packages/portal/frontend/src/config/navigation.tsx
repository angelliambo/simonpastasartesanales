import { HomeOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";

export interface NavigationSubItem {
  key: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  emoji?: string;
}

export interface NavigationItem {
  key: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  emoji?: string;
  children?: NavigationSubItem[];
}

export const getNavigationItems = (): NavigationItem[] => {
  return [
    {
      key: "home",
      label: "Inicio",
      path: "/",
      icon: <ZnIcon icon={HomeOutlined} />,
    },
  ];
};
