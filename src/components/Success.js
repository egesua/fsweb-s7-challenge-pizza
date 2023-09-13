import React from "react";
import ReactLogo from "./logo.svg";

export default function Success() {
  return (
    <div className="success">
      <div className="header-success">
        <img src={ReactLogo}></img>
      </div>
      <p>TEBRİKLER!</p>
      <h1>SİPARİŞİNİZ ALINDI!</h1>
    </div>
  );
}