import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    whiteCastleLeft: true,
    whiteCastleRight: true,
    blackCastleLeft: true,
    blackCastleRight: true,
}

export const counterCastle = createSlice( {
  name: 'castle',
  initialState,
  reducers: {
    whiteCastling: ( state, action ) => {
        if ( action.payload === '70' ) {
            state.whiteCastleLeft = false
        } 
        
        if ( action.payload === '77' ) {
            state.whiteCastleRight = false
        }

        if ( action.payload === 'king' ) {
            state.whiteCastleLeft = false
            state.whiteCastleRight = false
        }
    },
    blackCastling: ( state, action ) => {
        if ( action.payload === '00' ) {
            state.blackCastleLeft = false
        } 
        if ( action.payload === '07' ) {
            state.blackCastleRight = false
        }
        if ( action.payload === 'king' ) {
            state.blackCastleLeft = false
            state.blackCastleRight = false
        }
    },
  } 
} )

// Action creators are generated for each case reducer function
export const { whiteCastling, blackCastling } = counterCastle.actions

export const selectCastle = state => state.castle 

export default counterCastle.reducer