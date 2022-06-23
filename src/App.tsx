import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LyricsChord from "./Pages/LyricsChord";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view" element={< LyricsChord />} />
        {/* <div className="App">
          <HomePage />
        </div> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
