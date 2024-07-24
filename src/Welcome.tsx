//Package Imports
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
//Local imports
import { animateOpacityValues } from "./JADTypes";
import { blackAndWhite, colour, vadym, cubismCondensed } from "./ImageData";
import WelcomeLoaded from "./WelcomeLoaded";

interface WelcomeProps {
  storeImages: (
    srcArray: string[],
    stateSetter: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ) => void;
  paragraphValueGenerator: (booleanArg: boolean) => {
    initial: {};
    animate: {};
    transition: {};
  };
}

export default function Welcome(props: WelcomeProps): React.ReactElement {
  // Destructuring props
  const {
    storeImages,
    paragraphValueGenerator,
  }: {
    storeImages: (
      srcArray: string[],
      stateSetter: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
    ) => void;
    paragraphValueGenerator: (booleanArg: boolean) => {
      initial: {};
      animate: {};
      transition: {};
    };
  } = props;

  /* Store images as state to solve issues with preloading. 
  - Original code edited to fix bug with multiple versions of same image being stored to array.
  - Code now checks extantImg.src === image.src */
  const [blackAndWhiteImages, setBlackAndWhiteImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [colourImages, setColourImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [vadymImages, setVadymImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [cubismCondensedImages, setCubismCondensedImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  useEffect((): void => {
    const imageParams: [
      string[],
      React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
    ][] = [
      [blackAndWhite, setBlackAndWhiteImages],
      [colour, setColourImages],
      [vadym, setVadymImages],
      [cubismCondensed, setCubismCondensedImages],
    ];
    imageParams.forEach(
      (
        imageParamArray: [
          string[],
          React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
        ]
      ): void => {
        storeImages(...imageParamArray);
      }
    );
  }, [storeImages]);

  /* useInView ref
  - First single line text section, second single line text section, and whole proficiencies section are stored as refs.
  - Framer Motion's useInView hook is used to create a boolean to be passed to later motion.divs. Compare to Intersection Observer API */
  const firstRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const firstInView: boolean = useInView(
    firstRef as React.RefObject<HTMLDivElement>,
    {
      amount: 0.8,
    }
  );

  // Loading state
  const [isLoaded, setIsLoaded]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [loadedPercentage, setLoadedPercentage]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [portion, setPortion]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void => {
    setPortion(
      blackAndWhiteImages.length +
        colourImages.length +
        vadymImages.length +
        cubismCondensedImages.length
    );
  }, [blackAndWhiteImages, colourImages, vadymImages, cubismCondensedImages]);
  useEffect((): void => {
    const full: number = 57;
    if (portion < full) {
      setIsLoaded(false);
    } else setIsLoaded(true);
    const percentage: number = (portion / full) * 100;
    // console.log(percentage);
    setLoadedPercentage(percentage);
  }, [isLoaded, portion]);

  const generateOpeningText = (): JSX.Element => {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.25 }}
        key={isLoaded ? "loaded" : "still-loading"}
        id="first-text-bits"
      >
        <motion.p
          key={isLoaded ? "loaded" : "loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.75 }}
          className="welcome-subtitle canela canela-6"
          id="jane-p"
        >
          {isLoaded ? `hello, I am Jane` : "loading"}
          <motion.span
            id="ellipses"
            initial={{ marginLeft: 0 }}
            animate={{ marginLeft: `2rem` }}
            transition={{ ease: "easeInOut", delay: 1.75, duration: 0.5 }}
          >
            <span className="ellipsis1 animate-ellipsis">.</span>
            <span className="ellipsis2 animate-ellipsis">.</span>
            <span className="ellipsis3 animate-ellipsis">.</span>
          </motion.span>
        </motion.p>
        {isLoaded ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 1.5 }}
            className="welcome-subtitle canela canela-3"
          >
            crafting elegant technological matter
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 1.5 }}
            id="progress-bar-container"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${loadedPercentage}%` }}
              transition={{ ease: "easeInOut", duration: 0.1 }}
              id="progress-bar"
            />
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      key="welcome"
      className="whole-page full-dims"
      id="welcome-page"
      {...animateOpacityValues}
    >
      <div id="big-container">
        <motion.div
          id="hello"
          className="text-container flex-column flex-center"
          ref={firstRef as React.RefObject<HTMLDivElement>}
          {...paragraphValueGenerator(firstInView)}
        >
          <AnimatePresence mode="wait">{generateOpeningText()}</AnimatePresence>
        </motion.div>
        {isLoaded && (
          <WelcomeLoaded
            blackAndWhiteImages={blackAndWhiteImages}
            colourImages={colourImages}
            vadymImages={vadymImages}
            cubismCondensedImages={cubismCondensedImages}
            paragraphValueGenerator={paragraphValueGenerator}
          />
        )}
      </div>
    </motion.div>
  );
}
