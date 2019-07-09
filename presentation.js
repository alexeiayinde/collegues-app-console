var readline = require('readline');
var moduleService = require('./service.js');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function afficherMenu() {
    return '1. Rechercher un collège par nom AYINDE' + '\n99. Sortir\n';
}

function start() { 
       
    rl.question(afficherMenu() + '\nVotre choix = ', function(saisie) {
        switch (saisie) {
            case '1' : 
                rechercheCollegues();
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
    rl.question('>> Recherche en cours du nom ', function(saisie) {
        console.log('');
        var j = 0;
        var longCollegues;
        moduleService.rechercherCollegueParNom(saisie, function (colleguesTrouves) {
            longCollegues = colleguesTrouves.length;
            colleguesTrouves.forEach(function(element) {
                moduleService.rechercherCollegueParMatricule(element, function (collegueTrouve) {
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

exports.start = start;