import React from "react";

const CompanyHeaders = (props) => {
  return props.headers.map((header, index) => <h3 key={index}>{header}</h3>);
};

export default CompanyHeaders;
