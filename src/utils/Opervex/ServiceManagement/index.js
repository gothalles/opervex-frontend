// src/utils/Opervex/ServiceManagement/index.js
import _services from "./Services";

class ServiceManagement {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;

    this.Services = new _services(this.#_api);
  }
}

export default ServiceManagement;
