// class Deck{
//     constructor(){
//     this.cards = [1,2,3,4,5,6,7,8,9,10,10,10,10,
//                   1,2,3,4,5,6,7,8,9,10,10,10,10,
//                   1,2,3,4,5,6,7,8,9,10,10,10,10,
//                   1,2,3,4,5,6,7,8,9,10,10,10,10]   
//     }

//     shuffle(){ //Fisher-Yates shuffle
 
//         for(let i = 0; i < this.cards.length;  i++){
//             let rand = Math.floor(Math.random()*this.cards.length);
//             let temp = this.cards[rand];
//             this.cards[rand] = this.cards[i];
//             this.cards[i] = temp;
//         }
//     }

//     getCard(){
//         return this.cards.shift();
//     }
    
//     reset(){
//         this.cards = [1,2,3,4,5,6,7,8,9,10,10,10,10,
//             1,2,3,4,5,6,7,8,9,10,10,10,10,
//             1,2,3,4,5,6,7,8,9,10,10,10,10,
//             1,2,3,4,5,6,7,8,9,10,10,10,10]   
//     }
// }

// class Player{
//     constructor(){
//         this.hand = [];
//     }

//     displayHand(){
//         let cardString = '';
//         for(let i = 0; i < this.hand.length; i++){
//             cardString += this.hand[i] + ' ';
//         }
//         return ' Hand:' + cardString;
//     }

//     getHandValue(){
//         let sum = 0;
//         for(let i = 0; i < this.hand.length; i++){
//             sum += this.hand[i];
//         }
//         return sum;
//     }
// }

// let cards = new Deck();

// let player = new Player();
// let dealer = new Player();


// cards.shuffle();

// player.hand.push(cards.getCard());
// player.hand.push(cards.getCard());
// console.log('Player',player.displayHand());
// console.log('Value: ', player.getHandValue());

// dealer.hand.push(cards.getCard());
// dealer.hand.push(cards.getCard());
// console.log("Dealer: ? ?");

// let playerBust = false;
// let playerWin = false;

// while(player.getHandValue() < 21){
//     let choice = prompt("Hit or stay?");
//     if(choice == 'hit'){
//         player.hand.push(cards.getCard()); 
//         console.log('Player',player.displayHand());
//         console.log('Value: ', player.getHandValue());

//         if(player.getHandValue() == 21){
//             console.log("You won!");
//             playerWin = true;
//             break;
//         }

//         if(player.getHandValue() > 21){
//             console.log("You lost!");
//             playerBust = true;
//             break;
//         }
//     }
//     if(choice == 'stay'){
//         break;
//     }
// }

// if(!playerBust && !playerWin){
//     while(dealer.getHandValue() < 17){
//         dealer.hand.push(cards.getCard()); 
//     }
//     console.log('Dealer',dealer.displayHand());
//     console.log('Value: ', dealer.getHandValue());
    
//     if(dealer.getHandValue() == 21){
//         console.log("You lost!");
//     }
//     else if(dealer.getHandValue() > 21){
//         console.log("Dealer busts. You won!");
//     }    
//     else{
//         if(21 - dealer.getHandValue() < 21 - player.getHandValue()){
//         console.log("Dealer wins. You lost!");
//         }
//         else{
//             console.log("You win!");
//         }   
//     }
// }




