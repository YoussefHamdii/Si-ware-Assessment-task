import React, { useState } from "react";
import DataObserver from "./dataObserver";

function Home() {
  const [searchField, setSearchField] = useState("");

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
          <h3>Name</h3>
          <h3>Description</h3>
          <h3>Industry Type</h3>
          <h3>Address</h3>
      </div>
        <DataObserver searchField={searchField} />
      </div>
    </div>
  );
}

export default Home;
