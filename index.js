import { LEVEL, OBJECT_TYPE } from '/setup';
import { randomMoves } from './ghostMovement';
//Classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';

//DOM Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

//Game constants
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; //ms (global speed for the game loop)
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

//Inital Setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false; //When Pacman eats a power pill
let powerPillTimer = null;

function gameOver(pacman, grid) {
    document.removeEventListener('keydown', e => 
        pacman.handleKeyInput(e, gameBoard.objectExist)
    );

    gameBoard.showGameStatus(gameWin);

    clearInterval(timer);

    startButton.classList.remove('hide');
};

function checkCollision(pacman, ghosts) {
    //Calculate which ghosts Pacman collides with
    const collidedGhost = ghosts.find( ghost => pacman.pos === ghost.pos);

    if (collidedGhost) {
        if (pacman.powerPill) {
            gameBoard.removeObject(collidedGhost.pos, [
                OBJECT_TYPE.GHOST, 
                OBJECT_TYPE.SCARED, 
                collidedGhost.name
            ]);
            collidedGhost.pos = collidedGhost.startPos;
            socre += 100;
        } else {
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        };
    };
};

function gameLoop(pacman, ghosts) {
    //Move Pacman & check collisions
    gameBoard.moveCharacter(pacman);
    checkCollision(pacman, ghosts);
    //Move Ghosts & check collisions
    ghosts.forEach(ghost => gameBoard.moveCharacter(ghost));
    checkCollision(pacman, ghosts);
};

function startGame() {
    gameWin = false;
    powerPillActive = false;
    score = 0;

    startButton.classList.add('hide');

    //Create game grid each time a new game is created
    gameBoard.createGrid(LEVEL);

    //Create Pacman
    const pacman = new Pacman(2, 287);
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
    document.addEventListener('keydown', e =>
        pacman.handleKeyInput(e, gameBoard.objectExist)
    );

    //Create ghosts
    const ghosts = [
        new Ghost(5, 188, randomMoves, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMoves, OBJECT_TYPE.PINKY),
        new Ghost(3, 230, randomMoves, OBJECT_TYPE.INKY),
        new Ghost(2, 251, randomMoves, OBJECT_TYPE.CLYDE)
    ]

    //Interval to run the game loop Function
    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
};

//Initialize game 
startButton.addEventListener('click', startGame);