var readline = require('readline');
var moduleService = require('./service.js');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function afficherMenu() {
    return '1. Rechercher un collège par nom AYINDE\n' + '2. Créer un collègue\n' + '3. Modifier l\'email\n' + '4. Modifier photo\n' + '99. Sortir\n';
}

function start() { 
       
    rl.question(afficherMenu() + '\nVotre choix = ', function(saisie) {
        switch (saisie) {
            case '1' : 
                rechercheCollegues();
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

function rechercheCollegues() {
    rl.question('>> Recherche en cours du nom ', function(nomRecherche) {
        console.log('');
        var j = 0;
        var longCollegues;
        moduleService.rechercherCollegueParNom(nomRecherche, function (colleguesTrouves) {
            longCollegues = colleguesTrouves.length;
            colleguesTrouves.forEach(function(collegue) {
                moduleService.rechercherCollegueParMatricule(collegue, function (collegueTrouve) {
                    console.log(collegueTrouve.nom + ' ' + collegueTrouve.prenoms + ' (' + collegueTrouve.dateDeNaissance + ')');        
                    j++;
                    if (j == longCollegues) {
                        console.log('');
                        start();
                    }
                });      
            });            
        });
    })
}

function creerCollegue() {
    var collegue = {};
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
    var collegue = {};
    rl.question('>> Saisissez le matricule du collègue : ', function(matricule) {
        collegue.matricule = matricule;
        rl.question('>> Saisissez le nouveau e-mail du collègue : ', function(email) {
            collegue.email = email;
            moduleService.modifierEmail(collegue);
            moduleService.rechercherCollegueParMatricule(matricule, function(collegueTrouve) {
                console.log('\n' + collegueTrouve.nom, collegueTrouve.prenoms, '\nNouveau email :', collegue.email + '\n');
                start();
            });
        });
    })
}

function modifierPhoto() {
    var collegue = {};
    rl.question('>> Saisissez le matricule du collègue : ', function(matricule) {
        collegue.matricule = matricule;
        rl.question('>> Saisissez le nouveau URL de la photo du collègue : ', function(photoUrl) {
            collegue.photoUrl = photoUrl;
            moduleService.modifierPhoto(collegue);
            moduleService.rechercherCollegueParMatricule(matricule, function(collegueTrouve) {
                console.log('\n' + collegueTrouve.nom, collegueTrouve.prenoms, '\nNouvel URL de photo :', collegue.photoUrl + '\n');
                start();
            });
        });
    });
}

exports.start = start;