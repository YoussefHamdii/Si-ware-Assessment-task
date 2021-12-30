import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../idbModels/indexedDb";
import InputGroup from "./InputGroup";

const EditCompany = () => {
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
      !(
        companyDetails.description === "" &&
        companyDetails.country === null &&
        companyDetails.city === null &&
        companyDetails.industryType === "" &&
        companyDetails.address === ""
      )
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
      <div className="form-background-edit">
        <span className="form-background-text">
          EDIT A COMPANY IN THE SYSTEM
        </span>
      </div>
      <form className="form-edit">
        <InputGroup
          labelName={"Company Name"}
          inputType={"text"}
          inputName={"name"}
          placeholder={"Enter name"}
          disabled={true}
          inputValue={companyDetails.name}
          stateSetter={setCompanyDetails}
          state={companyDetails}
        />

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
          SAVE
        </button>
      </form>
    </div>
  );
};

export default EditCompany;
