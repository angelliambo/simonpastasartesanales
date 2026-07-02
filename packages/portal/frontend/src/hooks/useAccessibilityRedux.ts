import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  setHighContrast,
  setFontSize,
  setReducedMotion,
  reset,
} from "../store/slices/accessibilitySlice";

export const useAccessibilityRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.accessibility);

  const updatePreferences = (updates: Partial<typeof state>) => {
    if (updates.highContrast !== undefined) {
      dispatch(setHighContrast(updates.highContrast));
    }
    if (updates.fontSize !== undefined) {
      dispatch(setFontSize(updates.fontSize));
    }
    if (updates.reducedMotion !== undefined) {
      dispatch(setReducedMotion(updates.reducedMotion));
    }
  };

  const toggleHighContrast = () => {
    dispatch(setHighContrast(!state.highContrast));
  };

  const toggleReducedMotion = () => {
    dispatch(setReducedMotion(!state.reducedMotion));
  };

  const updateFontSize = (fontSize: number) => {
    dispatch(setFontSize(fontSize));
  };

  const resetToDefaults = () => {
    dispatch(reset());
  };

  return {
    preferences: state,
    isLoading: false,
    error: null,
    lastUpdated: null,
    updatePreferences,
    toggleHighContrast,
    toggleReducedMotion,
    updateFontSize,
    resetToDefaults,
  };
};
