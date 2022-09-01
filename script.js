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
    
    reset(){
        this.cards = [];
    }  
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
        ctx.beginPath();
        ctx.arc(180, y-60, 25, 0, 2 * Math.PI);
        ctx.fillStyle = '#E2D4BA';
        ctx.fill();
        ctx.closePath();
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

    reset(){
        this.hand = [];
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

let cardBack = new Card(0,'Cards/cardback.png');
let hitButton = new Card(0,'Cards/hit-button.png');
let stayButton = new Card(0,'Cards/stay-button.png');

let playerBust = false;
let playerWin = false;

window.onload = (event) => {
    play();
}

function play(){
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
}

function resetGame(){
    ctx.fillStyle = '#1B3627';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    player.reset();
    dealer.reset();
    deck.reset();
    populateDeck();
    deck.shuffle();

    playerBust = false;
    playerWin = false;
}

function displayDealerStart(){
    ctx.drawImage(cardBack.image,50,100,80,120);   
    ctx.drawImage(dealer.hand[1].image,50+100,100,80,120);
}

function resetBtn(){
    window.addEventListener('click',function(event){
        if(event.clientX-canvas.offsetLeft >= 370 && event.clientX-canvas.offsetLeft <= 570 &&
            event.clientY-canvas.offsetTop >= 330 && event.clientY-canvas.offsetTop <= 370){
                resetGame();
                play();
        }
    });
}


function stayBtn(){
    window.addEventListener('click',function(event){
        if(event.clientX-canvas.offsetLeft >= 300 && event.clientX-canvas.offsetLeft <= 400 &&
                event.clientY-canvas.offsetTop >= 500 && event.clientY-canvas.offsetTop <= 540){
            if(playerBust == false && playerWin == false){
                while(dealer.getHandValue() < 17){
                    dealer.hand.push(deck.getCard()); 
                }
                
                dealer.displayHand(50,100);
                    
                if(dealer.getHandValue() == player.getHandValue()){
                    endMsg("You tied");
                    resetBtn();
                }
                else if(dealer.getHandValue() == 21){
                    endMsg("You lose");
                    resetBtn();
                }
                else if(dealer.getHandValue() > 21){
                    endMsg("You win!");
                    resetBtn();
                }    
                else{
                    if(21 - dealer.getHandValue() < 21 - player.getHandValue()){
                        endMsg("You lose");
                        resetBtn();
                    }
                    else{
                        endMsg("You win!");
                        resetBtn();
                    }   
                }
            }
        }
    });
}


function hitBtn(){
    const hitBtn = window.addEventListener('click',function(event){
        if(event.clientX-canvas.offsetLeft >= 160 && event.clientX-canvas.offsetLeft <= 260 &&
            event.clientY-canvas.offsetTop >= 500 && event.clientY-canvas.offsetTop <= 540){
            
            if(player.getHandValue() < 21){
                player.hand.push(deck.getCard()); 
                player.displayHand(50,350);
            }
            
            if(player.getHandValue() == 21){
                endMsg("You win!");
                resetBtn();
                playerWin = true;
            }

            if(player.getHandValue() > 21){
                endMsg("You lose");
                resetBtn();
                playerBust = true;
            }
        }
    });
}

function endMsg(msg){
    ctx.fillStyle = '#9B1D20';
    ctx.fillRect(345,210,250,200);
    ctx.fillStyle = '#EAF9D9'
    ctx.fillText(msg,430,280);
    ctx.fillStyle = '#E2D4BA';
    ctx.fillRect(370,330,200,40);
    ctx.fillStyle = '#9B1D20'
    ctx.fillText("Play again",425,360);
}

function populateDeck(){
    deck.cards.push(new Card(10,'Cards/Hearts/K-Heart.png'));
    deck.cards.push(new Card(10,'Cards/Hearts/Q-Heart.png'));
    deck.cards.push(new Card(10,'Cards/Hearts/J-Heart.png'));
    deck.cards.push(new Card(10,'Cards/Hearts/10-Heart.png'));
    deck.cards.push(new Card(9,'Cards/Hearts/9-Heart.png'));
    deck.cards.push(new Card(8,'Cards/Hearts/8-Heart.png'));
    deck.cards.push(new Card(7,'Cards/Hearts/7-Heart.png'));
    deck.cards.push(new Card(6,'Cards/Hearts/6-Heart.png'));
    deck.cards.push(new Card(5,'Cards/Hearts/5-Heart.png'));
    deck.cards.push(new Card(4,'Cards/Hearts/4-Heart.png'));
    deck.cards.push(new Card(3,'Cards/Hearts/3-Heart.png'));
    deck.cards.push(new Card(2,'Cards/Hearts/2-Heart.png'));
    deck.cards.push(new Card(1,'Cards/Hearts/A-Heart.png'));

    deck.cards.push(new Card(10,'Cards/Diamonds/K-Diamond.png'));
    deck.cards.push(new Card(10,'Cards/Diamonds/Q-Diamond.png'));
    deck.cards.push(new Card(10,'Cards/Diamonds/J-Diamond.png'));
    deck.cards.push(new Card(10,'Cards/Diamonds/10-Diamond.png'));
    deck.cards.push(new Card(9,'Cards/Diamonds/9-Diamond.png'));
    deck.cards.push(new Card(8,'Cards/Diamonds/8-Diamond.png'));
    deck.cards.push(new Card(7,'Cards/Diamonds/7-Diamond.png'));
    deck.cards.push(new Card(6,'Cards/Diamonds/6-Diamond.png'));
    deck.cards.push(new Card(5,'Cards/Diamonds/5-Diamond.png'));
    deck.cards.push(new Card(4,'Cards/Diamonds/4-Diamond.png'));
    deck.cards.push(new Card(3,'Cards/Diamonds/3-Diamond.png'));
    deck.cards.push(new Card(2,'Cards/Diamonds/2-Diamond.png'));
    deck.cards.push(new Card(1,'Cards/Diamonds/A-Diamond.png'));

    deck.cards.push(new Card(10,'Cards/Spades/K-Spade.png'));
    deck.cards.push(new Card(10,'Cards/Spades/Q-Spade.png'));
    deck.cards.push(new Card(10,'Cards/Spades/J-Spade.png'));
    deck.cards.push(new Card(10,'Cards/Spades/10-Spade.png'));
    deck.cards.push(new Card(9,'Cards/Spades/9-Spade.png'));
    deck.cards.push(new Card(8,'Cards/Spades/8-Spade.png'));
    deck.cards.push(new Card(7,'Cards/Spades/7-Spade.png'));
    deck.cards.push(new Card(6,'Cards/Spades/6-Spade.png'));
    deck.cards.push(new Card(5,'Cards/Spades/5-Spade.png'));
    deck.cards.push(new Card(4,'Cards/Spades/4-Spade.png'));
    deck.cards.push(new Card(3,'Cards/Spades/3-Spade.png'));
    deck.cards.push(new Card(2,'Cards/Spades/2-Spade.png'));
    deck.cards.push(new Card(1,'Cards/Spades/A-Spade.png'));

    deck.cards.push(new Card(10,'Cards/Clubs/K-Club.png'));
    deck.cards.push(new Card(10,'Cards/Clubs/Q-Club.png'));
    deck.cards.push(new Card(10,'Cards/Clubs/J-Club.png'));
    deck.cards.push(new Card(10,'Cards/Clubs/10-Club.png'));
    deck.cards.push(new Card(9,'Cards/Clubs/9-Club.png'));
    deck.cards.push(new Card(8,'Cards/Clubs/8-Club.png'));
    deck.cards.push(new Card(7,'Cards/Clubs/7-Club.png'));
    deck.cards.push(new Card(6,'Cards/Clubs/6-Club.png'));
    deck.cards.push(new Card(5,'Cards/Clubs/5-Club.png'));
    deck.cards.push(new Card(4,'Cards/Clubs/4-Club.png'));
    deck.cards.push(new Card(3,'Cards/Clubs/3-Club.png'));
    deck.cards.push(new Card(2,'Cards/Clubs/2-Club.png'));
    deck.cards.push(new Card(1,'Cards/Clubs/A-Club.png'));
}
