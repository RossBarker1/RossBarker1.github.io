var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "obstacle", x: 400, y: groundY - 15, hitSize: 25, damage: 20, image: "icicle", scale: 0.125, offset: -45 },
          { type: "obstacle", x: 600, y: groundY - 15, hitSize: 25, damage: 20, image: "icicle", scale: 0.125, offset: -45 },
          { type: "obstacle", x: 900, y: groundY - 15, hitSize: 25, damage: 20, image: "icicle", scale: 0.125, offset: -45 },


          { type: "obstacle", x: 1500, y: groundY - 15, hitSize: 25, damage: 30, image: "rock", scale: 0.25, offset: -65 },
          { type: "obstacle", x: 2200, y: groundY - 15, hitSize: 25, damage: 30, image: "rock", scale: 0.25, offset: -65 },

          { type: "enemy", x: 800, y: groundY - 35, speed: 3, damage: 10, image: "snowman", scale: 0.5 },
          { type: "enemy", x: 1000, y: groundY - 35, speed: 6, damage: 10, image: "snowman", scale: 0.5 },
          { type: "enemy", x: 1200, y: groundY - 35, speed: 9, damage: 10, image: "snowman", scale: 0.5 },

          { type: "reward", x: 2000, y: groundY - 50, speed: 3, image: "snowball", scale: 0.25 },
          
          { type: "level", x: 2500, y: groundY - 50, speed: 2, image: "snowflake", scale: 0.05 },
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "obstacle", x: 400, y: groundY - 15, hitSize: 25, damage: 20, image: "icicle", scale: 0.125, offset: -45 },
          { type: "obstacle", x: 550, y: groundY - 15, hitSize: 25, damage: 20, image: "icicle", scale: 0.125, offset: -45 },
          { type: "obstacle", x: 700, y: groundY - 15, hitSize: 25, damage: 20, image: "icicle", scale: 0.125, offset: -45 },
          { type: "obstacle", x: 850, y: groundY - 15, hitSize: 25, damage: 20, image: "icicle", scale: 0.125, offset: -45 },
          { type: "obstacle", x: 975, y: groundY - 15, hitSize: 25, damage: 20, image: "icicle", scale: 0.125, offset: -45 },

          { type: "enemy", x: 1200, y: groundY - 35, speed: 15, damage: 10, image: "snowman", scale: 0.5 },
          { type: "enemy", x: 1500, y: groundY - 35, speed: 25, damage: 10, image: "snowman", scale: 0.5 },

          { type: "reward", x: 2300, y: groundY - 50, speed: 4, image: "present", scale: 0.075 },

        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
