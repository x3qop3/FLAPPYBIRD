var bird = "bird";
var pipe = "pipe";
var jump = "jump";
var play = "play";
function qwer()
{
	document.getElementById('fon').style.display='none';
	var mainState = {
    preload: function() {
		game.load.image('play', play.png);
        game.load.audio('jump', jump.wav);
        game.load.image('bird',bird.png);
        game.load.image('pipe' , pipe.png);
    },
    create: function(){
        
        game.stage.backgroundColor = '#71c5cf';
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.bird = game.add.sprite(100,245,'bird');
        
        game.physics.arcade.enable(this.bird);
        
        this.bird.body.gravity.y = 500;
        
        var spaceKey = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        
        this.pipes = game.add.group();
        this.timer = game.time.events.loop(2000, this.addRowOfPipes, this);
        
        this.score = 0 - 3;
        this.labelScore = game.add.text(20,20, "0",
        {font: "30px Arial" , fill: "#ffffff"});
                       
        this.bird.anchor.setTo(-0.2, 0.5);
        this.jumpSound = game.add.audio('jump');
        this.jumpSound.play();
        
    },
    
    update: function(){
        if(this.bird.y < 0 || this.bird.y > 1080)
            this.restartGame()
		;
        if(this.bird.angle < 20)
            this.bird.angle += 1;
        game.physics.arcade.overlap(
        this.bird, this.pipes, this.restartGame, null, this);
       
    },
    
    addOnePipe: function(x,y) {
        var pipe = game.add.sprite(x,y,'pipe');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);
        pipe.body.velocity.x= -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    addRowOfPipes: function(){
        var hole= Math.floor(Math.random() *10) +2;
        for (var i=0; i<25; i++)
            if (i !=hole && i !=hole + 1 && i !=hole + 2)
                this.addOnePipe(1290, i * 60 + 10);
        this.score +=1;
        this.labelScore.text= this.score;
    },
    
    jump: function() {
        this.bird.body.velocity.y = -300;
        var animation = game.add.tween(this.bird);
        animation.to({angle: -20}, 100);
        animation.start();
        if(this.bird.alive == false)
            return;
    },
    
    restartGame: function() {
		alert(this.score);
		window.location.reload();
    },    
};

var game = new Phaser.Game(1290,1080);
game.state.add('main', mainState);
game.state.start('main');
}

