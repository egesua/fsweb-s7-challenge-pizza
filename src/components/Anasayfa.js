import React from "react";
import ReactLogo from "./logo.svg";

export default function Anasayfa() {
  return (
    <div className="anasayfa">
      <div className="topDiv">
        <div className="description">
          <img src={ReactLogo} alt="a" />
          <p className="slogan">KOD ACIKTIRIR</p>
          <p className="slogan">PIZZA, DOYURUR</p>
          <div className="mt">
            <a className="order-button" type="button" href="/pizza">
              ACIKTIM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
