import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Donations from "./pages/donations/Donations";
import Login from "./pages/login/Login";
import Terms from "./pages/terms/Terms";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Donations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/termos-de-uso" element={<Terms />} />
      </Routes>
    </Router>
  )
};

export default App;