// src/utils/deviceSizes.ts
export const DEVICE_SIZES = {
  mobile: { width: 360, height: 640 },
  tablet: { width: 900, height: 720 },
  desktop: { width: 1500, height: 900 },
};

export function getDeviceSize(isMobile: boolean, isTablet: boolean) {
  if (isMobile) return DEVICE_SIZES.mobile;
  if (isTablet) return DEVICE_SIZES.tablet;
  return DEVICE_SIZES.desktop;
}
