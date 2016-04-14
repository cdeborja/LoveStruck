/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(6);
	
	document.addEventListener("DOMContentLoaded", function(){
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  var ctx = canvasEl.getContext("2d");
	  var game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Heart = __webpack_require__(7);
	var Bullet = __webpack_require__(2);
	var Student = __webpack_require__(8);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	// USE LATER TO DESTROY OTHER OBJECTS
	
	// var Util = require("./util");
	// var MovingObject = require("./movingObject");
	// var Asteroid = require("./asteroid");
	//
	// var Bullet = function (options) {
	//   options.radius = Bullet.RADIUS;
	//
	//   MovingObject.call(this, options);
	// };
	//
	// Bullet.RADIUS = 2;
	// Bullet.SPEED = 15;
	//
	// Util.inherits(Bullet, MovingObject);
	//
	// // Bullet.prototype.collideWith = function (otherObject) {
	// //   if (otherObject.type === "Asteroid") {
	// //     this.remove();
	// //     otherObject.remove();
	// //   }
	// // };
	//
	// Bullet.prototype.isWrappable = false;
	// Bullet.prototype.type = "Bullet";
	//
	// module.exports = Bullet;


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(5);
	
	var MovingObject = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	};
	
	MovingObject.prototype.collideWith = function (otherObject) {
	  ; // default do nothing
	};
	
	
	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  );
	  ctx.fill();
	};
	
	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  var centerDist = Util.dist(this.pos, otherObject.pos);
	  return centerDist < (this.radius + otherObject.radius);
	};
	
	MovingObject.prototype.isWrappable = false;
	
	var NORMAL_FRAME_TIME_DELTA = 1000/60;
	MovingObject.prototype.move = function (timeDelta) {
	  //timeDelta is number of milliseconds since last move
	  //if the computer is busy the time delta will be larger
	  //in this case the MovingObject should move farther in this frame
	  //velocity of object is how far it should move in 1/60th of a second
	  var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
	      offsetX = this.vel[0] * velocityScale,
	      offsetY = this.vel[1] * velocityScale;
	
	  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	
	};
	
	MovingObject.prototype.remove = function () {
	  this.game.remove(this);
	};
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Util = {
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir: function (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist: function (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm: function (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec : function (length) {
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	
	  downVec : function (length) {
	    var deg = 2 * Math.PI;
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale: function (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	  inherits: function (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass ;}
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  },
	};
	
	$(document).ready(function(){
	
	
	    // show popup when you click on the link
	    $('.button').click(function(event){
	        event.preventDefault();
	        $(".welcome").addClass("hidden");
	        $(".over").addClass("hidden");
	        $("#canvas").removeClass("hidden");
	        var game = new Game();
	        new GameView(game, ctx).start();
	      });
	
	
	      $('.button1').click(function(event){
	          event.preventDefault();
	          location.reload();
	        });
	
	
	
	
	});
	
	
	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var GameView = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	  this.leftStudent = this.game.addLeftStudent();
	  this.rightStudent = this.game.addRightStudent();
	};
	
	GameView.prototype.bindLeftKeyHandlers = function () {
	  var student = this.leftStudent;
	
	  key("d", function () { student.changeLeftStudentRight(); });
	  key("a", function () { student.changeLeftStudentLeft(); });
	};
	
	GameView.prototype.bindRightKeyHandlers = function () {
	  var student = this.rightStudent;
	
	  key("right", function () { student.changeRightStudentRight(); });
	  key("left", function () { student.changeRightStudentLeft(); });
	};
	
	GameView.prototype.start = function () {
	  this.bindLeftKeyHandlers();
	  this.bindRightKeyHandlers();
	  this.lastTime = 0;
	  //start the animation
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function(time){
	  var timeDelta = time - this.lastTime;
	
	  this.game.step(timeDelta);
	  this.game.draw(this.ctx);
	  this.game.drawHearts(this.ctx);
	  this.lastTime = time;
	
	  //every call to animate requests causes another call to animate
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(5);
	var MovingObject = __webpack_require__(4);
	var Student = __webpack_require__(8);
	
	var DEFAULTS = {
		COLOR: "#ea5388",
		RADIUS: 15,
		SPEED: 3
	};
	
	var Heart = function (options) {
	  options.color = DEFAULTS.COLOR;
	  options.pos = options.pos || options.game.lanePosition();
	  options.radius = DEFAULTS.RADIUS;
	  options.vel = Util.downVec(DEFAULTS.SPEED);
		this.heart_image = new Image ();
		this.heart_image.src = "./images/heart.png";
	  MovingObject.call(this, options);
	};
	
	Util.inherits(Heart, MovingObject);
	
	Heart.prototype.collideWith = function (otherObject) {
	  if (otherObject.type === "Student") {
	    // this.remove();
	    // otherObject.remove();
	  }
	};
	
	
	
	// ctx.beginPath();
	// ctx.arc(
	// 	this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	// );
	// ctx.fill();
	// ctx.fillStyle = this.color;
	Heart.prototype.draw = function (ctx) {
		debugger;
		this.heart_image;
	};
	
	Heart.prototype.type = "Heart";
	
	module.exports = Heart;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Student = __webpack_require__(8);
	var MovingObject = __webpack_require__(4);
	var Util = __webpack_require__(5);
	var Bullet = __webpack_require__(2);
	
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
	    // window.alert("You crashed! GAME OVER");
	  }
	};
	
	Student.prototype.type = "Student";
	
	module.exports = Student;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map