import React from "react";
import PropTypes from "prop-types";
import Plivo from "plivo-browser-sdk";
import { plivoLogin, plivoCall } from "../../utils/plivo";
import styled from "styled-components";
import PhoneIcon from "../../icons/call";
import SettingsIcon from "../../icons/settings";

const options = {
  debug: "DEBUG",
  permOnClick: true,
  enableTracking: true,
  closeProtection: true,
  maxAverageBitrate: 48000,
};

export const plivo = new Plivo(options);

export default function Phone() {
  const [phone, setPhone] = React.useState("");
  const [calling, setCalling] = React.useState();
  const [callStatus, setCallStatus] = React.useState();
  const [initied, setinitied] = React.useState(false);
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
    console.log(plivo);
  }, []);

  const login = () => {
    plivo.client.login("testSetvi601456389888242960483", "Setvi2020!");
    // plivoLogin("testSetvi601456389888242960483", "Setvi2020!");
  };

  const call = () => {
    plivoCall(phone);
  };

  const hangupCall = () => {
    plivo.client.hangup();
  };

  // plivo event listeners
  plivo.client.on("onLogin", () => {
    console.log("logged in index");
  });
  plivo.client.on("onCalling", () => {
    setCalling(true);
    setCallStatus("Calling");
  });
  return (
    <Container>
      <h2>{callStatus}</h2>
      <Header>
        <SettingsIcon />
      </Header>
      <InputNumber
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Buttons>
        {phone && (
          <CallButton onClick={call}>
            <PhoneIcon />
            Call
          </CallButton>
        )}

        {calling && (
          <DeclineButton onClick={hangupCall}>
            <PhoneIcon />
            End Call
          </DeclineButton>
        )}
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin-left: auto;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
`;

const CallButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2196f3;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  color: #fff;
  font-weight: 600;

  outline: none;
  box-shadow: none;
  border: 0;
  text-decoration: none;
`;

const DeclineButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #d72638;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  color: #fff;
  font-weight: 600;

  outline: none;
  box-shadow: none;
  border: 0;
  text-decoration: none;
`;

const InputNumber = styled.input`
  border: none;
  border-bottom: 2px solid #2196f3;
  padding: 0.5rem 0;
`;

Phone.propTypes = {};
