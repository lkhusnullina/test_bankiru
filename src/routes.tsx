import React from "react";
import {  Routes, Route } from "react-router-dom";
import FilterProducts from "./components/FilterProducts";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FilterProducts />} />
    </Routes>
  );
};