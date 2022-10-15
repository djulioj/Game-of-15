var size = 4;
var fieldCells = createField();
var values;
var emptyX, emptyY;
var LEFT = {dx: 1, dy: 0};
var RIGHT = {dx: -1, dy: 0};
var UP = {dx: 0, dy: 1};
var DOWN = {dx: 0, dy: -1};
var moves = 0;
var shufflebtn = document.getElementById("shuffle");
var au = document.getElementById("au");
var audio = document.getElementById("audio"); 
var playing = true;
var moves = 0;
var it = true;
var up = document.getElementById("up");
var left = document.getElementById("left");
var down = document.getElementById("down");
var right = document.getElementById("right");

function createField() {
    var cells = [];
    var table = document.getElementById('field');
    for (var y = 0; y < size; y++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        var rowCells = [];
        cells.push(rowCells);
        for (var x = 0; x < size; x++) {
            var td = document.createElement('td');
            td.setAttribute('class', 'cell');
            tr.appendChild(td);
            rowCells.push(td);
        }
    }
    return cells;
}

function createInitialValues() {
    emptyX = emptyY = size - 1;
    var v = [];
    var i = 1;
    for (var y = 0; y < size; y++) {
        var rowValues = [];
        v.push(rowValues);
        for (var x = 0; x < size; x++) {
            rowValues.push(i);
            i++
        }
    }
    v[emptyY][emptyX] = 0;
    return v;
}

function draw() {
    mov=document.getElementById("moves");
	mov.innerHTML="Moves: "+ moves.toString();
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            var v = values[y][x];
            var td = fieldCells[y][x];
            td.innerHTML = v == 0 ? '': String(v);
        }
    }
}
      
function makeMove(move) {
    var newX = emptyX + move.dx, newY = emptyY + move.dy;
    if ((newX >= size) || (newX < 0) || (newY >= size) || (newY < 0)) {
          return false;
    }else{
        if(it===true){
            moves++;
        }
        
    }
    var c = values[newY][newX];
    values[newY][newX] = 0;
    values[emptyY][emptyX] = c;
    emptyX = newX;
    emptyY = newY;
    return true;
}


function shuffle() {
    moves = 0;
    var options = [LEFT, RIGHT, UP, DOWN];
    var iterations = 1000;
    it = false;
    for (var i = 0; i < iterations; i++) {
        var move = options[Math.floor(Math.random() * options.length)];
        makeMove(move);
    }
}

function won() {
    var expectedValue = 1;
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            if (values[y][x] == expectedValue) {
              expectedValue++;
            } else {
              if (x == size - 1 && y == size - 1 && values[y][x] == 0) {
                return true;
              }
              return false;
            }
        }
    }
    return true;
}

document.addEventListener('keydown', function(e) {
    it=true;
    switch (e.keyCode) {
        case 38: makeMove(UP); up.src="./images/up-arrow-blue.png"; break;
        case 40: makeMove(DOWN); down.src="./images/down-arrow-blue.png"; break;
        case 37: makeMove(LEFT); left.src="./images/left-arrow-blue.png"; break;
        case 39: makeMove(RIGHT); right.src="./images/right-arrow-blue.png"; break;
    }
    draw();
    if (won()) {
        setTimeout(function() {
            alert('you won in ' + moves.toString() + ' moves!');
            init();
        }, 1000);
    }
});

document.addEventListener('keyup', function(e) {
    it=true;
    switch (e.keyCode) {
        case 38: up.src="./images/up-arrow.png"; break;
        case 40: down.src="./images/down-arrow.png"; break;
        case 37: left.src="./images/left-arrow.png"; break;
        case 39: right.src="./images/right-arrow.png"; break;
    }
    draw();
    if (won()) {
        setTimeout(function() {
            alert('you won in ' + moves.toString() + ' moves!');
            init();
        }, 1000);
    }
});

shufflebtn.addEventListener('click',function(e){
    shuffle();
    draw();
});

au.addEventListener('click',function(e){
    if(playing === true){
        audio.pause();
        au.src="./images/nosound.png";
        playing = false;
    }else{
        audio.play();
        au.src="./images/sound.png";
        playing = true;
    }
    
});

function init() {
    audio.volume = 0.03;
    values = createInitialValues();
    shuffle();
    draw();
}

init();   