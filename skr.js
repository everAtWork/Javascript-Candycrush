document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    const candyColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ]
    let score = 0


    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')

            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundColor = candyColors[randomColor]
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            grid.appendChild(square);

            squares.push(square)
        }
    }

    createBoard();



    // drag 'em kandies

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square =>
        square.addEventListener('dragend', dragEnd));
    squares.forEach(square =>
        square.addEventListener('dragover', dragOver));
    squares.forEach(square =>
        square.addEventListener('dragenter', dragEnter));
    squares.forEach(square =>
        square.addEventListener('dragleave', dragLeave));
    squares.forEach(square =>
        square.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id)
    }

    function dragEnd() {
        let validMoves = [squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ]

        let validMove = validMoves.includes(squareIdBeingReplaced);

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        } else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }

    function dragOver(e) {
        e.preventDefault()


    }

    function dragEnter() {

    }

    function dragLeave() {

    }


    function dragDrop() {
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    }



    // checking for matches
    // check row of Three 
    function checkRowOfThree() {
        for (let i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue
            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                rowOfThree.forEach(index => {

                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkRowOfThree()


    // check column of Three 
    function checkColumnOfThree() {
        for (let i = 0; i < 47; i++) { // no magic numbers, please, sir
            let columnOfThree = [i, i + width, i + width * 2] // think of a column in a proper way 
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                columnOfThree.forEach(index => {

                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkColumnOfThree()

    // 4's 4s 4's 4s 4's 4s 


    // check row of Four 
    function checkRowOfFour() {
        for (let i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue
            if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                rowOfFour.forEach(index => {

                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkRowOfFour()


    // check column of Four 
    function checkColumnOfFour() {
        for (let i = 0; i < 47; i++) { // no magic numbers, please, sir
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3] // think of a column in a proper way 
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                columnOfFour.forEach(index => {

                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkColumnOfFour()

    window.setInterval(function () {
        checkRowOfFour()
        checkColumnOfFour()
        checkRowOfThree()
        checkColumnOfThree()
    }, 100)
})