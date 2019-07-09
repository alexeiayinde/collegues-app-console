var request = require('request');

function rechercherCollegueParNom(nomRecherche, callback) {

    request('https://aa-collegues-api.herokuapp.com/collegues?nom='+nomRecherche, {json:true}, function(err, res, body) {
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

exports.rechercherCollegueParNom = rechercherCollegueParNom;
exports.rechercherCollegueParMatricule = rechercherCollegueParMatricule;
