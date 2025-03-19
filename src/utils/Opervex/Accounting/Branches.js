// src/utils/Opervex/Branches.js
class Branches {
  constructor(api) {
    this._api = api;
  }

  async findAll() {
    return await this._api.get("/Accounting/Branches");
  }
}

// Export the class itself (not an instance)
export default Branches;
