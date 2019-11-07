import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./style.css";

export default function MinhasDividas(props) {
  const [mDividas, setmDividas] = useState([]);
  const [Vdiv, setVdiv] = useState(0);
  const [parc, setParc] = useState(0);

  const token = localStorage.getItem("token");
  const Auth = `Bearer ${token}`;

  useEffect(() => {
    async function handlDividas() {
      await api
        .get(`/users/user_dividas`, { headers: { Authorization: Auth } })
        .then(res => {
          setmDividas(res.data.user_dividas);
        })
        .catch(error => {
          console.log(error);
        });
    }
    handlDividas();
  }, [Auth, mDividas]);

  async function handleClick(e) {
    if (Vdiv === 0 || parc === 0) {
      return alert("Preencha os campos");
    }

    await api
      .post(
        `/users/user_dividas`,
        { Vdiv, parc },
        { headers: { Authorization: Auth } }
      )
      .catch(err => {
        alert("Não foi possível criar nova dívida");
      });
  }

  async function deleteDiv(id) {
    await api.delete(`/users/user_dividas/${id}`, {
      headers: { Authorization: Auth }
    });
    props.history.push("minhas-dividas");
  }

  return (
    <div className="M-dividas">
      <Link to="/dashboard">
        <button className="voltar">voltar</button>
      </Link>
      <div className="nova-divida">
        <h3>Criar nova dívida</h3>
        <input
          type="text"
          name="setVdiv"
          onChange={e => setVdiv(e.target.value)}
          placeholder="Valor da dívida:"
        />
        <input
          type="text"
          name="setParc"
          onChange={e => setParc(e.target.value)}
          placeholder="Parcelas:"
        />
        <button onClick={e => handleClick(e)}>Enviar</button>
      </div>
      <ul className="list-dividas">
        {mDividas.map(divida => (
          <li key={divida.id}>
            <strong>Valor: {divida.Vdiv}</strong>{" "}
            <strong>Parcelas: {divida.parc}</strong>
            <button
              title="excluir"
              className="excluir"
              onClick={() => deleteDiv(divida.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
