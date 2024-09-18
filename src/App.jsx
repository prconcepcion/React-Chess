import './App.scss'
import { Piece } from './components/Piece'
import { Tile } from './components/Tile'
import { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { selectTurn } from './store/turn/counterTurn';

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
    const turn = useSelector( selectTurn )
	const [ board, setBoard ] = useState( initialBoard )
    
	return ( 
        <>
            <div className='chessboard'>
                { board.map( ( row, i ) => {
                    return ( <div key={i} className={ (i+1) % 2 === 0 ? 'chessboard-row even' : 'chessboard-row odd' } >
                            { row.map( ( square, j ) => {
                                return (
                                <Tile
                                    key={j}
                                    coordinate={i+''+j}
                                    board={board}
                                    setBoard={setBoard}
                                > 
                                    { square ? <Piece side={ square.slice( 0, 5 ) } name={ square } /> : null }
                                </Tile> )
                            } ) }
                        </div> )
                } ) }
            </div> 
            <div>
                { turn }
            </div>
        </>

    )
}

export default App
