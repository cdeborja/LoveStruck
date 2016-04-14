var Util = require("./util");
var MovingObject = require("./movingObject");
var Student = require("./student");

var DEFAULTS = {
	COLOR: "#ea5388",
	RADIUS: 15,
	SPEED: 3
};

var Heart = function (options = {}) {
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.lanePosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = Util.downVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};

Util.inherits(Heart, MovingObject);

Heart.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Student") {
    // this.remove();
    // otherObject.remove();
  }
};

Heart.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

Heart.prototype.type = "Heart";

module.exports = Heart;
