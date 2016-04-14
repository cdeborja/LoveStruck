var Student = require("./student");
var MovingObject = require("./movingObject");
var Util = require("./util");
var Bullet = require("./bullet");

function randomColor() {
  var hexDigits = "0123456789ABCDEF";

  var color = "#";
  for (var i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

var Student = function (options) {
  options.radius = Student.RADIUS;
  options.vel = options.vel || [0, 0];
  options.color = options.color || randomColor();

  MovingObject.call(this, options);
};

Student.prototype.type = "Student";

Student.RADIUS = 15;

Util.inherits(Student, MovingObject);

// Student.prototype.fireBullet = function () {
//   var norm = Util.norm(this.vel);
//
//   if (norm == 0) {
//     // Can't fire unless moving.
//     return;
//   }
//
//   var relVel = Util.scale(
//     Util.dir(this.vel),
//     Bullet.SPEED
//   );
//
//   var bulletVel = [
//     relVel[0] + this.vel[0], relVel[1] + this.vel[1]
//   ];
//
//   var bullet = new Bullet({
//     pos: this.pos,
//     vel: bulletVel,
//     color: this.color,
//     game: this.game
//   });
//
//   this.game.add(bullet);
// };

// Student.prototype.power = function (impulse) {
//   this.vel[0] += impulse[0];
//   this.vel[1] += impulse[1];
// };
//
// Student.prototype.relocate = function () {
//   this.pos = this.game.randomPosition();
//   this.vel = [0, 0];
// };

  //400 and 600 are the window dimensions
Student.prototype.changeLeftStudentRight = function () {
  this.pos = [400 * 0.375, 600 * 0.875];
  this.vel = [0, 0];
};

Student.prototype.changeLeftStudentLeft = function () {
  this.pos = [400 * 0.125, 600 * 0.875];
  this.vel = [0, 0];
};
Student.prototype.changeRightStudentRight = function () {
  this.pos = [400 * 0.875, 600 * 0.875];
  this.vel = [0, 0];
};

Student.prototype.changeRightStudentLeft = function () {
  this.pos = [400 * 0.625, 600 * 0.875];
  this.vel = [0, 0];
};


Student.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Heart") {
    window.alert("You have been love struck! GAME OVER");
  }
};

Student.prototype.type = "Student";

module.exports = Student;
