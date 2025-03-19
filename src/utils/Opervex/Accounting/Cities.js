// src/utils/Opervex/Cities.js
class Cities {
  constructor(api) {
    this._api = api; // Assign the API instance to the class property
  }

  async findAll() {
    return this._api.get("/Accounting/Cities"); // Use this._api instead of _api
  }
}

// Export the class itself (not an instance)
export default Cities;
