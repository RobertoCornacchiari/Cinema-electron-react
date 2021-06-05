import React, { useReducer, useContext, useEffect, useState } from "react";
import "./style.scss";

const { GETData, postData } = require("./fetch.js");

export function Schermata(params) {
    const { state, dispatch } = useContext(params.contesto);

    return (
        <>
            <Card
                nome="prenota"
                titolo="Prenota"
                testo="Esegui la tua prenotazione"
                contesto={params.contesto}
            />
        </>
    )
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
            <div className="corpo">
                {props.body}
            </div>
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
                        <p className="card-text">{params.testo}</p>
                        <button className="btn btn-primary" style={{ "fontSize": "20px" }}>
                            {params.titolo}
                        </button>
                    </div>
                </div>
            } />
    );
}