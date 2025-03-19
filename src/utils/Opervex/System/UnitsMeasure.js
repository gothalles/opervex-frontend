// src/utils/Opervex/System/UnitsMeasure.js

class UnitsMeasure {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/System/UnitsMeasure/" + id);
  }

  async findAll() {
    return this.#_api.get("/System/UnitsMeasure");
  }
}

// Export the class itself (not an instance)
export default UnitsMeasure;
