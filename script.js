const px = "px";
var enemiesInterval;
var totalScore = 0;
var obstaclesLocation = [];
function fillObstaclesLocation() {
  obstaclesLocation.splice(0, obstaclesLocation.length);
  let obstacles = document.querySelectorAll(".obstacle");
  for (const obst of obstacles) obstaclesLocation.push(obst);
  for (const obj of headquaters.object.childNodes)
    if (obj instanceof Brick) obstaclesLocation.push(obj);
  obstaclesLocation.push(headquaters.head);
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function gameOver() {
  playerTank.shield = false;
  let shield = document.querySelector(".shield");
  if (shield) shield.remove();
  clearInterval(enemiesInterval);
  let gameOverLettering = document.createElement("div");
  gameOverLettering.classList.add("gameOver");
  field.append(gameOverLettering);
  gameOverLettering.style.bottom = "0px";
  gameOverLettering.style.left = getComputedStyle(headquaters.object).left;
  gameOverLettering.style.transition = "3s ease-in-out";
  gameOverLettering.style.bottom =
    parseInt(getComputedStyle(field).height) / 2 + px;
  setTimeout(() => {
    for (const tank of levelEnemies) {
      if (tank != null) tank.destroy(false);
    }
    playerTank.destroy(false);
    gameSpace.textContent = "";
    scoring(false);
  }, 5000);
}
function scoring(f = true) {
  playerTank.shield = false;
  let shield = document.querySelector(".shield");
  if (shield) shield.remove();
  field.textContent = "";
  gameSpace.textContent = "";
  gameSpace.style.backgroundColor = "black";
  gameSpace.classList.add("scoreDisplay");
  let stage = document.createElement("h1");
  stage.textContent = "STAGE " + stageNumber.textContent;
  stage.style.color = "white";
  let playerDiv = document.createElement("div");
  let playerNum = document.createElement("h3");
  let playerScore = document.createElement("h3");
  playerNum.textContent = "PLAYER";
  playerNum.style.color = "brown";
  playerScore.textContent = totalScore;
  playerScore.style.color = "yellow";
  playerDiv.append(playerNum, playerScore);
  let tanksScore = document.createElement("div");
  let scoreContainer = fillScoreContainer();
  tanksScore.append(scoreContainer, document.createElement("hr"));
  let total = document.createElement("h2");
  total.style.color = "white";
  total.textContent = "TOTAL " + enemyFrags.length;
  tanksScore.append(total);
  gameSpace.append(stage, playerDiv, tanksScore);
  if (f) {
    nextlvl = function () {
      if (lvl < levelArray.length)
        setTimeout(() => {
          lvl++;
          startLevel(lvl);
          window.removeEventListener("keydown", nextlvl);
        }, 1000);
    };
    window.addEventListener("keydown", nextlvl);
  } else {
  }
}

/* */

function fillScoreContainer() {
  let scoreContainer = document.createElement("div");
  scoreContainer.style.width = "162px";
  let scoreNumbers = document.createElement("div");
  let frags = document.createElement("div");
  let tanks = document.createElement("div");
  tanks.style.display = "flex";
  tanks.style.flexDirection = "column";
  tanks.style.justifyContent = "space-between";

  for (i = 0; i < 4; i++) {
    let enemiesCount = 0;
    for (const frag of enemyFrags)
      switch (i) {
        case 0:
          if (frag == "ordinarytank") enemiesCount++;
          break;
        case 1:
          if (frag == "fasttank") enemiesCount++;
          break;
        case 2:
          if (frag == "rapidfiretank") enemiesCount++;
          break;
        case 3:
          if (frag == "armoredtank") enemiesCount++;
          break;
      }
    let num = document.createElement("h1");
    num.style.color = "white";
    switch (i) {
      case 0:
        num.textContent = enemiesCount * 100;
        scoreNumbers.append(num);
        break;
      case 1:
        num.textContent = enemiesCount * 200;
        scoreNumbers.append(num);
        break;
      case 2:
        num.textContent = enemiesCount * 300;
        scoreNumbers.append(num);
        break;
      case 3:
        num.textContent = enemiesCount * 400;
        scoreNumbers.append(num);
        break;
    }
  }
  for (i = 0; i < 4; i++) {
    let enemiesCount = 0;
    for (const frag of enemyFrags)
      switch (i) {
        case 0:
          if (frag == "ordinarytank") enemiesCount++;
          break;
        case 1:
          if (frag == "fasttank") enemiesCount++;
          break;
        case 2:
          if (frag == "rapidfiretank") enemiesCount++;
          break;
        case 3:
          if (frag == "armoredtank") enemiesCount++;
          break;
      }
    let num = document.createElement("h1");
    num.style.color = "white";
    num.textContent = enemiesCount;
    frags.append(num);
  }
  for (i = 0; i < 4; i++) {
    let enemyImg = document.createElement("div");
    enemyImg.style.width = "32px";
    enemyImg.style.height = "32px";
    enemyImg.style.backgroundSize = "32px 32px";
    switch (i) {
      case 0:
        enemyImg.style.backgroundImage =
          "url(sprites/tanks/enemies/OrdinaryTank/up1.png)";
        break;
      case 1:
        enemyImg.style.backgroundImage =
          "url(sprites/tanks/enemies/FastTank/up1.png)";
        break;
      case 2:
        enemyImg.style.backgroundImage =
          "url(sprites/tanks/enemies/RapidFireTank/up1.png)";
        break;
      case 3:
        enemyImg.style.backgroundImage =
          "url(sprites/tanks/enemies/ArmoredTank/up1.png)";
        break;
    }
    tanks.append(enemyImg);
  }
  scoreContainer.style.display = "flex";
  scoreContainer.style.justifyContent = "space-between";
  scoreContainer.append(scoreNumbers, frags, tanks);
  return scoreContainer;
}

/* */

function levelConvertor(lvl) {
  let el;
  for (let str of lvl) {
    for (const obj of str) {
      switch (obj) {
        case 0:
          el = document.createElement("div");
          el.classList.add("container");
          field.append(el);
          break;

        case 1:
          el = document.createElement("div");
          el.classList.add("container");
          for (let i = 0; i < 4; i++) new Brick().create(el);
          field.append(el);
          break;

        case 2:
          el = document.createElement("div");
          el.classList.add("container");
          for (let i = 0; i < 4; i++) new Concrete().create(el);
          field.append(el);
          break;

        case 3:
          el = document.createElement("div");
          el.classList.add("container");
          for (let i = 0; i < 4; i++) new Water().create(el);
          field.append(el);
          break;
        case 4:
          el = document.createElement("div");
          el.classList.add("container");
          for (let i = 0; i < 4; i++) new Bush().create(el);
          field.append(el);
          break;

        /* case 5:
          el = document.createElement("div");
          el.classList.add("container");
          for (let i = 0; i < 4; i++) new Ice().create(el);
          field.append(el);
          break; */
      }
    }
  }
}
function enemiesConvertor(enemiesArray) {
  let index = 0;
  let tankNumber = 1;
  let x;

  enemiesInterval = setInterval(() => {
    let enemies = 0;
    for (const i of levelEnemies) if (i != null) enemies++;
    if (enemies < 3 && enemiesCount.lastChild != null) {
      enemiesCount.lastChild.remove();
      switch (tankNumber) {
        case 1:
          x = 240;
          break;
        case 2:
          x = 480;
          break;
        case 3:
          x = 0;
          break;
      }
      switch (enemiesArray.shift()) {
        case 0:
          levelEnemies[index] = new OrdinaryTank(x, 0, index + 1);
          levelEnemies[index].create();
          break;
        case 1:
          levelEnemies[index] = new FastTank(x, 0, index + 1);
          levelEnemies[index].create();
          break;
        case 2:
          levelEnemies[index] = new RapidFireTank(x, 0, index + 1);
          levelEnemies[index].create();
          break;
        case 3:
          levelEnemies[index] = new ArmoredTank(x, 0, index + 1);
          levelEnemies[index].create();
          break;
      }
      if (enemiesArray.length == 0) {
        clearInterval(enemiesInterval);
      }
      index++;
      if (tankNumber == 3) tankNumber = 1;
      else tankNumber++;
    }
  }, 5000);
}

let levelEnemies = [];
let headquaters;
let playerTank;
var enemyFrags = [];

function titleMenu() {
  gameSpace.textContent = "";
  gameSpace.style.backgroundColor = "black";
  let menu = document.createElement("div");
  menu.classList.add("menu");
  let title = document.createElement("div");
  title.classList.add("title");
  let playChoice = document.createElement("div");
  playChoice.classList.add("playChoice");
  let choice1 = document.createElement("div");
  let choice2 = document.createElement("div");
  let text1 = document.createElement("h3");
  let text2 = document.createElement("h3");
  text1.style.color = "white";
  text2.style.color = "white";
  text1.style.fontWeight = "600";
  text2.style.fontWeight = "600";
  text1.style.fontSize = "1.75rem";
  text2.style.fontSize = "1.75rem";
  text1.textContent = "PLAY";
  choice1.append(text1);
  text2.textContent = "CONSTRUCTOR";
  choice2.append(text2);
  let cursor = document.createElement("div");
  cursor.classList.add("tankCursor");
  playChoice.append(cursor, choice1, choice2);
  menu.append(title, playChoice);
  gameSpace.append(menu);
  let selected = 1;
  let titleEvents = function (event) {
    switch (event.code) {
      case "KeyW":
        if (selected == 2) {
          cursor.style.top = "0";
          selected = 1;
        } else if (selected == 1) {
          cursor.style.top = "35px";
          selected = 2;
        }
        break;
      case "KeyS":
        if (selected == 1) {
          cursor.style.top = "35px";
          selected = 2;
        } else if (selected == 2) {
          cursor.style.top = "0";
          selected = 1;
        }
        break;
      case "Space":
      case "Enter":
        if (selected == 1) {
          startGame();
          window.removeEventListener("keydown", titleEvents);
        } else if (selected == 2) {
          startConstructor();
          window.removeEventListener("keydown", titleEvents);
        }
    }
  };
  window.addEventListener("keydown", titleEvents);
}

function startLevel(lvlNumber) {
  gameSpace.classList.remove("scoreDisplay");
  gameSpace.style.backgroundColor = "rgb(100, 100, 100)";
  gameSpace.textContent = "";
  field.textContent = "";
  enemiesCount.textContent = "";
  gameSpace.append(field, infoPanel);
  levelConvertor(levelArray[lvlNumber]);
  enemyFrags.splice(0, enemyFrags.length);
  playerTank = new Player(160, 480);
  playerTank.create();
  headquaters = new Headquarters();
  fillObstaclesLocation();
  gamePress = function (event) {
    if (playerTank.life) playerTank.press(event);
  };
  window.addEventListener("keydown", gamePress);
  for (i = 0; i < 20; i++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemyIcon");
    enemiesCount.append(enemy);
  }
  lifesCount.textContent = lifes;
  stageNumber.textContent = lvlNumber + 1;
  enemiesConvertor(enemiesArray[lvlNumber]);
  let levelEnd = setInterval(() => {
    let enemies = 0;
    for (const i of levelEnemies) {
      if (i != null) enemies++;
    }
    if (enemiesArray[lvlNumber].length == 0 && enemies == 0) {
      clearInterval(levelEnd);
      window.removeEventListener("keydown", gamePress);
      setTimeout(() => {
        scoring(true);
      }, 1000);
    }
  }, 5000);
}
let lvl = 0;
function startGame() {
  gameSpace.textContent = "";
  gameSpace.style.backgroundColor = "rgb(100, 100, 100)";
  let stageNumber = document.createElement("h1");
  stageNumber.textContent = "STAGE " + (lvl + 1);
  stageNumber.style.fontSize = "30px";
  gameSpace.append(stageNumber);
  levelChoice = function (event) {
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        if (lvl < levelArray.length - 1) {
          lvl++;
          stageNumber.textContent = "STAGE " + (lvl + 1);
        }
        break;
      case "KeyS":
      case "ArrowDown":
        if (lvl > 0) {
          lvl--;
          stageNumber.textContent = "STAGE " + (lvl + 1);
        }
        break;
      case "Space":
      case "Enter":
        setTimeout(() => {
          window.removeEventListener("keydown", levelChoice);
          startLevel(lvl);
        }, 1000);
    }
  };
  window.addEventListener("keydown", levelChoice);
}
function startConstructor() {
  gameSpace.textContent = "";
  gameSpace.style.backgroundColor = "rgb(100, 100, 100)";
  gameSpace.append(field, infoPanel);
  let lvl = createLevel();
  levelConvertor(lvl);
  let frame = document.createElement("div");
  frame.classList.add("frame");
  field.append(frame);
  let x = 0,
    y = 0;
  constructorEvents = function (event) {
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        if (y > 0) {
          y--;
          frame.style.top = parseInt(getComputedStyle(frame).top) - 32 + px;
        }
        break;
      case "KeyS":
      case "ArrowDown":
        if (y < 15) {
          y++;
          frame.style.top = parseInt(getComputedStyle(frame).top) + 32 + px;
        }
        break;
      case "KeyA":
      case "ArrowLeft":
        if (x > 0) {
          x--;
          frame.style.left = parseInt(getComputedStyle(frame).left) - 32 + px;
        }
        break;
      case "KeyD":
      case "ArrowRight":
        if (x < 15) {
          x++;
          frame.style.left = parseInt(getComputedStyle(frame).left) + 32 + px;
        }
        break;
      case "Space":
        if (lvl[y][x] < 5) lvl[y][x]++;
        if (lvl[y][x] == 5) lvl[y][x] = 0;
        field.textContent = "";
        levelConvertor(lvl);
        field.append(frame);
        frame.style.top = y * 32 + px;
        frame.style.left = x * 32 + px;
        break;
      case "Enter":
        console.log(JSON.stringify(lvl));
        levelArray[0] = lvl;
        startGame();
        window.removeEventListener("keydown", constructorEvents);
        break;
    }
  };
  window.addEventListener("keydown", constructorEvents);
}
titleMenu();
