// Data

export const animateOpacityValues: AnimateOpacityValues = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    ease: "easeInOut",
    duration: 1,
    delay: 0,
  },
};

export const animateSlam: AnimateOpacityValues = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    ease: "easeInOut",
    duration: 0.5,
    delay: 0,
  },
};

// Types & Interfaces

export interface AnimateOpacityValues {
  initial: { opacity: number };
  animate: { opacity: number };
  exit: { opacity: number };
  transition: {
    ease: string;
    duration: number;
    delay: number;
  };
}

export type ArrayCompareParameters = [
  number,
  JSX.Element[],
  React.Dispatch<React.SetStateAction<number>>,
  boolean
];

export interface ContactMethodArgs {
  url: string;
  method: string;
  methodContent: string;
  hoverCode: number;
  hyperlink?: string;
}

export interface DraumspaWidgets {
  [key: number]: string;
}

export interface HoverClickInterface {
  [key: string]: VoidFunction;
}

export interface PortfolioAnimationProps {
  [key: string]: { y: number | string };
}

export interface TextFields {
  front: {
    title: string;
    summary: string | string[];
    tinySummary: string;
    widgets?: DraumspaWidgets;
    apiCalls: string[];
    dependencies: string[];
  };
}

export interface ToggleCorrespondence {
  [key: string]: {
    state: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
export type VoidFunction = () => void;
