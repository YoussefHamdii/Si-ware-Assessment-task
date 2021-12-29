import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../idbModels/indexedDb";

function CompanyRow(props) {
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
      <div className="company-info">
        <h2>{props.companyInfo.name}</h2>
        <p>{props.companyInfo.description}</p>
        <p>{props.companyInfo.industryType}</p>
        <p>{`${props.companyInfo.address}, ${props.companyInfo.city}, ${props.companyInfo.country}`}</p>
      </div>
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
}

export default CompanyRow;
