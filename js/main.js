'use strict';

const gameBody = document.getElementsByClassName('game-body')[0];
const matrix = [];

document.addEventListener('keydown', moveBlock);

createGameField();
putInEmptyCell();

matrix.removeClass = function(cell) {
    cell.classList.remove('block');
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

function putInEmptyCell() {
    
    const emptyCoords = getRandomCoords(matrix,0);

    if (!getRandomCoords(matrix,0)) {
        return console.log('Нет пустых ячеек');
    }

    const value = getRandomIntForBlockValue();
    matrix[emptyCoords[0]][emptyCoords[1]] = value;
    
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
    } return arr[getRandomInt(0, arr.length-1)];
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

            console.log('up');
            mooveUp();

            break;

        case 'KeyD':
        case 'Numpad6':
        case 'ArrowRight':

            console.log('right');
            mooveRight()
            
            break;

        case 'KeyS':
        case 'Numpad2':
        case 'ArrowDown':

            console.log('down');
            mooveDown()

            break;

        case 'KeyA':
        case 'Numpad4':
        case 'ArrowLeft':

            console.log('left');
            mooveLeft();

            break;
    }
}

function renderMatrix(matrix) {
    
    for(let x = 0; x < matrix.length; x++) {
        for(let y = 0; y < matrix.length; y++) {

            const cell = gameBody.children[x].children[y];
            if(!matrix[x][y]) continue;
            cell.innerHTML = matrix[x][y];
            cell.classList.add('block');
        }
    }
}

function mooveRight() {

    let isShifted = false;

    for(let x = 0; x < matrix.length; x++) {
        for(let y = matrix[x].length-2; y >= 0; y--) {

            let currentCell = matrix[x][y];
            let nextCellKey = y+1;

            if (!currentCell) {
                continue;
            }

            while (nextCellKey < matrix[x].length) {

                const cell = gameBody.children[x].children[y];
                let nextCell = matrix[x][nextCellKey];
                
                if (nextCell || nextCellKey === matrix[x].length-1) {
                    if ((!nextCell && nextCellKey === matrix[x].length-1)||
                        (nextCell == currentCell)) {

                        matrix[x][nextCellKey] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                        
                    } else if ( nextCell && (nextCellKey-1) != y ) {

                        matrix[x][nextCellKey-1] += currentCell;
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
            let nextCellKey = y-1;

            if (!currentCell) {
                continue;
            }
            console.log(currentCell);
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
                        
                    } else if ( nextCell && (nextCellKey+1) != y ) {

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
            let nextCellKey = x-1;

            if (!currentCell) {
                continue;
            }
            console.log(currentCell);
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
                        
                    } else if ( nextCell && (nextCellKey+1) != x ) {

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

    for(let x = matrix.length-2; x >= 0; x--) {
        for(let y = 0; y < matrix[x].length; y++) {

            let currentCell = matrix[x][y];
            let nextCellKey = x + 1;

            if (!currentCell) {
                continue;
            }
            console.log(currentCell);
            while (nextCellKey < matrix.length) {

                const cell = gameBody.children[x].children[y];
                let nextCell = matrix[nextCellKey][y];
                
                if (nextCell || nextCellKey === matrix.length-1) {
                    if ((!nextCell && nextCellKey === matrix.length-1)||
                        (nextCell == currentCell)) {

                        matrix[nextCellKey][y] += currentCell;
                        matrix[x][y] = 0;
                        matrix.removeClass(cell);
                        isShifted = true;
                        
                    } else if ( nextCell && (nextCellKey-1) != x ) {

                        matrix[nextCellKey-1][y] += currentCell;
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

