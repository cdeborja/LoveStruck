var Heart = require("./heart");
var Bullet = require("./bullet");
var Student = require("./student");

var Game = function () {
  this.hearts = [];
  this.bullets = [];
  this.students = [];
  this.score = 0;
  this.startValue = 600;
  // this.interval = setInterval(this.addHearts.bind(this), this.startValue);
  this.timeout = setTimeout(this.addHearts.bind(this), this.startValue);
};

Game.prototype.addHearts = function () {
  this.add(new Heart({ game: this }));
  this.score += 1;
  console.log(this.score);
  this.startValue *= 0.995;
  this.timeout = setTimeout(this.addHearts.bind(this), this.startValue);
};

Game.BG_COLOR = "#0f4965";
Game.DIM_X = 400;
Game.DIM_Y = 600;
Game.FPS = 32;

Game.prototype.add = function (object) {
  if (object.type === "Heart") {
    this.hearts.push(object);
  } else if (object.type === "Bullet") {
    this.bullets.push(object);
  } else if (object.type === "Student") {
    this.students.push(object);
  } else {
    throw "wtf?";
  }
};

Game.prototype.addLeftStudent = function () {
  var student = new Student({
    pos: this.leftStartingPosition(),
    game: this
  });

  this.add(student);

  return student;
};

Game.prototype.addRightStudent = function () {
  var student = new Student({
    pos: this.rightStartingPosition(),
    game: this
  });

  this.add(student);

  return student;
};

Game.prototype.allObjects = function () {
  return [].concat(this.students, this.hearts, this.bullets);
};

Game.prototype.checkCollisions = function () {
  var game = this;

  this.allObjects().forEach(function (obj1) {
    game.allObjects().forEach(function (obj2) {
      if (obj1 == obj2) {
        // don't allow self-collisio
        return;
      }

      if (obj1.isCollidedWith(obj2)) {
        obj1.collideWith(obj2);
      }
    });
  });
};
//
Game.prototype.drawHearts = function (ctx) {
  this.hearts.forEach(function (object) {
    object.draw(ctx);
  });
},

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });

  ctx.beginPath();
  ctx.moveTo(Game.DIM_X * 0.25,0);
  ctx.lineTo(Game.DIM_X * 0.25, Game.DIM_Y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(Game.DIM_X * 0.50,0);
  ctx.lineTo(Game.DIM_X * 0.50, Game.DIM_Y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(Game.DIM_X * 0.75,0);
  ctx.lineTo(Game.DIM_X * 0.75, Game.DIM_Y);
  ctx.stroke();
};

Game.prototype.isOutOfBounds = function (pos) {
  return (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
};

Game.prototype.moveObjects = function (delta) {
  this.allObjects().forEach(function (object) {
    object.move(delta);
  });
};

Game.prototype.moveHearts = function (delta) {
  this.hearts.forEach(function (object) {
    object.move(delta);
  });
};

Game.prototype.lanePosition = function () {
  return [
    Game.DIM_X * [0.125, 0.375, 0.625, 0.875][Math.floor(Math.random() * 4)],
    0
  ];
};

Game.prototype.leftStartingPosition = function () {
  return [
    Game.DIM_X * 0.125,
    Game.DIM_Y * 0.875
  ];
};

Game.prototype.rightStartingPosition = function () {
  return [
    Game.DIM_X * 0.875,
    Game.DIM_Y * 0.875
  ];
};

Game.prototype.remove = function (object) {
  if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if (object instanceof Heart) {
    var idx = this.hearts.indexOf(object);
    this.hearts[idx] = new Heart({ game: this });
  } else if (object instanceof Student) {
    this.students.splice(this.students.indexOf(object), 1);
  } else {
    throw "wtf?";
  }
};

Game.prototype.step = function (delta) {
  this.moveObjects(delta);
  this.moveHearts(delta);
  this.checkCollisions();
};

module.exports = Game;
