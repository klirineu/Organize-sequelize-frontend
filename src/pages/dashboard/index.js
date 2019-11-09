import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default function Dashboard(props) {
  function sair() {
    localStorage.removeItem("token");
    props.history.push("/");
  }

  return (
    <div className="dashboard">
      <button className="sair" onClick={sair}>
        Sair
      </button>
      <Link to="/minhas-dividas">
        <button className="card">
          <h2>Minhas dívidas</h2>
        </button>
      </Link>
      <Link to="/meus-devedores">
        <button className="card">
          <h2>Meus devedores</h2>
        </button>
      </Link>
    </div>
  );
}
