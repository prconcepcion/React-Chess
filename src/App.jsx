import './App.scss'
import { Piece } from './components/Piece'
import { useState, useEffect } from 'react';

const startingPositions = {
	'1a': ['whiteRook', 'white'],
	'1b': ['whiteKnight','white'],
	'1c': ['whiteBishop', 'white'],
	'1d': ['whiteQueen', 'white'],
	'1e': ['whiteKing', 'white'],
	'1f': ['whiteBishop', 'white'],
	'1g': ['whiteKnight', 'white'],
	'1h': ['whiteRook', 'white'],
	'2a': ['whitePawn', 'white'],
	'2b': ['whitePawn','white'],
	'2c': ['whitePawn','white'],
	'2d': ['whitePawn','white'],
	'2e': ['whitePawn','white'],
	'2f': ['whitePawn','white'],
	'2g': ['whitePawn','white'],
	'2h': ['whitePawn','white'],
	'8a': ['blackRook','black'],
	'8b': ['blackKnight','black'],
	'8c': ['blackBishop','black'],
	'8d': ['blackQueen','black'],
	'8e': ['blackKing','black'],
	'8f': ['blackBishop','black'],
	'8g': ['blackKnight','black'],
	'8h': ['blackRook','black'],
	'7a': ['blackPawn','black'],
	'7b': ['blackPawn','black'],
	'7c': ['blackPawn','black'],
	'7d': ['blackPawn','black'],
	'7e': ['blackPawn','black'],
	'7f': ['blackPawn','black'],
	'7g': ['blackPawn','black'],
	'7h': ['blackPawn','black'],
}

const initialBoard = [
	[ 'blackRook', 'blackKnight', 'blackBishop', 'blackQueen',  'blackKing', 'blackBishop', 'blackKnight', 'blackRook' ],
	[ 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', ],
	[ null, null, null, null, null, null, null, null, ],
	[ null, null, null, null, null, null, null, null, ],
	[ null, null, null, null, null, null, null, null, ],
	[ null, null, null, null, null, null, null, null, ],
	[ 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', ],
	[ 'whiteRook', 'whiteKnight', 'whiteBishop', 'whiteQueen',  'whiteKing', 'whiteBishop', 'whiteKnight', 'whiteRook' ],
]

function App() {

	const [ board, setBoard ] = useState( initialBoard )

	console.log(board)

	return (
	<div className='chessboard'>
		{board.map( ( row, i ) => {
			return ( <div key={i} className={ (i+1) % 2 === 0 ? 'chessboard-row even' : 'chessboard-row odd' } >
				{ row.map( ( square, j ) => {
					return (
					<div key={j} className='tile' > 
						{square}
					</div>)
				} ) }
			</div> )
		} )}
	</div>
	)
}

export default App
