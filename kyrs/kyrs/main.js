var bird = "bird";
var pipe = "pipe";
var jump = "jump";
var play = "play";
var qwerty=0;
function qwer()
{
	document.getElementById('fon').style.display='none';
    document.getElementById('sec').style.display='inline';
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
        if(qwerty == 1)
            {
                document.getElementById('G_O').style.display='inline';
                StartStop();
                qwerty=0;
            } 
        if(this.bird.y < 0 || this.bird.y > 1080)
            this.restartGame(); 
            
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
        qwerty=1;
        game.state.start('main');
        
        
    },    
};

var game = new Phaser.Game(1290,1080);
game.state.add('main', mainState);
game.state.start('main');
}













var base = 60; 
var clocktimer,dateObj,dh,dm,ds,ms; 
var readout=''; 
var h=1,m=1,tm=1,s=0,ts=0,ms=0,init=0; 
function ClearСlock() { 
clearTimeout(clocktimer); 
h=1;m=1;tm=1;s=0;ts=0;ms=0; 
init=0;
readout='00:00:00.00'; 
document.getElementById('stopwatch').innerHTML = readout; 
} 


function StartTIME() { 
    var cdateObj = new Date(); 
    var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
    if (t>999) 
        s++;  
    if (s>=(m*base)) 
    { 
        ts=0; 
        m++; 
    } 
    else 
    { 
        ts=parseInt((ms/100)+s); 
        if(ts>=base) { ts=ts-((m-1)*base); } 
    } 
    if (m>(h*base)) 
    { 
        tm=1; 
        h++; 
    } 
    else 
    { 
        tm=parseInt((ms/100)+m); 
        if(tm>=base) 
        { 
            tm=tm-((h-1)*base); 
        } 
    } 
    ms = Math.round(t/10); 
    if (ms>99) 
    ms=0; 
    if (ms==0) 
    ms='00'; 
    if (ms>0&&ms<=9) 
    ms = '0'+ms;  
    if (ts>0) 
    { 
        ds = ts; 
        if (ts<10) 
            ds = '0'+ts;     
    } 
    else 
    ds = '00';  
    dm=tm-1; 
    if (dm>0) 
    { 
        if (dm<10)  
            dm = '0'+dm;
    } 
    else 
    dm = '00'; 
    dh=h-1; 
    if (dh>0) 
    { 
        if (dh<10)  
            dh = '0'+dh; 
    }
     else  
    dh = '00'; 
    readout = dh + ':' + dm + ':' + ds + '.' + ms; 
    document.getElementById('stopwatch').innerHTML = readout; 
    clocktimer = setTimeout("StartTIME()",1); 
} 
function StartStop() 
{ 
    if (init==0)
    { 
		ClearСlock();
		dateObj = new Date(); 
		StartTIME(); 
		init=1; 
    } 
    else 
    { 
		clearTimeout(clocktimer);
		init=0;
	} 
}