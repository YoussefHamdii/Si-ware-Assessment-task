import { db } from './indexedDb';
const companiesData = require("../json mockups/companies.json");
const countriesData = require("../json mockups/countries.json");
const citiesData = require("../json mockups/cities.json");
const industryTypesData = require("../json mockups/industryTypes.json");

export async function populate() {

  await db.companies.bulkAdd([
    ...companiesData.data
  ]);

  await db.countries.add(countriesData.data);

  await db.cities.add(citiesData.data); 

  await db.industryType.add(industryTypesData.data); 
};