// src/Opervex/Sales/index.js

import _salesOrder from "./SalesOrder";

class ServiceManagement {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;

    this.SalesOrder = new _salesOrder(this.#_api);
  }
}

export default ServiceManagement;
