'use strict';

const gameBody = document.getElementsByClassName('game-body')[0];
const score = document.getElementsByClassName('score')[0];
const hardModButtons = document.getElementsByClassName('hard-mode');
const gameOver = document.querySelector('.game-over');
const wrapper = document.querySelector('.body__inner-wrapp');

const matrix = [];

document.addEventListener('click', restartGame);
document.addEventListener('keydown', moveBlock);
document.addEventListener('click', focusField);

createGameField();
putInEmptyCell();
putInEmptyCell();

function removeClass(cell) {
    cell.className = '';
    cell.classList.add('row-item');
    cell.innerHTML = '';
}

function firstKey(key) {
    return key == 0;
}

function lastKey(key) {
    return key == matrix.length - 1;
}

function focusField(event) {
    const target = event.target;
    target.blur();
}

function createGameField() {

    for (let x = 0; x < 4; x++) {

        const row = document.createElement('div');
        row.className = 'row';
        gameBody.append(row);
        
        matrix[x] = [];

        for (let y = 0; y < 4; y++) {

            const rowItem = document.createElement('div');
            rowItem.classList.add('row-item');
            row.append(rowItem);   
            matrix[x][y] = 0;
        }
    }
}

function checkEndGame() {

    for(let x = 0; x < 4; x++) {
        for(let y = 0; y < 4; y++) {

            if (matrix[x][y] == 0) {
                return false;
            }
            const nextCellKey = y + 1;
            const lowerCellKey = x + 1;

            if(lastKey(nextCellKey)){
                 
                if (matrix[x][y] == matrix[x][y + 1]) {
                    return false;
                }
               
            } else if(lastKey(lowerCellKey)) {
                if (matrix[x][y] == matrix[x][y + 1]) {
                    return false
                }
            }

            if (x < 3) {
                if (matrix[x][y] == matrix[x + 1][y]) {
                    return false;
                }
            }
            if (y < 3) {
                if (matrix[x][y] == matrix[x][y + 1]) {
                    return false
                }
            } 
        }
    }
    
    return true;
}

function restartGame(event) {

    const target = event.target;

    if (target.classList.contains('restart-button')) {
        
        for(let x = gameBody.children.length - 1; x >= 0; x--) {
            gameBody.children[x].remove();
        }
            
        if(gameOver.style.display == 'block') {
            gameOver.style.display = 'none';
        }
        if(target.closest('.you-win')) {
            wrapper.classList.remove('you-win');
        }

        score.firstElementChild.innerHTML = 0;
        createGameField();
        putInEmptyCell();
        putInEmptyCell();
    }
}

function putInEmptyCell() {
    
    const emptyCoords = getRandomCoords(matrix,0);

    if (!getRandomCoords(matrix,0)) {
        return
    }

    const value = getRandomIntForBlockValue();
    matrix[emptyCoords[0]][emptyCoords[1]] = value;
    score.firstElementChild.innerHTML = +score.firstElementChild.innerHTML + value;
    
    renderMatrix(matrix);
}

function hardModeEnable() {
    let hardModevalue = 1;
    let counter = 0;

    for(let btn of hardModButtons) {
        if (btn.checked) {
            hardModevalue = +btn.value;
        }
    }

    while (counter < hardModevalue) {
        putInEmptyCell();
        counter++;
    }
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomIntForBlockValue() {

    const numPool = [2, 2, 2, 4]; // 75% достать 2ку
    return numPool[getRandomInt(0, numPool.length - 1)];
}

function getRandomCoords(array,value) {
    let arr = [];
    for (let x = 0; x < array.length; x++) {
        
        for(let y = 0; y < array[x].length; y++) {
            if (array[x][y] === value) {
                arr.push([[x],[y]]);
            } 
        }
    } 
    return (!arr[0])? false : arr[getRandomInt(0, arr.length-1)];
}

function renderMatrix(matrix) {
    
    for(let x = 0; x < matrix.length; x++) {
        for(let y = 0; y < matrix.length; y++) {

            const cell = gameBody.children[x].children[y];
            if(!matrix[x][y])  continue;
            if(matrix[x][y] == 2048) {
                wrapper.classList.add('you-win');
            }
            cell.innerHTML = matrix[x][y];
            cell.className = 'block color'+ matrix[x][y];
            cell.classList.add('anim');
        }
    }
}



function moveBlock(event) {

    const keyCode = event.code;

    const accessKeys = [
        'KeyW', 'KeyD', 'KeyS', 'KeyA',
        'Numpad8', 'Numpad6', 'Numpad2', 'Numpad4',
        'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'
    ];

    if (!accessKeys.includes(keyCode)) return;

    switch (keyCode) {
        case 'KeyW':
        case 'Numpad8':
        case 'ArrowUp':

            moveUp();
            
            if(checkEndGame()) {
                return gameOver.style.display = 'block';
            }
            
            break;

        case 'KeyD':
        case 'Numpad6':
        case 'ArrowRight':

            moveRight();
            
            if(checkEndGame()) {
                return gameOver.style.display = 'block';
            } 
            
            break;

        case 'KeyS':
        case 'Numpad2':
        case 'ArrowDown':

            moveDown();
            
            if(checkEndGame()) {
                return gameOver.style.display = 'block';
            }
            
            break;

        case 'KeyA':
        case 'Numpad4':
        case 'ArrowLeft':

            moveLeft();
              
            if(checkEndGame()) {
                return gameOver.style.display = 'block';
            }
            
            break;
    }
    
}

function moveRight() {

    let isShifted = false;

    for(let x = 0; x < matrix.length; x++) {
        for(let y = matrix[x].length - 2; y >= 0; y--) {

            isShifted = moveHorizontal(x, y, true, lastKey) || isShifted;
        }
    } 

    if(isShifted) {
        hardModeEnable();
        isShifted = false;
    } 
    renderMatrix(matrix);
}

function moveLeft() {

    let isShifted = false;

    for(let x = 0; x < matrix.length; x++) {
        for(let y = 1; y < matrix[x].length; y++) {
            isShifted = moveHorizontal(x, y, false, firstKey) || isShifted;
        }
    }

    if(isShifted) {
        hardModeEnable();
        isShifted = false;
    } 
    renderMatrix(matrix);
}

function moveDown() {

    let isShifted = false;

    for(let x = matrix.length - 2; x >= 0; x--) {
        for(let y = 0; y < matrix[x].length; y++) {

            let currentCell = matrix[x][y];
            
            if (!currentCell) {
                continue;
            }
            
            isShifted =  moveVertical (x, y, true, currentCell, lastKey) || isShifted;
        }
    } 

    if(isShifted) {
        hardModeEnable();
        isShifted = false;
    } 
    renderMatrix(matrix);
}

function moveUp() {

    let isShifted = false;

    for(let x = 1; x < matrix.length; x++) {
        for(let y = 0; y < matrix[x].length; y++) {

            let currentCell = matrix[x][y];
            
            
            if (!currentCell) {
                continue;
            }
            
            isShifted =  moveVertical (x, y, false, currentCell, firstKey) || isShifted;
        }
    } 

    if(isShifted) {
        hardModeEnable();
        isShifted = false;
    } 
    renderMatrix(matrix);
}

function moveVertical (x, y, isIncrement, currentCell, keyCheck) {

    let nextCellKey;
    let isShifted = false;
    let indexFirstCell;
    let indexPrevious;

    if (isIncrement) {

        nextCellKey = x + 1;
        indexFirstCell = (x - 2 > 0)? x - 2 : 0;
        indexPrevious = (x - 1 >= 0)? x - 1 : x;

    }

    if (!isIncrement) {

        nextCellKey = x - 1;
        indexFirstCell = (x + 2 < 4)? x + 2 : 3;
        indexPrevious = (x + 1 < 4)? x + 1 : x;

    }
    
    while (nextCellKey < matrix.length) {

        const cell = gameBody.children[x].children[y];
        const previousCell = gameBody.children[indexPrevious].children[y];
        const firstCell = gameBody.children[indexFirstCell].children[y];
        let nextCell = matrix[nextCellKey][y];
        
        if (nextCell || keyCheck(nextCellKey)) {
            if ((!nextCell && keyCheck(nextCellKey))||
                (nextCell == currentCell)) {
                    
                matrix[nextCellKey][y] += currentCell;

            if((currentCell + nextCell == matrix[indexFirstCell][y] && nextCell)
                && matrix[indexPrevious][y] == 0) {

                matrix[x][y] = matrix[indexFirstCell][y];
                matrix[indexFirstCell][y] = 0;
                removeClass(firstCell);
                isShifted = true;
                break;
            }

            if(currentCell + nextCell == matrix[indexPrevious][y] && nextCell) {

                matrix[x][y] = matrix[indexPrevious][y];
                matrix[indexPrevious][y] = 0;

                if (isIncrement) {
                    if(matrix[x+1][y] == 0) {

                        matrix[x+1].splice(y,1,matrix[x][y]);
                        matrix[x].splice(y,1,0);
                    }
                } 

                if (!isIncrement) {
                    if(matrix[x-1][y] == 0) {

                        matrix[x-1].splice(y,1,matrix[x][y]);
                        matrix[x].splice(y,1,0);
                    }
                }

                removeClass(previousCell);
                isShifted = true;
                break;
            }

                matrix[x][y] = 0;
                removeClass(cell);
                isShifted = true;
                
            } else if ( nextCell && (isIncrement) ? (nextCellKey - 1) != x : (nextCellKey + 1) != x) {

                matrix[(isIncrement) ? (nextCellKey - 1) : (nextCellKey + 1)][y] += currentCell;
                matrix[x][y] = 0;
                removeClass(cell);
                isShifted = true;
            }
            break;
        }

        if (isIncrement) {
            nextCellKey++;
            nextCell =  matrix[nextCellKey][y];
            removeClass(cell);
        }
        if(!isIncrement) {
            nextCellKey--;
            nextCell =  matrix[nextCellKey][y];
            removeClass(cell);
        }  
    }
 return isShifted;
}

function moveHorizontal(x, y, isIncrement, keyCheck) {

    let isShifted = false;

    let increment = (isIncrement) ? 1 : -1;
    let currentCell = matrix[x][y];
    let nextCellKey = y + increment;

    if (!currentCell) {
        return null;
    }
            
    while (nextCellKey < matrix[x].length) {

        const cell = gameBody.children[x].children[y];
        const previousCell = gameBody.children[x].children[y - increment];
        const firstCell = gameBody.children[x].children[y - (increment * 2)];
        let nextCell = matrix[x][nextCellKey];
        
        if (nextCell || keyCheck(nextCellKey)) {
            if ((!nextCell && keyCheck(nextCellKey))||
                (nextCell == currentCell)) {

                matrix[x][nextCellKey] += currentCell;

                if((currentCell + nextCell == matrix[x][y - (increment * 2)] && nextCell)
                    && matrix[x][y - increment] == 0) { 

                    matrix[x][y] = matrix[x][y - (increment * 2)];
                    matrix[x][y - (increment * 2)] = 0;
                    removeClass(firstCell);
                    isShifted = true;
                    break;
                }

                if(currentCell + nextCell == matrix[x][y - increment] && nextCell) {

                    matrix[x][y] = matrix[x][y - increment];
                    matrix[x][y - increment] = 0;

                    if (increment) {

                        if(matrix[x][y+1] == 0) {

                            matrix[x].splice(y+1,1);
                            matrix[x].splice(0,0,0);
                        }

                    } else {

                        if(matrix[x][y-1] == 0) {
                        
                            matrix[x].splice(y-1,1);
                            matrix[x].splice(3,0,0);
                        }
                    }
                        
                    removeClass(previousCell);
                    isShifted = true;
                    break;
                }

                matrix[x][y] = 0;
                removeClass(cell);
                isShifted = true;
                
            } else if (nextCell && (isIncrement) ? ((nextCellKey - 1) != y) : ((nextCellKey + 1) != y)) {

                matrix[x][(isIncrement) ? (nextCellKey - 1) : (nextCellKey + 1)] += currentCell;
                matrix[x][y] = 0;
                removeClass(cell);
                isShifted = true;
            }
            break;
        }

        nextCellKey += increment;
        nextCell = matrix[x][nextCellKey];
        removeClass(cell)
    }

    return isShifted;
}

function resetField() {

        
    for(let x = gameBody.children.length - 1; x >= 0; x--) {
        gameBody.children[x].remove();
    }
        
    if(gameOver.style.display == 'block') {
        gameOver.style.display = 'none';
    }
    

    score.firstElementChild.innerHTML = 0;
    createGameField();
    // matrix[0][3] = 2;
    // matrix[0][2] = 2;
    // matrix[0][1] = 4;
    // matrix[0][0] = 4;

    matrix[1][0] = 4;
    matrix[1][1] = 2;
    matrix[1][2] = 2;
    matrix[1][3] = 0;
    renderMatrix(matrix);
    console.log(matrix);
}