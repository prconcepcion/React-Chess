import { useSelector } from 'react-redux'; 
import { selectTurn } from '../store/turn/counterTurn'
import { initialBoard } from '../App';
import { useDispatch } from "react-redux";
import { resetCastle } from '../store/castling/counterCastle';
import { resetMoveList } from '../store/movelist/counterMoveList';
import { resetTurn } from '../store/turn/counterTurn';


export const GameOverScreen = ({ setBoard, setGameover }) => {
    const turn = useSelector( selectTurn  )
    const side = turn.toUpperCase()
    const dispatch = useDispatch()

    const reset = () => {
        setBoard( initialBoard )
        setGameover( false )
        dispatch( resetCastle() )
        dispatch( resetMoveList() )
        dispatch( resetTurn() )
    }

    return <div className='gameover-screen'>
        <h1>
            {`${ side } WINS `}
        </h1>
        <button onClick={ () => { reset() } } className='btn-reset'> RESET </button>
    </div>
}