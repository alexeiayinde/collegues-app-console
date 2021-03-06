import jsdom from 'jsdom';
import baserequest from 'request-promise-native';
import Collegue from './domains';

const request = baserequest.defaults({ jar:true});

export default class Service {
    rechercherCollegueParNom(nomRecherche:string):Promise<Collegue[]> {
        return request('https://aa-collegues-api.herokuapp.com/collegues?nom=' + nomRecherche, {json:true}, (err, res, body) => {
        })
        .then((listeMatricules:string[]) => {
            return Promise.all(listeMatricules.map((matricule:string) => {
                return this.rechercherCollegueParMatricule(matricule);
            }))
        });
    }

    rechercherCollegueParMatricule(matricule:string): Promise<any> {
        return request('https://aa-collegues-api.herokuapp.com/collegues/' + matricule, {json:true}, (err, res, body) => {}).promise();
    }

    creerCollegue(collegue:Collegue) {
        return request.post('https://aa-collegues-api.herokuapp.com/collegues', {json:true, body: {
            "nom": collegue.nom,
            "prenoms": collegue.prenoms,
            "email": collegue.email,
            "dateDeNaissance": collegue.dateDeNaissance,
            "photoUrl": collegue.photoUrl
        }});
    }
    
    modifierEmail(collegue:Collegue) {
        return request.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, {json:true, body: {
            "email": collegue.email
        }});
    }
    
    modifierPhoto(collegue:Collegue) {
        return request.patch('https://aa-collegues-api.herokuapp.com/collegues/' + collegue.matricule, {json:true, body: {
            "photoUrl": collegue.photoUrl
        }});
    }
    
    listerCollegues() {
        return request('https://aa-collegues-api.herokuapp.com/collegues/lister', {json:true}, (err, res, body) => {
        });
    }

    authentifier(nomUtilisateur:string, motDePasse:string) {
        return request.post('https://aa-collegues-api.herokuapp.com/collegues/auth', {json:true, body:{
            "nomUtilisateur":nomUtilisateur,
            "motDePasse":motDePasse
        }});
    }
}


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