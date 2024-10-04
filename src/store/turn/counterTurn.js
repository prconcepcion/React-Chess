import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'white',
}

export const counterTurn = createSlice({
  name: 'turn',
  initialState,
  reducers: {
    changeTurn: ( state ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = state.value === 'white' ? 'black' : 'white'
    },
    resetTurn: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { changeTurn, resetTurn } = counterTurn.actions

export const selectTurn = state => state.turn.value 

export default counterTurn.reducer