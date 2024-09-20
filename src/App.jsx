import './App.scss'
import { MoveList } from './components/MoveList';
import { Piece } from './components/Piece'
import { Tile } from './components/Tile'
import { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { selectMoves } from './store/movelist/counterMoveList';

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
    const moveList = useSelector( selectMoves )

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
                                    { square ? <Piece isBoard={ true } side={ square.slice( 0, 5 ) } name={ square } /> : null }
                                </Tile> )
                            } ) }
                        </div> )
                } ) }
            </div> 
            <div className='move-list'>
                { moveList.length !== 0 &&  <MoveList /> }
            </div>
        </>

    )
}

export default App
