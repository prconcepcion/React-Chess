import { useCallback, useEffect, useRef } from 'react'
import BlackBishop from '../assets/black-bishop.png'
import BlackKing from '../assets/black-king.png'
import BlackKnight from '../assets/black-knight.png'
import BlackPawn from '../assets/black-pawn.png'
import BlackQueen from '../assets/black-queen.png'
import BlackRook from '../assets/black-rook.png'
import WhiteBishop from '../assets/white-bishop.png'
import WhiteKing from '../assets/white-king.png'
import WhiteKnight from '../assets/white-knight.png'
import WhitePawn from '../assets/white-pawn.png'
import WhiteQueen from '../assets/white-queen.png'
import WhiteRook from '../assets/white-rook.png'


export const Piece = props => {
    const { name } = props
    const myRef = useRef(null);

    let image = BlackPawn
    switch(name){
        case 'whiteRook':
            image = WhiteRook
            break;
        case 'whiteKnight':
            image = WhiteKnight
            break;
        case 'whiteBishop':
            image = WhiteBishop
            break;
        case 'whiteQueen':
            image = WhiteQueen
            break;
        case 'whiteKing':
            image = WhiteKing
            break;
        case 'whitePawn':
            image = WhitePawn
            break; 
        case 'blackRook':
            image = BlackRook
            break;
        case 'blackKnight':
            image = BlackKnight
            break;
        case 'blackBishop':
            image = BlackBishop
            break;
        case 'blackQueen':
            image = BlackQueen
            break;
        case 'blackKing':
            image = BlackKing
            break;
        case 'blackPawn':
            image = BlackPawn
            break;           
    }
        

    return (
        <>
            <img ref={myRef} src={image} id={name} width="100" height="100" />
        </>
    )
}