// src/Opervex/System/Profile.js

class Profile {
  #_api;

  constructor(api) {
    this.#_api = api;
  }

  async findAll() {
    return this.#_api.get("/System/Profile");
  }
}

export default Profile;
