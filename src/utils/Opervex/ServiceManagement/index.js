// src/utils/Opervex/ServiceManagement/index.js
import _service from "./Service";
import _serviceType from "./ServiceType";

class ServiceManagement {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;

    this.Service = new _service(this.#_api);
    this.ServiceType = new _serviceType(this.#_api);
  }
}

export default ServiceManagement;
