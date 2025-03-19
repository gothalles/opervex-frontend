// src/utils/Opervex/System/index.js
import _layout from "./Layouts";
import _unitsMeasure from "./UnitsMeasure";

class System {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;

    this.Layouts = new _layout(this.#_api);
    this.UnitsMeasure = new _unitsMeasure(this.#_api);
  }
}

export default System;
