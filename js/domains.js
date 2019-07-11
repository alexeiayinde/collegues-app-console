"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collegue = /** @class */ (function () {
    function Collegue() {
        this._matricule = '';
        this._nom = '';
        this._prenoms = '';
        this._email = '';
        this._dateDeNaissance = '';
        this._photoUrl = '';
    }
    Object.defineProperty(Collegue.prototype, "matricule", {
        get: function () {
            return this._matricule;
        },
        set: function (matricule) {
            this._matricule = matricule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collegue.prototype, "nom", {
        get: function () {
            return this._nom;
        },
        set: function (nom) {
            this._nom = nom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collegue.prototype, "prenoms", {
        get: function () {
            return this._prenoms;
        },
        set: function (prenoms) {
            this._prenoms = prenoms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collegue.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (email) {
            this._email = email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collegue.prototype, "dateDeNaissance", {
        get: function () {
            return this._dateDeNaissance;
        },
        set: function (dateDeNaissance) {
            this._dateDeNaissance = dateDeNaissance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collegue.prototype, "photoUrl", {
        get: function () {
            return this._photoUrl;
        },
        set: function (photoUrl) {
            this._photoUrl = photoUrl;
        },
        enumerable: true,
        configurable: true
    });
    return Collegue;
}());
exports.default = Collegue;
