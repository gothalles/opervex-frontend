// src/Opervex/HumanResources/index.js

import _employees from "./Employees";

class HumanResources {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;

    this.Employees = new _employees(this.#_api);
  }
}

export default HumanResources;
