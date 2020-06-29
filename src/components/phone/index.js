import React from "react";
import PropTypes from "prop-types";
import { plivoLogin, plivoCall } from "../../utils/plivo";

function getPhoneNum(evt) {}

export default function Phone() {
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    window.addEventListener(
      "message",
      (evt) => {
        console.log(evt);
        if (
          evt.origin !== "https://setvidashboardtest-dev-ed.lightning.force.com"
        ) {
          // Not the expected origin: Reject the message!
          return;
        }
        // Handle the message
        console.log(evt.data);
        setPhone(evt.data);
      },
      false
    );
  }, [phone]);

  React.useEffect(() => {
    login();
  }, []);

  const login = () => {
    plivoLogin("testSetvi601456389888242960483", "Setvi2020!");
  };

  const call = () => {
    plivoCall(phone);
  };
  return (
    <>
      <h2>Plivo Test</h2>

      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <button onClick={call}>Call?</button>
    </>
  );
}

Phone.propTypes = {};
