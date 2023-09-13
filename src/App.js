import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Anasayfa from "./components/Anasayfa";
import Success from "./components/Success";
import OrderPizza from "./components/OrderPizza";
import ReactLogo from "./logo.svg";

const App = () => {
  const [siparisler, setSiparisler] = useState([]);

  const handleSiparisEkle = (siparis) => {
    setSiparisler([...siparisler, siparis]);
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Anasayfa />
          </Route>
          <Route path="/order-pizza">
            <OrderPizza addSiparis={handleSiparisEkle} />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default App;