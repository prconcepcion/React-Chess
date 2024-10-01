import { checkValidMove } from "../helper/util";
import { useDispatch } from "react-redux";
import { changeTurn } from "../store/turn/counterTurn";
import { addMove } from "../store/movelist/counterMoveList";

export const Tile = props => {

	const { 
		children, 
		coordinate, 
		board,
		setBoard
	} = props

    const dispatch = useDispatch()

	function allowDrop(ev) {
		ev.preventDefault();
	}
	
	function drag(ev) {
		ev.dataTransfer.setData("piece", ev.target.id);
		ev.dataTransfer.setData("origin", coordinate);
		ev.dataTransfer.setData("side", ev.target.dataset.side );
	}
	
	function drop(ev) {
		ev.preventDefault();

		const piece = ev.dataTransfer.getData("piece")
		let origin = ev.dataTransfer.getData("origin")
		const side = ev.dataTransfer.getData("side")

		const destination = { row: parseInt( coordinate[0], 10 ), column: parseInt( coordinate[1], 10 ) }
		origin = { row: parseInt( origin[0], 10 ), column: parseInt( origin[1], 10) }

        const move = checkValidMove( { 
            piece, 
            origin, 
            destination, 
            board, 
            pieceAtDestination: board[destination.row][destination.column], 
            side,
        } )

        console.log(move.board, move)

        if ( ! move.isValid ) {
            return
        }

        

		setBoard( move.board )
        dispatch( changeTurn() )
        dispatch( addMove( { piece, destination } ) )
	}

	return <>
		<div
			className='tile'
			onDragStart={e=>drag(e)} 
			onDrop={e=>drop(e)} 
			onDragOver={e=>allowDrop(e)}
			data-coordinate={coordinate}
		>
			<span draggable={false}>{coordinate}</span>
			{children}
		</div>
	</>

}