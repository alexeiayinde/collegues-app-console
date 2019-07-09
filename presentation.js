function afficherMenu() {
    return '1. Rechercher un collège par nom' + '\n99. Sortir';
}

var readline = require('readline');
var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

function start() {    
    rl.question(afficherMenu() + '\nChoix = ', function(saisie) {
        switch (saisie) {
            case '1' : 
                console.log('>> Recherche en cours du nom xxx');
                start();
                break;
            case '99' :
                console.log('Au revoir');
                rl.close();
                break;
            default : 
                rl.close();
                break;
        }
    })           
}

exports.start = start;