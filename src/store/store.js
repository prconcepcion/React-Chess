import { configureStore } from '@reduxjs/toolkit'
import counterTurn from './turn/counterTurn'
import counterMoveList from './movelist/counterMoveList'
import counterCastle from './castling/counterCastle'

export const store = configureStore({
    reducer: {
        turn: counterTurn,
        moveList: counterMoveList,
        castle: counterCastle
    }
})
