var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; // variable to hold a single circle when creating circles / iterating
        var circles = []; // variable to store all circles in one Array

        // TODO 2 : Create a function that draws a circle 
        function drawCircle() {
            // Code to draw a circle
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2); // create a circle inside the canvas boundary and assign it to circle
            physikz.addRandomVelocity(circle, canvas); // adds a random velocity to circle
            view.addChild(circle); // adds the circle to view which makes it visible
            circles.push(circle); // pushes circle to the end of the array circles
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        for (var i = 0; i < 100; i++) {
            drawCircle(); // runs 100 times, running the function drawCircle everytime
        }
        //drawCircle(); // replaced old hardcoded function calls with for loop to be more effiencent
        //drawCircle();
        //drawCircle();
        //drawCircle();
        //drawCircle();
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() { // runs 60 times a second
            // TODO 4 : Update the circle's position //
            for (var i = 0; i < circles.length; i++) {
                physikz.updatePosition(circles[i]); // updates the postition of the circle for every circle in the array circles 60 times a second
            }
            // deleted hardcoded function calls to be more effienct and scalable
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            for (var i = 0; i < circles.length; i++) {
                game.checkCirclePosition(circles[i]); // iterates through the array circles and gets the position of every circle to keep them on the screen
            }
            // deleted hardcoded function calls to be more effienct and scalable

            // TODO 9 : Iterate over the array
           
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            var xRightEdge = circle.x + circle.radius; // variable for position of right edge of circle
            var xLeftEdge = circle.x - circle.radius; // variable for position of left edge of circle
            var yBottomEdge = circle.y + circle.radius; // variable for position of bottom edge of circle
            var yTopEdge = circle.y - circle.radius; // variable for position of top edge of circle

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( xLeftEdge > canvas.width ) {
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if (yTopEdge > canvas.height) {
                circle.y = 0; // if the circle has gone past the bottom of the screen it resets it to 0
            }

            if (yBottomEdge < 0 ) {
                circle.y = canvas.height; // if the circle has gone past the top of the screen it resets it to the bottom of the canvas
            }
            
            if (xRightEdge < 0) {
                circle.x = canvas.width; // if the circle has gone past the left of the screen it resets it to the right edge of the canvas
            }


            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
