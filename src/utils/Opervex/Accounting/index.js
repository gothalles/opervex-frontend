// src/utils/Opervex/Accounting/index.js
import _branches from "./Branches";
import _cities from "./Cities";

class Accounting {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;

    this.Branches = new _branches(this.#_api);
    this.Cities = new _cities(this.#_api);
  }
}

export default Accounting;
