var Game = require('./game');
var GameView = require('./gameView');

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
var Game = require('./game');

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
