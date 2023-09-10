import React from "react";
import logo from "./logo.svg"

export default function Anasayfa() {
  return (
    <div className="anasayfa">
      <div className="topDiv">
        <div className="description">
          <img src={logo} alt=""/>
          <p className="slogan">KOD ACIKTIRIR</p>
          <p className="slogan">PIZZA, DOYURUR</p>
          <div className="mt">
            <a
              className="order-button"
              type="button"
              href="/order-pizza"
            >
              ACIKTIM
            </a>
          </div>
        </div>
      </div>
      </div>
  )}