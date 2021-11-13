'use strict';

const gameBody = document.body.querySelector('.game-body');
// const rows = document.body.getElementsByClassName('row');
// const cells = document.body.getElementsByClassName('row-item');
const blocks = document.body.getElementsByClassName('block');

const rows = document.body.querySelectorAll('.row');
const cells = document.body.getElementsByClassName('row-item');
// const blocks = document.body.querySelectorAll('.block');


let acces = false;

document.addEventListener('keydown', moveBlock);

function moveBlock(event) {
    
    const keyCode = event.code;
   
    const accessKeys = [
        'KeyW','KeyD','KeyS','KeyA',
        'Numpad8','Numpad6','Numpad2','Numpad4',
        'ArrowUp','ArrowRight','ArrowDown','ArrowLeft'
    ];

    if (!accessKeys.includes(keyCode)) return;
    // Прошли проверку по кнопками теперь нужно задать условие
    // на проверку того, свободно ли место куда мы хотим сдвинуть
    // Если свободно, то сдвигаем, если нет - проверяем равны ли значения
    // Если равны, то сдвигаем кубы и складываем значения
    
    switch(keyCode) {
        case 'KeyW':
        case 'Numpad8':
        case 'ArrowUp':
            console.log('up');
            
            for(let block of blocks) {
                
                const blockX = +block.getAttribute('x');
                const blockY = +block.getAttribute('y');
                const upperCell = findCell(blockX-1,blockY);
                
                console.log(block);
                console.log(upperCell);
                
                
                if(upperCell.classList.contains('empty')) {
                    console.log("wellcome");
                    
                    upperCell.classList.remove('empty');
                    upperCell.classList.add('notempty');
                    block.setAttribute('x', +blockX-1); 
                    upperCell.append(block);
                    
                }
                
            }

            break;

        case 'KeyD':
        case 'Numpad6':
        case 'ArrowRight':
            console.log('right');

            for(let block of blocks) {

                const blockX = +block.getAttribute('x');
                const blockY = +block.getAttribute('y');
                const upperCell = findCell(blockX,blockY+1);
                
                console.log(block);
                console.log(upperCell);
                
                
                if(upperCell.classList.contains('empty')) {
                    console.log("wellcome");
                    
                    upperCell.classList.remove('empty');
                    upperCell.classList.add('notempty');
                    block.setAttribute('y', +blockY+1); 
                    upperCell.append(block);
                }
            }
            
            break;

        case 'KeyS':
        case 'Numpad2':
        case 'ArrowDown':
            console.log('down');

            for(let block of blocks) {

                const blockX = +block.getAttribute('x');
                const blockY = +block.getAttribute('y');
                
                const lowerCell = findCell(blockX+1,blockY);
                
                console.log(block);
                console.log(lowerCell);
                
                
                if(lowerCell.classList.contains('empty')) {
                    console.log("wellcome");
                    
                    lowerCell.classList.remove('empty');
                    lowerCell.classList.add('notempty');
                    block.setAttribute('x',+blockX+1); 
                    lowerCell.append(block);
                    
                }
            }

            break;
        case 'KeyA':
        case 'Numpad4':
        case 'ArrowLeft':
            console.log('left');

            for(let block of blocks) {

                const blockX = +block.getAttribute('x');
                const blockY = +block.getAttribute('y');
                const upperCell = findCell(blockX,blockY-1);
                
                console.log(block);
                console.log(upperCell);
                
                
                if(upperCell.classList.contains('empty')) {
                    console.log("wellcome");
                    
                    upperCell.classList.remove('empty');
                    upperCell.classList.add('notempty');
                    block.setAttribute('y', blockY-1); 
                    upperCell.append(block);
                }
                
            }
            break;
    }
      
}

function createBlock(positionX,positionY) {

   const block = document.createElement('div');
   block.className ='block';
   block.setAttribute('x',`${positionX}`);
   block.setAttribute('y',`${positionY}`);
   block.innerText = getRandomIntForBlockValue();

   return block; 
}

function putBlockInCell() {
    
    const positionX = getRandomInt(0, gameBody.children.length - 1);
    const positionY = getRandomInt(0, rows.length - 1);

    const cell = findCell(positionX,positionY);

    if (!cell.classList.contains('notempty')) {

        cell.append(createBlock(positionX,positionY));
        cell.classList.remove('empty');
        cell.classList.add('notempty');
        acces = true
    }
    
}

function getRandomInt(min,max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRandomIntForBlockValue() {

    const numPool = [ 2, 2, 2, 4]; // 75% достать 2ку
    return numPool[getRandomInt(0, numPool.length - 1)];
}

function findCell(positionX,positionY) {

    for (let cell of cells) {

        let x = cell.getAttribute('x');
        let y = cell.getAttribute('y');
        
        if (+x === positionX && +y === positionY) {
    
            return cell
        }
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

function checkAndPut (){
    //если таблица заполнена полностью, срабатывает бесконечный цикл
    // ПОФИКСИТЬ!!!!
    while (!acces) { 
        putBlockInCell()
    }
    acces = !acces;
}

function putBlockIn(positionX,positionY) {
    return findCell(positionX,positionY).append(createBlock(positionX,positionY));
}

// putBlockIn(1,3)
// putBlockIn(1,2)
// putBlockIn(1,1)

// putBlockIn(1,3)
// putBlockIn(2,3)
// putBlockIn(3,3)

// putBlockIn(1,2)
// putBlockIn(2,2)
// putBlockIn(3,2)
