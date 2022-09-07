import { render } from "@testing-library/react";
import React from "react";

function Principal(props) {
  render(
    <div>
      <p>Bienvenido: {props.nombre}</p>
      <p>Edad: {props.edad} años</p>
      <p>Altura: {props.altura} m.</p>
      <p>Peso: {props.peso} lb.</p>
    </div>
  );
}

export default Principal;
