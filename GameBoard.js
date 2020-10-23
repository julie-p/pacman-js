import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from './setup';

class GameBoard {
    constructor(DOMGrid) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid = DOMGrid;
    };

    showGameStatus(gameWin) {
        //Display if game is over or won 
        //Create a div and attach it to gameboard
        const div = document.createElement('div');
        div.classList.add('game-status');
        div.innerHTML = `${gameWin ? 'GG !' : 'GAME OVER !'}`;
        this.DOMGrid.appendChild(div);
    };

    createGrid(level) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid.innerHTML = '';
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

        //Loop throught each elements with our level 
        //Create new div on each element
        //Set the classList to a square
        //Apply a class depending on the value of each square
        //Apply styling to set cell size on each element 
        level.forEach(square => {
            const div = document.createElement('div');
            div.classList.add('square', CLASS_LIST[square]);
            div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
            this.DOMGrid.appendChild(div);
            this.grid.push(div);

            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
        });
    };

    addObject(pos, classes) {
        this.grid[pos].classList.add(...classes);
    };

    removeObject(pos, classes) {
        this.grid[pos].classList.remove(...classes);
    };

    objectExist = (pos, object) => {
        return this.grid[pos].classList.contains(object);
    };

    //Method to rotate Pacman on the grid
    rotateDiv(pos, deg) {
        this.grid[pos].style.transform = `rotate(${deg}deg)`;
    };

    //Static method
    static createGameBoard(DOMGrid, level) {
        const board = new this(DOMGrid);
        board.createGrid(level);
        return board;
    };

    //Method to move pacman
};

export default GameBoard; 