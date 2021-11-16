'use strict';

const gameBody = document.getElementsByClassName('game-body')[0];
const score = document.getElementsByClassName('score')[0];
const gameOver = document.querySelector('.game-over');
const matrix = [];

document.addEventListener('click', restartGame)
document.addEventListener('keydown', moveBlock);

createGameField();
putInEmptyCell();

matrix.removeClass = function(cell) {
    cell.className = '';
    cell.classList.add('row-item');
    cell.innerHTML = '';
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

            if(nextCellKey === 4){
                 
                if (matrix[x][y] == matrix[x][y + 1]) {
                    return false;
                }
               
            } else if(lowerCellKey === 4) {
                if (matrix[x][y] == matrix[x][y + 1]) {
                    return false
                }
            }

            if (x < 3) {
                if (matrix[x][y] == matrix[x][y + 1]) {
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
        score.firstElementChild.innerHTML = 0;
        createGameField();
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
            if(!matrix[x][y]) continue;
            cell.innerHTML = matrix[x][y];
            cell.className = 'block color'+ matrix[x][y];
            
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

            mooveUp();
            
                
            if(checkEndGame()) {
                return gameOver.style.display = 'block';
            }
            
            break;

        case 'KeyD':
        case 'Numpad6':
        case 'ArrowRight':

            mooveRight();
        
            if(checkEndGame()) {
                return gameOver.style.display = 'block';
            } 
            
            break;

        case 'KeyS':
        case 'Numpad2':
        case 'ArrowDown':

            mooveDown();
            
               
            if(checkEndGame()) {
                return gameOver.style.display = 'block';
            }
            
            break;

        case 'KeyA':
        case 'Numpad4':
        case 'ArrowLeft':

            mooveLeft();
            
                
            if(checkEndGame()) {
                return gameOver.style.display = 'block';
            }
            
            break;
    }
    
}


function mooveRight() {

    let isShifted = false;

    for(let x = 0; x < matrix.length; x++) {
        for(let y = matrix[x].length - 2; y >= 0; y--) {

            let currentCell = matrix[x][y];
            let nextCellKey = y + 1;

            if (!currentCell) {
                continue;
            }

            while (nextCellKey < matrix[x].length) {

                const cell = gameBody.children[x].children[y];
                let nextCell = matrix[x][nextCellKey];
                
                if (nextCell || nextCellKey === matrix[x].length - 1) {
                    if ((!nextCell && nextCellKey === matrix[x].length - 1)||
                        (nextCell == currentCell)) {

                        matrix[x][nextCellKey] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                        
                    } else if ( nextCell && (nextCellKey-1) != y ) {

                        matrix[x][nextCellKey - 1] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                    }
                    break;
                }

                nextCellKey++;
                nextCell =  matrix[x][nextCellKey];
                matrix.removeClass(cell);
            }
        }
    } 

    if(isShifted) {
        putInEmptyCell();
        isShifted = false;
    } 
    renderMatrix(matrix);
}

function mooveLeft() {

    let isShifted = false;

    for(let x = 0; x < matrix.length; x++) {
        for(let y = 1; y < matrix[x].length; y++) {

            let currentCell = matrix[x][y];
            let nextCellKey = y - 1;

            if (!currentCell) {
                continue;
            }
            
            while (nextCellKey < matrix[x].length) {

                const cell = gameBody.children[x].children[y];
                let nextCell = matrix[x][nextCellKey];
                
                if (nextCell || nextCellKey === 0) {
                    if ((!nextCell && nextCellKey === 0)||
                        (nextCell == currentCell)) {

                        matrix[x][nextCellKey] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                        
                    } else if ( nextCell && (nextCellKey + 1) != y ) {

                        matrix[x][nextCellKey+1] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                    }
                    break;
                }

                nextCellKey--;
                nextCell =  matrix[x][nextCellKey];
                matrix.removeClass(cell);
            }
        }
    } 

    if(isShifted) {
        putInEmptyCell();
        isShifted = false;
    } 
    renderMatrix(matrix);
}

function mooveUp() {

    let isShifted = false;

    for(let x = 1; x < matrix.length; x++) {
        for(let y = 0; y < matrix[x].length; y++) {

            let currentCell = matrix[x][y];
            let nextCellKey = x - 1;

            if (!currentCell) {
                continue;
            }
            
            while (nextCellKey < matrix.length) {

                const cell = gameBody.children[x].children[y];
                let nextCell = matrix[nextCellKey][y];
                
                if (nextCell || nextCellKey === 0) {
                    if ((!nextCell && nextCellKey === 0)||
                        (nextCell == currentCell)) {

                        matrix[nextCellKey][y] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                        
                    } else if ( nextCell && (nextCellKey + 1) != x ) {

                        matrix[nextCellKey+1][y] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                    }
                    break;
                }

                nextCellKey--;
                nextCell =  matrix[nextCellKey][y];
                matrix.removeClass(cell);
            }
        }
    } 

    if(isShifted) {
        putInEmptyCell();
        isShifted = false;
    } 
    renderMatrix(matrix);
}

function mooveDown() {

    let isShifted = false;

    for(let x = matrix.length - 2; x >= 0; x--) {
        for(let y = 0; y < matrix[x].length; y++) {

            let currentCell = matrix[x][y];
            let nextCellKey = x + 1;

            if (!currentCell) {
                continue;
            }
            
            while (nextCellKey < matrix.length) {

                const cell = gameBody.children[x].children[y];
                let nextCell = matrix[nextCellKey][y];
                
                if (nextCell || nextCellKey === matrix.length - 1) {
                    if ((!nextCell && nextCellKey === matrix.length - 1)||
                        (nextCell == currentCell)) {

                        matrix[nextCellKey][y] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                        
                    } else if ( nextCell && (nextCellKey - 1) != x ) {

                        matrix[nextCellKey - 1][y] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                    }
                    break;
                }

                nextCellKey++;
                nextCell =  matrix[nextCellKey][y];
                matrix.removeClass(cell);
            }
        }
    } 

    if(isShifted) {
        putInEmptyCell();
        isShifted = false;
    } 
    renderMatrix(matrix);
}

