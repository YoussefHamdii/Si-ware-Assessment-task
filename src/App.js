import React, { useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AddCompany from './components/AddCompany';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const companiesData = require("./json mockups/companies.json");
    setCompanies(companiesData.data);
  }, []);

  const deleteCompany = (name) => {
    const newCompanies = companies.map((company) =>
      company.name === name ? (company.isActive = false) : company
    );
    setCompanies(newCompanies);
  };

  const addCompanies = (company) => {
    company.isActive = true;
    const newCompanies = [...companies, company];
    setCompanies(newCompanies);
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home companies={companies} deleteCompany={deleteCompany}/>} />
          <Route path="/company/add" element={<AddCompany addCompanies={addCompanies}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

