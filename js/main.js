'use strict';

const gameBody = document.body.querySelector('.game-body');
const rows = document.body.querySelectorAll('.row');
const cells = document.body.querySelectorAll('.row-item');
let acces = false;

document.addEventListener('keydown', moveBlock);

function moveBlock(event) {

    const keyCode = event.code;
   
    const accessKeys = [
        'KeyW','KeyD','KeyS','KeyA',
        'Numpad8','Numpad6','Numpad2','Numpad4',
        'ArrowUp','ArrowDown','ArrowLeft','ArrowRight'
    ];

    if (!accessKeys.includes(keyCode)) return;
    // Прошли проверку по кнопками теперь нужно задать условие
    // на проверку того, свободно ли место куда мы хотим сдвинуть
    // Если свободно, то сдвигаем, если нет - проверяем равны ли значения
    // Если равны, то сдвигаем кубы и складываем значения
    console.log(keyCode);
        
}

function createBlock(positionX,positionY) {

   const block = document.createElement('div');
   block.className ='block';
   block.setAttribute('x',`${positionX}`);
   block.setAttribute('y',`${positionY}`);
   block.innerText = getRandomIntForBlockValue(2);

   return block; 
}

function putBlockInCell() {
    
    const positionX = getRandomInt(gameBody.children.length);
    const positionY = getRandomInt(rows.length);
    
    for (let cell of cells) {
        if (cell.getAttribute('x') == positionX &&
            cell.getAttribute('y') == positionY &&
            (!cell.classList.contains('notempty'))) {
            
            cell.append(createBlock(positionX,positionY));
            cell.classList.remove('empty');
            cell.classList.add('notempty');
            acces = true
            break
        }
    }
}

function getRandomInt(maxVelue) {
    return Math.floor(Math.random() * maxVelue);
}

function getRandomIntForBlockValue(value) {
    return (getRandomInt(value) === 0) ? 2 : 4;
}

function sumNumbers() {

}


function checkAndPut (){
    
    while (!acces) { 
        
        
        putBlockInCell()
    }
    
    acces = !acces;
}



