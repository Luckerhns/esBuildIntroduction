import React, { useState } from "react";
import "./index.css";
// @ts-ignore
import Logo from "./logo.png";

const App = () => {
  const [state, setState] = useState<number>(0);

  const onBtnClick = () => {};

  return (
    <div>
      {state}
      <br />
      Hello world
      <br />
      <img src={Logo} alt="" />
      <button onClick={(e) => setState(state + 1)}>Increase</button>
      <button onClick={onBtnClick}>Decrease</button>
    </div>
  );
};

export default App;
