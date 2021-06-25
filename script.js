//var for empty so i dont have to use 0 or 1
var empty = 0
//same thing as empty but full
var full = 1
//rows that could fit on my screen
var rs = 31
//cols that could fit
var cls = 64
//game board is an array of [rs][cls]
var board = new Array(rs)
//array to store full cells
var arr = []
//array to store dead cells
var farr = []
//boolean for if glider place mode is on
var isPlace = false
//raphael canvas initialization
var paper = Raphael(0, 30, innerWidth, innerHeight);
//populates array with arrays to make 2d matrix
for (var i = 0; i < board.length; i++) {
    board[i] = new Array(cls)
}
//set every item in board to empty
for (var x = 0; x < board.length; x++) {
    for (var i = 0; i < board[x].length; i++) {
        board[x][i] = empty
    }
}
//temp board so changes can be executed line by line without affecting real board
//to do: add get arr data in for loop, check if filled square id is in arr, if it is, get coords and update to empty
var tboard = new Array(rs)
for (var i = 0; i < tboard.length; i++) {
    tboard[i] = new Array(cls)
}
//func to set board easier
function setb(row, col, val) {
    board[row][col] = val
}

//set tempt board
function settb(row, col, val) {
    tboard[row][col] = val
}
//glider pattern
// setb(1, 2, full)
// setb(2, 3, full)
// setb(3, 3, full)
// setb(3, 2, full)
// setb(3, 1, full)
//board before changes
//setting temp board values to board values
for (var row = 0; row < tboard.length; row++) {
    for (var col = 0; col < tboard[row].length; col++) {
        tboard[row][col] = board[row][col]
    }
}
class Glider{
  constructor(rowval,colval){
    this.pos = [rowval,colval]
    settb(rowval,colval,full)
    settb(rowval+1,colval+1,full)
    settb(rowval+2,colval+1,full)
    settb(rowval+2,colval,full)
    settb(rowval+2,colval-1,full)
  }
}
var starter = new Glider(1,2)
function gol() { // gameoflife()
    for (var b = 0; b < 1; b++) {
        //number of generations as g
        for (g = 0; g < 1; g++) {
            //row as x
            for (var x = 0; x < board.length; x++) {
                //col as i
                for (var i = 0; i < board[x].length; i++) {
                    //n as neighbors
                    n = 0
                    //put all neighbor cell variables in try as not to get out of bounds error
                    //if out of bounds neighbor cell variable defaults to 0 but cannot be revived
                    try {
                        var up = board[x - 1][i]
                    } catch (e) {
                        var up = empty
                    }
                    try {
                        var down = board[x + 1][i]
                    } catch (e) {
                        var down = empty
                    }
                    try {
                        var left = board[x][i - 1]
                    } catch (e) {
                        var left = empty
                    }
                    try {
                        var right = board[x][i + 1]
                    } catch (e) {
                        var right = empty
                    }
                    try {
                        var dur = board[x - 1][i + 1]
                    } catch (e) {
                        var dur = empty
                    }
                    try {
                        var ddr = board[x + 1][i + 1]
                    } catch (e) {
                        var ddr = empty
                    }
                    try {
                        var dul = board[x - 1][i - 1]
                    } catch (e) {
                        var dul = empty
                    }
                    try {
                        var ddl = board[x + 1][i - 1]
                    } catch (e) {
                        var ddl = empty
                    }
                    if (up == full) {
                        n += 1                    }
                    if (down == full) {
                        n += 1                    }
                    if (left == full) {
                        n += 1                    }
                    if (right == full) {
                        n += 1                    }
                    if (dur == full) {
                        n += 1
                    }
                    if (ddr == full) {
                        n += 1
                    }
                    if (dul == full) {
                        n += 1
                    }
                    if (ddl == full) {
                        n += 1
                    }
                    //and cell with less than 2 neighbors dies
                    if (n < 2 && board[x][i] != empty) {
                        tboard[x][i] = empty
                    }
                    //anym cell with 4 or more neighbors dies
                    if (n >= 4 && board[x][i] != empty) {
                        tboard[x][i] = empty
                    }
                    //any cell with exactly 3 neighbors is revived
                    if (n == 3 && board[x][i] == empty) {
                        tboard[x][i] = full
                    }
                }
            }
            
            //set board value to temp board values
            for (var r = 0; r < board.length; r++) {
                for (var c = 0; c < board[r].length; c++) {
                    board[r][c] = tboard[r][c]
                }
            }
            
        }
    }
    //clear raphael canvas
    paper.clear()
    //redraw frame
    draw()
}
//visualizes board
function draw() {
            for (var r = 0; r < board.length; r++) {
                for (var c = 0; c < board[r].length; c++) {
                    board[r][c] = tboard[r][c]
                }
            }
    //loop for every row
    for (var row = 0; row < tboard.length; row++) {
        //loop for every coloumn
        for (var col = 0; col < tboard[row].length; col++) {
            //check if current cell on temp board or tboard[row][col] is not full
            if (tboard[row][col] != full) {
                //if cell isnt full, set css color attribute to white
                //math to space out squares
                var f = paper.rect(col * 30, row * 30, 25, 25)
                //css fill white
                    .attr({
                        fill: "white",
                        border: "10px solid white"
                    })
                    //click function to set css fill to black and more
                    .click(function() {
                        if (this.attr("fill") == "white") {
                            //set fill to black if fill is white
                            this.attr({
                                fill: "black"
                            })
                            //loop through full cell array to see if cell is full and gets id of cell
                            for (var v = 0; v < farr.length; v++) {
                                //if id of cell is in array
                                if (this.id == farr[v][0]) {
                                    //get coords from array and split
                                    var coords = farr[v][1].split(", ")
                                    //get coords from split array
                                    //set vars for x and y
                                    var x = coords[0]
                                    var y = coords[1]
                                    //set coord of current cell to full 
                                    settb(x,y,full)
                                    //loop to remove cell from empty array
                                    for (var i = 0; i < farr.length; i++) {
                                        if (farr[i][0] == this.id) {
                                            farr.splice(i, 1);
                                        }
                                    }
                                    //adds id along with row and col to full array so it can be changed later
                                    arr[arr.length] = [
                                        [this.id], x + ", " + y
                                    ]
                                }
                            }
                        } else {
                            this.attr({
                                fill: "white"
                            })
                            for (var l = 0; l < arr.length; l++) {
                                if (arr[l][0] == this.id) {
                                   //get coords from array and split
                                    var coords = arr[l][1].split(", ")
                                    //get coords from split array
                                    //set vars for x and y
                                    var x = coords[0]
                                    var y = coords[1]
                                    //set coord of current cell to empty
                                    settb(x,y,empty)
                                    //loop to remove cell from full array
                                    for (var i = 0; i < arr.length; i++) {
                                        if (arr[i][0] == this.id) {
                                            arr.splice(i, 1);
                                        }
                                    }
                                    //adds id along with row and col to empty array so it can be changed later
                                    farr[farr.length] = [
                                        [this.id], x + ", " + y
                                    ]
                                }
                            }
                        }
                    });
                //when cell is initialized, it will add to dead if it is dead
                //adds id along with row and col so it can be changed later
                farr[farr.length] = [
                    [f.id], row + ", " + col
                ]
            }
            //same thing as above but if cell is full, so opposite
            if (tboard[row][col] == full) {
                var f = paper.rect(col * 30, row * 30, 25, 25)
                //if cell isnt full, set css color attribute to black
                //math to space out squares
                    .attr({
                        fill: "black"
                    })
                    //click function to set css fill to black and more
                    .click(function() {
                        if (this.attr("fill") == "black") {
                            this.attr({
                                fill: "white"
                            })
                            for (var l = 0; l < arr.length; l++) {
                                if (arr[l][0] == this.id) {
                                    var coords = arr[l][1].split(", ")
                                    var x = coords[0]
                                    var y = coords[1]
                                    settb(x,y,full)
                                    for (var i = 0; i < arr.length; i++) {
                                        if (arr[i][0] == this.id) {
                                            arr.splice(i, 1);
                                        }
                                    }
                                    farr[farr.length] = [
                                        [this.id], x + ", " + y
                                    ]
                                }
                            }
                        } else {
                            this.attr({
                                fill: "black"
                            })
                            for (var v = 0; v < farr.length; v++) {
                                if (this.id == farr[v][0]) {
                                    var coords = farr[v][1].split(", ")
                                    var x = coords[0]
                                    var y = coords[1]
                                    settb(x,y,empty)
                                    for (var i = 0; i < arr.length; i++) {
                                        if (arr[i][0] == this.id) {
                                            arr.splice(i, 1);
                                        }
                                    }
                                    arr[arr.length] = [
                                        [this.id], x + ", " + y
                                    ]
                                }
                            }
                        }
                    });
                arr[arr.length] = [
                    [f.id], row + ", " + col
                ]
            }
        }   
      }
    }
//initialize interval so html can get it in scope
var inter = 0

//function to get board moving in display
function Start() {
    //try catch because it is input so text could be used
        try{clearInterval(inter)}catch(e){}
        try {
            inter = setInterval(gol, parseInt(document.getElementById("ss").value))
        } catch (e) {
            //if text set 1 second frame draw times
            inter = setInterval(gol, 1000)
        }
}
//function to reset board to blank
function clearboard() {
    //loop through row/col
    for (var row = 0; row < board.length; row++) {
        for (var col = 0; col < board[row].length; col++) {
            //set all values to 0 to wipe board
            board[row][col] = 0;
            tboard[row][col] = 0;
        }
    }
    //redraw frame after to show empty cells
    draw();
}
function placeGlider(r,c){
  var x = new Glider(r,c)
}
//tick function is stored in html because it is just gol() or 'gameoflife()'
