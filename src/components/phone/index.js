import React from "react";
import PropTypes from "prop-types";
import { plivoLogin, plivoCall } from "../../utils/plivo";

export default function Phone() {
  const [phone, setPhone] = React.useState("");
  const login = () => {
    plivoLogin("testSetvi601456389888242960483", "Setvi2020!");
  };

  const call = () => {
    plivoCall(phone);
  };
  return (
    <>
      <h2>Plivo Test</h2>

      <input type="text" onChange={(e) => setPhone(e.target.value)} />
      <button onClick={login}>Login</button>
      <button onClick={call}>Call?</button>
    </>
  );
}

Phone.propTypes = {};
