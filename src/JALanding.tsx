// Package imports
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Location,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Local Imports
import "./design.scss";
import "./rtgTransitions.scss";
import "./fonts.scss";
import Welcome from "./Welcome";
import Contact from "./Contact";
import Portfolio from "./Portfolio";
import Header from "./Header";

function AnimatedRoutes(): React.ReactElement {
  // width checking
  const [isTiny, setIsTiny]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  useEffect((): (() => void) => {
    const checkViewportWidth = (): void => {
      if (window.innerWidth < 800) {
        setIsTiny(true);
      } else setIsTiny(false);
    };
    checkViewportWidth();
    window.addEventListener("resize", checkViewportWidth);
    return (): void => {
      window.removeEventListener("resize", checkViewportWidth);
    };
  }, [isTiny]);

  // Scroll to Top logic
  const location: Location = useLocation();
  useEffect((): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  // Functions to pass to children
  const storeImages = (
    srcArray: string[],
    stateSetter: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ): void => {
    const handleImageLoad = (image: HTMLImageElement): void => {
      stateSetter((prev: HTMLImageElement[]): HTMLImageElement[] => {
        if (
          prev.find(
            (extantImg: HTMLImageElement): boolean =>
              extantImg.src === image.src
          )
        ) {
          return prev;
        } else return [...prev, image];
      });
    };
    srcArray.forEach((src: string): void => {
      // console.log(src);
      const img: HTMLImageElement = new Image();
      img.src = src;
      img.onload = (): void => handleImageLoad(img);
    });
  };
  const paragraphValueGenerator = (
    booleanArg: boolean
  ): {
    initial: {};
    animate: {};
    transition: {};
  } => {
    return {
      initial: { opacity: 1 },
      animate: booleanArg ? { opacity: 1 } : { opacity: 0 },
      transition: { ease: "easeInOut", duration: 0.5 },
    };
  };

  return (
    <AnimatePresence>
      <Routes>
        <Route
          key="welcome"
          path="/"
          element={
            <Welcome
              storeImages={storeImages}
              paragraphValueGenerator={paragraphValueGenerator}
            />
          }
        />
        <Route
          key="welcome"
          path="*"
          element={
            <Welcome
              storeImages={storeImages}
              paragraphValueGenerator={paragraphValueGenerator}
            />
          }
        />
        <Route
          key="portfolio"
          path="/portfolio"
          element={<Portfolio storeImages={storeImages} isTiny={isTiny} />}
        />
        <Route
          key="contact"
          path="/contact"
          element={
            <Contact
              isTiny={isTiny}
              storeImages={storeImages}
              paragraphValueGenerator={paragraphValueGenerator}
            />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
export default function JALanding(): React.ReactElement {
  const [pageState, setPageState]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(1);

  // width checking
  const [isMobile, setIsMobile]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  useEffect((): (() => void) => {
    const checkViewportWidth = (): void => {
      if (window.innerWidth < 1000) {
        setIsMobile(true);
      } else setIsMobile(false);
    };
    checkViewportWidth();
    window.addEventListener("resize", checkViewportWidth);
    return (): void => {
      window.removeEventListener("resize", checkViewportWidth);
    };
  }, [isMobile]);

  return (
    <div
      id="app-wrap"
      style={{
        backgroundColor:
          pageState === 2 ? "black" : pageState === 3 ? "#0057ae" : "#fdf5e6",
      }}
    >
      <Router>
        <Header
          pageState={pageState}
          setPageState={setPageState}
          isMobile={isMobile}
        />
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

//
