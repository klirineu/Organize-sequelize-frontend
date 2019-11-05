import React from "react";
import "./style.css";

export default function Log() {
  function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  return (
    <div className="container">
      <h2>Entrar</h2>
      <input type="text" placeholder="Usuário" />
      <input type="password" placeholder="Senha" />
      <div className="butoes">
        <button className="cadastrar" onClick={openModal}>
          Cadastrar
        </button>
        <button>Entrar</button>
      </div>

      <div id="modal">
        <div className="modal-content">
          <button className="close" onClick={closeModal}>
            X
          </button>
          <h2>Cadastrar</h2>
          <input type="text" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />

          <button className="cadastrar">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}
