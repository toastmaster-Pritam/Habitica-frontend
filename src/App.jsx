import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Context, URL } from "./main";
import { toast } from "react-hot-toast";
import axios from "axios";

const App = () => {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.myProfile);
        setIsAuthenticated(true);
        setLoading(false);
      })

      .catch((error) => {
        // toast.error(error.response.data.message);
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
