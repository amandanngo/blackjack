

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Deck{
    constructor(){
    this.cards = [];
    }

    shuffle(){ //Fisher-Yates shuffle
 
        for(let i = 0; i < this.cards.length;  i++){
            let rand = Math.floor(Math.random()*this.cards.length);
            let temp = this.cards[rand];
            this.cards[rand] = this.cards[i];
            this.cards[i] = temp;
        }
    }

    getCard(){
        return this.cards.shift();
    }
    
    reset(){}  
}

class Card{
    constructor(value,imgFile){
        this.value = value;
        this.image = new Image();
        this.image.src = imgFile;
    }

}

class Player{
    constructor(){
        this.hand = [];
    }

    displayHand(x,y){
        ctx.fillStyle = '#1B3627';
        ctx.fillRect(x,y,canvas.width,100);
        for(let i = 0; i < this.hand.length; i++){
            ctx.drawImage(this.hand[i].image,x+(i*100), y,80,120);
        }
        drawCircles();
        this.displayValue(x,y);
    }

    displayValue(x,y){
        ctx.fillStyle = "black";
        ctx.fillText(this.getHandValue(),x+120,y-50);

    }

    getHandValue(){
        let sum = 0;
        for(let i = 0; i < this.hand.length; i++){
            sum += this.hand[i].value;
        }
        return sum;
    }
}

function displayText(text,x,y){
    ctx.fillStyle = '#1B3627';
    ctx.fillRect(x,y,canvas.width,10);
    ctx.font = '22px oswald';
    ctx.fillStyle = "#CCC7B9";
    ctx.fillText(text,x, y);
}

function drawBtn(){
    ctx.drawImage(hitButton.image,160,500);
    ctx.drawImage(stayButton.image,300,500);
}

function drawCircles(){
    ctx.beginPath();
    ctx.arc(180, 290, 25, 0, 2 * Math.PI);
    ctx.arc(180, 40, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#E2D4BA';
    ctx.fill();
    ctx.closePath();
}

ctx.fillStyle = '#1B3627';
ctx.fillRect(0,0,canvas.width,canvas.height);
let deck = new Deck();
populateDeck();
deck.shuffle();

let player = new Player();
let dealer = new Player();

let cardBack = new Card(0,'../blackjack/Cards/cardback.png');
let hitButton = new Card(0,'../blackjack/Cards/hit-button.png');
let stayButton = new Card(0,'../blackjack/Cards/stay-button.png');

    let playerBust = false;
    let playerWin = false;

window.onload = (event) => {
    displayText('DEALER',50,50);
    displayText('PLAYER',50,300);

    drawCircles()
    drawBtn();

    dealer.hand.push(deck.getCard());
    dealer.hand.push(deck.getCard());
    displayDealerStart();

    player.hand.push(deck.getCard());
    player.hand.push(deck.getCard());
    player.displayHand(50,350);

    hitBtn();
    stayBtn(); 
    
};

function displayDealerStart(){
    ctx.drawImage(cardBack.image,50,100,80,120);   
    ctx.drawImage(dealer.hand[1].image,50+100,100,80,120);
}


function stayBtn(){

    
        window.addEventListener('click',function(event){
            if(event.clientX >= 300 && event.clientX <= 400 &&
                event.clientY >= 500 && event.clientY <= 540){

                if(playerBust == false && playerWin == false){
                    while(dealer.getHandValue() < 17){
                        dealer.hand.push(deck.getCard()); 
                    }
                
                    dealer.displayHand(50,100);
                    
                    if(dealer.getHandValue() == player.getHandValue()){
                        console.log("You tied!");
                    }
                    if(dealer.getHandValue() == 21){
                        console.log("You lost!");
                    }
                    else if(dealer.getHandValue() > 21){
                        console.log("Dealer busts. You won!");
                    }    
                    else{
                        if(21 - dealer.getHandValue() < 21 - player.getHandValue()){
                        console.log("Dealer wins. You lost!");
                        }
                        else{
                            console.log("You win!");
                        }   
                    }

                }
        }});
    }



function hitBtn(){
    const hitBtn = window.addEventListener('click',function(event){
        if(event.clientX >= 160 && event.clientX <= 260 &&
            event.clientY >= 500 && event.clientY <= 540){
            if(player.getHandValue() < 21){
                console.log("HIT");
                player.hand.push(deck.getCard()); 
                player.displayHand(50,350);

                if(player.getHandValue() == 21){
                    console.log("You won!");
                    playerWin = true;
                }

                if(player.getHandValue() > 21){
                    console.log("You lost!");
                    playerBust = true;
                }
            }
        }
    });
}


function populateDeck(){
    deck.cards.push(new Card(10,'../blackjack/Cards/Hearts/K-Heart.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Hearts/Q-Heart.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Hearts/J-Heart.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Hearts/10-Heart.png'));
    deck.cards.push(new Card(9,'../blackjack/Cards/Hearts/9-Heart.png'));
    deck.cards.push(new Card(8,'../blackjack/Cards/Hearts/8-Heart.png'));
    deck.cards.push(new Card(7,'../blackjack/Cards/Hearts/7-Heart.png'));
    deck.cards.push(new Card(6,'../blackjack/Cards/Hearts/6-Heart.png'));
    deck.cards.push(new Card(5,'../blackjack/Cards/Hearts/5-Heart.png'));
    deck.cards.push(new Card(4,'../blackjack/Cards/Hearts/4-Heart.png'));
    deck.cards.push(new Card(3,'../blackjack/Cards/Hearts/3-Heart.png'));
    deck.cards.push(new Card(2,'../blackjack/Cards/Hearts/2-Heart.png'));
    deck.cards.push(new Card(1,'../blackjack/Cards/Hearts/A-Heart.png'));

    deck.cards.push(new Card(10,'../blackjack/Cards/Diamonds/K-Diamond.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Diamonds/Q-Diamond.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Diamonds/J-Diamond.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Diamonds/10-Diamond.png'));
    deck.cards.push(new Card(9,'../blackjack/Cards/Diamonds/9-Diamond.png'));
    deck.cards.push(new Card(8,'../blackjack/Cards/Diamonds/8-Diamond.png'));
    deck.cards.push(new Card(7,'../blackjack/Cards/Diamonds/7-Diamond.png'));
    deck.cards.push(new Card(6,'../blackjack/Cards/Diamonds/6-Diamond.png'));
    deck.cards.push(new Card(5,'../blackjack/Cards/Diamonds/5-Diamond.png'));
    deck.cards.push(new Card(4,'../blackjack/Cards/Diamonds/4-Diamond.png'));
    deck.cards.push(new Card(3,'../blackjack/Cards/Diamonds/3-Diamond.png'));
    deck.cards.push(new Card(2,'../blackjack/Cards/Diamonds/2-Diamond.png'));
    deck.cards.push(new Card(1,'../blackjack/Cards/Diamonds/A-Diamond.png'));

    deck.cards.push(new Card(10,'../blackjack/Cards/Spades/K-Spade.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Spades/Q-Spade.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Spades/J-Spade.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Spades/10-Spade.png'));
    deck.cards.push(new Card(9,'../blackjack/Cards/Spades/9-Spade.png'));
    deck.cards.push(new Card(8,'../blackjack/Cards/Spades/8-Spade.png'));
    deck.cards.push(new Card(7,'../blackjack/Cards/Spades/7-Spade.png'));
    deck.cards.push(new Card(6,'../blackjack/Cards/Spades/6-Spade.png'));
    deck.cards.push(new Card(5,'../blackjack/Cards/Spades/5-Spade.png'));
    deck.cards.push(new Card(4,'../blackjack/Cards/Spades/4-Spade.png'));
    deck.cards.push(new Card(3,'../blackjack/Cards/Spades/3-Spade.png'));
    deck.cards.push(new Card(2,'../blackjack/Cards/Spades/2-Spade.png'));
    deck.cards.push(new Card(1,'../blackjack/Cards/Spades/A-Spade.png'));

    deck.cards.push(new Card(10,'../blackjack/Cards/Clubs/K-Club.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Clubs/Q-Club.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Clubs/J-Club.png'));
    deck.cards.push(new Card(10,'../blackjack/Cards/Clubs/10-Club.png'));
    deck.cards.push(new Card(9,'../blackjack/Cards/Clubs/9-Club.png'));
    deck.cards.push(new Card(8,'../blackjack/Cards/Clubs/8-Club.png'));
    deck.cards.push(new Card(7,'../blackjack/Cards/Clubs/7-Club.png'));
    deck.cards.push(new Card(6,'../blackjack/Cards/Clubs/6-Club.png'));
    deck.cards.push(new Card(5,'../blackjack/Cards/Clubs/5-Club.png'));
    deck.cards.push(new Card(4,'../blackjack/Cards/Clubs/4-Club.png'));
    deck.cards.push(new Card(3,'../blackjack/Cards/Clubs/3-Club.png'));
    deck.cards.push(new Card(2,'../blackjack/Cards/Clubs/2-Club.png'));
    deck.cards.push(new Card(1,'../blackjack/Cards/Clubs/A-Club.png'));
}
