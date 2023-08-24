//rows that could fit on my screen
let rs = 31
//cols that could fit
let cls = 64
//game board is an array of [rs][cls]
let board = new Array(rs)
//array to store 1 cells
let arr = []
//array to store 0 cells
let farr = []
//boolean for if glider place mode is on
let isPlace = false
//raphael canvas initialization
let paper = Raphael(0, 30, innerWidth, innerHeight);
//populates array with arrays to make 2d matrix
let placingGliders = false
for (let i = 0; i < board.length; i++) {
  board[i] = new Array(cls)
}
//set every item in board to 0
for (let x = 0; x < board.length; x++) {
  for (let i = 0; i < board[x].length; i++) {
    board[x][i] = 0
  }
}
//temp board so changes can be executed line by line without affecting real board
//to do: add get arr data in for loop, check if filled square id is in arr, if it is, get coords and update to 0
let tboard = new Array(rs)
for (let i = 0; i < tboard.length; i++) {
  tboard[i] = new Array(cls)
}
//func to set board easier
const setb = (row, col, val) => {
  board[row][col] = val
}

//set tempt board
const settb = (row, col, val) =>{
  tboard[row][col] = val
}

const getCellVal = (row,col) =>{
  return board[row][col]
}
//glider pattern
// setb(1, 2, 1)
// setb(2, 3, 1)
// setb(3, 3, 1)
// setb(3, 2, 1)
// setb(3, 1, 1)
//board before changes
//setting temp board values to board values
for (let row = 0; row < tboard.length; row++) {
  for (let col = 0; col < tboard[row].length; col++) {
    tboard[row][col] = board[row][col]
  }
}
const glider = (rowval, colval) => {
  let r = Number.parseInt(rowval)
  let c = Number.parseInt(colval)
  settb(r, c, 1)
  settb(r + 1, c + 1, 1)
  settb(r + 2, c + 1, 1)
  settb(r + 2, c, 1)
  settb(r + 2, c - 1, 1)
  draw()
}
glider(1, 2)
const gol = () =>{ // gameoflife()
  //makes a generation happen in the game
  //clear raphael canvas
  draw()
  for (let b = 0; b < 1; b++) {
    //number of generations as g
    for (let g = 0; g < 1; g++) {
      //row as x
      for (let x = 0; x < board.length; x++) {
        //col as i
        for (let i = 0; i < board[x].length; i++) {

          //put all neighbor cell letiables in try as not to get out of bounds error
          //if out of bounds neighbor cell letiable defaults to 0 but cannot be revived
          
          // Update the cell values in the newBoard array
          const neighbors = [
                { row: x - 1, col: i }, // up
                { row: x + 1, col: i }, // down
                { row: x, col: i - 1 }, // left
                { row: x, col: i + 1 }, // right
                { row: x - 1, col: i + 1 }, // diag up right
                { row: x + 1, col: i + 1 }, // diag down right
                { row: x - 1, col: i - 1 }, // diag up left
                { row: x + 1, col: i - 1 } // diag down left
              ];
              let n = 0;
        
              for (let j = 0; j < neighbors.length; j++) {
                const nrow = neighbors[j].row;
                const ncol = neighbors[j].col;
        
                if (
                  nrow >= 0 &&
                  nrow < board.length &&
                  ncol >= 0 &&
                  ncol < board[nrow].length
                ) {
                  if (board[nrow][ncol] == 1) {
                    n++;
                  }
                }
              }
        
              if (((n < 2) || (n >= 4)) && board[x][i] == 1) {
                tboard[x][i] = 0;
              } else if (n == 3 && board[x][i] == 0) {
                tboard[x][i] = 1;
              } else {
                tboard[x][i] = board[x][i];
              }
          //and cell with less than 2 neighbors or greater than 4 dies
          
        }
      }

      //set board value to temp board values
      for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
          board[r][c] = tboard[r][c]
        }
      }

    }
  }
  draw()
}
//visualizes board
function draw() {
  paper.clear()
  //redraw frame
  arr.length = 0
  farr.length = 0
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      board[r][c] = tboard[r][c]
    }
  }
  //loop for every row
  for (let row = 0; row < tboard.length; row++) {
    //loop for every coloumn
    for (let col = 0; col < tboard[row].length; col++) {
      //check if current cell on temp board or tboard[row][col] is not 1
      if (tboard[row][col] != 1) {
        //if cell isnt 1, set css color attribute to white
        //math to space out squares
        let f = paper.rect(col * 30, row * 30, 25, 25)
          //css fill white
          .attr({
            fill: "#232640",
          })
          //click function to set css fill to black and more
          .click(function(){
            if (this.attr("fill") == "#232640") {
              //set fill to black if fill is white
              this.attr({
                fill: "#111325"
              })
              //loop through 1 cell array to see if cell is 1 and gets id of cell
              for (let v = 0; v < farr.length; v++) {
                //if id of cell is in array
                if (this.id == farr[v][0]) {
                  //get coords from array and split
                  let coords = farr[v][1].split(", ")
                  //get coords from split array
                  //set lets for x and y
                  let x = coords[0]
                  let y = coords[1]
                  //set coord of current cell to 1 
                  if (placingGliders) {
                    glider(x, y)
                  } else {

                    settb(x, y, 1)
                    // setb(x, y, 1)
                  }
                  //loop to remove cell from 0 array
                  for (let i = 0; i < farr.length; i++) {
                    if (farr[i][0] == this.id) {
                      farr.splice(i, 1);
                    }
                  }
                  //adds id along with row and col to 1 array so it can be changed later
                  arr[arr.length] = [
                    [this.id], x + ", " + y
                  ]
                }
              }
            } else {
              this.attr({
                fill: "#232640"
              })
              for (let l = 0; l < arr.length; l++) {
                if (arr[l][0] == this.id) {
                  //get coords from array and split
                  let coords = arr[l][1].split(", ")
                  //get coords from split array
                  //set lets for x and y
                  let x = coords[0]
                  let y = coords[1]
                  //set coord of current cell to 0
                  if (placingGliders) {

                    glider(x, y)
                  } else {

                    settb(x, y, 0)
                  }
                  //loop to remove cell from 1 array
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i][0] == this.id) {
                      arr.splice(i, 1);
                    }
                  }
                  //adds id along with row and col to 0 array so it can be changed later
                  farr[farr.length] = [
                    [this.id], x + ", " + y
                  ]
                  for (let r = 0; r < board.length; r++) {
                    for (let c = 0; c < board[r].length; c++) {
                      board[r][c] = tboard[r][c]
                    }
                  }
                }
              }
            }
            for (let r = 0; r < board.length; r++) {
              for (let c = 0; c < board[r].length; c++) {
                board[r][c] = tboard[r][c]
              }
            }
          });
        //when cell is initialized, it will add to dead if it is dead
        //adds id along with row and col so it can be changed later
        farr[farr.length] = [
          [f.id], row + ", " + col
        ]
      }
      //same thing as above but if cell is 1, so opposite
      if (tboard[row][col] == 1) {
        let f = paper.rect(col * 30, row * 30, 25, 25)
          //if cell isnt 1, set css color attribute to black
          //math to space out squares
          .attr({
            fill: "#111325"
          })
          //click function to set css fill to black and more
          .click(function(){
            if (this.attr("fill") == "#111325") {
              this.attr({
                fill: "#232640"
              })
              for (let l = 0; l < arr.length; l++) {
                if (arr[l][0] == this.id) {
                  let coords = arr[l][1].split(", ")
                  let x = coords[0]
                  let y = coords[1]
                  if (placingGliders) {
                    glider(x, y)
                  } else {
                    settb(x, y, 0)
                  }
                  for (let i = 0; i < arr.length; i++) {
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
                fill: "#111325"
              })
              for (let v = 0; v < farr.length; v++) {
                if (this.id == farr[v][0]) {
                  let coords = farr[v][1].split(", ")
                  let x = coords[0]
                  let y = coords[1]

                  if (placingGliders) {
                    glider(x, y)
                  } else {
                    settb(x, y, 0)
                  }

                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i][0] == this.id) {
                      arr.splice(i, 1);
                    }
                  }
                  arr[arr.length] = [
                    [this.id], x + ", " + y
                  ]
                  for (let r = 0; r < board.length; r++) {
                    for (let c = 0; c < board[r].length; c++) {
                      board[r][c] = tboard[r][c]
                    }
                  }
                }
              }
            }
          });
        arr[arr.length] = [
          [f.id], row + ", " + col
        ]
        for (let r = 0; r < board.length; r++) {
          for (let c = 0; c < board[r].length; c++) {
            board[r][c] = tboard[r][c]
          }
        }
      }
    }
  }
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      board[r][c] = tboard[r][c]
    }
  }
}
//initialize interval so html can get it in scope
let inter = 0

//function to get board moving in display
const Start = () =>{
  //try catch because it is input so text could be used
  try { clearInterval(inter) } catch (e) { }
  try {
    inter = setInterval(gol, parseInt(document.getElementById("ss").value))
  } catch (e) {
    //if text set 1 second frame draw times
    inter = setInterval(gol, 1000)
  }
}
//function to reset board to blank
const clearboard = () =>{
  //loop through row/col
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      //set all values to 0 to wipe board
      board[row][col] = 0;
      tboard[row][col] = 0;
    }
  }
  //redraw frame after to show 0 cells
  draw();
}
const placeGlider = (r, c) =>{
  let x = new Glider(r, c)
}
//tick function is stored in html because it is just gol() or 'gameoflife()'
