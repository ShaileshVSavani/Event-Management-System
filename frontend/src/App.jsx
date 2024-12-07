
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/pages/Home";
import EventPage from "./components/Event/EventPage";
import EventForm from "./components/Event/EventForm";
import Profile from "./components/pages/Profile";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Use PrivateRoute and pass the component inside `element` */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/event" element={<PrivateRoute element={<EventPage />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/create-event" element={<PrivateRoute element={<EventForm />} />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
