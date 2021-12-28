import React, { useState } from "react";
import CompanyRow from "./CompanyRow";

function Home(props) {
  const [searchField, setSearchField] = useState("");

  const displayCompanies = () => {
    return(
      props.companies.map((company, index) =>
        company.isActive === true && company.name.includes(searchField) ? (
          <CompanyRow
            key={index}
            companyInfo={company}
            adjustComapniesHandler={props.deleteCompany}
          />
        ) : null
      )
    );
  }

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
        {displayCompanies()}
      </div>
    </div>
  );
}

export default Home;
