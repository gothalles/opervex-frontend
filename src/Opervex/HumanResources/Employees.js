// src/Opervex/HumanResources/Employees.js

class Employees {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/HumanResources/Employees/" + id);
  }

  async findAll() {
    return this.#_api.get("/HumanResources/Employees");
  }
  async findAllSeller() {
    return this.#_api.get("/HumanResources/Employees?seller=true");
  }
}

// Export the class itself (not an instance)
export default Employees;
