import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./auth/index";

import Log from "./pages/log/index";
import Dashboard from "./pages/dashboard/index";
import MinhasDividas from "./pages/mDividas/index";
import MeusDevedores from "./pages/mDevedores/index";
import DevedorDividas from "./pages/DevedorDividas";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Log} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/minhas-dividas" component={MinhasDividas} />
      <PrivateRoute path="/meus-devedores" component={MeusDevedores} />
      <PrivateRoute path="/devedor-dividas" component={DevedorDividas} />
    </Switch>
  );
}
