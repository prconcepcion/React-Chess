export const checkValidMove = ( move ) => {
  
	const { piece, origin, destination, tempBoard, pieceAtDestination, side, } = move

	if ( piece === 'blackKnight' || piece === 'whiteKnight' ) {
		return knightMove( origin, destination ) && checkValidAttack( pieceAtDestination, side )
	}

	if ( piece === 'blackRook' || piece === 'whiteRook' ) {
		return rookMove( origin, destination, tempBoard ) && checkValidAttack( pieceAtDestination, side )
	}

	if ( piece === 'blackBishop' || piece === 'whiteBishop' ) {
		return bishopMove( origin, destination, tempBoard ) && checkValidAttack( pieceAtDestination, side )
	}
	
	if ( piece === 'blackQueen' || piece === 'whiteQueen' ) {
		return ( bishopMove( origin, destination, tempBoard ) || rookMove( origin, destination, tempBoard ) ) && checkValidAttack( pieceAtDestination, side )
	}

	if ( piece === 'blackKing' || piece === 'whiteKing' ) {
		return kingMove( origin, destination ) && checkValidAttack( pieceAtDestination, side )
	}

	if ( piece === 'blackPawn' ) {
		return pawnMove( origin, destination, 1, pieceAtDestination, side )
	}

	if ( piece === 'whitePawn' ) {
		return pawnMove( origin, destination, -1, pieceAtDestination, side )
	}

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

const rookMove = ( origin, destination, tempBoard ) => {
    let originRow = origin.row
    let originColumn = origin.column
    const destinationRow = destination.row
    const destinationColumn = destination.column

    if ( originRow !== destinationRow &&  originColumn !== destinationColumn ) {
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

        if ( tempBoard[originRow][originColumn] !== null ) {
            return false
        }
    }
    

    return true

}

const bishopMove = ( origin, destination, tempBoard ) => {
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

        if ( tempBoard[originRow][originColumn] !== null ) {
            return false
        }
    }

	return true

}

const kingMove = ( origin, destination) => {
    const originRow = origin.row
    const originColumn = origin.column
    const destinationRow = destination.row
    const destinationColumn = destination.column

    if ( Math.abs( destinationRow - originRow ) <= 1 && Math.abs( destinationColumn - originColumn ) <= 1 ) {
        return true
    }
  
	return false
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