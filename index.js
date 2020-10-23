import { LEVEL, OBJECT_TYPE } from '/setup';
//Classes
import GameBoard from './GameBoard';

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

};

function checkCollision(pacman, ghosts) {

};

function gameLoop(pacman, ghosts) {

};

function startGame() {

};