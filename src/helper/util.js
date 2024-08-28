export const checkValidMove = ( move ) => {
  
	const { piece, origin, destination } = move
	if ( piece === 'blackKnight' || piece === 'whiteKnight' ) {
		return knightMove( origin, destination )
	}

	if ( piece === 'blackRook' || piece === 'whiteRook' ) {
		console.log('help')
		return rookMove( origin, destination )
	}

	if ( piece === 'blackBishop' || piece === 'whiteBishop' ) {
		return bishopMove( origin, destination )
	}
	
	if ( piece === 'blackQueen' || piece === 'whiteQueen' ) {
		return bishopMove( origin, destination ) || rookMove( origin, destination )
	}

	if ( piece === 'blackKing' || piece === 'whiteKing' ) {
		return kingMove( origin, destination )
	}

	if ( piece === 'blackPawn' ) {
		return pawnMove( origin, destination, 1 )
	}

	if ( piece === 'whitePawn' ) {
		return pawnMove( origin, destination, -1 )
	}

}

const knightMove = ( origin, destination ) => {
    const possibleMoves = []
    const knightMoves = [
      {x:2, y:-1},{x:2, y:1},{x:1, y:-2},{x:1, y:2},
      {x:-2, y:-1},{x:-2, y:1},{x:-1, y:-2},{x:-1, y:2}
    ]

    const y = parseInt(origin[0], 10)
    const x = parseInt(origin[1], 10)

    for ( var el of knightMoves ) {
      const tempY =  y+el.y
      const tempX = x+el.x
      possibleMoves.push(tempY+''+tempX)
	}
    
    if ( possibleMoves.includes( destination.x+''+destination.y ) ) {
      return true
    }

	return false
}

const rookMove = ( origin, destination ) => {
	const possibleMoves = []
	const y = parseInt(origin[0], 10)
    const x = parseInt(origin[1], 10)

	for ( let i=1; i<=7;i++ ) {
		const tempX = { positive:x+i, negative:x-i }
		possibleMoves.push( y+''+tempX.positive )
		possibleMoves.push( y+''+tempX.negative )
	}

	for ( let i=0; i<7;i++ ) {
		const tempY = { positive:x+i, negative:x-i }
		possibleMoves.push( tempY.positive+''+x )
		possibleMoves.push( tempY.negative+''+x )
	}

    if ( possibleMoves.includes( destination.x+''+destination.y ) ) {
		return true
	}
  
	return false
}

const bishopMove = ( origin, destination ) => {
	const possibleMoves = []

	const bishopMoves = [
		[-1,-1],
		[1,-1],
		[-1, 1],
		[1,1],
	]

	for ( const move of bishopMoves ) {
		let y = parseInt(origin[0], 10)
		let x = parseInt(origin[1], 10)
		console.log(move)
		for ( let i=1; i<=7;i++ ) {
			const tempX = x+(i*move[0])
			const tempY = y+(i*move[1])
			console.log({tempY, tempX}, x, y, (i*move[0]), (i*move[1]), {i})
			possibleMoves.push( tempY+''+tempX )
		}
	}

	if ( possibleMoves.includes( destination.x+''+destination.y ) ) {
		return true
	}
  
	return false

}

const kingMove = ( origin, destination) => {
	const possibleMoves = []
	const y = parseInt(origin[0], 10)
    const x = parseInt(origin[1], 10)

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
		const tempX = x+move[0]
		const tempY = y+move[1]
		possibleMoves.push( tempY+''+tempX )
	}

	if ( possibleMoves.includes( destination.x+''+destination.y ) ) {
		return true
	}
  
	return false
}

const pawnMove = ( origin, destination, substractor ) => {
	const y = parseInt(origin[0], 10)
    const x = parseInt(origin[1], 10)
	const pawnMove = y+''+( x+substractor )

	if ( pawnMove === destination.x+''+destination.y ) {
		return true
	}
}