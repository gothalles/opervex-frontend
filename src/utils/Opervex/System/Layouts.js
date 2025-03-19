// src/utils/Opervex/System/Layouts.js

class Layouts {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/System/Layouts/" + id);
  }

  async save(data) {
    return this.#_api.post("/System/Layouts/", data);
  }
}

export default Layouts;
