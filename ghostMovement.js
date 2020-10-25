import { DIRECTIONS, OBJECT_TYPE } from './setup';

//Primitive random moves 
export function randomMoves(position, direction, objectExist) {
    let dir = direction;
    let nextMovePos = position + dir.movement;
    //Create an array from directions object keys 
    const keys = Object.keys(DIRECTIONS);

    //Prevent ghost from running into walls or other ghosts
    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) || 
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {
        //Random key from key array (for random movements)
        const key = keys[Math.floor(Math.random() * keys.length)];
        //Set next move 
        dir = DIRECTIONS[key];
        nextMovePos = position + dir.movement;
    };
    return { nextMovePos, direction: dir };
};