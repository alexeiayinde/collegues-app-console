import jsdom from 'jsdom';
import readline from 'readline';
import Service from './service';
import Collegue from './domains';

const moduleService = new Service();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function afficherMenu() {
    return `\n1. Rechercher un collègue par nom
2. Créer un collègue
3. Modifier l'email d'un collègue
4. Modifier la photo d'un collègue
5. Lister les collègues
99. Sortir\n`;
 }

 function lancerMenu() {
    rl.question(afficherMenu() + '\nVotre choix = ', (saisie) =>{
        switch (saisie) {
            case '1' : 
                rechercherCollegues();
                break;
            case '2' : 
                creerCollegue();
                break;
            case '3' :
                modifierEmail();
                break;
            case '4' :
                modifierPhoto();
                break;
            case '5' :
                listerCollegues();
                break;
            case '99' :
                console.log('\nAu revoir');
                rl.close();
                break;
            default : 
                lancerMenu();
                break;
        }
    })           
 }

function start() { 
    authentifier();
}

function rechercherCollegues() {
    rl.question('>> Recherche en cours du nom ', (nomRecherche:string) =>{
        console.log('');

        moduleService.rechercherCollegueParNom(nomRecherche)
            .then((colleguesTrouves) => {
                colleguesTrouves.forEach((collegue:Collegue) => console.log(collegue.nom + ' ' + collegue.prenoms + ' (' + collegue.dateDeNaissance + ')'));
                lancerMenu();  
            })
            .catch((err) => console.log(err));           
    });
}

function creerCollegue() {
    let collegue = new Collegue();
    rl.question('>> Saisissez le nom du collègue : ', function(saisie) {
        collegue.nom = saisie;
        rl.question('>> Saisissez le prénom du collègue : ', function(saisie) {
            collegue.prenoms = saisie;
            rl.question('>> Saisissez l\'e-mail du collègue : ', function(saisie) {
                collegue.email = saisie;
                rl.question('>> Saisissez la date de naissance du collègue (YYYY-MM-DD) : ', function(saisie) {
                    collegue.dateDeNaissance = saisie;
                    rl.question('>> Saisissez l\'URL de la photo du collègue : ', function(saisie) {
                        collegue.photoUrl = saisie;
                        moduleService.creerCollegue(collegue)
                        .then((body) => {
                            console.log('');
                            console.log(body);
                            lancerMenu();})
                        .catch((err) => {console.log("Impossible de créer le collègue!")});                        
                    })
                });
            });
        });
    }); 
}

function modifierEmail() {
    let collegue = new Collegue();
    moduleService.listerCollegues()
        .then((colleguesTrouves) => {
            colleguesTrouves.forEach((collegue:Collegue) => {
                console.log(collegue.nom, collegue.prenoms + ' (' + collegue.email + ')\n\tMatricule = ' + collegue.matricule + '\n');
            })
            rl.question('>> Saisissez le matricule du collègue à mettre-à-jour : ', (matricule) => {
                collegue.matricule = matricule;
                rl.question('>> Saisissez le nouveau e-mail du collègue : ', (email) => {
                    collegue.email = email;
                    moduleService.modifierEmail(collegue)
                    .then((body) => {
                        console.log('');
                        console.log(body);
                        lancerMenu();
                    })
                    .catch((err) => {console.log(err)});
                });
            })
        })        
}

function modifierPhoto() {
    let collegue = new Collegue();
    moduleService.listerCollegues()
        .then((colleguesTrouves) => {
            colleguesTrouves.forEach((collegue:Collegue) => {
                console.log(collegue.nom, collegue.prenoms + ' (' + collegue.photoUrl + ')\n\tMatricule = ' + collegue.matricule + '\n');
            })
            rl.question('>> Saisissez le matricule du collègue : ', (matricule) => {
                collegue.matricule = matricule;
                rl.question('>> Saisissez le nouveau URL de la photo du collègue : ', (photoUrl) => {
                    collegue.photoUrl = photoUrl;
                    moduleService.modifierPhoto(collegue)
                    .then((body) => {
                        console.log('');
                        console.log(body);                   
                        lancerMenu();
                    })
                    .catch((err) => {console.log(err)});
                });
            });
        })
        .catch((error) => console.log(error)); 
}

function listerCollegues() {
    console.log('>> Recherche des collègues en cours...\n');
    moduleService.listerCollegues() 
        .then((colleguesTrouves) => {
            colleguesTrouves.forEach((collegue:Collegue) => console.log(collegue));
            lancerMenu();
        })
        .catch((error) => console.log(error))
}

function authentifier() {
    rl.question('>> Veuillez saisir votre nom d\'utilisateur : ', (nomUtilisateur:string) =>{
        rl.question('>> Veuillez saisir votre mot de passe : ', (motDePasse:string) => {
            moduleService.authentifier(nomUtilisateur, motDePasse)
            .then(() => {
                console.log('');
                console.log('Authentification réussie !');
                lancerMenu();
            })
            .catch((err) => {
                console.log('Le nom d\'utilisateur/mot de passe saisi est invalide, veuillez recommencer.');
                authentifier();
            });
        });       
    });
}

export {start};

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
