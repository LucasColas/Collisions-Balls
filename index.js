
var canvas, context, frametime, before = Date.now(), now;

var nbBalls = 25;
var Balls = [];
var speed = 2000;
var radiusc = 8;


window.onload = function() {
	canvas = document.getElementById("canvas1");
    context = canvas.getContext("2d");
    addBall();
    animate();

    var interval = this.setInterval(this.resizeCanvas(), 1000);

}



function animate() {
	FPS();
	context.clearRect(0, 0, canvas.width, canvas.height);
	CheckCollision();
	animateBalls();
	requestAnimationFrame(animate);
}

function FPS() {
	now = Date.now();
	frametime = (now-before) / 1000;
	before = now;
}



class Ball {

	constructor(x, y, vx, vy, radius, r, g, b) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.radius = radius; 
		this.r = r;
		this.g = g;
		this.b = b;

	}

	Draw() {
		this.x = this.x + this.vx*frametime;
		this.y = this.y + this.vy*frametime;
		context.fillStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		context.closePath();
		context.fill();


		if(this.vx > 0 ) {
            if(this.x + this.radius >= canvas.width) {
                this.vx = -this.vx;
            }
        } else {
            if(this.x - this.radius <= 0) {
                this.vx = -this.vx;
            }
        }

        if (this.vy > 0 ) {
            if(this.y + this.radius >= canvas.height) {
                this.vy = -this.vy;
            }
        } else {
            if(this.y - this.radius <= 0) {
                this.vy = -this.vy;
            }
        }
	}

	Distance(ball) {
		var distance = Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2)
		return Math.sqrt(distance)
	}	

}



function animateBalls() {
	for (i = 0; i <= Balls.length-1 ; i++) {
		Balls[i].Draw();
	}

}


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
} 

function addBall() {
	for (var j = 0; j < nbBalls ; j++) {
		Balls.push(new Ball
			(
			Math.random()*canvas.width,
			Math.random()*canvas.height,
			(Math.random())*speed,
			(Math.random())*speed,
			(Math.random()+3,5)*radiusc,
			Math.random()*255,
			Math.random()*255,
			Math.random()*255,
			))

	}
}

function CheckCollision() {

	for(i = 0; i <= Balls.length-1; i++) {
		for(j = 0; j <= Balls.length-1; j++) {
			var distance = Balls[j].Distance(Balls[i]);

			if (distance < (Balls[j].radius + Balls[i].radius) && Balls[i] != Balls[j]) {
				if (i > j) {
					Balls.splice(i, 1);
					Balls.splice(j, 1);

				} else {
					Balls.splice(j, 1);
					Balls.splice(i, 1);
				}
			}
		}
	}

}
