class Services {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/ServiceManagement/Service/" + id);
  }

  async update(id, data) {
    return this.#_api.put("/ServiceManagement/Service/" + id, data);
  }

  async create(data) {
    return this.#_api.post("/ServiceManagement/Service/", data);
  }

  async findAll() {
    return this.#_api.get("/ServiceManagement/Service");
  }

  async getSales() {
    return this.#_api.get("/ServiceManagement/Service?serviceType=7");
  }
}

// Export the class itself (not an instance)
export default Services;
