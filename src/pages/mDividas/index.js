import React from "react";

import "./style.css";

export default function MinhasDividas() {
  return (
    <div className="M-dividas">
      <div className="nova-divida">
        <h3>Criar nova dívida</h3>
        <input type="text" placeholder="Valor da dívida:" />
        <input type="text" placeholder="Parcelas:" />
        <button>Enviar</button>
      </div>
      <ul className="list-dividas">
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
        <li>aaaaaaaaaa</li>
      </ul>
    </div>
  );
}
