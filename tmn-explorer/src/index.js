import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { Moralis } from 'moralis'
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';

const appId = process.env.REACT_APP_MORALIS_APP_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

Moralis.initialize(appId);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
        <App />
      </MoralisProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
