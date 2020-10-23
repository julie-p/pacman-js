import { OBJECT_TYPE, DIRECTIONS } from './setup';

class Pacman {
    constructor(speed, startPos) {
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.powerPill = false;
        this.rotation = true; //So Pacman can rotate
    };

    shouldMove() {
        //Check if Pacman is rdy to move or not
        if (!this.dir) return false;

        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        };
        this.timer++;
    };

    //Method to calculate next move for Pacman
    getNextMove(objectExist) {
        let nextMovePos =  this.pos + this.dir.movement; //dir.movement from setup.js

        if (
            objectExist(nextMovePos, OBJECT_TYPE.WALL) || 
            objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
        ) {
            nextMovePos = this.pos; //If Pacman collides with a wall or ghost = set the pos to the current pos
        }
        return { nextMovePos, direction: this.dir };
    };

    makeMove() {
        //From the pos, remove the pacman class & add it to new pos
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return { classesToRemove, classesToAdd };
    };

    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
    };

    handleKeyInput(e, objectExist) {
        let dir;

        //Check which key is pressed
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            dir = DIRECTIONS[e.key];
        } else {
            return;
        };

        //Check if there is no wall to move
        const nextMovePos = this.pos + dir.movement;
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;
        this.dir = dir;
    };
};

export default Pacman;