'use strict';

const gameBody = document.getElementsByClassName('game-body')[0];
const matrix = [];

document.addEventListener('keydown', moveBlock);

createGameField();
getRndEmptyCellAndPutBlock();

matrix.removeClass = function(cell,isShifted) {
    cell.classList.remove('block');
    cell.innerHTML = '';
}

function createGameField() {

    for (let i = 0; i < 4; i++) {

        const row = document.createElement('div');
        row.className = 'row';
        gameBody.append(row);
        
        matrix[i] = [];

        for (let j = 0; j < 4; j++) {

            const rowItem = document.createElement('div');
            rowItem.classList.add('row-item');
            row.append(rowItem);

            matrix[i][j] = 0;
        }
    }
}

function getRndEmptyCellAndPutBlock() {

    const openMatrix = matrix.flat(2);
    if(!openMatrix.includes(0)) return console.log('Нет пустых ячеек');
    
    const matrixX = getRandomInt(0,3);
    const matrixY = getRandomInt(0,3);
    const value = getRandomIntForBlockValue();

    if (matrix[matrixX][matrixY]) return getRndEmptyCellAndPutBlock();

    matrix[matrixX][matrixY] = value;
    
    renderMatrix(matrix);
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomIntForBlockValue() {

    const numPool = [2, 2, 2, 4]; // 75% достать 2ку
    return numPool[getRandomInt(0, numPool.length - 1)];
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

            
            break;

        case 'KeyA':
        case 'Numpad4':
        case 'ArrowLeft':
            console.log('left');

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
                        
                    } else if ( nextCell && nextCellKey-1!=y ) {

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
        getRndEmptyCellAndPutBlock();
        isShifted = false;
    } 
    renderMatrix(matrix);
}
