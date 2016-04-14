var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.leftStudent = this.game.addLeftStudent();
  this.rightStudent = this.game.addRightStudent();
};

GameView.prototype.bindLeftKeyHandlers = function () {
  var ship = this.leftStudent;

  key("d", function () { ship.changeLeftStudentRight(); });
  key("a", function () { ship.changeLeftStudentLeft(); });
};

GameView.prototype.bindRightKeyHandlers = function () {
  var ship = this.rightStudent;

  key("right", function () { ship.changeRightStudentRight(); });
  key("left", function () { ship.changeRightStudentLeft(); });
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
