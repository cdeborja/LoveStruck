var Util = require("./util");
var MovingObject = require("./movingObject");
var Heart = require("./heart");

var Spitball = function (options) {
  options.radius = Spitball.RADIUS;

  MovingObject.call(this, options);
};

Spitball.RADIUS = 3;
Spitball.SPEED = 15;

Util.inherits(Spitball, MovingObject);

Spitball.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Letter") {
    this.game.remove(this);
    index = this.game.letters.indexOf(otherObject);
    if (index > -1) {
      this.game.letters.splice( index,1);
    }
    this.game.score += 10;
  }
};

Spitball.prototype.isWrappable = false;
Spitball.prototype.type = "Spitball";

module.exports = Spitball;
