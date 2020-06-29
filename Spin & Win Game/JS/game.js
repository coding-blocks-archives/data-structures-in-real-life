//Hello World of Phaser = Basic Game = Single Scene in Spin & Win Game
// How to create the basic skeleton for the game -> Game Loop

let prizes_config = {
    counts:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}



let config = {
    type : Phaser.CANVAS,
    width : 800,
    height:600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
   
};
let game = new Phaser.Game(config);
let music;
let count1 = 0;
let str_count;
let count;

function preload(){
    console.log("Preload");
    //load object, load some images
    this.load.image('background','../Assets/back.jpg');
    console.log(this);
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
    this.load.image('button','../Assets/button.png')
    this.load.audio('sound','../Assets/spin-sound.mp3')
       
}
function create(){
    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
     //lets create the stand
    let stand = this.add.sprite(W/2,H/2 + 250,'stand');
    stand.setScale(0.25);
    
    //lets create a pin
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25);
    pin.depth = 1;
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25); 
    //this.wheel.alpha = 0.5;
    
    //create button
     this.button = this.add.sprite(W/2,H/2,"button").setInteractive({ useHandCursor: true });
    this.button.setScale(0.45); 
    
    
    
    //event listener for button click
    this.button.on("pointerdown",spinwheel,this);


    //create music
    music = this.sound.add("sound");
    

    
    //lets create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);

    count1 = localStorage.getItem("count");
    //new feature that calculates total no of spin on a machine
    this.count_text = this.add.text(500,10,"Spin Count :" + count1,font_style);
    
    
}

//Game Loop
function update(){
    console.log("Inside Update");
    //this.wheel.angle += 1;
}

function spinwheel(){
    
    console.log("You clicked the mouse");
    console.log("Start spinning");
    //this.game_text.setText("You clicked the mouse!");

    music.play();
    
    let rounds = Phaser.Math.Between(2,4);
    this.button.removeInteractive();
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.counts - 1 - Math.floor(degrees/(360/prizes_config.counts));
    
    
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope:this,
        onComplete:function(){
            // str_count = localStorage.getItem("count");
            // if (str_count == null || str_count == "null" ){
            //     count = 0;
            //   } else {
            //     count = parseInt(str_count);
            //   } // end if
            //   //increment count
            //   count++;
            //   localStorage.setItem("count", count);
            this.game_text.setText("You won " + prizes_config.prize_names[idx]);
            // count1++;
            // this.count_text.setText("Spin Counted :" + count1);

            
                str_count = localStorage.getItem("count");
                //get a numeric value from str_count, put it in count
                if (str_count == null || str_count == "null" || str_count == "undefined" || str_count == "NaN"){
                  count = 0;
                } else {
                  count = parseInt(str_count);
                } // end if
                //increment count
                count++;
                
                this.count_text.setText("Spin Counted :" + count);

                //store count
                localStorage.setItem("count", count);
               // end count





            music.stop();
            this.button.setInteractive({ useHandCursor: true });
        },
    });
    
}






