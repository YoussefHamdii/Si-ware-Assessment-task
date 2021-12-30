import React from "react";

const CompanyDetails = (props) => {
  return (
    <div className="company-info">
      <p>{props.name}</p>

      <p>{props.description}</p>

      <p>{props.industryType}</p>

      <p>
        {props.address && `${props.address}, `}
        {props.city && `${props.city}, `}
        {props.country && `${props.country}`}
      </p>
    </div>
  );
};

export default CompanyDetails;
