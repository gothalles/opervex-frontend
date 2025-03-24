// src/utils/Opervex/System/UnitsMeasure.js

class TelephoneOperator {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/System/TelephoneOperator/" + id);
  }

  async findAll() {
    return this.#_api.get("/System/TelephoneOperator");
  }
}

// Export the class itself (not an instance)
export default TelephoneOperator;
