import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { db } from "../idbModels/indexedDb";

function EditCompany() {
  
  const [companyDetails, setCompanyDetails] = useState({});
  const [industryTypes, setIndustryTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCities, setCountryCities] = useState([]);
  const [errors, setErrors] = useState({});

  const { companyName } = useParams();
  const navigate = useNavigate();

  const initialiseData = async () => {
    try {
      const countriesData = await db.countries.get(1);
      const citiesData = await db.cities.get(1);
      const industryTypesData = await db.industryType.get(1);
      const companyDetailsData = await db.companies.get(companyName);

      setCountries(countriesData);
      setCities(citiesData);
      setIndustryTypes(industryTypesData);
      setCompanyDetails(companyDetailsData);
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
      city: "",
    };
    setCompanyDetails(newCompanyObj);

    if (chosenCountry !== null) {
      let chosenCities = cities[chosenCountry];
      setCountryCities(chosenCities);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = { mandatoryFieldsError: "" };

    if (
      companyDetails.description === "" ||
      companyDetails.country === null ||
      companyDetails.city === null ||
      companyDetails.industryType === ""
    ) {
      errors = { ...errors, mandatoryFieldsError: "Please fill in all fields" };
      setErrors(errors);
    }

    try {
      if (errors.mandatoryFieldsError === "") {
        await db.companies.update(companyName, { ...companyDetails });
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-container-edit">
      {console.log(companyDetails)}
      <div className="form-background-edit">
        <span className="form-background-text">
          EDIT A COMPANY IN THE SYSTEM
        </span>
      </div>
      <form className="form-edit">
        <div>
          <label for="name">Company Name</label>
          <input
            disabled
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
            value={
              companyDetails.industryType ? companyDetails.industryType : ""
            }
            options={industryTypes && industryTypes}
            className="dropdown"
            onChange={(event, newvalue) =>
              setCompanyDetails({
                ...companyDetails,
                industryType: newvalue,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="industry type"
                size="small"
                value={companyDetails.industryType}
              />
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
            value={companyDetails.country ? companyDetails.country : ""}
            options={countries && countries}
            className="dropdown"
            onChange={(event, newvalue) => handleCountryChange(newvalue)}
            renderInput={(params) => (
              <TextField {...params} placeholder="country" size="small" />
            )}
          />

          <label for="city">City</label>
          <Autocomplete
            value={companyDetails.city ? companyDetails.city : ""}
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
        <div className="error-message">{errors.mandatoryFieldsError}</div>
        <button className="add-company-button" onClick={(e) => handleSubmit(e)}>
          SAVE
        </button>
      </form>
    </div>
  );
}

export default EditCompany;
