# Jane Adam Design

## Portfolio Website

Personal portfolio website dedicated to showcasing my work, featuring three main React page routes and a header containing satisfying, 'gummy' animations on button hover / click UI.

A landing page dedicated to visual demonstration of ability to create aesthetically compelling websites features: a progress bar that accompanies image preload (irrelevant if user has very fast download speeds); animated text to greet page load; parallax scrolling, 3D CSS elements, image slideshows, and dynamic scroll animations.

A portfolio page showcases finished projects, with each project displayed inside its own modular container. Each container is composed of SVG backgrounds exhibiting fluid curves, which transition into on another behind a blurred filter to simulate the 'breathing' of a 'living website'. There is a second background layer animating text elements corresponding to development dependencies, which are injected into the DOM to simulate an application progressing through lines of code, before each disappears behind the 'mist' of the blurred, partially transparent background elements. 

The container then displays two square JSX containers, the first exhibiting an auto-cycling image carousel injected with screenshots from the respective rendered project—the second exhibits a short text description whose UI enables the user to click through 'pages' containing different paragraphs.

When external links to the project URL are hovered over, the 'living' aspect of each project container is slowed or paused entirely as the backgrounds transition to greyscale and the blur filter is tempered, suggesting a frozen temporality.

A contact page displays similarly animated SVG backgrounds behind a blur filter, this time also with a small morphing 'blob' which moves across the page and changes shape / dimensions. There are two portrait pictures of myself which rotate in relation to scroll before the user arrives at a contact pane which animates text upon click in the manner of CLI entry to reveal email, telephone, linkedIn & github details.

All images generated with Midjourney.

## Known issues

- Firefox (all environments): Image preloading functionality not working. Causes brief flashes of whitespace on the first time each image in slideshow is displayed.
- Firefox (iOS): appearance / retreat of bottom browser bezel causes unwanted expansion / contraction of UI. Not present on any other browser/environment combination.

## Dependencies

- @fortawesome/fontawesome-free
- @fortawesome/fontawesome-svg-core
- @fortawesome/free-solid-svg-icons
- @fortawesome/react-fontawesome
- @react-spring/web
- @types/gsap
- framer-motion
- gsap
- kute.js
- parallax
- react
- react-dom
- react-responsive-carousel
- react-router-dom
- react-scripts
- react-scroll-parallax
- react-spring
- react-transition-group
- sass
- scrollmagic
- scrollmagic-plugin-gsap
- typescript



