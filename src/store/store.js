import { configureStore } from '@reduxjs/toolkit'
import counterTurn from './turn/counterTurn'

export const store = configureStore({
    reducer: {
        turn: counterTurn,
    }
})
