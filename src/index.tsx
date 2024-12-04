import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import "./bootstrapImports";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./scss/index.scss";

const root = ReactDOM.createRoot(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById('root')!
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
