//Package Imports
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//Local imports
import {
  animateOpacityValues,
  TextFields,
  ArrayCompareParameters,
} from "./JADTypes";
import { ashSquares, bonxSquares, draumSquares } from "./ImageData";
import {
  asherahTextFields,
  bonxTextFields,
  draumspaTextFields,
} from "./PortfolioTextFields";

interface PortfolioProps {
  storeImages: (
    srcArray: string[],
    stateSetter: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ) => void;
  isTiny: boolean;
}

export default function Portfolio(props: PortfolioProps): React.ReactElement {
  // Destructuring props
  const {
    storeImages,
    isTiny,
  }: {
    storeImages: (
      srcArray: string[],
      stateSetter: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
    ) => void;
    isTiny: boolean;
  } = props;

  // Preloading Images: in theory we can use the same URLs, no need to inject from the state array. Once we have stored as state we can inject from the original url string[]
  const [_ashSquareImages, setAshSquareImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [_bonxSquareImages, setBonxSquareImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [_draumSquareImages, setDraumSquareImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  useEffect((): void => {
    const imageParams: [
      string[],
      React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
    ][] = [
      [ashSquares, setAshSquareImages],
      [bonxSquares, setBonxSquareImages],
      [draumSquares, setDraumSquareImages],
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

  /* Text Field States: controls which block of text is displayed in Bonx & Draumspa entries. Responsive to UI click functions */
  const [bonxTextToggle, setBonxTextToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [draumspaTextToggle, setDraumspaTextToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  // Link hovering B/W logic

  const [asherahLinkHover, setAsherahLinkHover]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [bonxLinkHover, setBonxLinkHover]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [draumspaLinkHover, setDraumspaLinkHover]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  //Cascade Text States; Injecting Full Array, Slicing
  const [asherahDependenciesSlice, setAsherahDependenciesSlice]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [bonxDependenciesSlice, setBonxDependenciesSlice]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [draumspaDependenciesSlice, setDraumspaDependenciesSlice]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const injectTextCascadeField = (text: string): JSX.Element => {
    let content: string | JSX.Element = "";
    if (text[0] === "@") {
      content = (
        <>
          <span className="canela" style={{ fontWeight: 100 }}>
            @
          </span>
          {text.slice(1)}
        </>
      );
    } else if (text.includes("a") && text.length < 4) {
      content = "\u00A0"; // This assigns a non-breaking space to content
    } else content = text;
    return (
      <motion.p
        key={text}
        initial={{ clipPath: `inset(0 100% 0 0)` }}
        animate={{ clipPath: `inset(0 0 0 0)` }}
        transition={{ ease: "linear", duration: 0.5 }}
        className="heveria cascade-text-field"
      >
        {content}
      </motion.p>
    );
  };
  const asherahDependencyJSXArray: JSX.Element[] =
    asherahTextFields.front.dependencies.map(
      (dependency: string): JSX.Element => injectTextCascadeField(dependency)
    );
  const bonxDependencyJSXArray: JSX.Element[] =
    bonxTextFields.front.dependencies.map(
      (dependency: string): JSX.Element => injectTextCascadeField(dependency)
    );
  const draumspaDependencyJSXArray: JSX.Element[] =
    draumspaTextFields.front.dependencies.map(
      (dependency: string): JSX.Element => injectTextCascadeField(dependency)
    );
  /* useInView ref */
  const asherahRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const bonxRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const draumspaRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const asherahRefInView: boolean = useInView(
    asherahRef as React.RefObject<HTMLDivElement>,
    {
      amount: 0.8,
    }
  );
  const bonxRefInView: boolean = useInView(
    bonxRef as React.RefObject<HTMLDivElement>,
    {
      amount: 0.8,
    }
  );
  const draumspaRefInView: boolean = useInView(
    draumspaRef as React.RefObject<HTMLDivElement>,
    {
      amount: 0.8,
    }
  );
  const arrayCompare = (
    dependencySlice: number,
    dependencySource: JSX.Element[],
    setDependencySlice: React.Dispatch<React.SetStateAction<number>>,
    refInView: boolean
  ): void => {
    if (!refInView) return;
    if (dependencySlice < dependencySource.length) {
      setDependencySlice((prev: number): number => prev + 1);
    } else {
      setDependencySlice(0);
    }
  };
  const arrayCompareParameters: ArrayCompareParameters[] = [
    [
      asherahDependenciesSlice,
      asherahDependencyJSXArray,
      setAsherahDependenciesSlice,
      asherahRefInView,
    ],
    [
      bonxDependenciesSlice,
      bonxDependencyJSXArray,
      setBonxDependenciesSlice,
      bonxRefInView,
    ],
    [
      draumspaDependenciesSlice,
      draumspaDependencyJSXArray,
      setDraumspaDependenciesSlice,
      draumspaRefInView,
    ],
  ];
  const shortTimeoutLength: number = 300;
  const longTimeoutLength: number = 900;
  useEffect((): void | (() => void) => {
    if (asherahLinkHover) return;
    let timeoutLength: number = 0;
    const parameterSet: ArrayCompareParameters = arrayCompareParameters[0];
    if (parameterSet[0] === 0) {
      timeoutLength = longTimeoutLength;
    } else timeoutLength = shortTimeoutLength;
    const arrayComparisonTimeout: NodeJS.Timeout | number = setTimeout(
      (): void => {
        arrayCompare(...parameterSet);
      },
      timeoutLength
    );
    return (): void => {
      clearTimeout(arrayComparisonTimeout);
    };
  }, [asherahDependenciesSlice, asherahRefInView, asherahLinkHover]);
  useEffect((): void | (() => void) => {
    if (bonxLinkHover) return;
    let timeoutLength: number = 0;
    const parameterSet: ArrayCompareParameters = arrayCompareParameters[1];
    if (parameterSet[0] === 0) {
      timeoutLength = longTimeoutLength;
    } else timeoutLength = shortTimeoutLength;
    const arrayComparisonTimeout: NodeJS.Timeout | number = setTimeout(
      (): void => {
        arrayCompare(...parameterSet);
      },
      timeoutLength
    );
    return (): void => {
      clearTimeout(arrayComparisonTimeout);
    };
  }, [bonxDependenciesSlice, bonxRefInView, bonxLinkHover]);
  useEffect((): void | (() => void) => {
    if (draumspaLinkHover) return;
    let timeoutLength: number = 0;
    const parameterSet: ArrayCompareParameters = arrayCompareParameters[2];
    if (parameterSet[0] === 0) {
      timeoutLength = longTimeoutLength;
    } else timeoutLength = shortTimeoutLength;
    const arrayComparisonTimeout: NodeJS.Timeout | number = setTimeout(
      (): void => {
        arrayCompare(...parameterSet);
      },
      timeoutLength
    );
    return (): void => {
      clearTimeout(arrayComparisonTimeout);
    };
  }, [draumspaDependenciesSlice, draumspaRefInView, draumspaLinkHover]);

  // Large, complex, entry generator function
  const portfolioEntryGenerator = (
    title: string,
    previewImages: string[],
    index: number
  ): JSX.Element => {
    // Logic to assign relevant fns etc
    const parsedTitle: string = title.toLowerCase();
    let textFields: TextFields | null = null;
    let toggleState: boolean = false;
    let toggleSetter: React.Dispatch<React.SetStateAction<boolean>> | null =
      null;
    let imageBorder: string | null = null;
    let textBorder: string | null = null;
    let firstBg: string | null = null;
    let secondBg: string | null = null;
    let dependencyArray: JSX.Element[] = [];
    let dependencySlice: number = 0;
    let sectionReference: React.RefObject<HTMLDivElement> | null = null;
    let hoverState: boolean = false;
    let setHoverState: React.Dispatch<React.SetStateAction<boolean>> | null =
      null;
    const blankString: string = `https://${title}.janeadamdesign.dev`;
    switch (parsedTitle) {
      case "asherah":
        textFields = asherahTextFields;
        imageBorder = `0.125rem solid #00ff33`;
        textBorder = `0.125rem solid #ff00ee`;
        firstBg = "ptf5";
        secondBg = "ptf6";
        dependencyArray = asherahDependencyJSXArray;
        dependencySlice = asherahDependenciesSlice;
        sectionReference = asherahRef as React.RefObject<HTMLDivElement>;
        hoverState = asherahLinkHover;
        setHoverState = setAsherahLinkHover;
        break;
      case "bonx":
        textFields = bonxTextFields;
        toggleState = bonxTextToggle;
        toggleSetter = setBonxTextToggle;
        imageBorder = `0.125rem solid #ff00ee`;
        textBorder = `0.125rem solid #00ff33`;
        firstBg = "ptf3";
        secondBg = "ptf4";
        dependencyArray = bonxDependencyJSXArray;
        dependencySlice = bonxDependenciesSlice;
        sectionReference = bonxRef as React.RefObject<HTMLDivElement>;
        hoverState = bonxLinkHover;
        setHoverState = setBonxLinkHover;
        break;
      case "draumspa":
        textFields = draumspaTextFields;
        toggleState = draumspaTextToggle;
        toggleSetter = setDraumspaTextToggle;
        imageBorder = `0.125rem solid #00ff33`;
        textBorder = `0.125rem solid #ff00ee`;
        firstBg = "ptf1";
        secondBg = "ptf2";
        dependencyArray = draumspaDependencyJSXArray;
        dependencySlice = draumspaDependenciesSlice;
        sectionReference = draumspaRef as React.RefObject<HTMLDivElement>;
        hoverState = draumspaLinkHover;
        setHoverState = setDraumspaLinkHover;
        break;
    }
    // Logic to generate content for text cube
    const injectParagraph = (text: string): JSX.Element => {
      return (
        <p
          className={summaryClassnames}
          style={{ opacity: !hoverState ? 1 : 0 }}
        >
          {text}
        </p>
      );
    };
    const summaryClassnames: string =
      "textfield-summary text-justify canela canela-1";
    const singleSummary: JSX.Element = textFields ? (
      isTiny ? (
        injectParagraph(textFields.front.tinySummary as string)
      ) : (
        injectParagraph(textFields.front.summary as string)
      )
    ) : (
      <></>
    );
    const doubleSummary: JSX.Element = textFields ? (
      !toggleState ? (
        <React.Fragment key={toggleState ? "true" : "false"}>
          {injectParagraph(textFields.front.summary[0])}
          <div className="arrow-holder arrow-right flex-row">
            <span
              style={{ opacity: !hoverState ? 1 : 0 }}
              className="arrow-button"
              onClick={(): void => {
                if (!toggleSetter) return;
                toggleSetter(true);
              }}
            >
              ↪
            </span>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment key={toggleState ? "true" : "false"}>
          {injectParagraph(textFields.front.summary[1])}
          <div className="arrow-holder arrow-left flex-row">
            <span
              className="arrow-button"
              onClick={(): void => {
                if (!toggleSetter) return;
                toggleSetter(false);
              }}
            >
              ↩
            </span>
          </div>
        </React.Fragment>
      )
    ) : (
      <></>
    );
    const textCube: JSX.Element = textFields ? (
      <div
        className="portfolio-entry-cube text-cube flex-column"
        style={{
          border: textBorder as string,
          height: isTiny ? `min(60vh, 75vw)` : `min(60vh, 50vw)`,
        }}
      >
        <a
          href={blankString}
          target="_blank"
          rel="noreferrer"
          className="textfield-title canela canela-6"
          style={{ position: `relative` }}
          onMouseOver={(): void => {
            if (setHoverState) {
              setHoverState(true);
            }
          }}
          onMouseLeave={(): void => {
            if (setHoverState) {
              setHoverState(false);
            }
          }}
        >
          <span className="textfield-title-main">
            {" "}
            {textFields.front.title}{" "}
          </span>
          <span className={`ellipsis${index + 1}`}>.</span>{" "}
          <span className="link-think canela-1">↗</span>
        </a>
        {isTiny ? (
          singleSummary
        ) : typeof textFields.front.summary === "string" ? (
          singleSummary
        ) : (
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={toggleState ? `${parsedTitle}-true` : `${parsedTitle}-false`}
              timeout={500}
              classNames="fadesimple"
            >
              {doubleSummary}
            </CSSTransition>
          </SwitchTransition>
        )}
      </div>
    ) : (
      <></>
    );
    // Logic to generate content for image cube. Complex code replaced with third-party Image Carousel due to Framer Motion bugs
    const injectImages = (): JSX.Element[] => {
      const imagesArray: JSX.Element[] = previewImages.map(
        (src: string, index: number): JSX.Element => {
          return (
            <img
              alt={`image-${title}-${index}`}
              key={`${title} ${index}`}
              className="full-dims"
              src={src}
            />
          );
        }
      );
      return imagesArray;
    };
    const injectedImages: JSX.Element[] = injectImages();
    const imageCube: JSX.Element = (
      <a
        key={parsedTitle}
        href={blankString}
        target="_blank"
        rel="noreferrer"
        className="portfolio-entry-cube image-cube"
        style={{
          border: imageBorder as string,
          height: isTiny ? `min(60vh, 75vw)` : `min(60vh, 50vw)`,
        }}
        onMouseOver={(): void => {
          if (setHoverState) {
            setHoverState(true);
          }
        }}
        onMouseLeave={(): void => {
          if (setHoverState) {
            setHoverState(false);
          }
        }}
      >
        <Carousel
          key={parsedTitle}
          autoPlay={true}
          axis="vertical"
          infiniteLoop={true}
          showArrows={false}
          showIndicators={false}
          stopOnHover={true}
          swipeable={false}
          useKeyboardArrows={false}
          showThumbs={false}
          showStatus={false}
          interval={2500}
        >
          {injectedImages.map((imageElement: JSX.Element):JSX.Element => {
            return imageElement;
          })}
        </Carousel>
      </a>
    );

    const normalEntryClass: string = "entry-container-inner flex-row full-dims";
    const tinyEntryClass: string =
      "entry-container-inner flex-column full-dims";

    // Primary return logic
    return (
      <React.Fragment key={title}>
        <div
          className="portfolio-entry-container flex-row flex-center"
          ref={sectionReference}
        >
          <div className={isTiny ? tinyEntryClass : normalEntryClass}>
            <div
              className="text-cascade-container"
              style={{
                opacity: hoverState ? 0 : 1,
              }}
            >
              {dependencyArray.slice(0, dependencySlice).reverse()}
            </div>
            {firstBg && (
              <div
                className="contact-bg-layer ptf-bg"
                id={firstBg}
                style={{
                  filter: hoverState
                    ? `blur(5px) grayscale(100%)`
                    : `blur(40px) grayscale(0%)`,
                }}
              />
            )}
            {secondBg && (
              <div
                className="contact-bg-layer ptf-bg"
                id={secondBg}
                style={{
                  filter: hoverState
                    ? `blur(5px) grayscale(100%)`
                    : `blur(40px) grayscale(0%)`,
                }}
              />
            )}

            {imageCube}
            {textCube}
          </div>
        </div>
        {index !== 2 && <div className="portfolio-entry-interstice" />}
      </React.Fragment>
    );
  };

  const entryParameters: [string, string[]][] = [
    ["DraumSpa", draumSquares],
    ["Bonx", bonxSquares],
    ["Asherah", ashSquares],
  ];

  return (
    <motion.div
      key="portfolio"
      className="whole-page full-dims"
      id="portfolio-page"
      {...animateOpacityValues}
    >
      {entryParameters.map(
        (entryArgs: [string, string[]], index: number): JSX.Element => {
          return portfolioEntryGenerator(...entryArgs, index);
        }
      )}
    </motion.div>
  );
}
