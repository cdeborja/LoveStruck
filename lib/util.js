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

  // Drops hearts and letters down
  downVec : function (length) {
    var deg = 2 * Math.PI;
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  // Shoots spitballs up
  upVec : function (length) {
    var deg = Math.PI;
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
  }
};

$(document).ready(function(){

  // Checks initial size of window
  checkSize();

  // run test on resize of windown
  $(window).resize(checkSize);

    function checkSize() {
      // changes font size on messages
      if (window.innerWidth  < 800) {
        $(".welcome").css("font-size", "14px");
        $(".over").css("font-size", "14px");
      } else {
        $(".welcome").css("font-size", "20px");
        $(".over").css("font-size", "20px");
      }
      //changes canvas size
      var canvs = document.getElementById("canvas");
      if (window.innerHeight > 600) {
        canvs.height = 600;
      }
      else {
        canvs.height =  (window.innerHeight);
      }
      canvs.width = 400 * (canvs.height/600);
    }

var Game = require('./game');

    // to begin game
    $('.button').click(function(event){
        event.preventDefault();
        $(".welcome").addClass("hidden");
        $(".over").addClass("hidden");
        $("#canvas").removeClass("hidden");
        var game = new Game();
        new GameView(game, ctx).start();
      });

    // start a new game without reloading
    $('.button1').click(function(event){
        event.preventDefault();
        $(".welcome").removeClass("hidden");
        $(".over").addClass("hidden");
        $("#canvas").addClass("hidden");
      });

});


module.exports = Util;
