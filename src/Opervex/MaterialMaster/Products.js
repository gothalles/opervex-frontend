// src/Opervex/MaterialMaster/Products.js

class Products {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/MaterialMaster/Product/" + id);
  }

  async update(id, data) {
    return this.#_api.put("/MaterialMaster/Product/" + id, data);
  }

  async create(data) {
    return this.#_api.post("/MaterialMaster/Product/", data);
  }

  async findAll() {
    //return this.#_api.get("/System/UnitsMeasure");
  }
}

// Export the class itself (not an instance)
export default Products;
