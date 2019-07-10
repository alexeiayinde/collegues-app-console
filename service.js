var request = require('request');

function rechercherCollegueParNom(nomRecherche, callback) {
    request('https://aa-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, {json:true}, function(err, res, body) {
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);
    });
}

function rechercherCollegueParMatricule(matricule, callback) {
    request('https://aa-collegues-api.herokuapp.com/collegues/' + matricule, {json:true}, function(err, res, body) {
        var collegueTrouve = body;
        callback(collegueTrouve);
    });
}

function creerCollegue(collegue) {
    request.post('https://aa-collegues-api.herokuapp.com/collegues', {json:true, body: collegue});
}

function modifierEmail(collegue) {
    request.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, {json:true, body:collegue}, function(err, res, body) {
        
    });
}

function modifierPhoto(collegue) {
    request.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, {json:true, body:collegue});
}

function listerCollegues(callback) {
    request('https://aa-collegues-api.herokuapp.com/collegues/lister', {json:true}, function(err, res, body) {
        var tableauCollegues = body;
        callback(tableauCollegues);
    });
}

exports.rechercherCollegueParNom = rechercherCollegueParNom;
exports.rechercherCollegueParMatricule = rechercherCollegueParMatricule;
exports.creerCollegue = creerCollegue;
exports.modifierEmail = modifierEmail;
exports.modifierPhoto = modifierPhoto;
exports.listerCollegues = listerCollegues;