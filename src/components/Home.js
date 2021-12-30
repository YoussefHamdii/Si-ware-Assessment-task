import React, { useState } from "react";
import CompanyHeaders from "./CompanyHeaders";
import DataObserver from "./dataObserver";

const Home = () => {
  const [searchField, setSearchField] = useState("");
  const companyHeadersData = [
    "Name",
    "Description",
    "Industry Type",
    "Address",
  ];

  return (
    <div className="home-container">
      <div className="home-backgroung"></div>

      <div className="home-companies">
        <div className="search-group">
          <label for="Search">Search: </label>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
        </div>
        <div className="company-info-headers">
          <CompanyHeaders headers={companyHeadersData} />
        </div>
        <DataObserver searchField={searchField} />
      </div>
    </div>
  );
};

export default Home;
