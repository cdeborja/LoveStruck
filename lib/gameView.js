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

  key("right", function () { student.changeRightStudentRight(this.game); });
  key("left", function () { student.changeRightStudentLeft(this.game); });
  key("up", function () { student.sendSpitball(); });
};

GameView.prototype.handleStartKeyHandler = function () {

  if (this.game.hit) {
    key("enter", function () {
      $(".welcome").removeClass("hidden");
      $(".over").addClass("hidden");
      $("#canvas").addClass("hidden");
    });
  } else {
    // NEED TO FIGURE OUT HOW TO DISABLE KEY PRESS AFTER RESTARTING GAME
    $("body").keypress(function (evt) {
      var charCode = evt.charCode || evt.keyCode;
      if (charCode  == 13) { //Enter key's keycode
        return false;
      }
  });
  }
};

GameView.prototype.start = function () {
  if (!localStorage.loveStruckHighScore) {
    localStorage.setItem("loveStruckHighScore", 0);
  }

  this.handleStartKeyHandler();
  this.bindLeftKeyHandlers();
  this.bindRightKeyHandlers();
  this.lastTime = 0;
  this.game.running = true;
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
    this.game.running = false;
    this.handleStartKeyHandler();
    return this.stop();
  } else {
  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
  }
};

GameView.prototype.stop = function () {
  window.cancelAnimationFrame(this.result);
  $(".over").removeClass("hidden");

};

module.exports = GameView;
