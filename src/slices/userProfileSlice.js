import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
}

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
  },
})

export const {
  setStep,
} = userProfileSlice.actions

export default userProfileSlice.reducer