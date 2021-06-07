import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.scss";
import { Schermata } from "./components.js";
import { useAlert } from 'react-alert';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const { GETData, postData } = require("./fetch.js");

const AppContext = React.createContext(null);

export function App() {
  const [state, dispatch] = useReducer(reducer, {
      codice: "",
      proiezioniDisponibili: [],
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AlertProvider template={AlertTemplate}>
      <Schermata contesto={AppContext} />
      </AlertProvider>
    </AppContext.Provider>
  );
}

function reducer(state, action) {
    let newState = { ...state };
    switch (action.type) {
      case "Carica proiezioni":
        newState.proiezioniDisponibili = action.payload;
      break;
      case "Aggiorna codice":
        newState.codice = action.payload;  
      break;
      default:
        break;
    }
    console.log("stato", newState);
    return newState;
  }
  
