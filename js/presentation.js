"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var service_1 = __importDefault(require("./service"));
var domains_1 = __importDefault(require("./domains"));
var moduleService = new service_1.default();
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function afficherMenu() {
    return "\n1. Rechercher un coll\u00E8gue par nom\n2. Cr\u00E9er un coll\u00E8gue\n3. Modifier l'email d'un coll\u00E8gue\n4. Modifier la photo d'un coll\u00E8gue\n5. Lister les coll\u00E8gues\n99. Sortir\n";
}
function start() {
    rl.question(afficherMenu() + '\nVotre choix = ', function (saisie) {
        switch (saisie) {
            case '1':
                rechercherCollegues();
                break;
            case '2':
                creerCollegue();
                break;
            case '3':
                modifierEmail();
                break;
            case '4':
                modifierPhoto();
                break;
            case '5':
                listerCollegues();
                break;
            case '99':
                console.log('\nAu revoir');
                rl.close();
                break;
            default:
                start();
                break;
        }
    });
}
exports.start = start;
function rechercherCollegues() {
    rl.question('>> Recherche en cours du nom ', function (nomRecherche) {
        console.log('');
        moduleService.rechercherCollegueParNom(nomRecherche)
            .then(function (colleguesTrouves) {
            colleguesTrouves.forEach(function (collegue) { return console.log(collegue.nom + ' ' + collegue.prenoms + ' (' + collegue.dateDeNaissance + ')'); });
            start();
        })
            .catch(function (err) { return console.log(err); });
    });
}
function creerCollegue() {
    var collegue = new domains_1.default();
    rl.question('>> Saisissez le nom du collègue : ', function (saisie) {
        collegue.nom = saisie;
        rl.question('>> Saisissez le prénom du collègue : ', function (saisie) {
            collegue.prenoms = saisie;
            rl.question('>> Saisissez l\'e-mail du collègue : ', function (saisie) {
                collegue.email = saisie;
                rl.question('>> Saisissez la date de naissance du collègue (YYYY-MM-DD) : ', function (saisie) {
                    collegue.dateDeNaissance = saisie;
                    rl.question('>> Saisissez l\'URL de la photo du collègue : ', function (saisie) {
                        collegue.photoUrl = saisie;
                        moduleService.creerCollegue(collegue)
                            .then(function (body) {
                            console.log('');
                            console.log(body);
                            start();
                        })
                            .catch(function (err) { console.log("Impossible de créer le collègue!"); });
                    });
                });
            });
        });
    });
}
function modifierEmail() {
    var collegue = new domains_1.default();
    moduleService.listerCollegues()
        .then(function (colleguesTrouves) {
        colleguesTrouves.forEach(function (collegue) {
            console.log(collegue.nom, collegue.prenoms + ' (' + collegue.email + ')\n\tMatricule = ' + collegue.matricule + '\n');
        });
        rl.question('>> Saisissez le matricule du collègue à mettre-à-jour : ', function (matricule) {
            collegue.matricule = matricule;
            rl.question('>> Saisissez le nouveau e-mail du collègue : ', function (email) {
                collegue.email = email;
                moduleService.modifierEmail(collegue)
                    .then(function (body) {
                    console.log('');
                    console.log(body);
                    start();
                })
                    .catch(function (err) { console.log(err); });
            });
        });
    });
}
function modifierPhoto() {
    var collegue = new domains_1.default();
    moduleService.listerCollegues()
        .then(function (colleguesTrouves) {
        colleguesTrouves.forEach(function (collegue) {
            console.log(collegue.nom, collegue.prenoms + ' (' + collegue.photoUrl + ')\n\tMatricule = ' + collegue.matricule + '\n');
        });
        rl.question('>> Saisissez le matricule du collègue : ', function (matricule) {
            collegue.matricule = matricule;
            rl.question('>> Saisissez le nouveau URL de la photo du collègue : ', function (photoUrl) {
                collegue.photoUrl = photoUrl;
                moduleService.modifierPhoto(collegue)
                    .then(function (body) {
                    console.log('');
                    console.log(body);
                    start();
                })
                    .catch(function (err) { console.log(err); });
            });
        });
    })
        .catch(function (error) { return console.log(error); });
}
function listerCollegues() {
    console.log('>> Recherche des collègues en cours...\n');
    moduleService.listerCollegues()
        .then(function (colleguesTrouves) {
        colleguesTrouves.forEach(function (collegue) { return console.log(collegue); });
        start();
    })
        .catch(function (error) { return console.log(error); });
}
//function rechercheCollegues1() {
//   rl.question('>> Recherche en cours du nom ', (nomRecherche) =>{
//       console.log('');
//       let j = 0;
//       let longCollegues;
//       moduleService.rechercherCollegueParNom(nomRecherche, (colleguesTrouves) => {
//           longCollegues = colleguesTrouves.length;
//           colleguesTrouves.forEach((collegue) =>{
//               moduleService.rechercherCollegueParMatricule(collegue, (collegueTrouve) =>{
//                   console.log(collegueTrouve.nom + ' ' + collegueTrouve.prenoms + ' (' + collegueTrouve.dateDeNaissance + ')');        
//                  j++;
//                if (j == longCollegues) {
//                  console.log('');
//                start();
//          }
//                });      
//          });            
//    });
//   })
//}
//function listerCollegues2() {
//   console.log('>> Recherche des collègues en cours...\n');
//   moduleService.listerCollegues((colleguesTrouves) => {
//       colleguesTrouves.forEach((collegue) => {
//           console.log(collegue);
//       });
//       console.log('');
//       start();
//   });
//}
