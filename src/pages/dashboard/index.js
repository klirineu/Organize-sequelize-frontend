import React from "react";

import "./style.css";

export default function Dashboard(props) {
  function sair() {
    localStorage.removeItem("token");
    props.history.push("/");
  }

  function minhasDividas() {
    props.history.push("/minhas-dividas");
  }

  function meusDevedores() {
    props.history.push("/meus-devedores");
  }

  return (
    <div className="dashboard">
      <button className="sair" onClick={sair}>
        Sair
      </button>
      <div onClick={minhasDividas}>
        <h2>Minhas dívidas</h2>
      </div>
      <div onClick={meusDevedores}>
        <h2>Meus devedores</h2>
      </div>
    </div>
  );
}
