import BlackBishop from '../assets/black-bishop.png'
import BlackKnight from '../assets/black-knight.png'
import BlackQueen from '../assets/black-queen.png'
import BlackRook from '../assets/black-rook.png'

import WhiteBishop from '../assets/white-bishop.png'
import WhiteKnight from '../assets/white-knight.png'
import WhiteQueen from '../assets/white-queen.png'
import WhiteRook from '../assets/white-rook.png'

import { useDispatch } from "react-redux";
import { changeTurn } from "../store/turn/counterTurn";
import { useSelector } from 'react-redux'
import { selectTurn } from '../store/turn/counterTurn'

export const PromotingPiece = ({coordinate, board, setBoard}) => {

    const turn = useSelector( selectTurn )
    const dispatch = useDispatch()

    const promote = name => {
        let tempBoard = [...board]
        tempBoard[coordinate.row][coordinate.column] = name
        setBoard( tempBoard )
        dispatch( changeTurn() )
    }
    
    if ( turn === 'black' ) {
        return (
            <div className='promoting-piece'>
                <button onClick={ () => promote( 'blackBishop' ) } type="submit">
                    <img src={ BlackBishop } height="20" width="20" alt="buttonpng" border="0" />
                </button>
                <button onClick={ () => promote( 'blackKnight' ) } type="submit">
                    <img src={ BlackKnight } height="20" width="20" alt="buttonpng" border="0" />
                </button>
                <button onClick={ () => promote( 'blackQueen' ) } type="submit">
                    <img src={ BlackQueen } height="20" width="20" alt="buttonpng" border="0" />
                </button>
                <button onClick={ () => promote( 'blackRook' ) } type="submit">
                    <img src={ BlackRook } height="20" width="20" alt="buttonpng" border="0" />
                </button>
            </div>
        )
    } else {
        return (
            <div className='promoting-piece'>
                <button onClick={ () => promote( 'whiteBishop' ) } type="">
                    <img src={ WhiteBishop } height="20" width="20" alt="buttonpng" border="0" />
                </button>
                <button onClick={ () => promote( 'whiteKnight' ) } type="">
                    <img src={ WhiteKnight } height="20" width="20" alt="buttonpng" border="0" />
                </button>
                <button onClick={ () => promote( 'whiteQueen' ) } type="">
                    <img src={ WhiteQueen } height="20" width="20" alt="buttonpng" border="0" />
                </button>
                <button onClick={ () => promote( 'whiteRook' ) } type="">
                    <img src={ WhiteRook } height="20" width="20" alt="buttonpng" border="0" />
                </button>
            </div>
        )
    }
}