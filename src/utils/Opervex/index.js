// src/utils/OpervexData.js
import api from "./OpervexAPI";

import _system from "./System";
import _materialMaster from "./MaterialMaster";
import _accounting from "./Accounting";
import _serviceManagement from "./ServiceManagement";

class Opervex {
  constructor() {
    this.API = api;

    this.System = new _system(api);
    this.MaterialMaster = new _materialMaster(api);
    this.Accounting = new _accounting(api);
    this.ServiceManagement = new _serviceManagement(api);
  }
}

export default new Opervex();
