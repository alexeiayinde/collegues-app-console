const request = require('request-promise-native');

function rechercherCollegueParNom(nomRecherche) {

    return request('https://aa-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, {json:true}, (err, res, body) => {
    })
    .then((listeMatricules) => {
        return Promise.all(listeMatricules.map((matricule) => { // Promise.all transforme un tableau de promesses en UNE promesse de tableau de résultats (résultats = collègues dans ce cas)
            return rechercherCollegueParMatricule(matricule);
        }))
    }); 
}

//function rechercherCollegueParNom(nomRecherche, callback) {
//    request('https://aa-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, {json:true}, (err, res, body) => {
 //       let tableauColleguesTrouves = body;
  //      callback(tableauColleguesTrouves);
  //  });
//}

function rechercherCollegueParMatricule(matricule) {

    return request('https://aa-collegues-api.herokuapp.com/collegues/' + matricule, {json:true}, (err, res, body) => {
    });    
}

//function rechercherCollegueParMatricule(matricule, callback) {
//    request('https://aa-collegues-api.herokuapp.com/collegues/' + matricule, {json:true}, (err, res, body) => {
//        let collegueTrouve = body;
//        callback(collegueTrouve);
//    });
//}

function creerCollegue(collegue) {
    request.post('https://aa-collegues-api.herokuapp.com/collegues', {json:true, body: collegue});
}

function modifierEmail(collegue) {
    request.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, {json:true, body:collegue}, (err, res, body) => {
        
    });
}

function modifierPhoto(collegue) {
    request.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, {json:true, body:collegue});
}

function listerCollegues() {
    return request('https://aa-collegues-api.herokuapp.com/collegues/lister', {json:true}, (err, res, body) => {
    });
}

//function listerCollegues(callback) {
//    request('https://aa-collegues-api.herokuapp.com/collegues/lister', {json:true}, (err, res, body) => {
//        let tableauCollegues = body;
//        callback(tableauCollegues);
//    });
//}

exports.rechercherCollegueParNom = rechercherCollegueParNom;
exports.rechercherCollegueParMatricule = rechercherCollegueParMatricule;
exports.creerCollegue = creerCollegue;
exports.modifierEmail = modifierEmail;
exports.modifierPhoto = modifierPhoto;
exports.listerCollegues = listerCollegues;
