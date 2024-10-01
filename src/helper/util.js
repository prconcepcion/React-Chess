import { store } from "../store/store"
import { whiteCastling, blackCastling } from "../store/castling/counterCastle"

export const checkValidMove = ( move ) => {
  
	const { piece, origin, destination, board, pieceAtDestination, side } = move
    let isValid = false


    const test = [ ...board ]

	if ( piece === 'blackKnight' || piece === 'whiteKnight' ) {
		isValid = knightMove( origin, destination )
	}

	if ( piece === 'blackRook' || piece === 'whiteRook' ) {
		isValid = rookMove( origin, destination, piece, test )
	}

	if ( piece === 'blackBishop' || piece === 'whiteBishop' ) {
		isValid = bishopMove( origin, destination, test )
	}
	
	if ( piece === 'blackQueen' || piece === 'whiteQueen' ) {
		isValid = ( bishopMove( origin, destination, test ) || rookMove( origin, destination, test ) )
	}

	if ( piece === 'blackKing' || piece === 'whiteKing' ) {
		isValid = kingMove( origin, destination, piece, test, )
	}

    if ( isValid && checkValidAttack( pieceAtDestination, side ) ) {
        test[destination.row][destination.column] = piece
		test[origin.row][origin.column] = null
        return { board: test, isValid  }
    }

	if ( piece === 'blackPawn' || piece === 'whitePawn' ) {
        const counter = piece === 'blackPawn' ? 1 : -1
        if ( pawnMove( origin, destination, counter, pieceAtDestination, side ) ) {
            test[destination.row][destination.column] = piece
            test[origin.row][origin.column] = null
            return { board: test, isValid: true }
        }
	}

    return { isValid: false }

}

const knightMove = ( origin, destination ) => {
    const possibleMoves = []
    const knightMoves = [
      {row:2, column:-1},{row:2, column:1},{row:1, column:-2},{row:1, column:2},
      {row:-2, column:-1},{row:-2, column:1},{row:-1, column:-2},{row:-1, column:2}
    ]

    const row = origin.row
    const column = origin.column

    for ( const el of knightMoves ) {
      const tempRow = row + el.row
      const tempColumn = column + el.column
      possibleMoves.push( tempRow + '' + tempColumn )
	}
    
    if ( possibleMoves.includes( destination.row + '' + destination.column ) ) {
      return true
    }

	return false
}

const rookMove = ( origin, destination, piece, board ) => {
    let originRow = origin.row
    let originColumn = origin.column
    const destinationRow = destination.row
    const destinationColumn = destination.column

    if ( originRow === destinationRow && originColumn === destinationColumn ) {
        return false
    }

    let counterRow = destinationRow === originRow ? 0 : 1
    let counterColumn = destinationColumn === originColumn ? 0 : 1
    counterRow = destinationRow < originRow ? -counterRow : counterRow
    counterColumn = destinationColumn < originColumn ? -counterColumn : counterColumn

    while ( true  ) {

        originRow += counterRow
        originColumn += counterColumn

        if ( originRow === destinationRow && originColumn === destinationColumn ) break
        if ( board[originRow][originColumn] !== null ) {
            return false
        }


    }

    if ( piece === 'whiteRook' ) {
        store.dispatch( whiteCastling( origin.row + '' + origin.column ) )
    } else { 
        store.dispatch( blackCastling( origin.row + '' + origin.column ) )
    }
    
    return true

}

const bishopMove = ( origin, destination, board ) => {
    let originRow = origin.row
    let originColumn = origin.column
    const destinationRow = destination.row
    const destinationColumn = destination.column

    if ( Math.abs( destinationRow - originRow ) !== Math.abs( destinationColumn - originColumn ) ) {
        return false
    }

    let counterRow = destinationRow > originRow ? 1 : -1
    let counterColumn = destinationColumn > originColumn ? 1 : -1

    while ( true  ) {
        originRow += counterRow
        originColumn += counterColumn
        
        if ( originRow === destinationRow && originColumn === destinationColumn ) break

        if ( board[originRow][originColumn] !== null ) {
            return false
        }
    }

	return true

}

const validCastle = ( origin, destination, piece, board ) => {
    const originRow = origin.row
    const originColumn = origin.column
    const destinationColumn = destination.column
    const {
        whiteCastleLeft,
        whiteCastleRight,
        blackCastleLeft,
        blackCastleRight
    } = store.getState().castle

    if ( ! [ 0, 7 ].includes( originRow ) ) {
        return false
    }

    if ( ! [ 6, 2 ].includes( destinationColumn ) ) {
        return false
    }

    if ( piece === 'whiteKing' && destinationColumn === 6 && ( ! whiteCastleRight || board[7][7] !== 'whiteRook' )) {
        return false
    }

    if ( piece === 'whiteKing' && destinationColumn === 2 && ( ! whiteCastleLeft || board[7][0] !== 'whiteRook')  ) {
        return false
    }

    if ( piece === 'blackKing' && destinationColumn === 6 && ( ! blackCastleRight || board[0][0] !== 'blackRook' )  ) {
        return false
    }

    if ( piece === 'blackKing' && destinationColumn === 2 && ( ! blackCastleLeft || board[0][7] !== 'blackRook' )  ) {
        return false
    }

    const counter = destinationColumn > originColumn ? 1 : -1
    const newRookColumn = destinationColumn === 6 ? 5 : 3
    const oldRookColumn = destinationColumn === 6 ? 7 : 0
    let i = originColumn

    if( board[originRow][i + counter] !== null ) {
        return false
    }

    return { castled: true, newRookColumn, oldRookColumn }
}

const kingMove = ( origin, destination, piece, board ) => {
    const originRow = origin.row
    const originColumn = origin.column
    const destinationRow = destination.row
    const destinationColumn = destination.column

    const canCastle = validCastle( origin, destination, piece, board )
    const counterCastle = store.getState().castle

    if ( canCastle ) {
        const rook = piece === 'blackKing' ? 'blackRook' : 'whiteRook'
        board[ originRow ][ canCastle.newRookColumn ] = rook
        board[ originRow ][ canCastle.oldRookColumn ] = null
        board[ originRow ][ originColumn ] = null

        if ( piece === 'whiteKing' ) {
            store.dispatch( whiteCastling( 'king' ) )
        } else { 
            store.dispatch( blackCastling( 'king' ) )
        }

        return true
    }

    if ( piece === 'whiteKing' && counterCastle.whiteCastleLeft && counterCastle.whiteCastleRight ) {
        console.log( 'gherere' )
        store.dispatch( whiteCastling( 'king' ) )
    }

    if ( piece === 'blackKing' && counterCastle.blackCastleLeft && counterCastle.blackCastleRight ) {
        store.dispatch( blackCastling( 'king' ) )
    }
    
    if ( Math.abs( destinationRow - originRow ) !== 1 || Math.abs( destinationColumn - originColumn ) !== 1 ) {
        return false
    }

    console.log('here')

	return true
}

const pawnMove = ( origin, destination, substractor, attackedPiece, side ) => {
	const row = origin.row
    const column = origin.column
    const startingPositions = [ '10', '11', '12', '13', '14', '15', '16', '17', '60', '61', '62', '63', '64', '65', '66', '67' ]

    const pawnAttack = substractor === 1 ?
    [ ( row + substractor ) + '' + ( column - substractor ), ( row + substractor ) + '' + ( column + substractor ) ] :
    [ ( row + substractor ) + '' + ( column + substractor ), ( row + substractor ) + '' + ( column + Math.abs(substractor) ) ]

	const pawnMove = [ ( row + substractor ) + '' + column ]

    if ( startingPositions.includes( origin.row + '' + origin.column ) ) {
        pawnMove.push( ( row + ( substractor * 2 ) ) + '' + column )
    }

    if ( pawnAttack.includes( destination.row + '' + destination.column )  && attackedPiece !== null ) {
        return checkValidAttack( attackedPiece, side )
    }

	if ( pawnMove.includes(destination.row + '' + destination.column ) && attackedPiece === null ) {
		return true
	}

    return false
}

export const checkValidAttack = ( attackedPiece, side ) => {
	const whitePieces = [ 'whiteRook', 'whiteKnight', 'whiteBishop', 'whiteQueen',  'whiteKing', 'whiteBishop', 'whiteKnight', 'whiteRook', 'whitePawn' ]
	const blackPieces = [ 'blackRook', 'blackKnight', 'blackBishop', 'blackQueen',  'blackKing', 'blackBishop', 'blackKnight', 'blackRook', 'blackPawn' ]

	if ( attackedPiece === null ) {
        return true
    }

	if ( side === 'white' ) {
		return blackPieces.includes( attackedPiece )
	}

	if ( side === 'black' ) {
		return whitePieces.includes( attackedPiece )
	}

} 