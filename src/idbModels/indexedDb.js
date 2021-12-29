import Dexie from 'dexie';
import { populate } from './populate';


export class CompanyDB extends Dexie {
  constructor() {
    super('CompanyDB');
    this.version(1).stores({
      companies: 'name, description, industryType, isActive, address, country, city',
      countries: '++, values',
      cities: '++, values',
      industryType: '++, values'
    });
  }

}

export const db = new CompanyDB();

db.on('populate', populate);
