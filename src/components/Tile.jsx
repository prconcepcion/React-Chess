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
		const tempBoard = board.slice()
		const destination = { row: parseInt( coordinate[0], 10 ), column: parseInt( coordinate[1], 10 ) }
		origin = { row: parseInt( origin[0], 10 ), column: parseInt( origin[1], 10) }

		if ( ! checkValidMove( { piece, origin: origin, destination, tempBoard, pieceAtDestination: tempBoard[destination.row][destination.column], side } ) ) {
			return
		}

		tempBoard[destination.row][destination.column] = piece
		tempBoard[origin.row][origin.column] = null

		setBoard(tempBoard)
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