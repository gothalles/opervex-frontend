// src/Opervex/System/User.js

class User {
  #_api;

  constructor(api) {
    this.#_api = api;
  }

  async findId(id) {
    return this.#_api.get("/System/Users/" + id);
  }

  async findAll() {
    return this.#_api.get("/System/Users");
  }
}

export default User;
