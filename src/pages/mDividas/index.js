import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import api from "../../services/api";

import "./style.css";

export default function MinhasDividas(props) {
  const [mDividas, setmDividas] = useState([]);
  const [Vdiv, setVdiv] = useState(0);
  const [parc, setParc] = useState(0);
  const [newVdiv, setnewVdiv] = useState([]);
  const [newParc, setnewParc] = useState([]);

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
  }, [Auth]);

  function registerSocket() {
    const socket = io("http://localhost:3333");

    socket.on("UserDividas", newDivida => {
      setmDividas([...mDividas, newDivida]);
    });

    socket.on("counterUserParcelas", counterDevedor => {
      setmDividas(
        mDividas.map(divida =>
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
        `/users/user_dividas`,
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
      `/users/user_dividas/${id}`,
      { Vdiv, parc },
      { headers: { Authorization: Auth } }
    );
  }

  function deleteDiv(id) {
    api.delete(`/users/user_dividas/${id}`, {
      headers: { Authorization: Auth }
    });
    props.history.push("minhas-dividas");
  }

  function handleCounter(id) {
    api.post(
      `/users/user_dividas/counter/${id}`,
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
        <button onClick={handleClick}>Enviar</button>
      </div>
      <ul className="list-dividas">
        {mDividas.map(divida => (
          <li key={divida.id}>
            <strong>Valor: {divida.Vdiv}</strong>{" "}
            <strong>
              Parcelas: {divida.parc}/{divida.counter}
            </strong>
            <button className="editar" onClick={() => handleCounter(divida.id)}>
              Pagar
            </button>
            <button className="editar" onClick={() => openModal(divida.id)}>
              Editar
            </button>
            <div id={divida.id} key={divida.id} className="modal2">
              <div className="modal-content2">
                <button
                  className="close2"
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
                  className="cadastrar2"
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
