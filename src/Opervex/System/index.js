// src/Opervex/System/index.js

import _layout from "./Layouts";
import _unitsMeasure from "./UnitsMeasure";
import _telephoneOperator from "./TelephoneOperator";
import _profile from "./Profile";
import _user from "./User";
import _userProfile from "./UserProfile";

class System {
  #_api; // Definição de campo privado

  constructor(api) {
    this.#_api = api;

    this.Layouts = new _layout(this.#_api);
    this.UnitsMeasure = new _unitsMeasure(this.#_api);
    this.TelephoneOperator = new _telephoneOperator(this.#_api);
    this.Profile = new _profile(this.#_api);
    this.User = new _user(this.#_api);
    this.UserProfile = new _userProfile(this.#_api);
  }
}

export default System;
