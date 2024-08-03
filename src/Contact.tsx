//Package Imports
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import KUTE from "kute.js";

//Local imports
import {
  animateOpacityValues,
  ContactMethodArgs,
  ToggleCorrespondence,
  animateSlam,
  HoverClickInterface,
} from "./JADTypes";
import { chagall, portraits, contactIcons, eyeIcons } from "./ImageData";

interface ContactProps {
  storeImages: (
    srcArray: string[],
    stateSetter: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ) => void;
  paragraphValueGenerator: (booleanArg: boolean) => {
    initial: {};
    animate: {};
    transition: {};
  };
  isTiny: boolean;
}

export default function Contact(props: ContactProps): React.ReactElement {
  // Destructuring props
  const {
    storeImages,
    paragraphValueGenerator,
    isTiny,
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
    isTiny: boolean;
  } = props;

  // Preloading images: store as HTMLImageElement[]
  const [portraitImages, setPortraitImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [chagallImages, setChagallImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [contactImages, setContactImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [eyeImages, setEyeImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  useEffect((): void => {
    const imageParams: [
      string[],
      React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
    ][] = [
      [portraits, setPortraitImages],
      [chagall, setChagallImages],
      [contactIcons, setContactImages],
      [eyeIcons, setEyeImages],
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

  // Set injection indices for bathroom/cloakroom & Chagall screen
  const [bathroomIndex, setBathroomIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [cloakroomIndex, setCloakroomIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void => {
    if (portraitImages.length < 2) return;
    const bi: number = portraitImages.findIndex(
      (image: HTMLImageElement): boolean => image.src.includes("bathroom")
    );
    setBathroomIndex(bi);
    const ci: number = portraitImages.findIndex(
      (image: HTMLImageElement): boolean => image.src.includes("cloakroom")
    );
    setCloakroomIndex(ci);
  }, [portraitImages]);
  const [chagallIndex, setChagallIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): (() => void) => {
    const chagallTimer: NodeJS.Timeout | number = setTimeout((): void => {
      if (chagallIndex === 0) {
        setChagallIndex(1);
      } else if (chagallIndex === 1) {
        setChagallIndex(0);
      }
    }, 4000);
    return (): void => {
      clearTimeout(chagallTimer);
    };
  }, [chagallIndex]);

  // Set direct url injection strings for contact section illustrations
  const [emailUrl, setEmailUrl]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ] = useState<string | null>(null);
  const [linkedinUrl, setLinkedinUrl]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ] = useState<string | null>(null);
  const [phoneUrl, setPhoneUrl]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ] = useState<string | null>(null);
  const [githubUrl, setGithubUrl]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ] = useState<string | null>(null);
  useEffect((): void => {
    if (contactImages.length < 4) return;
    const emailImage: HTMLImageElement | undefined = contactImages.find(
      (image: HTMLImageElement): boolean => {
        return image.src.includes("email");
      }
    );
    const linkedinImage: HTMLImageElement | undefined = contactImages.find(
      (image: HTMLImageElement): boolean => {
        return image.src.includes("linkedin");
      }
    );
    const phoneImage: HTMLImageElement | undefined = contactImages.find(
      (image: HTMLImageElement): boolean => {
        return image.src.includes("phone");
      }
    );
    const githubImage: HTMLImageElement | undefined = contactImages.find(
      (image: HTMLImageElement): boolean => {
        return image.src.includes("github");
      }
    );
    if (!emailImage || !linkedinImage || !phoneImage || !githubImage) return;
    setEmailUrl(emailImage.src);
    setLinkedinUrl(linkedinImage.src);
    setPhoneUrl(phoneImage.src);
    setGithubUrl(githubImage.src);
  }, [contactImages]);
  const [openEyeUrl, setOpenEyeUrl]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ] = useState<string | null>(null);
  const [closedEyeUrl, setClosedEyeUrl]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ] = useState<string | null>(null);
  useEffect((): void => {
    if (eyeImages.length < 2) return;
    const openEyeImage: HTMLImageElement | undefined = eyeImages.find(
      (image: HTMLImageElement): boolean => {
        return image.src.includes("open");
      }
    );
    const closedEyeImage: HTMLImageElement | undefined = eyeImages.find(
      (image: HTMLImageElement): boolean => {
        return image.src.includes("closed");
      }
    );
    if (!openEyeImage || !closedEyeImage) return;
    setOpenEyeUrl(openEyeImage.src);
    setClosedEyeUrl(closedEyeImage.src);
  }, [eyeImages]);

  // Blob animation logic
  const blob1Ref: React.RefObject<SVGPathElement | null> =
    useRef<SVGPathElement | null>(null);
  const blob2Ref: React.RefObject<SVGPathElement | null> =
    useRef<SVGPathElement | null>(null);
  useEffect((): void | (() => void) => {
    if (!blob1Ref.current || !blob2Ref.current) return;
    const tweenTimer: NodeJS.Timeout | number = setTimeout((): void => {
      // Not sure how to type a KUTE tween
      const tween = KUTE.fromTo(
        blob1Ref.current,
        { path: blob1Ref.current },
        { path: blob2Ref.current },
        { repeat: 999, duration: 6000, yoyo: true }
      );
      tween.start();
    }, 1000);
    return (): void => {
      clearTimeout(tweenTimer);
    };
  }, []);

  // Section opacity logic
  const photoSectionRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const contactSectionRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const photoSectionInView: boolean = useInView(
    photoSectionRef as React.RefObject<HTMLDivElement>,
    {
      amount: 0.5,
    }
  );
  const contactSectionInView: boolean = useInView(
    contactSectionRef as React.RefObject<HTMLDivElement>,
    {
      once: true,
      amount: 0.5,
    }
  );

  //Photo rotation logic
  const [photoDegree, setPhotoDegree]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(15);
  const {
    scrollYProgress: photoSectionProgress,
  }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: photoSectionRef as React.RefObject<HTMLDivElement>,
    offset: ["start start", "end start"],
  });
  useEffect((): (() => void) => {
    const storeRotation = (): void => {
      const progress: number = photoSectionProgress.get();
      const rotationConstant: number = 15 + progress * 60;
      setPhotoDegree(rotationConstant);
    };
    window.addEventListener("scroll", storeRotation);

    return (): void => {
      window.removeEventListener("scroll", storeRotation);
    };
  }, [photoSectionProgress]);

  // Eye icon hover state
  const [eyeHover, setEyeHover]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  const [emailShowToggle, setEmailShowToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [phoneShowToggle, setPhoneShowToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [linkedShowToggle, setLinkedShowToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [githubShowToggle, setGithubShowToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const toggleCorrespondence: ToggleCorrespondence = {
    1: {
      state: emailShowToggle,
      setter: setEmailShowToggle,
    },
    2: {
      state: phoneShowToggle,
      setter: setPhoneShowToggle,
    },
    3: {
      state: linkedShowToggle,
      setter: setLinkedShowToggle,
    },
    4: {
      state: githubShowToggle,
      setter: setGithubShowToggle,
    },
  };

  /* Contact method generation
  - Object is declared with the full injection strings
  - Three unique toggle states declared for each field. Toggles are set to TRUE by the click handler function to reveal field.
  - Three unique content states declared. These are injected directly into the JSX.
  - Interval constants: These determined the timing of the iterators inthe useEffects later which will reveal each letter sequentially.
  - All of these useEffects have the respective toggles in their dependency array: a TRUE toggle will initiate the iteration.
  - Finally the large useEffect
    - Truncation indices inside dependency array
    - useEffect calls the determinAt function for each string contained inside the fullContentObject, AFTER slicing according to the truncation indices.
    - Does not need to be prevented from running according to the toggle statuses. Logic removed as unnecessary.
    - determinAt function generates content as JSX inside <></> including the relevant <span /> where "@" symbol required. By slicing the string prior to parsing through determinAt allows us to iterate character by character in a more simple fashion.*/
  // Declare data object with strings to inject into the contact fields
  const fullContentObject: { [key: string]: string } = {
    email: "jane.adam.inbox@gmail.com",
    phone: "07355993465",
    linked: "linkedin.com/in/jmad93",
    github: "github.com/janeadamdesign",
  };
  // email, phone & linkedIn toggle states.
  const [emailContentToggle, setEmailContentToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [phoneContentToggle, setPhoneContentToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [linkedContentToggle, setLinkedContentToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [githubContentToggle, setGithubContentToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  // email, phone & linkedIn content states: Directly injected into jsx.
  const [emailContentNow, setEmailContentNow]: [
    JSX.Element | null,
    React.Dispatch<React.SetStateAction<JSX.Element | null>>
  ] = useState<JSX.Element | null>(null);
  const [phoneContentNow, setPhoneContentNow]: [
    JSX.Element | null,
    React.Dispatch<React.SetStateAction<JSX.Element | null>>
  ] = useState<JSX.Element | null>(null);
  const [linkedContentNow, setLinkedContentNow]: [
    JSX.Element | null,
    React.Dispatch<React.SetStateAction<JSX.Element | null>>
  ] = useState<JSX.Element | null>(null);
  const [githubContentNow, setGithubContentNow]: [
    JSX.Element | null,
    React.Dispatch<React.SetStateAction<JSX.Element | null>>
  ] = useState<JSX.Element | null>(null);
  // intervalConstants
  const intervalConstant: number = 100;
  const intervalLongConstant: number = 500;
  // Declaration of three unique truncation indices, each with accompanying useEffect with sequential iterator to show per character.
  const [emailTruncationIndex, setEmailTruncationIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void | (() => void) => {
    let interval: number;
    if (emailTruncationIndex === 0) {
      interval = intervalLongConstant;
    } else interval = intervalConstant;
    if (!emailContentToggle) return;
    if (emailTruncationIndex >= fullContentObject.email.length) return;
    const emailIndexTimer: NodeJS.Timeout | number = setTimeout((): void => {
      setEmailTruncationIndex((prev: number): number => prev + 1);
    }, interval);
    return (): void => {
      clearTimeout(emailIndexTimer);
    };
  }, [emailContentToggle, emailTruncationIndex]);
  const [phoneTruncationIndex, setPhoneTruncationIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void | (() => void) => {
    let interval: number;
    if (phoneTruncationIndex === 0) {
      interval = intervalLongConstant;
    } else interval = intervalConstant;
    if (!phoneContentToggle) return;
    if (phoneTruncationIndex >= fullContentObject.phone.length) return;
    const phoneIndexTimer: NodeJS.Timeout | number = setTimeout((): void => {
      setPhoneTruncationIndex((prev: number): number => prev + 1);
    }, interval);
    return (): void => {
      clearTimeout(phoneIndexTimer);
    };
  }, [phoneContentToggle, phoneTruncationIndex]);
  const [linkedTruncationIndex, setLinkedTruncationIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void | (() => void) => {
    let interval: number;
    if (linkedTruncationIndex === 0) {
      interval = intervalLongConstant;
    } else interval = intervalConstant;
    if (!linkedContentToggle) return;
    if (linkedTruncationIndex >= fullContentObject.linked.length) return;
    const linkedIndexTimer: NodeJS.Timeout | number = setTimeout((): void => {
      setLinkedTruncationIndex((prev: number): number => prev + 1);
    }, interval);
    return (): void => {
      clearTimeout(linkedIndexTimer);
    };
  }, [linkedContentToggle, linkedTruncationIndex]);
  const [githubTruncationIndex, setGithubTruncationIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);
  useEffect((): void | (() => void) => {
    let interval: number;
    if (githubTruncationIndex === 0) {
      interval = intervalLongConstant;
    } else interval = intervalConstant;
    if (!githubContentToggle) return;
    if (githubTruncationIndex >= fullContentObject.github.length) return;
    const githubIndexTimer: NodeJS.Timeout | number = setTimeout((): void => {
      setGithubTruncationIndex((prev: number): number => prev + 1);
    }, interval);
    return (): void => {
      clearTimeout(githubIndexTimer);
    };
  }, [githubContentToggle, githubTruncationIndex]);
  // Large useEffect which calls determineAt for each string, sliced on the basis of truncation index, which then sets the content states for direct injection.
  useEffect((): void => {
    if (
      !emailContentToggle &&
      !phoneContentToggle &&
      !linkedContentToggle &&
      !githubContentToggle
    )
      return;
    const determineAt = (
      string: string,
      truncationIndex: number
    ): JSX.Element => {
      const atSymbol: JSX.Element = <span className="atSymbol canela">@</span>;
      let content: JSX.Element;
      let truncatedString: string = string.slice(0, truncationIndex);
      if (truncatedString.includes("@")) {
        const splitStringArray: string[] = truncatedString.split("@");
        if (splitStringArray[0] === "") {
          content = (
            <>
              {atSymbol}
              {splitStringArray[1]}
            </>
          );
        } else
          content = (
            <>
              {splitStringArray[0]}
              {atSymbol}
              {splitStringArray[1]}
            </>
          );
      } else content = <>{truncatedString}</>;
      return content;
    };

    if (emailTruncationIndex === 0) {
      setEmailContentNow(<>&nbsp;</>);
    } else
      setEmailContentNow(
        determineAt(fullContentObject.email, emailTruncationIndex)
      );

    if (phoneTruncationIndex === 0) {
      setPhoneContentNow(<>&nbsp;</>);
    } else
      setPhoneContentNow(
        determineAt(fullContentObject.phone, phoneTruncationIndex)
      );

    if (linkedTruncationIndex === 0) {
      setLinkedContentNow(<>&nbsp;</>);
    } else
      setLinkedContentNow(
        determineAt(fullContentObject.linked, linkedTruncationIndex)
      );

    if (githubTruncationIndex === 0) {
      setGithubContentNow(<>&nbsp;</>);
    } else {
      setGithubContentNow(
        determineAt(fullContentObject.github, githubTruncationIndex)
      );
    }
  }, [
    emailContentToggle,
    phoneContentToggle,
    linkedContentToggle,
    githubContentToggle,
    emailTruncationIndex,
    phoneTruncationIndex,
    linkedTruncationIndex,
    githubTruncationIndex,
  ]);

  // Complex content generation function generateContactMethod & a set of arguments stored as a data object. Called during render method using .map().
  const generateContactMethod = (argObject: ContactMethodArgs): JSX.Element => {
    const eyeIconInject = (src: string | null): JSX.Element => {
      return (
        <motion.img
          key={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.1 }}
          className="eye-icon"
          src={src ?? ""}
          style={src === openEyeUrl ? { transform: `scale(1.2)` } : {}}
          {...hoverClickAttributes}
        />
      );
    };
    let contentNow: JSX.Element | null;
    let toggleSetter: React.Dispatch<React.SetStateAction<boolean>>;
    let truncationIndex: number = 0;
    switch (argObject.hoverCode) {
      case 1:
        contentNow = emailContentNow;
        toggleSetter = setEmailContentToggle;
        truncationIndex = emailTruncationIndex;
        break;
      case 2:
        contentNow = phoneContentNow;
        toggleSetter = setPhoneContentToggle;
        truncationIndex = phoneTruncationIndex;
        break;
      case 3:
        contentNow = linkedContentNow;
        toggleSetter = setLinkedContentToggle;
        truncationIndex = linkedTruncationIndex;
        break;
      case 4:
        contentNow = githubContentNow;
        toggleSetter = setGithubContentToggle;
        truncationIndex = githubTruncationIndex;
        break;
    }
    const toggleObject: {
      state: boolean;
      setter: React.Dispatch<React.SetStateAction<boolean>>;
    } = toggleCorrespondence[argObject.hoverCode];
    const hoverClickAttributes: HoverClickInterface = {
      onMouseOver: (): void => {
        setEyeHover(argObject.hoverCode);
      },
      onMouseOut: (): void => {
        setEyeHover(0);
      },
      onClick: (): void => {
        toggleObject.setter(true);
        toggleSetter(true);
      },
    };
    const indexLengthCheckForClass = (): string => {
      if (truncationIndex >= argObject.methodContent.length) {
        return "text-right heveria contact-method-text";
      } else return "text-right heveria contact-method-text-underline";
    };
    const injectSection = (): JSX.Element => {
      if (toggleObject.state === false) {
        return (
          <motion.div
            {...animateSlam}
            className="contact-text-grid full-dims flex-row"
            key="hide"
          >
            {isTiny ? (
              <p
                className="canela canela-1 text-right"
                style={{ fontSize: `min(2rem, 4.5vw)`, width: `100%` }}
              >
                {argObject.methodContent}
              </p>
            ) : (
              <>
                <p
                  className="canela canela-1 text-left method-name-text"
                  {...hoverClickAttributes}
                >
                  {" "}
                  {argObject.method}
                </p>
                {argObject.hoverCode === eyeHover
                  ? eyeIconInject(openEyeUrl)
                  : eyeIconInject(closedEyeUrl)}
              </>
            )}
          </motion.div>
        );
      } else
        return (
          <motion.div
            {...animateSlam}
            className="contact-text-grid full-dims"
            key="show"
          >
            <div className="full-dims flex-row detail-container">
              <motion.p className={indexLengthCheckForClass()}>
                {argObject.hyperlink ? (
                  <a
                    href={argObject.hyperlink}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-method-link"
                  >
                    {contentNow}
                  </a>
                ) : (
                  contentNow
                )}
              </motion.p>
            </div>
          </motion.div>
        );
    };

    return (
      <div
        className="contact-method flex-row"
        id={argObject.method}
        key={argObject.method}
      >
        <img
          alt={`image-${argObject.method}`}
          className={isTiny ? "contact-image-tiny" : "contact-image"}
          src={argObject.url ?? ""}
        />
        <AnimatePresence mode="wait">{injectSection()}</AnimatePresence>
      </div>
    );
  };
  const contactMethodArgs: ContactMethodArgs[] = [
    {
      url: emailUrl as string,
      method: "email",
      methodContent: "jane.adam.inbox@gmail.com",
      hoverCode: 1,
    },
    {
      url: phoneUrl as string,
      method: "phone",
      methodContent: "07355993465",
      hoverCode: 2,
    },
    {
      url: linkedinUrl as string,
      method: "linkedIn",
      methodContent: "linkedin.com/in/jmad93",
      hoverCode: 3,
      hyperlink: "https://linkedin.com/in/jmad93",
    },
    {
      url: githubUrl as string,
      method: "github",
      methodContent: "github.com/janeadamdesign",
      hoverCode: 4,
      hyperlink: "https://github.com/janeadamdesign",
    },
  ];

  return (
    <motion.div
      key="contact"
      className="whole-page full-dims"
      id="contact-page"
      {...animateOpacityValues}
    >
      <div id="cbg-container">
        <div className="contact-bg-layer" id="cbg-1" />
        <div className="contact-bg-layer" id="cbg-2" />
        <svg
          id="svg-group"
          viewBox="0 0 900 600"
          width="900"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <g transform="translate(467.9276878915372 337.4116036602706)">
            <path
              id="blob1"
              ref={blob1Ref as React.RefObject<SVGPathElement>}
              d="M120 -116.8C165.5 -74.5 219.2 -37.2 223.2 4C227.3 45.3 181.5 90.5 136 115.5C90.5 140.5 45.3 145.3 -7.9 153.2C-61 161.1 -122.1 172.1 -163.1 147.1C-204.1 122.1 -225 61 -229.9 -4.8C-234.7 -70.7 -223.4 -141.4 -182.4 -183.8C-141.4 -226.1 -70.7 -240 -16.7 -223.3C37.2 -206.6 74.5 -159.1 120 -116.8"
              fill="#64af79"
            ></path>
          </g>
          <g
            style={{ visibility: `hidden` }}
            transform="translate(453.29118530933937 332.715804237813)"
          >
            <path
              id="blob1"
              ref={blob2Ref as React.RefObject<SVGPathElement>}
              d="M150.5 -171C179.3 -121.6 176.1 -60.8 173.9 -2.2C171.7 56.3 170.3 112.7 141.5 139.3C112.7 166 56.3 163 -7.2 170.2C-70.7 177.4 -141.4 194.8 -168.1 168.1C-194.8 141.4 -177.4 70.7 -159.7 17.7C-142 -35.4 -124 -70.7 -97.4 -120C-70.7 -169.4 -35.4 -232.7 12.7 -245.4C60.8 -258.1 121.6 -220.3 150.5 -171"
              fill="#f99490"
            ></path>
          </g>
        </svg>
      </div>
      <div id="contact-offset-container">
        <motion.div
          id="photo-section"
          className={isTiny ? `flex-column` : "flex-row"}
          ref={photoSectionRef as React.RefObject<HTMLDivElement>}
          {...paragraphValueGenerator(photoSectionInView)}
        >
          <motion.div
            id="bathroom-holder"
            className="portrait-holder flex-row flex-center"
            style={{
              transform: `rotateY(${photoDegree}deg)`,
              height: isTiny ? `75vw` : `min(75%, 50vw)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.75 }}
          >
            {portraitImages[0] ? (
              <img
                alt={`portrait-image-bathroom`}
                className="portrait"
                src={portraitImages[bathroomIndex].src}
              />
            ) : (
              <></>
            )}
          </motion.div>
          <motion.div
            id="cloakroom-holder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 1.5 }}
            className="portrait-holder flex-row flex-center"
            style={{
              transform: `rotateY(-${photoDegree}deg)`,
              height: isTiny ? `75vw` : `min(75%, 50vw)`,
              margin: isTiny ? `1rem 0 1rem 0` : "0",
            }}
          >
            {portraitImages[1] ? (
              <img
                alt={`portrait-image-cloakroom`}
                className="portrait"
                src={portraitImages[cloakroomIndex].src}
              />
            ) : (
              <></>
            )}{" "}
          </motion.div>
        </motion.div>
        <div style={{ height: `50vh` }} />
        <motion.div
          id="contact-details-section"
          className="flex-row flex-center"
          ref={contactSectionRef as React.RefObject<HTMLDivElement>}
          {...paragraphValueGenerator(contactSectionInView)}
        >
          <div
            id="contact-holder"
            className="flex-column flex-center"
            style={{ width: isTiny ? `95%` : `75%` }}
          >
            <div id="contact-title-container" className="flex-row flex-center">
              <p
                id="contact-title"
                className="canela canela-4 welcome-subtitle"
              >
                get in touch
                <motion.span
                  id="ellipses"
                  initial={{ marginLeft: `1rem` }}
                  animate={{ marginLeft: `1rem` }}
                  transition={{ ease: "easeInOut", delay: 0.75, duration: 0.5 }}
                >
                  <span className="ellipsis1 animate-ellipsis">.</span>
                  <span className="ellipsis2 animate-ellipsis">.</span>
                  <span className="ellipsis3 animate-ellipsis">.</span>
                </motion.span>
              </p>
            </div>

            {contactMethodArgs.map((object: ContactMethodArgs): JSX.Element => {
              return generateContactMethod(object);
            })}
          </div>
        </motion.div>
        <div style={{ height: `50vh` }} />
        {chagallImages.length > 1 ? (
          <div
            id="chagall-screen"
            style={{
              backgroundImage: `url(${chagallImages[chagallIndex].src})`,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
}
