import React, { useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AddCompany from './components/AddCompany';
import EditCompany from './components/EditCompany';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { db } from './idbModels/indexedDb';

function App() {

  const [companies, setCompanies] = useState([]);

  
  const getCompaniesData = async () =>{
    const companiesData = await db.companies.toArray();
    setCompanies(companiesData);
  }

  useEffect(() => {
    getCompaniesData();
  }, []);

  const deleteCompany = (name) => {
    const newCompanies = companies.map((company) =>
      company.name === name ? (company.isActive = false) : company
    );
    setCompanies(newCompanies);
  };


  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home companies={companies} deleteCompany={deleteCompany}/>} />
          <Route path="/company/edit/:companyName" element={<EditCompany companies={companies}/>} />
          <Route path="/company/add" element={<AddCompany/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

