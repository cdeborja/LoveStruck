var Util = require("./util");
var MovingObject = require("./movingObject");
var Student = require("./student");

var DEFAULTS = {
	COLOR: "#FFFFFF",
	RADIUS: 15,
	SPEED: 4.5
};

var Letter = function (options) {
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.lanePosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = Util.downVec(DEFAULTS.SPEED);
	this.heart_image = new Image ();
	this.heart_image.src = "./images/letter.png";
  MovingObject.call(this, options);
};

Util.inherits(Letter, MovingObject);

Letter.prototype.draw = function (ctx) {
	ctx.drawImage(this.heart_image, (this.pos[0] - 20), (this.pos[1]-20) );
};

Letter.prototype.type = "Letter";

module.exports = Letter;
