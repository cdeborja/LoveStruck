var Heart = require("./heart");
var Spitball = require("./spitball");
var Student = require("./student");
var Letter = require("./letter");

var Game = function () {
  this.hearts = [];
  this.spitballs = [];
  this.students = [];
  this.letters = [];
  this.score = 0;
  this.highScore = localStorage.loveStruckHighScore || 0;
  this.heartRate = 820;
  this.letterRate = 1450;
  this.hit = false;
  this.running = false;
  this.heartTimeout = setTimeout(this.addHearts.bind(this), this.heartRate);
  this.letterTimeout = setTimeout(this.addLetters.bind(this), this.letterRate);
  this.DIM_X = 400;
  this.DIM_Y = 600;
};

Game.prototype.addHearts = function () {
  if (!this.hit) {
    this.add(new Heart({ game: this }));
    this.score += 1;
    this.heartRate *= 0.99;
    this.heartTimeout = setTimeout(this.addHearts.bind(this), this.heartRate);
  } else {
    return;
  }
};
Game.prototype.addLetters = function () {
  if (!this.hit) {
    this.add(new Letter({ game: this }));
    this.letterRate *= 0.999;
    this.letterTimeout = setTimeout(this.addLetters.bind(this), this.letterRate);
  } else {
    return;
  }
};

Game.BG_COLOR = "#eac7a7";
Game.FPS = 32;

Game.prototype.add = function (object) {
  if (object.type === "Heart") {
    this.hearts.push(object);
  } else if (object.type === "Spitball") {
    this.spitballs.push(object);
  } else if (object.type === "Student") {
    this.students.push(object);
  } else if (object.type === "Letter") {
    this.letters.push(object);
  } else {
    throw "wtf?";
  }
};

Game.prototype.addLeftStudent = function () {
  var student = new Student({
    pos: this.leftStartingPosition(),
    game: this,
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
  return [].concat(this.students, this.hearts, this.letters, this.spitballs);
};

Game.prototype.checkCollisions = function () {
  var game = this;

  this.allObjects().forEach(function (obj1) {
    game.allObjects().forEach(function (obj2) {
      if (obj1 == obj2) {
        // don't allow self-collision
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
Game.prototype.drawLetters = function (ctx) {
  this.letters.forEach(function (object) {
    object.draw(ctx);
  });
},

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

  this.drawLines();
  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });

  this.drawScore();
  if (this.score > this.highScore) {
    localStorage.setItem("loveStruckHighScore", this.score);
    this.highScore = this.score;
  }
};

// Draws hallway
Game.prototype.drawLines = function () {

    ctx.beginPath();
    for (var yCoor = 0; yCoor < 1; yCoor += 0.05 ) {
      ctx.moveTo(this.DIM_X * 0.25, this.DIM_Y * yCoor);
      yCoor += 0.05;
      ctx.lineTo(this.DIM_X * 0.25, this.DIM_Y * yCoor);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.DIM_X * 0.50,0);
    ctx.lineTo(this.DIM_X * 0.50, this.DIM_Y);
    ctx.stroke();

    ctx.beginPath();
    for (var yCoor2 = 0; yCoor2 < 1; yCoor2 += 0.05 ) {
      ctx.moveTo(this.DIM_X * 0.75, this.DIM_Y * yCoor2);
      yCoor2 += 0.05;
      ctx.lineTo(this.DIM_X * 0.75, this.DIM_Y * yCoor2);
    }
    ctx.stroke();
};

Game.prototype.isOutOfBounds = function (pos) {
  return (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > this.DIM_X) || (pos[1] > this.DIM_Y);
};

Game.prototype.drawScore = function(){
    ctx.font = "30px Lobster";
    ctx.fillStyle = 'white';
    ctx.fillText("Score: " + this.score, 10, 60);
    ctx.fillText("High Score: " + this.highScore, 10, 30);
};

Game.prototype.moveObjects = function (delta) {
  this.allObjects().forEach(function (object) {
    object.move(delta);
  });
};

Game.prototype.removeObjects = function () {
  gameBinder = this;
  this.allObjects().forEach(function (object) {
    if (gameBinder.isOutOfBounds(object.pos)) {
      gameBinder.remove(object);
    }
  });
};

Game.prototype.lanePosition = function () {
  return [
    this.DIM_X * [0.125, 0.375, 0.625, 0.875][Math.floor(Math.random() * 4)],
    0
  ];
};

Game.prototype.leftStartingPosition = function () {
  return [
    this.DIM_X * 0.125,
    this.DIM_Y * 0.875
  ];
};

Game.prototype.rightStartingPosition = function () {
  return [
    this.DIM_X * 0.875,
    this.DIM_Y * 0.875
  ];
};

Game.prototype.gameOver = function(){
  if (this.hit) {
        return true;
    }
    return false;
};

Game.prototype.remove = function (object) {
  if (object instanceof Spitball) {
    this.spitballs.splice(this.spitballs.indexOf(object), 1);
  } else if (object instanceof Heart) {
    this.hearts.splice(this.hearts.indexOf(object), 1);
  } else if (object instanceof Letter) {
    this.letters.splice(this.letters.indexOf(object), 1);
  } else if (object instanceof Student) {
    this.students.splice(this.students.indexOf(object), 1);
  } else {
    throw "error";
  }
};

Game.prototype.step = function (delta) {
  this.moveObjects(delta);
  this.removeObjects();
  this.checkCollisions();
};

module.exports = Game;
