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

    for ( var el of knightMoves ) {
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
	const possibleMoves = {
        north: [ origin.row + '' + origin.column ],
        west: [ origin.row + '' + origin.column ],
        south: [ origin.row + '' + origin.column ],
        east: [ origin.row + '' + origin.column ],
    }
    const row = origin.row
    const column = origin.column

    let direction = ''

	for ( let i=1; i<=7;i++ ) {
		const tempRow = { positive: row + i, negative: row-i }
        const tempColumn = { positive: column + i, negative: column - i }
		possibleMoves.east.push( row + '' + tempColumn.positive )
		possibleMoves.west.push( row + '' + tempColumn.negative )
		possibleMoves.south.push( tempRow.positive + '' + column )
		possibleMoves.north.push( tempRow.negative + '' + column )
	}

    if ( destination.row === row && destination.column > column) {
        direction = 'east'
    }

    if ( destination.row === row && destination.column < column) {
        direction = 'west'
    }

    if ( destination.row > row && destination.column === column) {
        direction = 'south'
    }

    if ( destination.row < row && destination.column === column) {
        direction = 'north'
    }

    if ( direction === '' ) {
        return false
    }

    const endpoints =  possibleMoves[direction].indexOf( destination.row + '' + destination.column ) > possibleMoves[direction].indexOf( origin.row + '' + origin.column ) ?
        { 
            a: possibleMoves[direction].indexOf( origin.row + '' + origin.column ),
            b: possibleMoves[direction].indexOf( destination.row + '' + destination.column )
        } : { 
            a: possibleMoves[direction].indexOf( destination.row + '' + destination.column ),
            b: possibleMoves[direction].indexOf( origin.row + '' + origin.column )
        }


    const tilesInBetween = possibleMoves[direction].slice( endpoints.a + 1, endpoints.b )

    for ( const tile of tilesInBetween ) {
        if ( tempBoard[tile[0]][tile[1]] !== null ) {
            return false
        }
    }

    if ( possibleMoves[direction].includes( destination.row + '' + destination.column ) ) {
		return true
	}
  
	return false
}

const bishopMove = ( origin, destination, tempBoard ) => {
	const possibleMoves = {
        northEast: [ origin.row + '' + origin.column ],
        northWest: [ origin.row + '' + origin.column ],
        southEast: [ origin.row + '' + origin.column ],
        southWest: [ origin.row + '' + origin.column ],
    }
    const row = origin.row
    const column = origin.column

	const bishopMoves = {
		northWest: [-1,-1],
		southWest: [1,-1],
		northEast: [-1, 1],
		southEast: [1,1],
    }

    let direction = ''

	for ( const move in bishopMoves ) {
		for ( let i=1; i<=7;i++ ) {
			const tempRow = row + ( i * bishopMoves[move][0] )
			const tempColumn = column + (i * bishopMoves[move][1] )
			possibleMoves[move].push( tempRow + '' + tempColumn )
		}
	}

    if ( destination.row < origin.row && destination.column < origin.column ) {
        direction = 'northWest'
    }

    if ( destination.row < origin.row && destination.column > origin.column ) {
        direction = 'northEast'
    }

    if ( destination.row > origin.row && destination.column < origin.column ) {
        direction = 'southWest'
    }

    if ( destination.row > origin.row && destination.column > origin.column ) {
        direction = 'southEast'
    }

    if ( direction === '' ) {
        return false
    }

    const endpoints =  possibleMoves[direction].indexOf( destination.row + '' + destination.column ) > possibleMoves[direction].indexOf( origin.row + '' + origin.column ) ?
        { 
            a: possibleMoves[direction].indexOf( origin.row + '' + origin.column ),
            b: possibleMoves[direction].indexOf( destination.row + '' + destination.column )
        } : { 
            a: possibleMoves[direction].indexOf( destination.row + '' + destination.column ),
            b: possibleMoves[direction].indexOf( origin.row + '' + origin.column )
        }
    
    const tilesInBetween = possibleMoves[direction].slice( endpoints.a + 1, endpoints.b )

    for ( const tile of tilesInBetween ) {
        if ( tempBoard[tile[0]][tile[1]] !== null ) {
            return false
        }
    }

    if ( possibleMoves[direction].includes( destination.row + '' + destination.column ) ) {
		return true
	}

	return false

}

const kingMove = ( origin, destination) => {
	const possibleMoves = []
	const row = origin.row
    const column = origin.column

	const kingMoves = [
		[-1,-1],
		[1,-1],
		[-1, 1],
		[1,1],
		[1,0],
		[-1,0],
		[0,1],
		[0,-1]
	]

	for ( const move of kingMoves ) {
		const tempRow = row + move[0]
		const tempColumn = column + move[1]
		possibleMoves.push( tempRow + '' + tempColumn )
	}

	if ( possibleMoves.includes( destination.row + '' + destination.column ) ) {
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

    if ( pawnAttack.includes( destination.row + '' + destination.column ) ) {
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