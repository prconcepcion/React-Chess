import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    moves: [],
}

export const counterMoveList = createSlice({
  name: 'moveList',
  initialState,
  reducers: {
    addMove: ( state, action ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.moves = [ ...state.moves, action.payload ]
    },
    resetMoveList: () => initialState,
  },

})

// Action creators are generated for each case reducer function
export const { addMove, resetMoveList } = counterMoveList.actions

export const selectMoves = state => state.moveList.moves 

export default counterMoveList.reducer