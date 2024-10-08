import { TextFields } from "./JADTypes";

export const asherahTextFields: TextFields = {
  front: {
    title: "Asherah",
    summary:
      "Brochure website for a contemporary Mediterranean restaurant. There are five core pages: a landing page with contact details; an exploratory page which narrativises and illustrates the biography of the founder and history of the restaurant; a gallery consisting of customer-contributed unposed photographs; a page containing a UI through which end-users can secure restaurant reservations with dynamic generation of timeslots on the basis of availability, and a menu.",
    tinySummary:
      "Brochure website for a contemporary Mediterranean restaurant. Gallery and reservation-booking functionality",
    apiCalls: [
      "emailJS api: automated emails to customer",
      "textbelt API: automated SMS to customer",
    ],
    dependencies: [
      "@emailjs/browser",
      "@react-spring/parallax",
      "framer-motion",
      "lodash-throttle",
      "react",
      "react-calendar",
      "react-dom",
      "react-phone-input",
      "react-router-dom",
      "tslib",
      "typescript",
      "yet-another-react-lightbox",
      "emailJS API: automated emails",
      "textbelt API: automated SMS",
      "a",
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a9",
      "a10",
      "a11",
      "a12",
      "a13",
      "a14",
      "a15",
      "a16",
      "a17",
      "a18",
      "a19",
      "a20",
      "a21",
      "a22",
      "a23",
    ],
  },
};

export const bonxTextFields: TextFields = {
  front: {
    title: "Bonx Skincare",
    summary: [
      "eCommerce website for a skin / hair product manufacturer. Featuring dynamic UX on header, footer, and retractable menu elements, including animated discount code reveal. Landing page exemplifies brand identity: youth-oriented cosmetics with cyberpunk aesthetic. Interactive animated ‘cards’ expand to show ingredients used in products and act as links to product catalogue pages...",
      "Modular animated card elements are passed data as props to exhibit each individual product. ‘Values’ page elucidates design philosophy and corporate/social responsibility commitments with full-page illustrations. Basket functionality retrieves data from React state mirrored to browser cookies such that data is retained on page refresh. A dedicated basket page directs user to checkout via Stripe.",
    ],
    tinySummary:
      "eCommerce website for skin / hair product manufacturer. Dynamix UX, youth-oriented brand identity, cyberpunk aesthetic.",

    apiCalls: [
      "getAddress API: generate addresses from postcode",
      "Stripe Demo API: express server transactions",
      "emailJS API: automated emails",
    ],
    dependencies: [
      "@emailjs/browser",
      "@googlemaps/js-api-loader",
      "@react-google-maps/api",
      "@stripe/react-stripe-js",
      "@stripe/stripe-js",
      "body-parser",
      "cors",
      "emailjs",
      "express",
      "framer-motion",
      "getaddress-autocomplete",
      "js-cookie",
      "lodash",
      "react",
      "react-card-flip",
      "react-dom",
      "react-google-autocomplete",
      "react-intersection-observer",
      "react-router-dom",
      "react-spring",
      "react-transition-group",
      "sass",
      "stripe",
      "typescript",
      "validator",
      "emailJS API: automated emails",
      "getAddress API: addresses from postcode",
      "Stripe Demo API: express server transactions",
      "a",
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a9",
      "a10",
      "a11",
      "a12",
      "a13",
      "a14",
      "a15",
      "a16",
      "a17",
      "a18",
      "a19",
      "a20",
      "a21",
      "a22",
      "a23",
    ],
  },
};

export const draumspaTextFields: TextFields = {
  front: {
    title: "DraumSpa",
    summary: [
      "Full-screen weather app: primary weather data retrieved from OpenWeatherAPI. On page load a dynamic background cycles through a carousel of weather-related ‘scenes’. UI allows for location to be retrieved through device location settings or manual text entry: once initialised the scene background mirrors the current weather at given location...",
      "The UI itself is inspired by the GameCube system menu: a cuboid with the capacity to rotate through 3D space. There are nine weather widgets, each of which upon click will rotate the 3D object to an adjacent face displaying further information, usually animated graphs.",
    ],
    tinySummary:
      "Full-screen weather app: primary data retrieved from OpenWeatherAPI. Dynamic background to mirror current weather. 3D UI.",
    widgets: {
      1: "A wide widget iterates through two displays: the first projects forecast for week ahead, the second shows more detailed information about the current day’s weather. Corresponding face loads graph data for hourly temp / current day and the daily high/low for the coming week.",
      2: "Text description of precipitation probability and cloud cover: corresponding face loads graph data for these metrics over the next 48hrs.",
      3: "Bespoke CSS gradient slider visually represents AQI index: corresponding face loads 82hr graphs for AQI, NO2, NO, PM10 and PM2.5.",
      4: "Same gradient slider template used to display UV Index with SPF usage recommendation, explored over a 48hr period in graph face.",
      5: "A bespoke CSS dial represents wind speed and direction; graphs illustrate wind gust, wind speed and direction over next 48hrs.",
      6: "Another dial represents an hPa atmospheric pressure gauge, explored over 48hrs in subsequent graph data.",
      7: "This widget simply describes in text the current visibility and humidity, illustrated by graph data over 48hrs.",
      8: "Sun Cycle widget: a text representation of the amount of time until dawn or dusk, respectively, at at a given time in the initialised location. Corresponding face contains an animation representing the amount of the day / night phase through which one has already progressed.",
      9: "Moon Cycle widget: this is an animated display of an icon which represents the moon in its current state. The corresponding face features an enlarged version of this icon with corresponding text providing phase name and moonrise / moonset times.",
    },
    apiCalls: [
      "openWeatherData API: 'onecall' and 'pollution'",
      "sunriseSunset API: simple request for solar-temporal data",
      "Google Maps API: geocode from address, geocode from Lat/Long, and timezone from geocode.",
    ],
    dependencies: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/react-fontawesome",
      "framer-motion",
      "moment-timezone",
      "react",
      "react-device-detect",
      "react-dom",
      "react-transition-group",
      "recharts",
      "typescript",
      "sunriseSunset API: solar-temporal data",
      "openWeatherData API: 'onecall' and 'pollution'",
      "Google Maps API: geocoding & timezone",
      "a",
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a9",
      "a10",
      "a11",
      "a12",
      "a13",
      "a14",
      "a15",
      "a16",
      "a17",
      "a18",
      "a19",
      "a20",
      "a21",
      "a22",
      "a23",
    ],
  },
};

export const spaTextFields: TextFields = {
  front: {
    title: "The Spa Galleries",
    summary:
      "Brochure website for a small local gallery and events space situated in The Pantiles, Tunbridge Wells. Built in Next.js using App Router with three dynamically rendered sections: a welcome page, a page showing artists who currently exhibit at The Spa Galleries, and an events page. Features three-dimensional wireframe animations developed using Three.js and vanilla JavaScript manipulation of DOM elements. Modular 'card' components are used to inject each artist or event, respectively.",
    tinySummary:
      "Local gallery website developed in Next.js / App Router with three dynamically rendered pages featuring 3D wireframe animations.",
    apiCalls: [],
    dependencies: [
      "@tsparticles/engine",
      "@tsparticles/react",
      "eslint",
      "eslint-config-next",
      "framer-motion",
      "next",
      "p5",
      "react",
      "react-dom",
      "react-p5-wrapper",
      "react-spring",
      "react-transition-group",
      "react-tsparticles",
      "sass",
      "three",
      "typescript",
      "validator",
      "a",
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a9",
      "a10",
      "a11",
      "a12",
      "a13",
      "a14",
      "a15",
      "a16",
      "a17",
      "a18",
      "a19",
      "a20",
      "a21",
      "a22",
      "a23",
    ],
  },
};
