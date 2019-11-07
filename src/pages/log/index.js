import React, { useState } from "react";
import "./style.css";

import api from "../../services/api";

export default function Log(props) {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  function handleClick(e) {
    e.preventDefault();
    if (name === "" || password === "") {
      return alert("Login inválido");
    }

    api
      .post("/users/authenticate", { name, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/dashboard");
        return;
      })
      .catch(err => {
        alert("Login inválido");
      });
  }

  return (
    <div className="container">
      <h2>Entrar</h2>
      <input
        name="name"
        value={name}
        onChange={e => setname(e.target.value)}
        id="user"
        type="text"
        placeholder="Usuário"
      />
      <input
        name="password"
        value={password}
        onChange={e => setpassword(e.target.value)}
        id="pass"
        type="password"
        placeholder="Senha"
      />
      <div className="butoes">
        <button className="cadastrar" onClick={openModal}>
          Cadastrar
        </button>
        <button onClick={e => handleClick(e)}>Entrar</button>
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
