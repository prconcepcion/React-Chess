import { checkValidMove } from "../helper/util";

export const Tile = props => {

  const { 
    children, 
    coordinate, 
    board,
    setBoard
  } = props

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("piece", ev.target.id);
    ev.dataTransfer.setData("origin", coordinate);
  }
  
  function drop(ev) {
    ev.preventDefault();

    const piece = ev.dataTransfer.getData("piece");
    const origin = ev.dataTransfer.getData("origin");

    const destination = { x: coordinate[0], y: coordinate[1] }
    const temp = { x: origin[0], y: origin[1] }

    if ( ! checkValidMove( {piece, origin, destination} ) ) {
      return
    }

    const tempBoard = board.slice()

    tempBoard[destination.y][destination.x] = piece
    tempBoard[temp.y][temp.x] = null

    setBoard(tempBoard)
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