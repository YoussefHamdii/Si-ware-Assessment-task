import React from "react";
import CompanyRow from "./CompanyRow";

function Home(props) {
  

  return (
    <div className="home-container">
      <div className="home-backgroung">
      <label for="Search">Search: </label>
        <input type="text" placeholder="Search" />
      </div>

      <div className="home-companies">
        {props.companies.map((company, index) =>
          company.isActive === true ? (
            <CompanyRow
              key={index}
              companyInfo={company}
              adjustComapniesHandler={props.deleteCompany}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Home;
