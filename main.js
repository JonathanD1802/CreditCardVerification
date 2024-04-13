// Tous les numéros de cartes valides.
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]; 
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]; 
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]; 
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]; 
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]; 

// Tous les numéros de cartes invalides.
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]; 
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]; 
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]; 
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]; 
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]; 

// Peuvent être valide ou invalide.
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]; 
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]; 
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]; 
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]; 
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]; 

// Tableau contenant tous les tableaux précédents. 
const batch = [
    valid1, valid2, valid3, valid4, valid5, 
    invalid1, invalid2, invalid3, invalid4, invalid5,
    mystery1, mystery2, mystery3, mystery4, mystery5, 
]; 

/*
La fonction validationCarte prend en paramètre un tableau. 
Afin de ne pas changer le tableau original, nous assignons le tableau à une nouvelle variable (tableauLuhn). 
Pour déterminer si le numéro de carte est valide et retourner true(valide) ou false(invalide); 
nous allons utiliser l'algorithme de Luhn.
Puisque l'algorithme Luhn commence par le chiffre de droite, et multiplie tous les 2 nombres par 2, 
nous allons inversé le tableau afin de faciliter sa manipulation. 
On itère, grâce à une boucle for, afin de multiplier tous les 2 chiffre par 2 ; 
La boucle commence à l'index 1, afin de ne pas toucher au premier élément, qui est représente l'élément de droite 
(dans l'algorithme de Luhn). 
Si le chiffre multiplier par 2 est supérieur à 9, alors on lui retire 9. 
En sorti de la boucle for, on inverse de nouveau le tableau afin de l'avoir dans l'ordre original. 
Enfin, nous additionnons tous les chiffres contenus dans le tableau, 
et nous regardons si la somme de tous les chiffres modulo 10 est égal à 0. 
Si la somme modulo 10 = 0 : return true (numéro de carte valide). 
Sinon : return false (numéro de carte invalide)
 */

const validationCarte = tableau => {
    let tableauLuhn = tableau.toReversed();
    for(let i = 1; i < tableauLuhn.length; i+=2){
        tableauLuhn[i]*=2; 
        if(tableauLuhn[i] > 9){
            tableauLuhn[i]-=9; 
        }; 
    };
    tableauLuhn.reverse()
    let additionLuhn = tableauLuhn.reduce((valeurPrecedente, valeurActuelle)=>{
        return valeurPrecedente + valeurActuelle; 
    })
    if(additionLuhn % 10 === 0){
        return true; 
    }else{
        return false; 
    }; 
}; 

/* 
La fonction trouverCarteInvalide admet en paramètre un tableau imbriqué, contenant des tableaux de numéros de cartes. 
nous créons par la suite un tableau vide qui contiendra l'ensembles des numéros de carte invalide. 
Ensuite nous itérons à travers notre tableau imbriqué afin de recupérer les tableaux de numéros de cartes contenus dans ce dernier. 
Puis, nous utilisons la fonction validationCarte() déclaré plus haut, sur une nouvelle variable estValide, afin qu'il nous retourne
true ou false. 
grâce aux conditions, nous pouvons évalué si estValide est égal à false. 
Si estValide === false, alors le numéro de carte est incorrect, et nous l'ajoutons au tableau vide déclaré en haut de la fonction. 
Enfin, il nous reste qu'à retourné le tableau carteInvalide, une fois ce dernier complété. 
*/
const trouverCarteInvalide=tableauImbrique=>{
    let carteInvalide = []; 
    for(let i=0; i < tableauImbrique.length; i++){
        let estValide = validationCarte(tableauImbrique[i]); 
        if(estValide === false){
            carteInvalide.push(tableauImbrique[i]); 
        }; 
    }; 
    return carteInvalide; 
}

/* 
La fonction idInvalideCompagnie va servir à trouver le nom des compagnie bancaire ayant délivré de mauvaises cartes.
Pour cela, la fonction admet en argument un tableau imbriqué, qui contiendra tous les mauvais numéro trouvé précédemment. 
Ensuite, nous déclarons une variable vide qui servira à stocker le nom des organismes bancaires, ainsi que des variables contenant les 
compagnies bancaires majeures : MasterCard, Visa, American express ect....
Puis nous itérons à travers chaque élément du tableau imbriqué, fourni en paramètre de la fonction, et avec des condition, nous regardons
à quel numéro correspond le premier nombre des tableaux de mauvais numéro. 
Si le premier numéro est un 3 => cela correspond à amex. 
Si le premier numéro est un 4 => Cela corespond à visa.
...
Pour finir, puisque que nous ne voulons les noms des instituts bancaires qu'en 1 seul exemplaire, nous devons regarder avec la méthode de
tableau includes, si le nom de la compagnie n'est pas déjà dans CompagnieInvalide (le tableau vide déclaré en début de fonction.). 
Si le nom de la compagnie n'est pas dans le tableau vide, nous l'ajoutons grâce à la méthode push. 
*/
const idInvalideCompagnie = tableauImbrique =>{
    let CompagnieInvalide = []; 
    let masterCard = 'MasterCard'; 
    let visa = 'Visa'; 
    let amex = 'Amex (American Express)'; 
    let discover = 'Discover'
    let notFound = 'Compagnie not found'
    tableauImbrique.forEach(element => {
        if(element[0] === 3){
            if(CompagnieInvalide.includes(amex) === false){
                CompagnieInvalide.push(amex)
            }; 
        }else if(element[0] === 4){
            if(CompagnieInvalide.includes(visa) === false){
                CompagnieInvalide.push(visa); 
            }; 
        }else if(element[0] === 5){
            if(CompagnieInvalide.includes(masterCard) === false){
                CompagnieInvalide.includes(masterCard); 
            }; 
        }else if(element[0] === 6){
            if(CompagnieInvalide.includes(discover) === false){
                CompagnieInvalide.push(discover); 
            }; 
        }else{
            if(CompagnieInvalide.includes(notFound) === false){
                CompagnieInvalide.push(notFound); 
            }; 
        }; 
    });
    return CompagnieInvalide; 
}

let carteInvalide = trouverCarteInvalide(batch); 
let compagnieCarteInvalide = idInvalideCompagnie(carteInvalide); 

console.log(compagnieCarteInvalide); 



