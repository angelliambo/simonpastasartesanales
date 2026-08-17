export interface GuidedTourStep {
  id: string;
  targetId: string;
  speechKey: string;
}

export interface GuidedTourCTAProps {
  delayMs?: number;
}
