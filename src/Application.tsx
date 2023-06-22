import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
interface ApplicationProps {}

const Application: React.FunctionComponent<ApplicationProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
