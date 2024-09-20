import { Piece } from './Piece';
import { useSelector } from 'react-redux'; 
import { selectMoves } from '../store/movelist/counterMoveList';

const column = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
const row = [ '8', '7', '6', '5', '4', '3', '2', '1' ]

export const MoveList = () => {

    const moveList = useSelector( selectMoves )

    return (
        <table>
            <tbody>
                { moveList.map( ( move, index ) => {
                    return (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td className='move'>
                            <Piece name={ move.piece } />
                                { column[move.destination.column] }{ row[move.destination.row] }
                            </td>
                        </tr>
                    )
                } ) }
            </tbody>
        </table>
    )
}