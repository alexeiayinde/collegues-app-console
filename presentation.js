const readline = require('readline');
const Service = require('./service.js');

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

function start() { 
       
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
                rl.close();
                break;
        }
    })           
}

function rechercherCollegues() {
    rl.question('>> Recherche en cours du nom ', (nomRecherche) =>{
        console.log('');

        moduleService.rechercherCollegueParNom(nomRecherche)
            .then((colleguesTrouves) => {
                colleguesTrouves.forEach((collegue) => console.log(collegue.nom + ' ' + collegue.prenoms + ' (' + collegue.dateDeNaissance + ')'));
                start();  
            })
            .catch((err) => console.log(err));           
    });
}

function creerCollegue() {
    let collegue = {};
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
                        moduleService.creerCollegue(collegue);
                        console.log('\nCollègue créé : \n');
                        console.log(collegue);
                        start();
                    })
                });
            });
        });
    }); 
}

function modifierEmail() {
    let collegue = {};
    moduleService.listerCollegues()
        .then((colleguesTrouves) => {
            colleguesTrouves.forEach((collegue) => {
                console.log(collegue.nom, collegue.prenoms + ' (' + collegue.email + ')\n\tMatricule = ' + collegue.matricule + '\n');
            })
            rl.question('>> Saisissez le matricule du collègue à mettre-à-jour : ', (matricule) => {
                collegue.matricule = matricule;
                rl.question('>> Saisissez le nouveau e-mail du collègue : ', (email) => {
                    collegue.email = email;
                    moduleService.modifierEmail(collegue);
                    moduleService.rechercherCollegueParMatricule(matricule)
                    .then ((collegueTrouve) => {
                        console.log('\n' + collegueTrouve.nom, collegueTrouve.prenoms, '\nNouveau email :', collegue.email + '\n');
                        start();
                    });
                });
            })
        })        
}

function modifierPhoto() {
    let collegue = {};
    moduleService.listerCollegues()
        .then((colleguesTrouves) => {
            colleguesTrouves.forEach((collegue) => {
                console.log(collegue.nom, collegue.prenoms + ' (' + collegue.photoUrl + ')\n\tMatricule = ' + collegue.matricule + '\n');
            })
            rl.question('>> Saisissez le matricule du collègue : ', (matricule) => {
                collegue.matricule = matricule;
                rl.question('>> Saisissez le nouveau URL de la photo du collègue : ', (photoUrl) => {
                    collegue.photoUrl = photoUrl;
                    moduleService.modifierPhoto(collegue);
                    moduleService.rechercherCollegueParMatricule(matricule) 
                    .then ((collegueTrouve) => {
                        console.log('\n' + collegueTrouve.nom, collegueTrouve.prenoms, '\nNouvel URL de photo :', collegue.photoUrl + '\n');
                        start();
                    });
                });
            });
        })
        .catch((error) => console.log(error)); 
}

function listerCollegues() {
    console.log('>> Recherche des collègues en cours...\n');
    moduleService.listerCollegues() 
        .then((colleguesTrouves) => {
            colleguesTrouves.forEach((collegue) => console.log(collegue));
            start();
        })
        .catch((error) => console.log(error))
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

exports.start = start;