const colors = ['yellow', 'green', 'blue', 'red'];
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
let randomColors = [];
let userClicks = [];
let score = 0;

function startGame() {
    getRandomColor();
};

function getRandomColor() {
    const colorOrder = colors[Math.floor(Math.random() * colors.length)];

    randomColors.push(colorOrder);
    userClicks = [];

    randomColors.forEach(function (color, index) {
        let boxElement = getElement(color);
        lightUpBoxElement(boxElement, Number(index) + 1);
    });
};

function getElement(color) {
    switch (color) {
        case 'yellow':
            return document.querySelector('.block-yellow');
        case 'blue':
            return document.querySelector('.block-blue');
        case 'green':
            return document.querySelector('.block-green');
        case 'red':
            return document.querySelector('.block-red');
        default:
            return 'Unknown';
    };
};

function lightUpBoxElement(boxElement, index) {
    let delay = index * 1200;

    setTimeout(function () {
        boxElement.style.opacity = '1';
    }, delay - 400);

    setTimeout(function () {
        boxElement.style.opacity = '.3';
    }, delay + 300);
};

function processClick(e) {

    userClicks.push(e.id);
    e.style.opacity = '1';

    setTimeout(() => {
        e.style.opacity = '.3';
    }, 300);

    checkOrder();
};

function checkOrder() {
    const index = userClicks.length - 1;

    if (userClicks[index] != randomColors[index]) {
        endGame();
    } else {
        if (userClicks.length == randomColors.length) {
            score++
            setTimeout(function () {
                alert('São iguais\nPONTUAÇÃO: ' + score + '\n\n\n OBSERVE!!');
                startGame();
            }, 600);
        };
    };
};

function endGame() {
    alert('GAME OVER!!\n\nSeu SCORE: ' + score);
    resetGame();
};

function resetGame(){
    score = 0;
    randomColors = [];
    userClicks = [];
    return;
};

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

document.querySelectorAll('.block').forEach(function (block) {
    block.addEventListener('click', function (e) {
        processClick(e.target)
    });
});