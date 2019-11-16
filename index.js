var balls = [];
var nbBalles = 42;
var VMAX = 15;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;


function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}



function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}


Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};


Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  else if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  else if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};


Ball.prototype.collisionDetect = function(balle2) {
      var dx = this.x - balle2.x;
      var dy = this.y - balle2.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balle2.size) {
        return (true)
      }
};


 

while(balls.length < nbBalles) {
  var size = random(10,20);
  var ball = new Ball(

    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-VMAX,VMAX),
    random(-VMAX,VMAX),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  balls.push(ball);
}



function loop() {
  ctx.fillStyle = 'rgba(0,0,0)';
  ctx.clearRect(0,0,width,height);

  for(var i = 0; i < balls.length; i++) {
    for(var j = i+1 ; j < balls.length ; j++)
    {
      if (balls[i].collisionDetect(balls[j]))
      {
        
      balls.splice(i,1)
      balls.splice(j,1)
      }    
      else
      {
        balls[i].draw();
        balls[i].update();
      }
    }
  }

  requestAnimationFrame(loop);
}



loop();