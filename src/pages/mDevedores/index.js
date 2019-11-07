import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import api from "../../services/api";

export default function MeusDevedores() {
  const [devedores, setDevedores] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");
  const Auth = `Bearer ${token}`;

  useEffect(() => {
    async function handleDevedores() {
      await api
        .get(`/users/devedores`, { headers: { Authorization: Auth } })
        .then(res => {
          setDevedores(res.data.devedores);
        })
        .catch(error => {
          console.log(error);
        });
    }
    handleDevedores();
  }, [Auth, devedores]);

  async function handleClick() {
    await api.post(
      `/users/devedores`,
      { name },
      { headers: { Authorization: Auth } }
    );
  }

  function listDividas(id) {
    localStorage.setItem("dev", id);
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
          </li>
        ))}
      </ul>
    </div>
  );
}
