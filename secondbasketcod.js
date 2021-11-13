//НИЖЕ КОД ИЗ MAIN2 КОТОРЫЙ НЕ РАБОТАЛ ТАК КАК НАДО --------------------------------------------------------- 

// function moveUp() {
    
//     // let cellX = notemptyCell.getAttribute('x');
//     // let cellY = notemptyCell.getAttribute('y');
    
//     // if (cellX === '0') return;

//     // let cellClass = notemptyCell.classList;
//     // let upperRow = notemptyCell.closest('.row').previousElementSibling;
//     // console.log(`Верхний список: ${upperRow}`);
//     // console.log( upperRow)
//     // if (!upperRow) continue;//это тоже неправильно
//     // let upperEmptyCell = upperRow.getElementsByClassName('empty')[cellY];//это неправильно пофикси
//     // console.log(`Верхняя пустая ячейка: ${upperEmptyCell}`);
//     // console.log( upperEmptyCell);
//     // console.log(`Блок внутри данной непустой ячеки: ${notemptyCell.children[0]}`);
//     // console.log(notemptyCell.children[0]);
//     // upperEmptyCell.append(notemptyCell.children[0]);
//     // // emptyCell.setAttribute('x', +cellY+1);
    
//     // cellClass.remove('notempty');
//     // cellClass.add('empty');

//     // upperEmptyCell.classList.remove('empty');
//     // upperEmptyCell.classList.add('notempty');
    
//     for(let notemptyCell of notEmptyCells) {

//         let cellX = +notemptyCell.getAttribute('x');
//         let cellY = notemptyCell.getAttribute('y')-0;
//         let block = findBlock(cellX,cellY);

//         const cellClass = notemptyCell.classList;
//         const upperRow = gameBody.children[cellX-1];
        
        
//         if(!upperRow) {
//             console.log('это последняя строка');
//             continue
//         }

//         const upperCell = upperRow.children[cellY]; 
//         console.log(upperCell);
        
//         if (upperCell.classList.contains('empty')) {
//             console.log(cellX);
//             console.log(gameBody.children.length-1);
//             for (let i = cellX;i < gameBody.children.length - 1; i--){

//                 let previouslyRowInCicle = gameBody.children[--cellX];
//                 let nextCellInCicle = previouslyRowInCicle.children[cellY];
//                 console.log(previouslyRowInCicle.children);
//                 console.log(block);
//                 block.setAttribute('x',`${i}`)
//                 cellClass.remove('notempty');
//                 cellClass.add('empty');
//                 if(nextCellInCicle.classList.contains('notempty')) {
//                     //если в блоках одинаковые числа -> соединить
//                     return
//                 };
//                 nextCellInCicle.append(block);
                
//             }
//             const blockCurrentParent = block.closest('.row-item');

//             blockCurrentParent.classList.remove('empty');
//             blockCurrentParent.classList.add('notempty');
            
//         }
//     }

// }

// function moveDown() {

// for(let notemptyCell of notEmptyCells) {

//     let cellX = +notemptyCell.getAttribute('x');
//     let cellY = +notemptyCell.getAttribute('y');
//     let block = findBlock(cellX,cellY);

//     const cellClass = notemptyCell.classList;
//     const lowerRow = gameBody.children[cellX+1];
    
//     if(!lowerRow) {
//         console.log('это последняя строка');
//         continue
//     }

//     const lowerCell = lowerRow.children[cellY]; 
    
//     if (lowerCell.classList.contains('empty')) {
        
//         for (let i = cellX;i < gameBody.children.length - 1; i++){

//             const nextRowInCicle = gameBody.children[++cellX];
//             const nextCellInCicle = nextRowInCicle.children[cellY]
            
//             block.setAttribute('x',`${i}`)
//             cellClass.remove('notempty');
//             cellClass.add('empty');
//             if(nextCellInCicle.classList.contains('notempty')) {
//                 //если в блоках одинаковые числа -> соединить
//                 return
//             };
//             nextCellInCicle.append(block);
            
//         }
//         const blockCurrentParent = block.closest('.row-item');

//         blockCurrentParent.classList.remove('empty');
//         blockCurrentParent.classList.add('notempty');
        
//     }
// }

// }