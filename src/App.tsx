import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UploadFiles from "./Pages/UploadFiles";
import SwitchToView from "./Pages/SwitchToView";
import ListOfSongs from "./Pages/ListOfSongs";

export const Context: any = React.createContext("h");

function App() {
  const [context, setContext] = React.useState("default context value");
  return (
    <Context.Provider value={[context, setContext]}>
      <Routes>
        <Route path="/" element={<ListOfSongs />} />
        <Route path="/uploadFiles" element={<UploadFiles/>} />
        <Route path="view" element={< SwitchToView />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
