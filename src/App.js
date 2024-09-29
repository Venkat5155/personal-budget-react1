import React from 'react';
import './App.scss';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import AboutPage from './AboutPage/AboutPage';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import Menu from './Menu/Menu';



function App() {
  return (
    <Router>
    <Menu />
    <Hero />
    <div className="mainContainer">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>

    <Footer />
  </Router>
  );
}

export default App;
