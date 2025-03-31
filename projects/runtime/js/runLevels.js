var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createObstacles(x, y, hitSize, damage) {
      var hitZoneSize = hitSize; // define the size of the hitzone and assign it to a variable
      var damageFromObstacle = damage; // defines the amount of damage obsticle causes and assigns it to a variable
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates the obstacle hitzone using the size and damage as parameters and assigns it to a variable
      obstacleHitZone.x = x; // sets the x cordinate of the obstacle
      obstacleHitZone.y = y; // sets the y cordinate of the obstacle
      game.addGameItem(obstacleHitZone); // adds the obstacle hitzone to the game 
      var obstacleImage = draw.bitmap("img/sawblade.png"); // draw the image bitmap and store it in obstacleImage
      obstacleHitZone.addChild(obstacleImage); // attaches the image to the obstacle hitzone
      obstacleImage.x = -25; // position the image on the hitzone's x value by moving it 25 pixels left
      obstacleImage.y = -25; // position the image on the hitzone's x value by moving it 25 pixels up
      obstacleHitZone.rotationalVelocity = 50; // makes the sawblade spin

    }
    //createObstacles(400, groundY - 50, 25, 10);
    //createObstacles(600, groundY - 50, 25, 20);
    //createObstacles(900, groundY - 50, 25, 60);


    function createEnemy(x, y, speed) {
      var enemy = game.createGameItem("enemy", 25); // creates enemy game itema dn adds it to game
      var redSquare = draw.rect(50, 50, "red"); //  creates a red square and stores it in the variable redSquare
      redSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      redSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      enemy.addChild(redSquare); // add the red square as a child to our enemy variable
      enemy.x = x; // x position of enemy
      enemy.y = y; // y position of enemy
      game.addGameItem(enemy); // add enemy to the game
      enemy.velocityX -= speed; // controlling how fast the enemy moves on the x axis
      enemy.rotationalVelocity = 2; // makes the enemy spin
  
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10); // makes the enemy take away 10 health from Hallebot
        
      };
      enemy.onProjectileCollision = function() {
        game.increaseScore(100); // increases your score when Halle shoots the enemy
        enemy.fadeOut(); // enemy fades out when halle shoots enemy
        //enemy.shrink();
        //enemy.flyTo(x,y);
      }
    }
    //for(var i = 0; i < 10; i++) {
    //  createEnemy(400 + 200*i, groundY - 50, i*2);
    //}

    //createEnemy(800, groundY-50, 3);
    //createEnemy(1000, groundY-50, 6);
    //createEnemy(1200, groundY-50, 9);

    function createReward(x, y, speed) {
      var reward = game.createGameItem("reward", 25); // creates reward game itema dn adds it to game
      var blueSquare = draw.rect(50, 50, "blue"); //  creates a red square and stores it in the variable redSquare
      blueSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      blueSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      reward.addChild(blueSquare); // add the red square as a child to our reward variable
      reward.x = x; // x position of reward
      reward.y = y; // y position of reward
      game.addGameItem(reward); // add reward to the game
      reward.velocityX -= speed; // controlling how fast the reward moves on the x axis
      reward.rotationalVelocity = 2; // makes the reward spin
  
      reward.onPlayerCollision = function () {
        game.changeIntegrity(10); // makes the reward take away 10 health from Hallebot

      };

    }
    //createReward(1000, groundY-50, 3);

    function createLevel(x, y, speed) {
      var reward = game.createGameItem("level", 25); // creates reward game itema dn adds it to game
      var yellowSquare = draw.rect(50, 50, "yellow"); //  creates a red square and stores it in the variable redSquare
      yellowSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      yellowSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      reward.addChild(yellowSquare); // add the red square as a child to our reward variable
      reward.x = x; // x position of reward
      reward.y = y; // y position of reward
      game.addGameItem(reward); // add reward to the game
      reward.velocityX -= speed; // controlling how fast the reward moves on the x axis
      reward.rotationalVelocity = 2; // makes the reward spin
  
      reward.onPlayerCollision = function () {
        reward.shrink()
        startLevel();
      };
    }
    //createLevel(1500, groundY-50, 2);


    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]; // fetches the currenLevel from the levelData array and stores it in var level
      var levelObjects = level.gameItems // retrive the array of gameItems and stores it in levelObjects

      for(var i = 0; i < levelObjects.length; i++) {
        var element = levelObjects[i];
        if(element.type === "sawblade") { // checks the type key:value of the gameItems to determine which objects to manifest
          createObstacles(element.x, element.y, element.hitSize, element.damage); // if the condition is true, it will call the relevant function. 
        }
        if(element.type === "enemy") { // checks the type key:value of the gameItems to determine which objects to manifest
          createEnemy(element.x, element.y, element.speed); // if the condition is true, it will call the relevant function. 
        }
        if(element.type === "reward") { // checks the type key:value of the gameItems to determine which objects to manifest
          createReward(element.x, element.y, element.speed); // if the condition is true, it will call the relevant function. 
        }
        if(element.type === "level") { // checks the type key:value of the gameItems to determine which objects to manifest
          createLevel(element.x, element.y, element.speed); // if the condition is true, it will call the relevant function. 
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
