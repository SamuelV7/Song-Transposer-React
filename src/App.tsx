import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SwitchToView from "./Pages/SwitchToView";

export const Context: any = React.createContext("h");

function App() {
  const [context, setContext] = React.useState("default context value");
  return (
    <Context.Provider value={[context, setContext]}>
      {/* <SwitchToView/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="view" element={< SwitchToView />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
