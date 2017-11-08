/*Author
Lilton A. Gungob
Code Sample
Email: liltongungob03@gmail.com
 */


/*All of the existing classes*/



/*Game Class*/
function Game(row,column,bombs){
    this.getTable=function () {
        return this.table.getContents();
    };

    this.getMineBoard=function () {
        return this.mineBoard.board;
    };
    row=parseInt(row);
    column=parseInt(column);
    bombs=parseInt(bombs);
    var gameOver=JSON.parse(localStorage.getItem('gameOver'));
    var board=null;
    var mines;
    var time='10:00';

    if(gameOver===null || gameOver===true) {
        this.mineBoard= new MineBoard(row,column,bombs);
        localStorage.setItem('mineBoard', JSON.stringify(this.getMineBoard()));
        localStorage.setItem('gameOver', JSON.stringify(false));
        localStorage.setItem('mines', JSON.stringify(bombs));
        localStorage.setItem('flags', JSON.stringify(bombs));
        localStorage.setItem('time', JSON.stringify('10:00'));
    }
    else{
        board=JSON.parse(localStorage.getItem('mineBoard'));
        bombs=JSON.parse(localStorage.getItem('flags'));
        row=board.length;
        column=board[0].length;
        time=JSON.parse(localStorage.getItem('time'));
    }
    this.table=new Table(row,column,bombs,time,board);
}





/*Table Class*/
function Table(row,column,bombs,time,board){
    this.row=row;
    this.column=column;
    this.style='style="position:relative;"';
    this.bombs=bombs;
    this.time=time;
    this.board=board;

    /*Get Full GAME UI*/
    this.getContents=function () {
        var contents=this.getTableSettings()+this.getGameInteraction()+this.getGameStatus()+'<div '+this.style+'>';
        var i,x;
        var style;
        var value;
        var color;
        var backGroundColor;
        var colors=['#0066ff','#009933','#cc9900','#ff0066','#66ccff','#ccffff','#669999','#66ccff'];
        var id;
        var onmouseup=' onmouseup="openBoardCell(this,event)" ';
        var onmousedown=' onmousedown="onClickCellAnimation(this,event)" ';
        var onMouseOver='onmouseover="changeColor('+"'#d7d7c1'"+','+'this'+')" ';
        var onMouseOut='onmouseout="changeColor('+"'#c9c9c9'"+','+'this'+')" ';
        var onContextMenu=' oncontextmenu="putFlag(this);return false;" ';
        for(i=0;i<this.row;i++){
            contents+='<ul style="padding: 0;margin: 0;height:24px">';
            for(x=0;x<this.column;x++) {
                id=' id="td-'+i+'-'+x+'" ';
                style = ' style="padding: 0; margin: 0;display: inline-block;width: 18px;height: 18px;border: 3px outset #aaa;background-color: #c9c9c9;vertical-align: middle;text-align: center;line-height: 19px;font-weight: bold;" ';
                color=value='';
                    if(this.board!==null) {
                        backGroundColor='#c9c9c9';
                        if(this.board[i][x].open) {
                            if (this.board[i][x].value !== 0) {
                                value = this.board[i][x].value;
                                color = colors[value - 1];
                                backGroundColor='#ffcccc'
                            }
                            style = ' style="padding: 2px; margin: 0;display: inline-block;width: 18px;height: 18px;border:1px solid grey;background-color:' +
                                    backGroundColor+';vertical-align: middle;text-align: center;line-height: 19px;font-weight: bold;' +
                                    'color:'+color+';" ';
                        }
                        else if(this.board[i][x].flag)
                            value='<img src="\../web/Images/flagIcon.png\" style="height: 15px;width: 15px">';
                    }
                    contents+='<li'+id+style+onMouseOver+onMouseOut+onmousedown+onmouseup+onContextMenu+'>'+value+'</li>';
            }
            contents+='</ul>';
        }
        contents+='</div>';
        return contents;
    };



    /*Get HTML table settings*/
    this.getTableSettings=function () {
        return '<div  style="margin:10px 0;">' +
            '<select id="gameSettings" onchange="changeSettings(this.value)"><option value="1">Beginner</option><option value="2">Intermediate</option><option value="3">Expert</option><option value="4">Custom</option></select>' +
            '<input type="text" id="settingRow" size="5" value="9" disabled>' +
            '<input type="text" id="settingColumn" size="5" value="9" disabled>' +
            '<input type="text" id="settingMines" size="5" value="10" disabled>' +
            '</div>';
    };

    /*Get HTML table interactions*/
    this.getGameInteraction=function () {
        return '<div style="margin: 10px 0;"><button onclick="newGame()">New Game</button></div>';
    };

    /*Get HTML table game status*/
    this.getGameStatus=function () {
        var style='style="Monaco;font-weight: 900"';
        return '<div style="margin: 10px 0;"><label>Time:</label><input type="text" ' +
            'id="gameClock" '+style+' size="6" value="'+this.time+'" readonly><label>Mines</label><input type="text" ' +
            'id="remainingMines" '+style+' size="6" value="'+this.bombs+'" disabled></div>'
    }

    this.tableGameOverModal=function(){

    }
}

/*Mine board class*/
function MineBoard(row,column,bombs){

    /*initializes a mine board*/
    this.setBoard=function () {
        var i, x;
        for (i = 0; i < this.row; i++) {
            this.board[i]=[];
            for (x = 0; x < this.column; x++) {
                this.board[i][x]={};
                this.board[i][x].flag=this.board[i][x].open=this.board[i][x].value = 0;
            }
        }
    };

    /*set bombs in mine board randomly*/
    this.setBombs=function (bombs) {
        for (; bombs > 0;) {
            var indXRow = Math.floor(Math.random() * (this.row));
            var indXColumn = Math.floor(Math.random() * (this.column));
            /*check if the cell chosen already is a bomb, a bomb is represented with 'x'*/
            if (this.board[indXRow][indXColumn].value !== 'x') {
                /*set up dimensions for the cell, up,down,left,right,rup,lup,rdown,ldown*/
                /*
                lup     up        rup
                 l   clicked cell  r
                ldown   down      rdown
                */
                var dimension=[
                    [indXRow-1,indXColumn],
                    [indXRow-1,indXColumn-1],
                    [indXRow-1,indXColumn+1],
                    [indXRow+1,indXColumn],
                    [indXRow+1,indXColumn-1],
                    [indXRow+1,indXColumn+1],
                    [indXRow,indXColumn-1],
                    [indXRow,indXColumn+1]];
                this.board[indXRow][indXColumn].value = 'x';
                for(var i=0;i<dimension.length;i++) {
                    var indX = dimension[i];
                    if (indX[0] >= 0 && indX[0] < this.row && indX[1] >= 0 && indX[1] < this.column && this.board[indX[0]][indX[1]].value !== 'x')
                        this.board[indX[0]][indX[1]].value += 1;
                }
                        bombs -= 1;
            }
        }

    };


    this.board=[];
    this.open=0;
    this.row=row;
    this.column=column;
    this.bombs=bombs;
    this.setBoard();
    this.setBombs(bombs);

}

