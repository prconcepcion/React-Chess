import './App.scss'
import { Piece } from './components/Piece'
import { Tile } from './components/Tile'
import { useState } from 'react';

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

	console.log('render')

	return (
		<div className='chessboard'>
		  {board.map( ( row, i ) => {
			return ( 
			  <div 
				key={i} className={ (i+1) % 2 === 0 ? 'chessboard-row even' : 'chessboard-row odd' } 
			  >
			  { row.map( ( square, j ) => {
				return (
				<Tile
				  key={j}
				  coordinate={j+i.toString(10)}
				  board={board}
				  setBoard={setBoard}
				> 
				  { square ? <Piece name={square}/> : null }
				</Tile> )
			  } ) }
			</div> )
		  } )}
		</div>
		)
}

export default App
