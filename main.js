// All valid card numbers.
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]; 
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]; 
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]; 
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]; 
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]; 

// All invalid cards numbers. 
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]; 
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]; 
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]; 
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]; 
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]; 

// Can be either valid and invalid. 
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]; 
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]; 
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]; 
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]; 
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]; 

// Arrays that contains all previous arrays 
const batch = [
    valid1, valid2, valid3, valid4, valid5, 
    invalid1, invalid2, invalid3, invalid4, invalid5,
    mystery1, mystery2, mystery3, mystery4, mystery5, 
]; 

/*
The validationCard function takes an array as its parameter. 
In order not to change the original array, we assign the array to a new variable (luhnArray). 
To determine whether the card number is valid and return true(valid) or false(invalid); 
we'll use the Luhn algorithm.
Since the Luhn algorithm starts with the number on the right, and multiplies every 2 numbers by 2, 
we're going to invert the array to make it easier to manipulate. 
We iterate, using a for loop, to multiply all 2 numbers by 2 ; 
The loop starts at index 1, so as not to touch the first element, which is the element on the right 
(in Luhn's algorithm). 
If the number multiplied by 2 is greater than 9, then 9 is subtracted from it. 
On exiting the for loop, we invert the array again so that it is in the original order. 
Finally, we add up all the numbers in the array 
and see if the sum of all the digits modulo 10 equals 0. 
If the sum modulo 10 = 0: return true (valid card number). 
Otherwise: return false (invalid card number).
*/

const validationCard = arr => {
    let luhnArray = arr.toReversed();
    for(let i = 1; i < luhnArray.length; i+=2){
        luhnArray[i]*=2; 
        if(luhnArray[i] > 9){
            luhnArray[i]-=9; 
        }; 
    };
    luhnArray.reverse()
    let luhnSum = luhnArray.reduce((accumulator, currentValue)=>{
        return accumulator + currentValue; 
    })
    if(luhnSum % 10 === 0){
        return true; 
    }else{
        return false; 
    }; 
}; 

/* 
The findInvalidCards function takes as its parameter a nested array containing arrays of card numbers. 
We then create an empty array that will contain all the invalid arrays of card numbers. 
We then iterate through our nested array to retrieve the arrays of card numbers contained in it. 
Then we use the validationCard() function declared above, on a new variable isValide, to return
true or false. 
With conditional statements, we can evaluate whether estValide is equal to false. 
If estValide === false, then the card number is incorrect, and we add it to the empty array declared at the top of the function. 
Finally, all we have to do is return the array cardInvalid, once this has been completed. 
*/
const findInvalidCards=nestedArr=>{
    let invalidCards = []; 
    for(let i=0; i < nestedArr.length; i++){
        let isValide = validationCard(nestedArr[i]); 
        if(isValide === false){
            invalidCards.push(nestedArr[i]); 
        }; 
    }; 
    return invalidCards; 
}

/* 
The idInvalidCompagnies function take as parameter a nested array. 
We create a constant variable called compagnies that contains object. 
Each element within the compagnies object is associate with a number which represent the first digit 
of the element we will investigate futher. 
With this association, we are able to determine if 
-the first digit is 3 it will equal to Amex.
-The first digit is 4 it will equal to Visa. 
And so on ...

Then we need two more constant : 
One for the case the digit doesn't match with the expected ones within the compagnies object => notFound. 
The second an empty array to store the compagnies that gave invalid credit cards numbers. => invalideCompagnies

We use the for each method on the nested array given as parameter. 
Because the nested array contains arrays with invalid numbers, 
we need to loop in element to have the first digit => element[0].
So, we check if the first digit of element is store in the compagnies object => compagnies[element[0]].

...If the first digit is store, then the result should be not equal to undefined !==.
Then we pay attention if the value of compagnies object is already includes in the invalidCompagnies arrays. 
If the value is not store within invalidCompagnies : 
(invalidCompagnies.includes(compagnies[element[0]]) === false)
Then we push it in the invalidCompagnies arrays. 

...Else the first digit is not store in the compagnies object, which compagnies[element[0]] === undifined.
In such case, we check if the variable notFound is already in the invalidCompagnies array. 
if not : We push it into the array. 

finally, we return the invalidCompagnies arrays. 
*/
const idInvalidCompagnies = nestedArr =>{
    const compagnies = {
        3: 'Amex (american Express)', 
        4: 'Visa', 
        5: 'MasterCard', 
        6: 'Discover', 
    }; 
    const notFound = 'Company not found'; 
    const invalidCompagnies = []; 

    nestedArr.forEach(element => {
        if(compagnies[element[0]] !== undefined){
            if(invalidCompagnies.includes(compagnies[element[0]]) === false){
                invalidCompagnies.push(compagnies[element[0]]); 
            }; 
        }else{
            if(invalidCompagnies.includes(notFound) === false){
                invalidCompagnies.push(notFound); 
            }; 
        };
    });
    return invalidCompagnies; 
}

let invalidCreditCards = findInvalidCards(batch); 
let compagniesOfInvalidCards = idInvalidCompagnies(invalidCreditCards); 

console.log(compagniesOfInvalidCards); 



