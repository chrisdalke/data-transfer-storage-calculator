import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import MainScreen from './components/screens/main/MainScreen';
import { FocusStyleManager } from "@blueprintjs/core";
import CalculatorContextProvider from "./context/CalculatorContextProvider";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <React.StrictMode>
      <CalculatorContextProvider>
          <MainScreen />
      </CalculatorContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
