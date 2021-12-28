import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function EditCompany(props) {
  const [companyDetails, setCompanyDetails] = useState({});
  const [industryTypes, setIndustryTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCities, setCountryCities] = useState([]);
  let {companyName} = useParams();

  const initialiseData = () =>{
    const countriesData = require("../json mockups/countries.json");
    const citiesData = require("../json mockups/cities.json");
    const industryTypesData = require("../json mockups/industryTypes.json");
    const companyDetailsData = props.companies.find(selectedCompany => selectedCompany.name === companyName);
    
    setCountries(countriesData.data);
    setCities(citiesData.data);
    setIndustryTypes(industryTypesData.data);
    setCompanyDetails(companyDetailsData && companyDetailsData);
  }

  useEffect(() => {
    initialiseData();
  }, []);

  const handleCountryChange = (chosenCountry) => {
    const newCompanyObj = {
      ...companyDetails,
      country: chosenCountry,
    };
    setCompanyDetails(newCompanyObj);

    let chosenCities = cities[chosenCountry];
    setCountryCities(chosenCities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addCompanies(companyDetails);
    console.log("submitted");
  };

  return (
    <div className="form-container-edit">
      <div className="form-background-edit">
        <span className="form-background-text">
          EDIT A COMPANY IN THE SYSTEM
        </span>
      </div>
      <form className="form-edit">
        <div>
          <label for="name">Company Name</label>
          <input
            type="text"
            placeholder="name"
            className="input-field"
            value={companyDetails.name}
            onChange={(event) =>
              setCompanyDetails({ ...companyDetails, name: event.target.value })
            }
          />
          <label for="description">Description</label>
          <input
            type="text"
            placeholder="description"
            className="input-field"
            value={companyDetails.description}
            onChange={(event) =>
              setCompanyDetails({
                ...companyDetails,
                description: event.target.value,
              })
            }
          />
        </div>

        <div>
          <label for="industryType">Industry Type</label>
          <Autocomplete
            value={companyDetails.industryType ? companyDetails.industryType:''}
            options={industryTypes && industryTypes}
            className="dropdown"
            onChange={(event, newvalue) =>
              setCompanyDetails({
                ...companyDetails,
                industryType: newvalue,
              })
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="industry type" size="small" value={companyDetails.industryType} />
            )}
          />
          <label for="address">Address</label>
          <input
            type="text"
            placeholder="address"
            className="input-field"
            value={companyDetails.address}
            onChange={(event) =>
              setCompanyDetails({
                ...companyDetails,
                address: event.target.value,
              })
            }
          />
        </div>

        <div>
          <label for="country">Country</label>
          <Autocomplete
            value={companyDetails.country?companyDetails.country:''}
            options={countries&&countries}
            className="dropdown"
            onChange={(event, newvalue) => handleCountryChange(newvalue)}
            renderInput={(params) => (
              <TextField {...params} placeholder="country" size="small"/>
            )}
          />

          <label for="city">City</label>
          <Autocomplete
            value={companyDetails.city?companyDetails.city:''}
            options={countryCities && countryCities}
            className="dropdown"
            onChange={(event, newvalue) =>
              setCompanyDetails({
                ...companyDetails,
                city: newvalue,
              })
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="city" size="small" />
            )}
          />
        </div>
        <button className="add-company-button" onClick={(e) => handleSubmit(e)}>
          SAVE
        </button>
      </form>
    </div>
  );
}

export default EditCompany;
