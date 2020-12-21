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
})