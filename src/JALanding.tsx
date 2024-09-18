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
import { ashSquares, bonxSquares, draumSquares, spaSquares } from "./ImageData";

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

  // Scroll to Top logic. Edited to fix for Firefox: scrollTop 1 : 0
  const location: Location = useLocation();
  useEffect((): (() => void) => {
    let isFirefox: boolean = false;
    const userAgent: string = window.navigator.userAgent;
    if (userAgent.indexOf("Firefox") !== -1) {
      isFirefox = true;
    }
    const scrollTimer: NodeJS.Timeout | number = setTimeout((): void => {
      window.scrollTo({
        top: isFirefox ? 1 : 0,
        behavior: "smooth",
      });
    }, 1);
    return (): void => {
      clearTimeout(scrollTimer);
    };
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

  // Preloading portfolio images

  const [ashSquareImages, setAshSquareImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [bonxSquareImages, setBonxSquareImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [draumSquareImages, setDraumSquareImages]: [
    HTMLImageElement[],
    React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ] = useState<HTMLImageElement[]>([]);
  const [spaSquareImages, setSpaSquareImages]: [
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
      [spaSquares, setSpaSquareImages],
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

  // Check image loaded length
  const [loadPortfolio, setLoadPortfolio]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);
  useEffect((): void => {
    const fullLength: number =
      ashSquares.length +
      bonxSquares.length +
      draumSquares.length +
      spaSquares.length;
    const currentLength: number =
      ashSquareImages.length +
      bonxSquareImages.length +
      draumSquareImages.length +
      spaSquareImages.length;
    if (currentLength < fullLength) {
      setLoadPortfolio(false);
    } else setLoadPortfolio(true);
  }, [ashSquareImages, bonxSquareImages, draumSquareImages, spaSquareImages]);

  return (
    <AnimatePresence>
      <Routes>
        <Route
          key="welcome"
          path="/"
          element={
            <Welcome
              isTiny={isTiny}
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
              isTiny={isTiny}
              storeImages={storeImages}
              paragraphValueGenerator={paragraphValueGenerator}
            />
          }
        />
        <Route
          key="portfolio"
          path="/portfolio"
          element={
            <Portfolio
              storeImages={storeImages}
              isTiny={isTiny}
              loadPortfolio={loadPortfolio}
            />
          }
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
