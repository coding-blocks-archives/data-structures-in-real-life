let config = {
    type:Phaser.AUTO,
    
    scale:{
        mode:Phaser.Scale.FIT,
        width : 800,
        height :600,
    },
    
    backgroundColor : 0xffff11,
    
    physics:{
        default:'arcade',
        arcade :{
            gravity:{
                y:1000, 
            },
            debug:false,
        }
    },
    
    scene : {
     preload:preload,
     create : create,
     update : update,
    }
};


let game = new Phaser.Game(config);

let player_config = {
    player_speed : 150,
    player_jumpspeed : -700,
}


function preload(){
    this.load.image("ground","Assets/topground.png");
    this.load.image("sky","Assets/background.png");
    this.load.image("apple","Assets/apple.png");
    this.load.spritesheet("dude","Assets/dude.png",{frameWidth:32,frameHeight:48});
    
    this.load.image("ray","Assets/ray.png");
    
    
    
    
    
    
}
function create(){
    W = game.config.width;
    H = game.config.height;
    
    //add tilesprites
    let ground = this.add.tileSprite(0,H-128,W,128,'ground');
    ground.setOrigin(0,0);
    
    //try to create a background
    let background = this.add.sprite(0,0,'sky');
    background.setOrigin(0,0);
    background.displayWidth = W;
    background.displayHeight = H;
    background.depth = -2;
    
    //create rays on the top of the background
    let rays = [];
    
    for(let i=-10;i<=10;i++){
        let ray = this.add.sprite(W/2,H-100,'ray');
        ray.displayHeight = 1.2*H;
        ray.setOrigin(0.5,1);
        ray.alpha = 0.2;
        ray.angle = i*20;
        ray.depth = -1;
        rays.push(ray);
    }
    console.log(rays);
    
    //tween
    this.tweens.add({
        targets: rays,
        props:{
            angle:{
                value : "+=20"
            },
        },
        duration : 8000,
        repeat : -1
    });
    
    
    
    
    this.player = this.physics.add.sprite(100,100,'dude',4);
    console.log(this.player);
    //set the bounce values
    this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);
    //player animations and player movements
    
    this.anims.create({
        key : 'left',
        frames: this.anims.generateFrameNumbers('dude',{start:0,end:3}),
        frameRate : 10,
        repeat : -1
    });
    this.anims.create({
        key : 'center',
        frames: [{key:'dude',frame:4}],
        frameRate : 10,
    });
    this.anims.create({
        key : 'right',
        frames: this.anims.generateFrameNumbers('dude',{start:5,end:8}),
        frameRate : 10,
        repeat : -1
    });
    
    
    // keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
    
    
    
    //Add a group of apples = physical objects
    let fruits = this.physics.add.group({
        key: "apple",
        repeat : 8,
        setScale : {x:0.2,y:0.2},
        setXY : {x:10,y:0,stepX:100},
    });
    
    //add bouncing effect to all the apples
    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4,0.7));
    });
    
    //create more platforms
    let platforms = this.physics.add.staticGroup();
    platforms.create(500,350,'ground').setScale(2,0.5).refreshBody();
    platforms.create(700,200,'ground').setScale(2,0.5).refreshBody();
    platforms.create(100,200,'ground').setScale(2,0.5).refreshBody();
    platforms.add(ground);
    
    this.physics.add.existing(ground,true);
   // ground.body.allowGravity = false;
    //ground.body.immovable = true;
    
    
    
    //add a collision detection between player and ground
    this.physics.add.collider(platforms,this.player);
    //this.physics.add.collider(ground,fruits);
    this.physics.add.collider(platforms,fruits);
    this.physics.add.overlap(this.player,fruits,eatFruit,null,this);
    
    //create cameras
    this.cameras.main.setBounds(0,0,W,H);
    this.physics.world.setBounds(0,0,W,H);
    
    this.cameras.main.startFollow(this.player,true,true);
    this.cameras.main.setZoom(1.5);
    
}

function update(){
    
    if(this.cursors.left.isDown){
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play('left',true);
    }
    else if(this.cursors.right.isDown){
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play('right',true);
    }
    else{
        this.player.setVelocityX(0);
        this.player.anims.play('center');
    }
    
    //add jumping ability , stop the player when in air
    if(this.cursors.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(player_config.player_jumpspeed);
    }
    
}

function eatFruit(player,fruit){
    fruit.disableBody(true,true);
}