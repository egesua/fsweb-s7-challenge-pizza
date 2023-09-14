import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Anasayfa from "./components/Anasayfa";
import Success from "./components/Success";
import OrderPizza from "./components/OrderPizza";

const App = () => {

  // siparişleri tutmak için useState hhok'u kullanıyorum.

  const [siparisler, setSiparisler] = useState([]);

  // yeni bir sipariş eklemek için fonksiyon tanımlıyorum, mevcut üzerine sipariş eklemek için de setSiparisler kullanalım.

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
          <Route path="/pizza">
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