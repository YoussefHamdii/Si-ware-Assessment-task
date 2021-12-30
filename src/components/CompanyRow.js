import React from "react";
import CompanyDetails from "./CompanyDetails";
import { useNavigate } from "react-router-dom";
import { db } from "../idbModels/indexedDb";

const CompanyRow = (props) => {
  const navigate = useNavigate();

  const deleteButtonHandler = async () => {
    try {
      await db.companies.update(props.companyInfo.name, { isActive: 0 });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="company-container">
      <CompanyDetails
        name={props.companyInfo.name}
        description={props.companyInfo.description}
        industryType={props.companyInfo.industryType}
        address={props.companyInfo.address}
        city={props.companyInfo.city}
        country={props.companyInfo.country}
      />
      <div className="company-buttons">
        <button
          className="edit-button"
          onClick={() => navigate(`/company/edit/${props.companyInfo.name}`)}
        >
          Edit
        </button>

        <button className="delete-button" onClick={() => deleteButtonHandler()}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CompanyRow;
