
fountainFunction = function(color) {
  var DAMPING = 0.9999;
  var GRAVITY = 0.3;
  var DROP_COUNT = 1000;
  var DROP_COLOR = color;
  function Particle(x, y) {
    this.x = this.oldX = x;
    this.y = this.oldY = y;
  }
  Particle.prototype.integratez = function() {
    var velocity = this.getVelocity();
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += velocity.x * DAMPING;
    this.y += velocity.y * DAMPING;
  };
  Particle.prototype.getVelocity = function() {
    return {
      x: this.x - this.oldX,
      y: this.y - this.oldY
    };
  };
  Particle.prototype.move = function(x, y) {
    this.x += 1*x;
    this.y += 1*y;
  };
  Particle.prototype.bounce = function() {
    if (this.y > height) {
      var velocity = this.getVelocity();
      this.oldY = height;
      this.y = this.oldY - velocity.y * 0.3;
    }
  };
  Particle.prototype.draw = function() {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.oldX, this.oldY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  };
  var display = document.getElementById('canvasDisplay');
  var ctx = display.getContext('2d');
  var drops = [];
  var width = display.width = window.innerWidth;
  var height = display.height = window.innerHeight;
  ctx.globalCompositeOperation = 'overlay';
  requestAnimationFrame(frame);
  function frame() {
    requestAnimationFrame(frame);
    ctx.clearRect(0, 0, width, height);
    for (var j = 0; j < 5; j++) {
      if (drops.length < DROP_COUNT) {
        var drop = new Particle(width * 0.5, height);
        drop.move(Math.random() * 4 - 2, Math.random() * -2 - 15);
        drops.push(drop);
      }
    }
    for (var i = 0; i < drops.length; i++) {
      drops[i].move(0, GRAVITY);
      drops[i].integratez();
      drops[i].bounce();
      drops[i].draw();
    }
  }
}

fountainFunction("red");
//h1.addEventListener("click", fountainFunction("red"));
