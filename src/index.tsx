// Package Imports
import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';

// Local imports
import JALanding from "./JALanding";

const root: Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <JALanding />
  </React.StrictMode>
);
