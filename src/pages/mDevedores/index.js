import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import api from "../../services/api";

export default function MeusDevedores() {
  const [devedores, setDevedores] = useState([]);
  const [name, setName] = useState("");
  const [newName, setnewName] = useState("");

  const token = localStorage.getItem("token");
  const Auth = `Bearer ${token}`;

  useEffect(() => {
    function handleDevedores() {
      api
        .get(`/users/devedores`, { headers: { Authorization: Auth } })
        .then(res => {
          setDevedores(res.data.devedores);
        })
        .catch(error => {
          console.log(error);
        });
    }
    handleDevedores();
  }, [Auth]);

  async function handleClick() {
    await api.post(
      `/users/devedores`,
      { name },
      { headers: { Authorization: Auth } }
    );
  }

  async function editarDev(id) {
    const name = newName;

    if (name === "") {
      alert("Preencha os campos");
    }

    await api.put(
      `/users/devedores/${id}`,
      { name },
      { headers: { Authorization: Auth } }
    );
  }

  async function deleteDev(id) {
    await api.delete(`/users/devedores/${id}`, {
      headers: { Authorization: Auth }
    });
  }

  function listDividas(id) {
    localStorage.setItem("dev", id);
  }

  function openModal(id) {
    document.getElementById(id).style.display = "block";
  }

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }
  return (
    <div className="M-devedores">
      <Link to="/dashboard">
        <button className="voltar">voltar</button>
      </Link>
      <div className="novo-devedor">
        <h3>Criar novo devedor</h3>
        <input
          type="text"
          name="setName"
          onChange={e => setName(e.target.value)}
          placeholder="Nome:"
        />
        <button onClick={handleClick}>Enviar</button>
      </div>

      <ul className="list-devedores">
        {devedores.map(devedor => (
          <li key={devedor.id}>
            <strong>Nome: {devedor.name}</strong>
            <Link to="/devedor-dividas">
              <button
                className="listar"
                onClick={() => listDividas(devedor.id)}
              >
                Listar
              </button>
            </Link>

            <button className="editar" onClick={() => openModal(devedor.id)}>
              Editar
            </button>

            <div id={devedor.id} key={devedor.id} className="modal3">
              <div className="modal-content3">
                <button
                  className="close3"
                  onClick={() => closeModal(devedor.id)}
                >
                  X
                </button>

                <h2>Editar/excluir</h2>
                <input
                  type="text"
                  name="setName"
                  onChange={e => setnewName(e.target.value)}
                  placeholder="Nome"
                />

                <button
                  className="excluir"
                  onClick={() => deleteDev(devedor.id)}
                >
                  Excluir
                </button>
                <button
                  className="cadastrar3"
                  onClick={() => editarDev(devedor.id)}
                >
                  Enviar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
