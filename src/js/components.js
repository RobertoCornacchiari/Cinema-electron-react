import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.scss";

const { GETData, postData } = require("./fetch.js");

let bool = 0;

export function Schermata(params) {
  const { state, dispatch } = useContext(params.contesto);
  
  function carica() {
    if (bool == 0) {
      bool = 1;
      GETData("ProiezioniDisponibili.php", {}).then((r) => {
        let a = new Array();
        for (let i in r) a.push(r[i]);
        let elencoProiezioni = a;
        console.log(elencoProiezioni);
        dispatch({ type: "Carica proiezioni", payload: elencoProiezioni });
      });
    }
  }
  carica();

  return (
    <>
      <Card
        nome="Nuovo spettatore"
        titolo="Nuovo spettatore"
        testo="Inserisci un nuovo spettatore"
        bottone="Aggiungi"
        contesto={params.contesto}
      />
    </>
  );
}

function Pagina(props) {
  return (
    <div className="Pagina">
      {/*<nav className="navbar sticky-top navbar-light bg-light">
                <img
                    width="160"
                    height="30"
                    className="d-inline-block align-top"
                    alt=""
                />
                <div className="Titolo">PRENOTAZIONE TAMPONI</div>
                <form className="form-inline my-2 my-lg-0">
                        <button className="btn btn-primary my-2 my-sm-0">Area Riservata</button>
                        <button className="btn btn-primary my-2 my-sm-0" style={{ "marginLeft": "5" }}>Accedi</button>
                </form>
            </nav>
    */}
      <div className="corpo">{props.body}</div>
    </div>
  );
}

export function Card(params) {
  const { state, dispatch } = useContext(params.contesto);
  return (
    <Pagina
      body={
        <div className="card">
          <h5 className="card-header">{params.titolo}</h5>
          <div className="card-body">
            <div className="Form">
              <form>
                <div className="mb-3 Proiezioni">
                  <label htmlFor="Proiezioni" className="form-label">
                    Proiezioni Odierne
                  </label>
                  <select
                    className="form-select"
                    id="Proiezioni"
                    aria-describedby="ProiezioniHelp"
                    required
                  >
                    <Proiezioni contesto={params.contesto} />
                  </select>
                  <div id="ProiezioniHelp" className="form-text">
                    Seleziona la proiezioni programmata nella sala.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="Recapito" className="form-label">
                    Recapito telefonico
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Recapito"
                    aria-describedby="RecapitoHelp"
                    required
                  ></input>
                  <div id="RecapitoHelp" className="form-text">
                    Inserisci il numero di telefono dello spettatore.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="Numero" className="form-label">
                    Numero di Persone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Numero"
                    aria-describedby="NumeroHelp"
                    required
                  ></input>
                  <div id="NumeroHelp" className="form-text">
                    Inserisci il numero di persone di cui è composto il gruppo.
                  </div>
                </div>
                {state.codice != "" ? (
                  <>
                    <div className="CodiceSpettatore">{state.codice}</div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      id="Conferma"
                      style={{ fontSize: "20px" }}
                      onClick={() => {
                        let recapito = document.getElementById("Recapito").value;
                        let quanti = document.getElementById("Numero").value;
                        let e = document.getElementById("Proiezioni");
                        let valoreProiezione = e.options[e.selectedIndex].value;
                        if (recapito == "" || isNaN(quanti) || quanti == ""){
                          alert("Campi non correttamente inseriti");
                        } else {
                          postData("confermaSpettatore.php", {
                            recapito: recapito,
                            quanti: quanti,
                            proiezione: valoreProiezione,
                          });
                        }
                      }}
                    >
                      Aggiungi
                    </button> <button
                    type="button"
                    className="btn btn-danger"
                    id="Annulla"
                    style={{ fontSize: "20px" }}
                    >
                      Annulla
                    </button>
                  </>
                ) : (
                    <button
                    type="button"
                    className="btn btn-primary"
                    id="richiediCodice"
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      let recapito = document.getElementById("Recapito").value;
                      let quanti = document.getElementById("Numero").value;
                      let e = document.getElementById("Proiezioni");
                      let valoreProiezione = e.options[e.selectedIndex].value;
                      if (recapito == "" || isNaN(quanti) || quanti == ""){
                        alert("Campi non correttamente inseriti");
                      } else {
                        postData("nuovoSpettatore.php", {
                          recapito: recapito,
                          quanti: quanti,
                          proiezione: valoreProiezione,
                        }).then((r) => {
                          console.log(r);
                          if (r == "Posti Esauriti"){
                            alert("Posti rimanenti non sufficienti; ci dispiace :(");
                          } else {
                            dispatch({ type:"Aggiorna codice", payload: r});
                          }
                        });
                      }
                    }}
                  >
                    Richiedi codice
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      }
    />
  );
}

function Proiezioni(params) {
  const { state, dispatch } = useContext(params.contesto);
  let proiezioni = [];
  
  let disponibili = state.proiezioniDisponibili;
  console.log(disponibili);
  disponibili.forEach((element, i) => {
    let stringa = element.titolo + " " + element.dataOra + " Sala: " + element.idSala;
    proiezioni[proiezioni.length] = (
      <option value={element.id} key={i}>
        {stringa}
      </option>
    );
  });

  return <>{proiezioni}</>;
}
