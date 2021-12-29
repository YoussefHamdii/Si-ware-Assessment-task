import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import CompanyRow from "./CompanyRow";
import { db } from "../idbModels/indexedDb";

export default function DataObserver(props) {

    const companiesData = useLiveQuery(
        () => db.companies
        .where('isActive')
        .equals(1)
        .toArray()
        );
  
  if (!companiesData) return null; // Still loading.

  if(companiesData.length === 0) return <div>Sorry, no companies active at the moment</div> // No companies active.
  
  return companiesData.map((company, index) =>
  company.name.includes(props.searchField) ? (
    <CompanyRow
      key={index}
      companyInfo={company}
    />
     ) : null
    );
}