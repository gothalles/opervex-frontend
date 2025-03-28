// src/Opervex/MaterialMaster/Categories.js

class Categories {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/MaterialMaster/Categories/" + id);
  }

  async findAll() {
    return this.#_api.get("/MaterialMaster/Categories");
  }

  async update(id, data) {
    return this.#_api.put("/MaterialMaster/Categories/" + id, data);
  }

  async create(data) {
    return this.#_api.post("/MaterialMaster/Categories/", data);
  }
}

// Export the class itself (not an instance)
export default Categories;
