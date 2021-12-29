import { db } from './indexedDb';
const companiesData = require("../json mockups/companies.json");

export async function populate() {
  await db.companies.bulkPut([
    ...companiesData.data
  ]); 
};