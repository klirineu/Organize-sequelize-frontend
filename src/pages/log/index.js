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

  function handleClick() {
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
        let error = new Error("Usuário ou senha inválidos");
        alert(error);
      });
  }

  function handleClickCadastro(e) {
    e.preventDefault();
    if (name === "" || password === "") {
      return alert("Login inválido");
    }

    api
      .post("/users/", { name, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/dashboard");
        return;
      })
      .catch(err => {
        let error = new Error("Usuário já existe");
        alert(error);
      });
  }

  return (
    <div className="container">
      <h2>Entrar</h2>
      <input
        name="name"
        onChange={e => setname(e.target.value)}
        id="user"
        type="text"
        placeholder="Usuário"
      />
      <input
        name="password"
        onChange={e => setpassword(e.target.value)}
        id="pass"
        type="password"
        placeholder="Senha"
      />
      <div className="butoes">
        <button className="cadastrar" onClick={openModal}>
          Cadastrar
        </button>
        <button onClick={handleClick}>Entrar</button>
      </div>

      <div id="modal">
        <div className="modal-content">
          <button className="close" onClick={closeModal}>
            X
          </button>
          <h2>Cadastrar</h2>
          <input
            type="text"
            name="name"
            onChange={e => setname(e.target.value)}
            placeholder="Usuário"
          />
          <input
            type="password"
            name="password"
            onChange={e => setpassword(e.target.value)}
            placeholder="Senha"
          />

          <button className="cadastrar" onClick={e => handleClickCadastro(e)}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
