import React from "react";

function CompanyRow(props) {

  return (
    <div className="company-container">
      <div className="company-info">
        <h2>{props.companyInfo.name}</h2>
        <p>{props.companyInfo.description}</p>
        <p>{props.companyInfo.industryType}</p>
        <p>{`${props.companyInfo.address}, ${props.companyInfo.city}, ${props.companyInfo.country}`}</p>
      </div>
      <div className="company-buttons">
        
        <button className="edit-button">
          <img src="./edit.png" alt="edit-icon" className="button-icon" />
        </button>

        <button className="delete-button" onClick={() => props.adjustComapniesHandler(props.companyInfo.name)}>
          <img src="./delete.png" alt="delete-icon" className="button-icon" />
        </button>

      </div>
    </div>
  );
}

export default CompanyRow;
