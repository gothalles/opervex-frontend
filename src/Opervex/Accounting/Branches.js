// src/Opervex/Accounting/Branches.js

class Branches {
  #_api;

  constructor(api) {
    this.#_api = api;
  }

  async findAll() {
    return await this.#_api.get("/Accounting/Branches");
  }

  async findId(id) {
    return this.#_api.get("/Accounting/Branches/" + id);
  }

  async update(id, data) {
    return this.#_api.put("/Accounting/Branches/" + id, data);
  }

  async create(data) {
    return this.#_api.post("/Accounting/Branches/", data);
  }
}

// Export the class itself (not an instance)
export default Branches;
