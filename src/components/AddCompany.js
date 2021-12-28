import React, { useState } from "react";

function AddCompany(props) {
  const [companyDetails, setCompanyDetails] = useState({});

  const handleSubmit = (e) => {
      e.preventDefault();
      props.addCompanies(companyDetails)
      console.log("submitted");
  }

  return (
    <div className="form-container">
      <div className="form-background">
        <span className="form-background-text">
          ADD A COMPANY TO THE SYSTEM
        </span>
      </div>
      <form>
        <div className="group1">
          <label for="fname">Company Name</label>
          <input
            type="text"
            placeholder="name"
            value={companyDetails.name}
            onChange={(event) =>
              setCompanyDetails({ ...companyDetails, name: event.target.value })
            }
          />
          <label for="fname">Description</label>
          <input
            type="text"
            placeholder="description"
            value={companyDetails.description}
            onChange={(event) =>
              setCompanyDetails({
                ...companyDetails,
                description: event.target.value,
              })
            }
          />
        </div>

        <div>
          <label for="fname">Industry Type</label>
          <input
            list="industry-type"
            placeholder="Industry Type"
            value={companyDetails.industryType}
            onChange={(event) =>
              setCompanyDetails({
                ...companyDetails,
                industryType: event.target.value,
              })
            }
          />
          <datalist id="industry-type">
            <option>Russia</option>
            <option>Germany</option>
            <option>United Kingdom</option>
          </datalist>
          <label for="fname">Address</label>
          <input
            type="text"
            placeholder="address"
            value={companyDetails.address}
            onChange={(event) =>
              setCompanyDetails({
                ...companyDetails,
                address: event.target.value,
              })
            }
          />
        </div>

        <div>
        <label for="fname">Country</label>
          <input
            list="country"
            placeholder="Country"
            value={companyDetails.country}
            onChange={(event) =>
              setCompanyDetails({
                ...companyDetails,
                country: event.target.value,
              })
            }
          />
          <datalist id="country">
            <option>Russia</option>
            <option>Germany</option>
            <option>United Kingdom</option>
          </datalist>
          
          <label for="fname">City</label>
          <input
            list="city"
            placeholder="City"
            value={companyDetails.city}
            onChange={(event) =>
              setCompanyDetails({
                ...companyDetails,
                city: event.target.value,
              })
            }
          />
          <datalist id="city">
            <option>Russia</option>
            <option>Germany</option>
            <option>United Kingdom</option>
          </datalist>
        </div>
        <button className="add-company-button" onClick={(e) => handleSubmit(e)}>ADD COMPANY</button>
      </form>
    </div>
  );
}

export default AddCompany;
