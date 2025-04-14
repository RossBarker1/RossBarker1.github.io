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
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createObstacles(x, y, hitSize, damage, image, scale, offset) {
      var hitZoneSize = hitSize; // define the size of the hitzone and assign it to a variable
      var damageFromObstacle = damage; // defines the amount of damage obsticle causes and assigns it to a variable
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates the obstacle hitzone using the size and damage as parameters and assigns it to a variable
      obstacleHitZone.x = x; // sets the x cordinate of the obstacle
      obstacleHitZone.y = y; // sets the y cordinate of the obstacle
      game.addGameItem(obstacleHitZone); // adds the obstacle hitzone to the game 
      var obstacleImage = draw.bitmap(`img/${image}.png`); // draw the image bitmap and store it in obstacleImage
      obstacleImage.scaleX = scale; // scales the image
      obstacleImage.scaleY = scale; // scales the image
      obstacleHitZone.addChild(obstacleImage); // attaches the image to the obstacle hitzone
      obstacleImage.x = offset; // position the image on the hitzone's x value by moving it 25 pixels left
      obstacleImage.y = offset; // position the image on the hitzone's x value by moving it 25 pixels up

    }
    //createObstacles(400, groundY - 50, 25, 10);
    //createObstacles(600, groundY - 50, 25, 20);
    //createObstacles(900, groundY - 50, 25, 60);


    function createEnemy(x, y, speed, damage, image, scale) {
      var enemy = game.createGameItem("enemy", 25); // creates enemy game itema dn adds it to game
      var enemyImage = draw.bitmap(`img/${image}.png`) //  creates a bitmap image from the image provided by the user
      enemyImage.x = -50; // offsets the image from the hitzone by -25 pixels
      enemyImage.y = -62; // offsets the image from the hitzone by -25 pixels
      enemyImage.scaleX = scale; // scales the image
      enemyImage.scaleY = scale; // scales the image
      enemy.addChild(enemyImage); // add the red square as a child to our enemy variable
      enemy.x = x; // x position of enemy
      enemy.y = y; // y position of enemy
      game.addGameItem(enemy); // add enemy to the game
      enemy.velocityX -= speed; // controlling how fast the enemy moves on the x axis
      // enemy.rotationalVelocity = 2; // makes the enemy spin
  
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-damage); // makes the enemy take away 10 health from Hallebot
        
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

    function createReward(x, y, speed, image, scale) {
      var reward = game.createGameItem("reward", 25); // creates reward game item and adds it to game
      var rewardImage = draw.bitmap(`img/${image}.png`); // draws a bitmap image from the image provided by the user
      rewardImage.scaleX = scale; // scales the image
      rewardImage.scaleY = scale; // scales the image
      rewardImage.x = -42; // offsets the image from the hitzone by a set amount of pixels
      rewardImage.y = -42; // offsets the image from the hitzone by a set amount of pixels
      reward.addChild(rewardImage); // add the rewardImage as a child to our reward variable
      reward.x = x; // x position of reward
      reward.y = y; // y position of reward
      game.addGameItem(reward); // add reward to the game
      reward.velocityX -= speed; // controlling how fast the reward moves on the x axis
  
      reward.onPlayerCollision = function () {
        game.changeIntegrity(10); // makes the reward take away 10 health from Hallebot
        reward.shrink(); // makes the reward shrink when Halle collides with it
      };

    }
    //createReward(1000, groundY-50, 3);

    function createLevel(x, y, speed, image, scale) {
      var reward = game.createGameItem("level", 25); // creates level game item and adds it to game
      var levelImage = draw.bitmap(`img/${image}.png`); // draws an image from the image provided by the user
      levelImage.x = -25; // offsets the image from the hitzone by -25 pixels
      levelImage.y = -25; // offsets the image from the hitzone by -25 pixels
      levelImage.scaleX = scale; // scales the image
      levelImage.scaleY = scale; // scales the image
      reward.addChild(levelImage); // add the image as a child to our level variable
      reward.x = x; // x position of level
      reward.y = y; // y position of level
      game.addGameItem(reward); // add level to the game
      reward.velocityX -= speed; // controlling how fast the level moves on the x axis
      reward.rotationalVelocity = 2; // makes the level spin
  
      reward.onPlayerCollision = function () {
        reward.shrink() // makes the level shrink when Halle collides with it
        startLevel(); // calls the startLevel function
      };
    }
    //createLevel(1500, groundY-50, 2);


    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]; // fetches the currenLevel from the levelData array and stores it in var level
      var levelObjects = level.gameItems // retrive the array of gameItems and stores it in levelObjects

      for(var i = 0; i < levelObjects.length; i++) {
        var element = levelObjects[i];
        if(element.type === "obstacle") { // checks the type key:value of the gameItems to determine which objects to manifest
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.scale, element.offset); // if the condition is true, it will call the relevant function. 
        }
        if(element.type === "enemy") { // checks the type key:value of the gameItems to determine which objects to manifest
          createEnemy(element.x, element.y, element.speed, element.damage, element.image, element.scale); // if the condition is true, it will call the relevant function. 
        }
        if(element.type === "reward") { // checks the type key:value of the gameItems to determine which objects to manifest
          createReward(element.x, element.y, element.speed, element.image, element.scale); // if the condition is true, it will call the relevant function. 
        }
        if(element.type === "level") { // checks the type key:value of the gameItems to determine which objects to manifest
          createLevel(element.x, element.y, element.speed, element.image, element.scale); // if the condition is true, it will call the relevant function. 
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
