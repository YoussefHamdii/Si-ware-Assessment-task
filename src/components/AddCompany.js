import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { db } from "../idbModels/indexedDb";

function AddCompany() {
  
  const [companyDetails, setCompanyDetails] = useState({});
  const [industryTypes, setIndustryTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCities, setCountryCities] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const initialiseData = async () => {
    try {
      const countriesData = await db.countries.get(1);
      const citiesData = await db.cities.get(1);
      const industryTypesData = await db.industryType.get(1);

      setCountries(countriesData);
      setCities(citiesData);
      setIndustryTypes(industryTypesData);
    } catch (e) {
      console.log(e);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyToAdd = { ...companyDetails, isActive: 1 };
    const companyExist = await db.companies.get(companyToAdd.name);

    let errors = { addingError: "", mandatoryFieldsError: "" };

    if (Object.keys(companyToAdd).length < 7) {
      errors = { ...errors, mandatoryFieldsError: "Please fill in all fields" };
    }

    if (companyExist) {
      errors = {
        ...errors,
        addingError: "Name already exist, please enter a unique name.",
      };
    }

    setErrors(errors);

    try {
      if (errors.addingError === "" && errors.mandatoryFieldsError === "") {
        await db.companies.add({
          ...companyToAdd,
        });
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-container">
      <div className="form-background">
        <span className="form-background-text">
          ADD A COMPANY TO THE SYSTEM
        </span>
      </div>
      <form>
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

          <div className="error-message">{errors.addingError}</div>

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
            disablePortal
            options={industryTypes}
            className="dropdown"
            onChange={(event, newvalue) =>
              setCompanyDetails({
                ...companyDetails,
                industryType: newvalue,
              })
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="industry type" size="small" />
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
            disablePortal
            options={countries}
            className="dropdown"
            onChange={(event, newvalue) => handleCountryChange(newvalue)}
            renderInput={(params) => (
              <TextField {...params} placeholder="country" size="small" />
            )}
          />

          <label for="city">City</label>
          <Autocomplete
            disablePortal
            options={countryCities}
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

        <div className="error-message">{errors.mandatoryFieldsError}</div>

        <button className="add-company-button" onClick={(e) => handleSubmit(e)}>
          ADD COMPANY
        </button>
      </form>
    </div>
  );
}

export default AddCompany;
