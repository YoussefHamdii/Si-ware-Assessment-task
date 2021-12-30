import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../idbModels/indexedDb";
import InputGroup from "./InputGroup";

const AddCompany = () => {
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

    if (
      !(
        companyDetails.name &&
        companyDetails.description &&
        companyDetails.country &&
        companyDetails.city &&
        companyDetails.industryType &&
        companyDetails.address
      )
    ) {
      errors = { ...errors, mandatoryFieldsError: "Please fill in all fields" };
    }

    if (companyExist) {
      if (companyExist.isActive === 0) {
        await db.companies.update(companyExist.name, { isActive: 1 });
        navigate("/");
      } else {
        errors = { ...errors, addingError: "Company already exists" };
      }
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
        <InputGroup
          labelName={"Company Name"}
          inputType={"text"}
          inputName={"name"}
          placeholder={"Enter name"}
          disabled={false}
          inputValue={companyDetails.name}
          stateSetter={setCompanyDetails}
          state={companyDetails}
        />
        <div className="error-message">{errors.addingError}</div>
        <InputGroup
          labelName={"Description"}
          inputType={"text"}
          inputName={"description"}
          placeholder={"Description"}
          disabled={false}
          inputValue={companyDetails.description}
          stateSetter={setCompanyDetails}
          state={companyDetails}
        />

        <InputGroup
          labelName={"Industry Type"}
          inputType={"autoComplete"}
          inputName={"industryType"}
          placeholder={"industry type"}
          options={industryTypes}
          disabled={false}
          inputValue={
            companyDetails.industryType ? companyDetails.industryType : ""
          }
          stateSetter={setCompanyDetails}
          state={companyDetails}
        />

        <InputGroup
          labelName={"Address"}
          inputType={"text"}
          inputName={"address"}
          placeholder={"address"}
          disabled={false}
          inputValue={companyDetails.address}
          stateSetter={setCompanyDetails}
          state={companyDetails}
        />

        <InputGroup
          labelName={"Country"}
          inputType={"autoComplete"}
          inputName={"country"}
          placeholder={"country"}
          disabled={false}
          options={countries}
          inputValue={companyDetails.country ? companyDetails.country : ""}
          stateSetter={handleCountryChange}
          state={companyDetails}
        />

        <InputGroup
          labelName={"City"}
          inputType={"autoComplete"}
          inputName={"city"}
          placeholder={"city"}
          options={countryCities && countryCities}
          disabled={false}
          inputValue={companyDetails.city ? companyDetails.city : ""}
          stateSetter={setCompanyDetails}
          state={companyDetails}
        />

        <div className="error-message">{errors.mandatoryFieldsError}</div>

        <button className="add-company-button" onClick={(e) => handleSubmit(e)}>
          ADD COMPANY
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
