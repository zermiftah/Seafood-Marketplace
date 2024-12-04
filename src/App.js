import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Components/Login/Login";
import MainPage from "./Components/MainPage/MainPage";
import Header from "./Components/Header/Header";
import HeaderSection from "./Components/HeaderSection/HeaderSection";
import Footer from "./Components/Footer/Footer";
import ProductList from "./Components/ProductList/ProductList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <>
            <Login />
          </>} />
        <Route exact path="/MainPage" element={
          <>
            <Header />
            <HeaderSection />
            <MainPage />
            <Footer />
          </>} />
        <Route exact path="/ProductList" element={
          <>
            <Header />
            <ProductList />
            <Footer />
          </>} />
      </Routes>
    </Router>
  );
}

export default App;
