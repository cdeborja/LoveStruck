var Util = require("./util");
var MovingObject = require("./movingObject");
var Student = require("./student");

var DEFAULTS = {
	COLOR: "#ea5388",
	RADIUS: 15,
	SPEED: 5.5
};

var Heart = function (options) {
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.lanePosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = Util.downVec(DEFAULTS.SPEED);
	this.heart_image = new Image ();
	this.heart_image.src = "./images/heart0.png";
  MovingObject.call(this, options);
};

Util.inherits(Heart, MovingObject);

Heart.prototype.draw = function (ctx) {
	ctx.drawImage(this.heart_image, (this.pos[0] - 20), (this.pos[1]-20) );
};

Heart.prototype.type = "Heart";

module.exports = Heart;
