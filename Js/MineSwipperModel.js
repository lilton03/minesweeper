/*Author
Lilton A. Gungob
Code Sample
Email: liltongungob03@gmail.com
 */


/*
This is the recursive function for opening mine board cells

integer row
integer column
integer oRow
integer oColumn
object board
integer origin
return type: integer []
 */

function pop(row,column,board){
    var ret=[];
    var length=board.length;
    var width=board[0].length;
    if(row!==-1 && row<length && column!==-1 && column<width  && board[row][column].open!==1 &&  board[row][column].flag!==true){
        board[row][column].open=1;
        ret[0]=[row,column];
        /*
       lup     up        rup
       l   clicked cell  r
       ldown   down      rdown
         */
        if(board[row][column].value===0){
            ret=ret.concat(pop(row-1,column,board));
            ret=ret.concat(pop(row-1,column-1,board));
            ret=ret.concat(pop(row-1,column+1,board));
            ret=ret.concat(pop(row+1,column,board));
            ret=ret.concat(pop(row+1,column-1,board));
            ret=ret.concat(pop(row+1,column+1,board));
            ret=ret.concat(pop(row,column-1,board));
            ret=ret.concat(pop(row,column+1,board));
        }
    }
    /*returned indexes of cells that are opened*/
    return ret;
}




/*Returns all indexes of bombs in the mine board*/
function openBombCells(board){
    var openedBombCells=[];
    for(var i=0;i<board.length;i++){
        for(var x=0;x<board[0].length;x++)
            if(board[i][x].value==='x') {
                openedBombCells.push([i, x]);
                board[i][x].open=1;
            }
    }
    return openedBombCells;
}

/*Marks a mine board cell as flagged*/
function flagCell(board,row,column) {
    var ret=2;
    var flag=parseInt(getItemFromLocalStorage('flags'));
    var mines=parseInt(getItemFromLocalStorage('mines'));
    if(board[row][column].open!==1){
       if(board[row][column].flag) {
           flag += 1;
           board[row][column].flag=!board[row][column].flag;
           ret=0;
       }
       else if(!board[row][column].flag && flag>0){
           flag-=1;
           board[row][column].flag=!board[row][column].flag;
           ret=1;
       }

       if(ret<2 && board[row][column].value==='x'){
           mines+=ret?-1:1;
           saveItemInLocalStorage('mines',mines);
       }

    }
    saveItemInLocalStorage('flags',flag);
    return [ret,flag,mines];
}


/*Set Game to game over,
* integer status 1 if win, 0 if loss
* return string message
*/
function gameOver(status) {
    saveItemInLocalStorage('gameOver',true);
    clearTimeout(timer);
    timer=null;
    var message='Congrats you have won';
        if(!status)
            message='You have lost';
  return message;
}


/*Check if game is Over*/
function checkIfGameOver() {
    return getItemFromLocalStorage('gameOver');
}


/*checks if a user already clicked on a cell, by checking if the timer is started*/
function ifStarted() {
    return timer!==null;
}


/*starts the game timer if the user clicked his/her very first cell*/
function startTimer() {
    saveItemInLocalStorage('start',true);
    timer= setInterval(showTimer,1000 );
}



/*Calculates the remaining time*/
function showTimer() {
    time=getItemFromLocalStorage('time');
    time=time.split(':');
    /*convert time to integers and calculate*/
    var total=(parseInt(time[0])*60)+parseInt(time[1])-1;
    var newTime=Math.floor(total/60);
    var seconds=Math.floor(total-(newTime*60));

    /*assemble back to minute format*/
    if(newTime>0 || seconds> 0) {
        if (seconds < 10)
            seconds = '0' + seconds;
        if(newTime===0)
            newTime='00';
        newTime = newTime + ":" + seconds;
        saveItemInLocalStorage('time',newTime);

        /*Passes the new time to be displayed*/
        showTimerDigits(newTime);
    }
    else
        alert(gameOver(0));
}


function getItemFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
}

function  saveItemInLocalStorage(name,value) {
    localStorage.setItem(name,JSON.stringify(value));
}