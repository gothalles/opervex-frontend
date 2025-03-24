class Services {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/ServiceManagement/ServiceType/" + id);
  }

  async update(id, data) {
    return this.#_api.put("/ServiceManagement/ServiceType/" + id, data);
  }

  async create(data) {
    return this.#_api.post("/ServiceManagement/ServiceType/", data);
  }

  async findAll() {
    return this.#_api.get("/ServiceManagement/ServiceType");
  }
}

// Export the class itself (not an instance)
export default Services;
