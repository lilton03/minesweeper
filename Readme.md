
#Lilton A. Gungob
#Code Sample
#Email: liltongungob03@gmail.com

#Simple Minesweeper game built on Javascript

    -LocalStorage, game can be closed and be continued again.

    -Recursive traversal algorithm for opening cells

    -Game Settings, can change the number of rows,columns and mines.

    -Timer count down
    
    -Game Save Upon Browser Exit, and game state can be retrieved again when oppened
     unless the previous game was finished completely by the player

    -Note: to use

#Create game object
    /*row,column,and number of mines*/
        var game=new Game(row,column,mines);

    /*display game table */
    document.getElementById('mineSwipper').innerHTML=game.getTable();

#TO Do:

    Add animations

#Link to live sample:
    https://lilton03.github.io./
