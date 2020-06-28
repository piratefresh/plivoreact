import Plivo from "plivo-browser-sdk";

const options = {
  debug: "DEBUG",
  permOnClick: true,
  enableTracking: true,
  closeProtection: true,
  maxAverageBitrate: 48000,
};

export const plivo = new Plivo(options);

export const plivoLogin = (username, password) => {
  console.log(username, password);

  plivo.client.login(username, password);
};

export const plivoCall = (to) => {
  const extraHeaders = {
    "X-PH-Test1": "test1",
    "X-PH-callerId": "17737330948",
  };
  plivo.client.call(to, extraHeaders);
};

// plivo event listeners
plivo.client.on("onLogin", () => {
  console.log("logged in");
});

plivo.client.on("onLoginFailed", (err) => {
  console.log("login failed", err);
});

plivo.client.on("onCalling", () => {
  console.log("calling");
});
