'use strict';

const gameBody = document.getElementsByClassName('game-body')[0];
const matrix = [];

document.addEventListener('keydown', moveBlock);


createGameField();
getRndEmptyCellAndPutBlock();


console.log(matrix);
console.log(matrix.flat(2));

function createGameField() {

    for (let i = 0; i < 4; i++) {

        const row = document.createElement('div');
        row.className = 'row';
        gameBody.append(row);
        
        matrix[i] = [];

        for (let j = 0; j < 4; j++) {

            const rowItem = document.createElement('div');
            rowItem.classList.add('row-item','empty');
            row.append(rowItem);

            matrix[i][j] = 0;
        }
    } return matrix;
}

function getRndEmptyCellAndPutBlock() {

    const openMatrix = matrix.flat(2);
    if(!openMatrix.includes(0)) return console.log('Нет пустых ячеек');
    
    const matrixX = getRandomInt(0,3);
    const matrixY = getRandomInt(0,3);
    const value = getRandomIntForBlockValue();

    if (matrix[matrixX][matrixY]) return getRndEmptyCellAndPutBlock();

    matrix[matrixX][matrixY] = value;
    
    const block = document.createElement('div');
    block.className = 'block';
    block.innerText = value;
    gameBody.children[matrixX].children[matrixY].append(block);
    
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

