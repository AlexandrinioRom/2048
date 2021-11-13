
'use strict';

//статичные коллекции
const gameBody = document.body.querySelector('.game-body');
const rows = document.body.querySelectorAll('.row');
const cells = document.body.querySelectorAll('.row-item');

//живые коллекции 
const emptyCells = document.body.getElementsByClassName('empty');
const blocks = document.body.getElementsByClassName('block');
const notEmptyCells = document.body.getElementsByClassName('notempty');


function getRndEmptyCellAndPutBlock() {

    if(emptyCells.length == 0) return;

    const randomVelueForBlock = getRandomIntForBlockValue();
    const randomCell = emptyCells[getRandomInt(0, emptyCells.length - 1)];
    const randomCellX = randomCell.getAttribute('x');
    const randomCellY = randomCell.getAttribute('y');
    
    const block = document.createElement('div');
    block.className = 'block';
    block.innerText = randomVelueForBlock;
    block.setAttribute('x',`${randomCellX}`);
    block.setAttribute('y',`${randomCellY}`);

    randomCell.append(block);
    randomCell.classList.remove('empty');
    randomCell.classList.add('notempty');
    
    return randomCell
}

function getRandomInt(min,max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomIntForBlockValue() {

    const numPool = [ 2, 2, 2, 4]; // 75% достать 2ку
    return numPool[getRandomInt(0, numPool.length - 1)];
}

getRndEmptyCellAndPutBlock();
getRndEmptyCellAndPutBlock();

document.addEventListener('keydown', moveBlock);

function moveBlock(event) {
    
    const keyCode = event.code;
   
    const accessKeys = [
        'KeyW','KeyD','KeyS','KeyA',
        'Numpad8','Numpad6','Numpad2','Numpad4',
        'ArrowUp','ArrowRight','ArrowDown','ArrowLeft'
    ];

    if (!accessKeys.includes(keyCode)) return;
    
    switch(keyCode) {
        case 'KeyW':
        case 'Numpad8':
        case 'ArrowUp':
            console.log('up');
            
            moveUp()

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
            
            moveDown()

            break;
        case 'KeyA':
        case 'Numpad4':
        case 'ArrowLeft':
            console.log('left');

        break;
    }
}

function findBlock(positionX,positionY) {
    for(let block of blocks) {
        
        let x = block.getAttribute('x');
        let y = block.getAttribute('y');
        if (+x === positionX && +y === positionY) {
    
            return block
        }
    }
}

const matrix = [];

for(let i = 0; i < rows.length; i++) {

    matrix[i] = [];
    
    for(let j = 0; j < rows.length; j++) {

        matrix[i][j] = rows[i].children[j];
    }
}

console.log(matrix);