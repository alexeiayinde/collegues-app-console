const request = require('request-promise-native');

class Service {
    rechercherCollegueParNom(nomRecherche) {
        return request('https://aa-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, {json:true}, (err, res, body) => {
        })
        .then((listeMatricules) => {
            return Promise.all(listeMatricules.map((matricule) => {
                return this.rechercherCollegueParMatricule(matricule);
            }))
        });
    }

    rechercherCollegueParMatricule(matricule) {
        return request('https://aa-collegues-api.herokuapp.com/collegues/' + matricule, {json:true}, (err, res, body) => {})
    }

    creerCollegue(collegue) {
        request.post('https://aa-collegues-api.herokuapp.com/collegues', {json:true, body: collegue});
    }
    
    modifierEmail(collegue) {
        request.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, {json:true, body:collegue}, (err, res, body) => {
            
        });
    }
    
    modifierPhoto(collegue) {
        request.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, {json:true, body:collegue});
    }
    
    listerCollegues() {
        return request('https://aa-collegues-api.herokuapp.com/collegues/lister', {json:true}, (err, res, body) => {
        });
    }
}

module.exports = Service;

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
// exports.listerCollegues = listerCollegues;
