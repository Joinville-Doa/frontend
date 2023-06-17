import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";

import Donations from "./pages/donations/Donations";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Terms from "./pages/terms/Terms";
import MyProfile from "./pages/myProfile/MyProfile";
import MyDonations from "./pages/myDonations/MyDonations";
import NewDonation from "./pages/newDonation/NewDonation";
import EditDonation from "./pages/editDonation/EditDonation";
import Donation from "./pages/donation/Donation";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Donations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/politicas-de-uso" element={<Terms />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/meu-perfil" element={<MyProfile />} />
          <Route path="/minhas-doacoes" element={<MyDonations />} />
          <Route path="/nova-doacao" element={<NewDonation />} />
          <Route path="/editar-doacao/:id" element={<EditDonation />} />
          <Route path="/doacao/:id" element={<Donation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
