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
}

// Export the class itself (not an instance)
export default Categories;
