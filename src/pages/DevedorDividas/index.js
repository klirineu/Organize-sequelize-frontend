import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./style.css";

export default function DevedorDividas() {
  const [dividas, setDividas] = useState([]);

  const [Vdiv, setVdiv] = useState([]);
  const [parc, setParc] = useState([]);
  const [newVdiv, setnewVdiv] = useState([]);
  const [newParc, setnewParc] = useState([]);
  const [name, setName] = useState([]);

  const token = localStorage.getItem("token");
  const Auth = `Bearer ${token}`;
  const dev = localStorage.getItem("dev");

  useEffect(() => {
    async function listDividas() {
      await api
        .get(`/devedores/${dev}/devedor_dividas`, {
          headers: { Authorization: Auth }
        })
        .then(res => {
          setName(res.data.name);
          setDividas(res.data.devedor_dividas);
        });
    }
    listDividas();
  }, [Auth, dev]);

  function registerSocket() {
    const socket = io("http://localhost:3333");

    socket.on("DevedorDividas", newDivida => {
      setDividas([...dividas, newDivida]);
    });

    socket.on("counterDevedorParcelas", counterDevedor => {
      setDividas(
        dividas.map(divida =>
          divida.id === counterDevedor.id ? counterDevedor : divida
        )
      );
    });
  }

  registerSocket();
  function handleClick() {
    if (Vdiv === 0 || parc === 0) {
      return alert("Preencha os campos");
    }

    api
      .post(
        `/devedores/${dev}/devedor_dividas`,
        { Vdiv, parc },
        { headers: { Authorization: Auth } }
      )
      .catch(err => {
        alert("Não foi possível criar nova dívida");
      });
  }

  function editarDiv(id) {
    const Vdiv = newVdiv;
    const parc = newParc;

    if (Vdiv === "" || parc === "") {
      alert("Preencha os campos");
    }

    api.put(
      `/devedores/${dev}/devedor_dividas/${id}`,
      { Vdiv, parc },
      { headers: { Authorization: Auth } }
    );
  }

  function deleteDiv(id) {
    api.delete(`/devedores/${dev}/devedor_dividas/${id}`, {
      headers: { Authorization: Auth }
    });
  }

  function handleCounter(id) {
    api.post(
      `/devedores/${dev}/counter/${id}`,
      {},
      { headers: { Authorization: Auth } }
    );
  }

  function openModal(id) {
    document.getElementById(id).style.display = "block";
  }

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }

  return (
    <div className="M-dev_dividas">
      <Link to="/meus-devedores">
        <button
          className="voltar"
          onClick={() => localStorage.removeItem("dev")}
        >
          voltar
        </button>
      </Link>
      <div className="nova-divida">
        <h3>Criar nova dívida para {name}</h3>
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
      <ul className="list-dev_dividas">
        {dividas.map(divida => (
          <li key={divida.id}>
            <strong>Valor: {divida.Vdiv}</strong>{" "}
            <strong>
              Parcelas: {divida.parc}/{divida.counter}
            </strong>
            <button
              className="editar"
              type="button"
              onClick={() => handleCounter(divida.id)}
            >
              Pagar
            </button>
            <button className="editar" onClick={() => openModal(divida.id)}>
              Editar
            </button>
            <div id={divida.id} key={divida.id} className="modal1">
              <div className="modal-content1">
                <button
                  className="close1"
                  onClick={() => closeModal(divida.id)}
                >
                  X
                </button>

                <h2>Editar/excluir</h2>
                <input
                  type="text"
                  name="newVdiv"
                  onChange={e => setnewVdiv(e.target.value)}
                  placeholder="Valor"
                />
                <input
                  type="text"
                  name="newParc"
                  onChange={e => setnewParc(e.target.value)}
                  placeholder="Parcelas"
                />
                <button
                  className="excluir"
                  onClick={() => deleteDiv(divida.id)}
                >
                  Excluir
                </button>
                <button
                  className="cadastrar1"
                  onClick={() => editarDiv(divida.id)}
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
