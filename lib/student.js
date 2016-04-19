var Student = require("./student");
var MovingObject = require("./movingObject");
var Util = require("./util");
var Spitball = require("./spitball");

var randomStudentImage = ["./images/girl_student_ponytail.png",
"./images/girl_student_ponytail_1.png", "./images/boy_student.png", "./images/boy_student_1.png",
"./images/girl_student_pigtails.png", "./images/girl_student_pigtails_1.png"];

var Student = function (options) {
  options.radius = Student.RADIUS;
  options.vel = options.vel || [0, 0];
  this.student_image = new Image();
  this.student_image.src = randomStudentImage[Math.floor( Math.random() * randomStudentImage.length)];

  MovingObject.call(this, options);
};

Student.prototype.type = "Student";

Student.RADIUS = 15;

Util.inherits(Student, MovingObject);

Student.prototype.sendSpitball = function () {

  var spitballVel = [0, -10];

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
