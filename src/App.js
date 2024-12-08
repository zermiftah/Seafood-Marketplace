import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Components/Login/Login";
import MainPage from "./Components/MainPage/MainPage";
import Header from "./Components/Header/Header";
import HeaderSection from "./Components/HeaderSection/HeaderSection";
import Footer from "./Components/Footer/Footer";
import ProductList from "./Components/ProductList/ProductList";
import DetailProduct from "./Components/DetailProduct/DetailProduct";
import CategorySection from "./Components/CategorySection/CategorySection";
import Freezer from "./Components/Freezer/Freezer";
import AdditionalSection from "./Components/AdditionalSection/AdditionalSection";
import ReviewsSection from "./Components/DetailProduct/ReviewsSection";
import ContactUs from "./Components/ContactUs/ContactUs";
import Carousel from "./Components/Carousel/Carousel";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/MainPage" element={
          <>
            <Header />
            <HeaderSection />
            <CategorySection />
            <MainPage />
            <AdditionalSection />
            <Footer />
          </>
        } />
        <Route exact path="/ProductList" element={
          <>
            <Header />
            <ProductList />
            <Footer />
          </>
        } />
        <Route exact path="/DetailProduct" element={
          <>
            <Header />
            <DetailProduct />
            <ReviewsSection />
            <Footer />
          </>
        } />
        <Route exact path="/Freezer" element={
          <>
            <Header />
            <Freezer />
            <AdditionalSection />
            <Footer />
          </>
        } />
        <Route exact path="/ContactUs" element={
          <>
            <Header />
            <ContactUs />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
