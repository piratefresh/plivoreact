import React from "react";

export default function Settings({ plivo, permission }) {
  const [devices, setDevices] = React.useState({
    mic: "",
    ringtone: "",
    speaker: "",
  });
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  React.useEffect(() => {
    console.log(plivo.client);
    setDevices({
      mic: plivo.client.audio.microphoneDevices.get(),
      ringtone: plivo.client.audio.ringtoneDevices.get(),
      speaker: plivo.client.audio.speakerDevices.get(),
    });
  }, [
    plivo,
    plivo.client.audio.microphoneDevices,
    plivo.client.audio.ringtoneDevices,
    plivo.client.audio.speakerDevices,
  ]);

  const handleLogin = () => {
    plivo.client.login(user.email, user.password);
    // plivoLogin("testSetvi601456389888242960483", "Setvi2020!");
  };
  return (
    <>
      <h2 className="text-base text-gray-700 leading-normal">Settings</h2>
      <div class="rounded-md shadow-sm">
        User Logged In:{" "}
        {plivo && plivo.client.isLoggedIn ? plivo.client.userName : "False"}
        Media Permission: {permission ? "Granted" : "Not Granted"}
        <div>
          <input
            aria-label="Email address"
            name="email"
            type="email"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Plivo User"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div class="-mt-px">
          <input
            aria-label="Password"
            name="password"
            type="password"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>{devices.mic}</div>
      <div>{devices.speaker}</div>
    </>
  );
}
