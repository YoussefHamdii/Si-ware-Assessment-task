import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AddCompany from "./components/AddCompany";
import EditCompany from "./components/EditCompany";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/company/edit/:companyName"
            element={<EditCompany />}
          />
          <Route path="/company/add" element={<AddCompany />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
