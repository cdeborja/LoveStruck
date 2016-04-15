// USE LATER TO DESTROY OTHER OBJECTS

var Util = require("./util");
var MovingObject = require("./movingObject");
var Heart = require("./heart");

var Spitball = function (options) {
  options.radius = Spitball.RADIUS;

  MovingObject.call(this, options);
};

Spitball.RADIUS = 2;
Spitball.SPEED = 15;

Util.inherits(Spitball, MovingObject);

Spitball.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Heart") {
    this.remove();
    index = this.game.hearts.indexOf(otherObject);
    // otherObject.remove();
    if (index > -1) {
      this.game.hearts.splice( index,1);
    }
    this.game.score += 10;
  }
};

Spitball.prototype.isWrappable = false;
Spitball.prototype.type = "Spitball";

module.exports = Spitball;
