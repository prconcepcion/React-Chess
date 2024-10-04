import './App.scss'
import { MoveList } from './components/MoveList';
import { Piece } from './components/Piece'
import { Tile } from './components/Tile'
import { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { selectMoves } from './store/movelist/counterMoveList';
import { GameOverScreen } from './components/GameOverScreen';

function App() {
	const [ board, setBoard ] = useState( [
        [ 'blackRook', 'blackKnight', 'blackBishop', 'blackQueen',  'blackKing', 'blackBishop', 'blackKnight', 'blackRook' ],
        [ 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', 'blackPawn', ],
        [ null, null, null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, null, null, ],
        [ null, null, null, null, null, null, null, null, ],
        [ 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', 'whitePawn', ],
        [ 'whiteRook', 'whiteKnight', 'whiteBishop', 'whiteQueen',  'whiteKing', 'whiteBishop', 'whiteKnight', 'whiteRook' ],
    ] )
    const moveList = useSelector( selectMoves )
    const [ gameover, setGameover ] = useState( false )

    console.log(board)

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
                                    setBoard={ setBoard }
                                    setGameover={ setGameover }
                                >
                                    { square ? <Piece coordinate={{row:i,column:j}} board={board} setBoard={setBoard} isBoard={ true } side={ square.slice( 0, 5 ) } name={ square } /> : null }
                                </Tile> )
                            } ) }
                        </div> )
                } ) }
                { gameover && <GameOverScreen setBoard={ setBoard } setGameover={ setGameover } /> }
            </div> 
            <div className='move-list'>
                <MoveList />
            </div>
        </>

    )
}

export default App
