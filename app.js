const gameboard = (() => {
    const xClass = 'x';
    const oClass = 'o';
    const squareElements = document.querySelectorAll('[data-square]');
    const restartButton = document.getElementById('restartButton');
    const turnDisplay = document.querySelector('#turnDisplay');
    const gameTitle = document.querySelector('#gameTitle');

    let circleTurn

    playGame()
    restartButton.addEventListener('click', playGame)

    function playGame() {
        circleTurn = false;
        const cls = ['sunVictory', 'moonVictory', 'noVictory'];
        gameTitle.innerHTML = '<h1>Tic-Tac-Toe... Go!</h1>';
        gameTitle.classList.remove(...cls);
        turnDisplay.innerText = "Team SUN is up first!"
        squareElements.forEach(square => {
            square.classList.remove(xClass)
            square.classList.remove(oClass)
            square.removeEventListener('click', handleClick)
            square.addEventListener('click', handleClick, {once: true});
            square.addEventListener('mouseover', function(e) {
                e.target.style.backgroundColor = "lightgrey";
            });
            square.addEventListener('mouseleave', function(e) {
                e.target.style.backgroundColor = "white";
            });
        });
    };
   
    function checkDraw() {
        return [...squareElements].every(square => {
            return square.classList.contains(xClass) || 
            square.classList.contains(oClass)
        })
    };

    function handleClick(e) {
        const square = e.target;
        const currentClass = circleTurn ? oClass : xClass;
        placeMark(square, currentClass);
        if (checkWin(xClass)) {
            gameTitle.classList.add('sunVictory');
            gameTitle.innerHTML = '<h1>SUN TEAM WINS!</h1>';
            squareElements.forEach(square => {
                square.removeEventListener('click', handleClick)
            });
        } else if (checkWin(oClass)) {
            gameTitle.innerHTML = '<h1>MOON TEAM WINS!</h1>';
            gameTitle.classList.add('moonVictory');
            squareElements.forEach(square => {
                square.removeEventListener('click', handleClick)
            });
        } else if (checkDraw()) {
            gameTitle.innerHTML = "<h1>It's a DRAW!</h1>";
            gameTitle.classList.add('noVictory');
        } else
        swapTurns()
        
    };
    function placeMark(square, currentClass) {
        square.classList.add(currentClass)
    };
    function swapTurns() {
        circleTurn = !circleTurn
        if (circleTurn === false) {
            turnDisplay.innerText = "SUN team's turn";
           
        } else {
            turnDisplay.innerText = "MOON team's turn";
         
        }
    }; 

    const winStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
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

const Players = (() => {
    

})();