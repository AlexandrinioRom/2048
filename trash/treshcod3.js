// function mooveRight() {

//     let isShifted = false;

//     for(let x = 0; x < matrix.length; x++) {
//         for(let y = matrix[x].length-2; y >= 0; y--) {

//             let nextCellKey = y+1;
//             let currentCell = matrix[x][y];
            
//             //если текущая ячейка пустая, то скипнуть итерацию
//             if (!currentCell) {
//                 continue;
//             }
//             //пока Х следующей ячейки < длинны строки
//             while (nextCellKey < matrix[x].length) {

//                 const cell = gameBody.children[x].children[y];
//                 let nextCell = matrix[x][nextCellKey];

//                 // след. яч. !пустая или она является последней
//                 if (nextCell||nextCellKey === matrix[x].length-1) {

//                     //(след. яч. пустая и последняя в строке) или она равна текущей
//                     if ((!nextCell&&nextCellKey === matrix[x].length-1)||
//                         (nextCell == currentCell)) {

//                         // если след. яч. пустая и последняя и !равна текущей то
//                         if((nextCell !== currentCell)) {

//                             matrix[x][nextCellKey] = currentCell;
//                             matrix[x][y] = 0;
//                             cell.classList.remove('block');
//                             cell.innerHTML = '';
//                             isShifted = true;
//                             break;
//                         } 
                        
//                         matrix[x][nextCellKey] = currentCell*2;
//                         matrix[x][y] = 0;
//                         isShifted = true;

//                         //иначе если след.яч. !пуста и 
//                     } else if ((nextCell&&nextCellKey-1!=y)) {

//                         matrix[x][nextCellKey-1] = currentCell;
//                         matrix[x][y] = 0;
//                         cell.classList.remove('block');
//                         cell.innerHTML = '';
//                         isShifted = true;
//                     }
//                     break;
//                 }

//                 nextCellKey++;
//                 nextCell =  matrix[x][nextCellKey];
                
//                 cell.classList.remove('block');
//                 cell.innerHTML = '';
//                 isShifted = true;
//             }
//         }
//     } 

//     if(isShifted) {
//         getRndEmptyCellAndPutBlock();
//         isShifted = false;
//     } 
//     renderMatrix(matrix);
// }