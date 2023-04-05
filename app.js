const colors = ['yellow', 'green', 'blue', 'red'];
const statusElement = document.querySelector('.status');
const scoreElement = document.querySelector('.score span');
const startButton = document.querySelector('.start');

let randomColors = [];
let userClicks = [];
let score = 0;
let startNewGame = false;

function updateStatusMessage(message) {
    statusElement.innerHTML = message;

    if (message == 'Reproduza') {
        statusElement.style.backgroundColor = '#a9f1e5';
    } else if (message == 'Observe') {
        statusElement.style.backgroundColor = 'aliceblue';
    } else {
        statusElement.style.backgroundColor = 'red';
    }
};

function startGame() {
    if (startNewGame) {
        resetGame();
        startNewGame = false;
    };
    getRandomColor();
    addBlockEvent();
};

function getRandomColor() {
    const colorOrder = colors[Math.floor(Math.random() * colors.length)];

    randomColors.push(colorOrder);
    userClicks = [];

    randomColors.forEach(function (color, index) {
        let boxElement = getBoxElement(color);
        lightUpBoxElement(boxElement, Number(index) + 1);
    });

    setTimeout(() => {
        updateStatusMessage('Reproduza');
    }, randomColors.length * 1400);
};

function getBoxElement(color) {
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

    if (index === 1) {
        updateStatusMessage('Observe');
    }

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
                scoreElement.innerHTML = score;
                startGame();
            }, 600);
        };
    };
};

function endGame() {
    updateStatusMessage('ERROU\nScore: ' + score);
    removeBlockEvent();
    startNewGame = true;
};

function resetGame() {
    score = 0;
    scoreElement.innerHTML = 0;
    randomColors = [];
    userClicks = [];
    updateStatusMessage('Observe');
};

function addBlockEvent() {
    document.querySelectorAll('.block').forEach(function (block) {
        block.addEventListener('click', handleBlockClick);
    });
};

function removeBlockEvent() {
    document.querySelectorAll('.block').forEach(function (block) {
        block.removeEventListener('click', handleBlockClick);
    });
};

function handleBlockClick(e) {
    processClick(e.target);
};

startButton.addEventListener('click', startGame);