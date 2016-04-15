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
  key("w", function () { student.sendSpitball(); });
};

GameView.prototype.bindRightKeyHandlers = function () {
  var student = this.rightStudent;

  key("right", function () { student.changeRightStudentRight(); });
  key("left", function () { student.changeRightStudentLeft(); });
  key("up", function () { student.sendSpitball(); });
};

GameView.prototype.start = function () {
  if (!localStorage.cosmicRushHighScore) {
    localStorage.setItem("loveStruckHighScore", 0);
  }
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
  this.game.drawLetters(this.ctx);
  this.game.drawHearts(this.ctx);
  this.lastTime = time;

  if (this.game.gameOver()) {
    return this.stop();
  }

  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.stop = function () {
  window.cancelAnimationFrame(this.result);
  $(".over").removeClass("hidden");

};

module.exports = GameView;
