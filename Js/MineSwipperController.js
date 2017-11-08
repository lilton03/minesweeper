/*Author
Lilton A. Gungob
Code Sample
Email: liltongungob03@gmail.com
 */


/*Global Variable Used for referencing the setTimeInterval*/
var timer=null;

/*Open Board Cell Controller
* integer row
* integer column
* return array[[int[[]],board object{}]
* */
function openBoardCellController(row,column){
    var openedCells=[];
    if(!checkIfGameOver()) {
        var board = getItemFromLocalStorage('mineBoard');
        if (board[row][column].value !== 'x') {
            if(!ifStarted())
                startTimer();
            openedCells = pop(row, column,board);
        }
        else if (board[row][column].value === 'x' && board[row][column].flag !== true)
            openedCells = openBombCells(board);
        saveItemInLocalStorage('mineBoard',board);
    }
    return [openedCells,board];
}



/*PutFlag Controller
* returned integer [] data or null
* */
function putFlagController(row,column){
    var data=null;
    if(!checkIfGameOver()) {
        if(!ifStarted())
            startTimer();
        var board = getItemFromLocalStorage('mineBoard');
        data = flagCell(board, row, column);
       saveItemInLocalStorage('mineBoard',board);
    }
    return data;
}
/*New Game Controller
* return Game object
* */
function newGameController(row,column,bombs) {
    localStorage.clear();
    clearTimeout(timer);
    timer=null;
    return new Game(row,column,bombs);
}

/*GameOverController Function
int status
return string
 */
function gameOverController(status){
    return gameOver(status);
}