import React from "react";
import "./App.css";

import Header from "./components/header/index";
import Log from "./pages/log/index";

function App() {
  return (
    <div className="app">
      <Header />
      <Log />
    </div>
  );
}

export default App;
