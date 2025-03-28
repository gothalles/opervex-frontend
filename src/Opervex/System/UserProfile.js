// src/Opervex/System/UserProfile.js

class UserProfile {
  #_api;

  constructor(api) {
    this.#_api = api;
  }

  async findUserId(id) {
    return this.#_api.get(`/System/Users/${id}/Profile`);
  }

  async findAll() {
    return this.#_api.get("/System/Users");
  }

  async update(id, data) {
    return this.#_api.put(`/System/Users/${id}/Profile`, data);
  }
}

export default UserProfile;
