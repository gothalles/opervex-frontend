// src/utils/OpervexData.js
import api from "./OpervexAPI";

import _system from "./System";
import _materialMaster from "./MaterialMaster";
import _accounting from "./Accounting";
import _serviceManagement from "./ServiceManagement";
import _humanResources from "./HumanResources";
import _sales from "./Sales";

class Opervex {
  constructor() {
    this.API = api;

    this.System = new _system(api);
    this.MaterialMaster = new _materialMaster(api);
    this.Accounting = new _accounting(api);
    this.ServiceManagement = new _serviceManagement(api);
    this.HumanResources = new _humanResources(api);
    this.Sales = new _sales(api);
  }
}

export default new Opervex();
