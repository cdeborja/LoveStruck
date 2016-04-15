var Student = require("./student");
var MovingObject = require("./movingObject");
var Util = require("./util");
var Spitball = require("./spitball");

// function randomColor() {
//   var hexDigits = "0123456789ABCDEF";
//
//   var color = "#";
//   for (var i = 0; i < 3; i ++) {
//     color += hexDigits[Math.floor((Math.random() * 16))];
//   }
//
//   return color;
// }

var Student = function (options) {
  options.radius = Student.RADIUS;
  options.vel = options.vel || [0, 0];
  // options.color = options.color || randomColor();
  this.student_image = new Image();
  this.student_image.src = "./images/boy_hat.jpg";

  MovingObject.call(this, options);
};

Student.prototype.type = "Student";

Student.RADIUS = 15;

Util.inherits(Student, MovingObject);

Student.prototype.sendSpitball = function () {
  // var norm = Util.norm([0,1]);

  // if (norm == 0) {
  //   // Can't fire unless moving.
  //   return;
  // }

  // var relVel = Util.scale(
  //   Util.dir(this.vel),
  //   Spitball.SPEED
  // );

  var spitballVel = [
    0, -10
  ];

  var spitball = new Spitball({
    pos: this.pos,
    vel: spitballVel,
    color: "#FFFFFF",
    game: this.game
  });

  this.game.add(spitball);
};

Student.prototype.draw = function (ctx) {
	ctx.drawImage(this.student_image, (this.pos[0] - 20), (this.pos[1]-20) );
};

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
  if ((otherObject.type === "Heart") || (otherObject.type === "Letter")){
    this.game.hit = true;
  }
};

Student.prototype.type = "Student";

module.exports = Student;
