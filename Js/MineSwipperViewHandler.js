/*Author
Lilton A. Gungob
Code Sample
Email: liltongungob03@gmail.com
 */



/*on mine board cell click opener display function, changes visuals on each cell that will be opened depending on their value in the mine board
*
*
*
* */
function openBoardCell(elem,event) {
    if (event.which=== 1 && elem.style.opacity!=='0.5') {
        var colors = ['#0066ff', '#009933', '#cc9900', '#ff0066', '#66ccff', '#ccffff', '#669999', '#66ccff'];
        var inDx = elem.id.split('-');
        var row = parseInt(inDx[1]);
        var column = parseInt(inDx[2]);
        var data = openBoardCellController(row, column);
        var board = data[1];
        var openedCells = data[0];
        for (i = 0; i < openedCells.length; i++) {
            id = 'td-' + openedCells[i][0] + '-' + openedCells[i][1];
            cell = document.getElementById(id);
            openBoardCellDelayActivator(i,cell,colors,board,openedCells,3);
        }
        /*check if a bomb was opened, game over is already called*/
        if (openedCells.length > 0 && board[row][column].value === 'x') {
            for (i = 0; i < board.length; i++) {
                for (var x = 0; x < board[0].length; x++) {
                    if (board[i][x].value !== 'x') {
                        cell = document.getElementById('td-' + i + '-' + x);
                        cell.style.opacity = '0.5';
                    }
                }
            }
            document.getElementById('td-' + row + '-' + column).style.backgroundColor = '#ffffff';
            alert(gameOverController(0));
    }
}

/*Mine Board Cell Delay Animation Timer Settings Function*/
function openBoardCellDelayActivator(i,cell,colors,board,openedCells,speed) {
    setTimeout(openCellDelayAnimation, (i + 1) * speed , i, cell, colors, board, openedCells,speed);
}

/*Mine Board Cell Open Delay Animation */
function openCellDelayAnimation(i,cell,colors,board,openedCells,speed) {
    if (board[openedCells[i][0]][openedCells[i][1]].value === 'x') {
        if(document.getElementById('gameSettings').value==='Beginner')
            speed+=10;
        cell.innerHTML = '<img src="\../web/Images/bomb.png\" style="height: 15px;width: 15px">';
        setTimeout(function () {
            cell.innerHTML = '<img src="\../web/Images/bombExplod.png\" style="height: 18px;width: 18px">';
        },(i+1)*(speed));
    }
    else {
        if (board[openedCells[i][0]][openedCells[i][1]].value !== 0) {
            cell.innerText = board[openedCells[i][0]][openedCells[i][1]].value;
            cell.style.backgroundColor = '#ffcccc';
            cell.style.color = colors[board[openedCells[i][0]][openedCells[i][1]].value - 1];
        }
        cell.style.padding = '2px';
        cell.style.border = '1px solid grey';

    }
}
}
/*On mouse left click mine board cell animation function*/
function onClickCellAnimation(cell,event) {
    if (event.which===1 && cell.innerHTML==='' && cell.style.opacity!=='0.5') {
        cell.style.padding = '2px';
        cell.style.border = '1px solid grey';
    }
}
/*on mouse over and mouse leave function*/
function changeColor(color,cell){
    if(cell.style.backgroundColor!=='rgb(255, 204, 204)' && cell.style.backgroundColor!=='rgb(255, 255, 255)') {
        cell.style.backgroundColor = color;
    }
}

/*right mouse click listener function, puts flags Icons on cells*/
function putFlag(cell) {
    var inDx=cell.id.split('-');
    var row=inDx[1];
    var column=inDx[2];
    var data=putFlagController(row,column);
    if(data!==null) {
        var flags = data[1];
        var checkFlag = data[0];
        var mines= data[2];
        var flag = '<img src="\../web/Images/flagIcon.png\" style="height: 15px;width: 15px">';
        if (checkFlag < 2) {
            if (checkFlag) {
                cell.innerHTML = flag;
            }
            else {
                cell.innerHTML = '';
            }
            showMines(flags);
        }
        if(mines===0)
            alert(gameOverController(1));
    }
}

/*Mine Board Settings UI function */
function changeSettings(value) {
    value=parseInt(value);
    var settings=[[9,9],[15,40],[30,99],[50,1000]];
    var row=document.getElementById('settingRow');
    var column=document.getElementById('settingColumn');
    var mines=document.getElementById('settingMines');
    row.value=row.innerText=settings[value-1][0];
    column.value=column.innerText=settings[value-1][0];
    mines.value=mines.innerText=settings[value-1][1];
    mines.max=(settings[value-1][0]*settings[value-1][0])-settings[value-1][0];
    if(value===4)
        row.disabled=column.disabled=mines.disabled=false;
}

/*New Game on click button function*/
function newGame(){
    var row=document.getElementById('settingRow').value;
    var column=document.getElementById('settingColumn').value;
    var mines=document.getElementById('settingMines').value;
    if(row>0 && row<=70 && column>0 && column<=70 && mines<row*column) {
        var game = newGameController(row, column, mines);
        document.getElementById('mineSwipper').innerHTML = game.table.getContents();
    }
    else
        alert('Please insure that max number of rows and columns does not exceed 70 and the number of mines must be less than rows * columns');
}
/*Display game timer on screen function*/
function showTimerDigits(newTime) {
    document.getElementById('gameClock').value=newTime;
}

/*display remaining mines function*/
function showMines(mines) {
    document.getElementById('remainingMines').value=mines;
}