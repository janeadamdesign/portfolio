// Package Imports
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  MotionValue,
  useTransform,
} from "framer-motion";
import { CSSTransition, SwitchTransition } from "react-transition-group";
// Local Imports
import ProficiencyCell from "./ProficiencyCell";

interface WelcomeLoadedProps {
  isTiny: boolean;
  blackAndWhiteImages: HTMLImageElement[];
  colourImages: HTMLImageElement[];
  vadymImages: HTMLImageElement[];
  cubismCondensedImages: HTMLImageElement[];
  paragraphValueGenerator: (booleanArg: boolean) => {
    initial: {};
    animate: {};
    transition: {};
  };
}

export default function WelcomeLoaded(
  props: WelcomeLoadedProps
): React.ReactElement {
  // Destructuring props
  const {
    isTiny,
    blackAndWhiteImages,
    colourImages,
    vadymImages,
    cubismCondensedImages,
    paragraphValueGenerator,
  }: {
    isTiny: boolean;
    blackAndWhiteImages: HTMLImageElement[];
    colourImages: HTMLImageElement[];
    vadymImages: HTMLImageElement[];
    cubismCondensedImages: HTMLImageElement[];
    paragraphValueGenerator: (booleanArg: boolean) => {
      initial: {};
      animate: {};
      transition: {};
    };
  } = props;

  /* useInView ref
  - First single line text section, second single line text section, and whole proficiencies section are stored as refs.
  - Framer Motion's useInView hook is used to create a boolean to be passed to later motion.divs. Compare to Intersection Observer API */ const secondRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const thirdRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const secondInView: boolean = useInView(
    secondRef as React.RefObject<HTMLDivElement>,
    {
      amount: 0.8,
    }
  );
  const thirdInView: boolean = useInView(
    thirdRef as React.RefObject<HTMLDivElement>,
    {
      amount: 0.8,
    }
  );

  /* Logic for Scroll Containers 
      - there are two containers:
        - cinemaContainerRef (the two smaller parallax scrolling screens)
        - malevichRef (the position: sticky larger screen)
      - for each we:
        - store the container as a ref
        - store scrollYProgress as a named variable
        - .get() the numerical progress and store as state to use outside of motion.divs
      - for the parallax scrolling screens we create for each a scroll constant with useTransform 
      - a useEffect sets the states*/
  const cinemaContainerRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const {
    scrollYProgress: cinemaProgress,
  }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: cinemaContainerRef as React.RefObject<HTMLDivElement>,
    offset: ["start end", "end start"],
  });

  const [cinemaScrollState, setCinemaScrollState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const cinema1Constant: MotionValue<number> = useTransform(
    cinemaProgress,
    [0, 1],
    [0, 5000]
  );
  const [windowHeight, setWindowHeight]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): (() => void) => {
    const setHeight = (): void => {
      setWindowHeight(4 * window.innerHeight);
      // setWindowHeight(Math.pow(window.innerHeight, Math.pow(1.2, 1.05)))
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return (): void => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);
  const cinema2Constant: MotionValue<number> = useTransform(
    cinemaProgress,
    [0, 1],
    [0, 3750]
  );
  const cinema3Constant: MotionValue<number> = useTransform(
    cinemaProgress,
    [0, 1],
    [0, windowHeight]
  );
  const malevichRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const {
    scrollYProgress: malevichProgress,
  }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: malevichRef as React.RefObject<HTMLDivElement>,
    offset: ["start end", "end start"],
  });
  const [malevichProgressState, setMalevichProgressState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void | (() => void) => {
    const scrollOn = (): void => {
      setCinemaScrollState(cinemaProgress.get());
      setMalevichProgressState(malevichProgress.get());
    };
    window.addEventListener("scroll", scrollOn);
    return (): void => {
      window.removeEventListener("scroll", scrollOn);
    };
  }, [cinemaProgress, malevichProgress]);

  /* Logic for Dynamic Indices 
      - BWIndex, colourIndex, vadymIndex * cubismIndex stored as states
      - useEffect dependent [cinemaScrollState] sets indices for BW/colour
      - useEffect dependent [malevichProgressState] sets index for vadym 
      - useEffect with timer sets index sequentially for cubism */
  const [blackAndWhiteIndex, setBlackAndWhiteIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [colourIndex, setColourIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [vadymIndex, setVadymIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [cubismIndex, setCubismIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void => {
    setBlackAndWhiteIndex(Math.min(19, Math.floor(cinemaScrollState * 30)));
    setColourIndex(
      // Math.max(0, Math.min(14, Math.floor((cinemaScrollState - 0.53) * 32)))
      Math.max(0, Math.min(14, Math.floor((1 - cinemaScrollState) * 32)))
    );
  }, [cinemaScrollState]);
  useEffect((): void => {
    setVadymIndex(
      Math.max(0, Math.min(19, Math.floor((malevichProgressState - 0.3) * 30)))
    );
  }, [malevichProgressState]);
  useEffect((): (() => void) => {
    const cubismTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (cubismIndex === 0) {
        setCubismIndex(1);
      } else if (cubismIndex === 1) {
        setCubismIndex(0);
      }
    }, 4000);
    return (): void => {
      clearTimeout(cubismTimer);
    };
  }, [cubismIndex]);

  /* Proficiencies progress logic
      - Whole proficiences section stored as ref
      - Progress (0-1) initialised as state
      - Scroll progress calculated manually on the basis of browser's endogenous DOM attributes. Later code uses Framer Motion's useScroll, potentially cleaner. */
  const proficienciesRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const [proficienciesProgress, setProficienciesProgress]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void | (() => void) => {
    if (!proficienciesRef.current) return;
    const div: HTMLDivElement = proficienciesRef.current;
    const handleProfScroll = (): void => {
      const globalScrollPosition: number = window.scrollY;
      const elementStart: number = div.offsetTop;
      const elementHeight: number = div.offsetHeight;
      if (globalScrollPosition < elementStart) {
        setProficienciesProgress(0);
        return;
      } else {
        const combinedHeight: number = elementStart + elementHeight;
        if (globalScrollPosition > combinedHeight) {
          setProficienciesProgress(1);
          return;
        } else {
          const scrolledWithin: number = globalScrollPosition - elementStart;
          const ratio: number = scrolledWithin / elementHeight;
          console.log(`ratio: ${ratio}`);
          setProficienciesProgress(ratio);
        }
      }
    };
    window.addEventListener("scroll", handleProfScroll);
    return (): void => {
      window.removeEventListener("scroll", handleProfScroll);
    };
  }, []);

  /* Proficiency generation logic
      - proficiencies stores an array of strings to render
      - generateProficiencies is a fn which injects those strings into a motion.div 
      - generatedProficiencies is a JSX.Element[] which stores those motion.divs
      - proficienciesSelector & its useEffect manages index on the basis of which to conditionally render each motion.div */
  const [proficiencySelector, setProficiencySelector]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void => {
    const rounded: number = Math.min(
      Math.round(proficienciesProgress * 10 + 0.25),
      9
    );
    setProficiencySelector(rounded);
  }, [proficienciesProgress]);
  const proficiencies: string[] = [
    "HTML5 // Vanilla JS",
    "Intuitive UX/UI",
    "Responsive React Components",
    "Express Server Integrations",
    "Strict Typescript",
    "Advanced CSS Techniques",
    "Dynamic Animation with Framer Motion & React Spring",
    "Git/Hub VSC Systems",
    "Prompt Engineering",
    "Midjourney ImageGen",
  ];

  // Pill animation logic
  const pillRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  useEffect((): void | (() => void) => {
    if (!pillRef.current) return;
    const pillDiv: HTMLDivElement = pillRef.current;
    pillDiv.style.animation = "none";
    const pillTimer: NodeJS.Timeout | number = setTimeout((): void => {
      pillDiv.style.animation = "blink 1s infinite";
    }, 1000);
    return (): void => {
      clearTimeout(pillTimer);
    };
  }, [proficiencySelector]);

  return (
    <>
      {" "}
      <div id="colourful-cinema">
        <div
          id={isTiny ? "first-cinema-page-mobile" : "first-cinema-page"  }
          ref={cinemaContainerRef as React.RefObject<HTMLDivElement>}
          style={
            {
              "--skewiff": `${cinemaScrollState * 60}deg`,
            } as React.CSSProperties
          }
        >
          <motion.div
            style={
              isTiny
                ? { transform: `translateY(10%)`, justifyContent: `flex-start` }
                : { y: cinema1Constant, justifyContent: `flex-start` }
            }
            className="cinema-container flex-row"
          >
            {" "}
            {blackAndWhiteImages[blackAndWhiteIndex] ? (
              <div
                id="cinema-1"
                className="cinema-viewer"
                style={{
                  backgroundImage: `url(${blackAndWhiteImages[blackAndWhiteIndex].src})`,
                }}
              />
            ) : (
              <></>
            )}
          </motion.div>
          <motion.div
            style={
              isTiny
                ? {  justifyContent: `flex-end` }
                : {
                    y: cinema3Constant,
                    justifyContent: `flex-end`,
                  }
            }
            className="cinema-container flex-row"
          >
            {" "}
            {colourImages[colourIndex] ? (
              <div
                id="cinema-2"
                className="cinema-viewer"
                style={{
                  backgroundImage: `url(${colourImages[colourIndex].src})`,
                }}
              />
            ) : (
              <></>
            )}
          </motion.div>
        </div>
      </div>
      <div
        id="elegance-container"
        ref={malevichRef as React.RefObject<HTMLDivElement>}
      >
        <motion.div
          id="elegance"
          className="flex-column flex-center text-container"
          ref={secondRef as React.RefObject<HTMLDivElement>}
          {...paragraphValueGenerator(secondInView)}
        >
          {" "}
          <p
            className="welcome-subtitle canela canela-3"
            id="elegance-statement"
          >
            because elegance in technology{" "}
            <em
              id="matters"
              style={
                {
                  "--underlineMove": `-${
                    Math.max(0, malevichProgressState - 0.4) * 600
                  }%`,
                } as React.CSSProperties
              }
              className={secondInView ? "matters-underline" : "matters-no-line"}
            >
              matters
            </em>{" "}
          </p>{" "}
        </motion.div>
        <div className="text-container" />
        <div id="malevich">
          {vadymImages[vadymIndex] ? (
            <div
              id="big-screen"
              style={{
                backgroundImage: `url(${vadymImages[vadymIndex].src})`,
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className="flex-row"
        id="proficiencies"
        ref={proficienciesRef as React.RefObject<HTMLDivElement>}
        style={{ height: `${proficiencies.length * 100}vh` }}
      >
        <motion.div
          className="text-container flex-column flex-center half-container"
          id="proficiency-container"
          ref={thirdRef as React.RefObject<HTMLDivElement>}
          {...paragraphValueGenerator(thirdInView)}
        >
          {" "}
          <div id="proficiency-pill-container">
            {" "}
            <p className="welcome-subtitle canela canela-4" id="im-prof">
              I'm proficient with
            </p>
            <motion.div
              initial={{ transform: `translateX(0%)` }}
              animate={{
                transform: `translateX(${proficiencySelector * 100}%)`,
              }}
              transition={{ type: "spring", damping: 20, stiffness: 500 }}
              id="progress-pill"
              ref={pillRef as React.RefObject<HTMLDivElement>}
            />
          </div>
        </motion.div>
        <div
          className="half-container"
          {...paragraphValueGenerator(thirdInView)}
        >
          <motion.div
            className="text-container flex-column flex-center"
            id="right-half-fixed"
            {...paragraphValueGenerator(thirdInView)}
          >
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={proficiencySelector}
                timeout={500}
                classNames="fade"
              >
                <ProficiencyCell
                  proficiencies={proficiencies}
                  proficiencySelector={proficiencySelector}
                />
              </CSSTransition>
            </SwitchTransition>
          </motion.div>
        </div>{" "}
      </div>
      <div id="final-container">
        {cubismCondensedImages[cubismIndex] ? (
          <div
            id="last-screen"
            style={{
              backgroundImage: `url(${cubismCondensedImages[cubismIndex].src})`,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
