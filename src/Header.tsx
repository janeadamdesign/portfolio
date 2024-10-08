//Package imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface HeaderProps {
  pageState: number;
  setPageState: React.Dispatch<React.SetStateAction<number>>;
  isMobile: boolean;
}

export default function Header(props: HeaderProps): React.ReactElement {
  //Operating System check for font adjustment
  const [isMac, setIsMac]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [isFirefox, setIsFirefox]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const checkMac = (): void => {
    let os: string | null = null;
    let isFirefox: boolean = false;
    const userAgent: string = window.navigator.userAgent;
    if (userAgent.indexOf("Mac") !== -1) {
      os = "MacOS";
    }
    if (userAgent.indexOf("Firefox") !== -1) {
      isFirefox = true;
    }
    if (os) {
      setIsMac(true);
    } else setIsMac(false);
    if (isFirefox) {
      setIsFirefox(true);
    } else setIsFirefox(false);
  };
  useEffect((): void => {
    checkMac();
  }, []);

  // Click handler to change props.pagestate
  const backgroundClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const id: string = event.currentTarget.id;
    let number: number = 0;
    switch (id) {
      case "landing-button":
        number = 1;
        break;
      case "portfolio-button":
        number = 2;
        break;
      case "contact-button":
        number = 3;
        break;
    }
    // alert(props.pageState + id);
    if (number > 0) {
      props.setPageState(number); 
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const [hoverLanding, setHoverLanding]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);
  const [hoverPortfolio, setHoverPortfolio]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);
  const [hoverContact, setHoverContact]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const [clickLanding, setClickLanding]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);
  const [clickPortfolio, setClickPortfolio]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);
  const [clickContact, setClickContact]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const button = (id: string): JSX.Element => {
    let state: boolean | null = null;
    let setState: React.Dispatch<React.SetStateAction<boolean>> | null = null;
    let clickState: boolean | null = null;
    let setClickState: React.Dispatch<React.SetStateAction<boolean>> | null =
      null;
    let nav: string = "/";
    switch (id) {
      case "landing":
        state = hoverLanding;
        setState = setHoverLanding;
        clickState = clickLanding;
        setClickState = setClickLanding;
        nav = "/";
        break;
      case "portfolio":
        state = hoverPortfolio;
        setState = setHoverPortfolio;
        clickState = clickPortfolio;
        setClickState = setClickPortfolio;
        nav = "/portfolio";
        break;
      case "contact":
        state = hoverContact;
        setState = setHoverContact;
        clickState = clickContact;
        setClickState = setClickContact;
        nav = "/contact";
        break;
    }
    const stateSetterTrue = (): void => {
      if (setState) {
        setState(true);
      }
    };
    const stateSetterFalse = (): void => {
      if (setState) {
        setState(false);
      }
    };
    const clickStateSetterTrue = (): void => {
      if (setClickState) {
        setClickState(true);
      }
    };
    const clickStateSetterFalse = (): void => {
      if (setClickState) {
        setClickState(false);
      }
    };

    const initial: {} = {
      transform: `translateY(-45%) rotateX(30deg)`,
      boxShadow: `0 5px 0 0 rgba(51, 51, 51)`,
      backgroundColor: `rgba(153, 255, 0, 0.25)`,
    };
    const springTransition: {} = {
      type: "spring",
      damping: clickState ? 20 : 7.5,
      stiffness: 250,
    };
    const easeTransition: {} = { ease: "easeInOut", duration: 0.125 };
    const transition: {} = {
      transform: { ...easeTransition },
      boxShadow: { ...springTransition },
      backgroundColor: { ease: "ease", duration: 0 },
    };
    const animateClick: {} = {
      transform: `translateY(-40%) rotateX(30deg)`,
      boxShadow: `0 1px 0 0 rgba(51, 51, 51)`,
      transition: { ...transition },
    };
    const animateHover: {} = {
      transform: `translateY(calc(-45% - 5px)) rotateX(30deg)`,
      boxShadow: `0 10px 0 0 rgba(51, 51, 51)`,
      transition: { ...transition },
      backgroundColor: `rgba(162, 0, 255, 0.25)`,
    };
    const animateUnHover: {} = {
      ...initial,
      transition: { ...transition },
    };

    return (
      <div className="button-container  flex-row flex-center">
        <Link
          to={nav}
          className="link"
          onMouseEnter={stateSetterTrue}
          onMouseLeave={stateSetterFalse}
          onMouseDown={clickStateSetterTrue}
          onMouseUp={clickStateSetterFalse}
          onTouchStart={clickStateSetterTrue}
          onTouchEnd={clickStateSetterFalse}
        >
          <motion.button
            key={`${id}-button`}
            id={`${id}-button`}
            className="navlink"
            onClick={backgroundClickHandler}
            initial={{ ...initial }}
            animate={
              clickState
                ? { ...animateClick }
                : !props.isMobile
                ? state
                  ? { ...animateHover }
                  : { ...animateUnHover }
                : {}
            }
          >
            <p
              className="heveria"
              style={{
                transform:
                  !isMac || (isMac && isFirefox)
                    ? `translateY(10%) rotateX(-30deg) `
                    : " rotateX(-30deg)  ",
              }}
            >
              {id}
            </p>
          </motion.button>
        </Link>
      </div>
    );
  };

  // DRY Buttons
  const buttonArray: string[] = ["landing", "portfolio", "contact"];
  const renderedButtons: JSX.Element[] = buttonArray.map(
    (buttonText: string): JSX.Element => {
      return (
        <React.Fragment key={buttonText}>{button(buttonText)}</React.Fragment>
      );
    }
  );

  // Burger menu logic
  const [burgerToggle, setBurgerToggle]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  useEffect((): void => {
    if (!burgerToggle) return;
    if (!props.isMobile) {
      setBurgerToggle(false);
    }
  }, [props.isMobile, burgerToggle]);

  // Title swipe animation values
  const titleSwipeValues: {} = {
    initial: { transform: `translateY(100%)` },
    animate: { transform: `translateY(0%)` },
    exit: { transform: `translateY(-100%)` },
    transition: { type: "spring", damping: 20, stiffness: 500 },
  };

  //return content
  return (
    <motion.header
      initial={{ transform: `translateX(-100%)`, opacity: 0 }}
      animate={{ transform: `translateX(0%)`, opacity: 1 }}
      transition={{
        transform: { type: "spring", damping: 15, stiffness: 100 },
        opacity: { ease: "easeInOut", duration: 1 },
      }}
      id="head-container"
    >
      <div id="design-head" className="full-dims flex-row">
        <SwitchTransition mode="out-in">
          <CSSTransition key={burgerToggle ? "true" : "false"} timeout={0}>
            {!burgerToggle ? (
              <motion.div
                key="normal-title"
                {...titleSwipeValues}
                className="header-half flex-column flex-center"
                id="title-container"
              >
                <p
                  className="canela canela-6"
                  id="title-text"
                  style={{ paddingTop: isMac ? `1%` : "" }}
                >
                  <Link to="welcome"> Jane Adam Design</Link>
                </p>{" "}
              </motion.div>
            ) : (
              <motion.div
                key="burgered-menu"
                {...titleSwipeValues}
                className="header-half flex-row"
                id="navlinks"
                style={{ flex: 1, marginLeft: `1em` }}
              >
                {renderedButtons}
              </motion.div>
            )}
          </CSSTransition>
        </SwitchTransition>
        {!props.isMobile ? (
          <div className="header-half flex-row" id="navlinks">
            {renderedButtons}
          </div>
        ) : (
          <div id="burger-menu">
            <motion.div
              id="bar-container"
              className="full-dims flex-column"
              initial={{ transform: "rotate(0deg" }}
              animate={{
                transform: !burgerToggle ? "rotate(0deg)" : "rotate(90deg)",
              }}
              transition={{ type: "spring", damping: 20, stiffness: 500 }}
              onClick={(): void => {
                setBurgerToggle((prev: boolean): boolean => !prev);
              }}
            >
              <span />
              <span />
              <span />
            </motion.div>
          </div>
        )}
      </div>
    </motion.header>
  );
}
