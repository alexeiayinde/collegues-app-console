"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.rechercherCollegueParNom = function (nomRecherche) {
        var _this = this;
        return request_promise_native_1.default('https://aa-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, { json: true }, function (err, res, body) {
        })
            .then(function (listeMatricules) {
            return Promise.all(listeMatricules.map(function (matricule) {
                return _this.rechercherCollegueParMatricule(matricule);
            }));
        });
    };
    Service.prototype.rechercherCollegueParMatricule = function (matricule) {
        return request_promise_native_1.default('https://aa-collegues-api.herokuapp.com/collegues/' + matricule, { json: true }, function (err, res, body) { });
    };
    Service.prototype.creerCollegue = function (collegue) {
        return request_promise_native_1.default.post('https://aa-collegues-api.herokuapp.com/collegues', { json: true, body: {
                "nom": collegue.nom,
                "prenoms": collegue.prenoms,
                "email": collegue.email,
                "dateDeNaissance": collegue.dateDeNaissance,
                "photoUrl": collegue.photoUrl
            } });
    };
    Service.prototype.modifierEmail = function (collegue) {
        return request_promise_native_1.default.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, { json: true, body: {
                "email": collegue.email
            } });
    };
    Service.prototype.modifierPhoto = function (collegue) {
        return request_promise_native_1.default.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, { json: true, body: {
                "photoUrl": collegue.photoUrl
            } });
    };
    Service.prototype.listerCollegues = function () {
        return request_promise_native_1.default('https://aa-collegues-api.herokuapp.com/collegues/lister', { json: true }, function (err, res, body) {
        });
    };
    return Service;
}());
exports.default = Service;
//function rechercherCollegueParNom(nomRecherche, callback) {
//    request('https://aa-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, {json:true}, (err, res, body) => {
//       let tableauColleguesTrouves = body;
//      callback(tableauColleguesTrouves);
//  });
//}
//function rechercherCollegueParMatricule(matricule, callback) {
//    request('https://aa-collegues-api.herokuapp.com/collegues/' + matricule, {json:true}, (err, res, body) => {
//        let collegueTrouve = body;
//        callback(collegueTrouve);
//    });
//}
//function listerCollegues(callback) {
//    request('https://aa-collegues-api.herokuapp.com/collegues/lister', {json:true}, (err, res, body) => {
//        let tableauCollegues = body;
//        callback(tableauCollegues);
//    });
//}
//exports.rechercherCollegueParNom = rechercherCollegueParNom;
//exports.rechercherCollegueParMatricule = rechercherCollegueParMatricule;
//exports.creerCollegue = creerCollegue;
// exports.modifierEmail = modifierEmail;
// exports.modifierPhoto = modifierPhoto;
// 
