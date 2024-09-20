import { configureStore } from '@reduxjs/toolkit'
import counterTurn from './turn/counterTurn'
import counterMoveList from './movelist/counterMoveList'

export const store = configureStore({
    reducer: {
        turn: counterTurn,
        moveList: counterMoveList
    }
})
