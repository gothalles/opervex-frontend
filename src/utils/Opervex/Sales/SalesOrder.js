class SalesOrder {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/Sales/SalesOrder/" + id);
  }

  async update(id, data) {
    return this.#_api.put("/Sales/SalesOrder/" + id, data);
  }

  async create(data) {
    return this.#_api.post("/Sales/SalesOrder/", data);
  }

  async findAll() {
    return this.#_api.get("/Sales/SalesOrder");
  }
}

// Export the class itself (not an instance)
export default SalesOrder;
