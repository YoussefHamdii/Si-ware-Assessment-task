import React from "react";
import { useNavigate } from 'react-router-dom';

function CompanyRow(props) {

  const navigate = useNavigate();

  return (
    <div className="company-container">
      <div className="company-info">
        <h2>{props.companyInfo.name}</h2>
        <p>{props.companyInfo.description}</p>
        <p>{props.companyInfo.industryType}</p>
        <p>{`${props.companyInfo.address}, ${props.companyInfo.city}, ${props.companyInfo.country}`}</p>
      </div>
      <div className="company-buttons">
        
        <button className="edit-button" onClick={() => navigate(`/company/edit/${props.companyInfo.name}`)}>
          Edit
        </button>

        <button className="delete-button" onClick={() => props.adjustComapniesHandler(props.companyInfo.name)}>
          Delete
        </button>

      </div>
    </div>
  );
}

export default CompanyRow;
