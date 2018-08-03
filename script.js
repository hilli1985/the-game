let shapesCounter = 0;
let clickCounter = 0;
let curShapeNumber = 0;
let lastShapeCounter = 0;
let timerId;
const img = ["https://image.flaticon.com/icons/svg/146/146696.svg",
    "https://image.flaticon.com/icons/svg/146/146721.svg",
    "https://image.flaticon.com/icons/svg/146/146675.svg",
    "https://image.flaticon.com/icons/svg/146/146679.svg",
    "https://image.flaticon.com/icons/svg/146/146673.svg",
    "https://image.flaticon.com/icons/svg/146/146691.svg"
];

let rand;

$(document).ready(function() {
    $(".start-btn").click(function() {
        alert('start game');
        startGame();
    });
});


$(document).ready(function() {
    $(".try-again-btn").click(function() {
        alert('try from last lever again');
        shapesCounter = lastShapeCounter;
        clickCounter = 0;
        render();
    });
});

function shapeClicked(i) {
    //console.log("clicked i=" + i);
    $(".game-board").find("#game-shape-" + i).removeClass("game-shape").addClass('game-shape-clicked');
    clickCounter++;
    gameManage();
}

function render() {
    $(".game-board").find(".font-weight-bold").remove();
    $(".game-board").find(".game-shape").remove();
    $(".game-board").find(".game-shape-clicked").remove();
    for (let i = 0; i < shapesCounter; i++) {
        let posx = Math.floor(Math.random() * 1000);
        let posy = Math.floor(Math.random() * 500);
        let rand = Math.floor(Math.random() * 6);
        $(".game-board").append($("<div>").attr("id", "game-shape-" + i).addClass("game-shape").css('backgroundImage', "url(" + img[rand] + ")").css('position', 'absolute').css('left', posx + 'px').css('top', posy + 'px'));
        $("#game-shape-" + i).click(function() {
            shapeClicked(i);
        });
        console.log("posX=" + posx);
        console.log("posy=" + posy);
    }
    curShapeNumber = $(".game-board").find(".game-shape").length - $(".game-board").find(".game-shape-clicked").length;

}

function clear() {
    shapesCounter = 0;
    render();
    $(".game-board").append($("<div>").text("Game Over").addClass("font-weight-bold"));
}

function startGame() {
    shapesCounter = 1;
    render();
    gameManage();
}

function nextLevel() {
    timerId = setTimeout(() => gameOver(), 5000);
    clickCounter = 0;
    shapesCounter++;
    // render();
    setTimeout(render, 1000);
    lastShapeCounter = shapesCounter;
    gameManage();
}


function gameManage() {
    if (clickCounter === curShapeNumber) {
        clearTimeout(timerId);
        nextLevel();
    }
}

function gameOver() {
    console.log('gameOver');
    clear();
}