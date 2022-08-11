$(function () {
	// determines which player's turn it is
	let playerOneTurn = true
	// used to determine if round is a draw
	let roundCount = 0
	$('.turn').text(`${playerOneTurn ? 'X' : 'O'}'s turn.`)
	// determines if a winner is found
	let isGameOver = ''
	// handle cell click event
	function handleClick() {
		let className = playerOneTurn ? 'cellX' : 'cellO'
		// handles already clicked tiles or if game is over
		if (
			$(this).hasClass('cellX') ||
			$(this).hasClass('cellO') ||
			isGameOver
		) {
			return
		}
		$(this).addClass(className)
		roundCount++
		playerOneTurn = !playerOneTurn
		// changes visual text
		playerOneTurn
			? $('.turn').text("X's turn.")
			: $('.turn').text("O's turn.")
		// checks if game is over
		isGameOver = getWinner()
		isGameOver === 'x' && $('.turn').text('X wins.')
		isGameOver === 'o' && $('.turn').text('O wins.')
		if (roundCount > 8 && !isGameOver) {
			$('.turn').text('Cat got it.')
		}
	}
	// handles reset
	function handleButtonClick() {
		// clears cells
		$('div').removeClass('cellX')
		$('div').removeClass('cellO')
		// reset vars
		playerOneTurn = true
		isGameOver = false
		roundCount = 0
		$('.turn').text("X's turn")
	}
	$('.cell').on('click', handleClick)
	$('#resetbutton').on('click', handleButtonClick)
})

// winning cell id combinations
const winningCombos = [
	['cell-1', 'cell-2', 'cell-3'],
	['cell-4', 'cell-5', 'cell-6'],
	['cell-7', 'cell-8', 'cell-9'],
	['cell-1', 'cell-4', 'cell-7'],
	['cell-2', 'cell-5', 'cell-8'],
	['cell-3', 'cell-5', 'cell-9'],
	['cell-1', 'cell-5', 'cell-9'],
	['cell-3', 'cell-5', 'cell-7'],
]

// returns empty string if no winner is found, x or o if won
const getWinner = () => {
	// checks each winning combo against each cell
	for (let i = 0; i < winningCombos.length; i++) {
		let winCondition = winningCombos[i]
		// checks the 3rd classname of each winning combo
		let a = $(`#${winCondition[0]}`).attr('class').split(/\s+/)[2]
		let b = $(`#${winCondition[1]}`).attr('class').split(/\s+/)[2]
		let c = $(`#${winCondition[2]}`).attr('class').split(/\s+/)[2]
		if (a === 'cellX' && b === 'cellX' && c === 'cellX') {
			return 'x'
		}
		if (a === 'cellO' && b === 'cellO' && c === 'cellO') {
			return 'o'
		}
	}
	return ''
}
