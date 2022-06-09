const gameboard = (() => {
    const xClass = 'x';
    const oClass = 'o';
    const squareElements = document.querySelectorAll('[data-square]');
    const restartButton = document.getElementById('restartButton')
    let circleTurn
    
    playGame()
    restartButton.addEventListener('click', playGame)

    function playGame() {
        circleTurn = false;
        squareElements.forEach(square => {
            square.classList.remove(xClass)
            square.classList.remove(oClass)
            square.removeEventListener('click', handleClick)
            square.addEventListener('click', handleClick, {once: true});
        });
    };

    function handleClick(e) {
        const square = e.target;
        const currentClass = circleTurn ? oClass : xClass;
        placeMark(square, currentClass);
        if (checkWin(currentClass)) {
            return 'winner'
        }
        swapTurns()
    };
    function placeMark(square, currentClass) {
        square.classList.add(currentClass)
    };
    function swapTurns() {
        circleTurn = !circleTurn
    }; 

    const winStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function checkWin(currentClass) {
        return winStates.some(states => {
            return states.every(index => {
                return squareElements[index].classList.contains(currentClass)
            })
        });
    }

})();

const Player = (playerName, sign) => {
    
};