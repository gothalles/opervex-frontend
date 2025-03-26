// src/Opervex/MaterialMaster/index.js

import _products from "./Products";
import _categories from "./Categories";

class MaterialMaster {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;

    this.Products = new _products(this.#_api);
    this.Categories = new _categories(this.#_api);
  }
}

export default MaterialMaster;
