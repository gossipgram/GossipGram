import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setLoading } = partnerSlice.actions;
export default partnerSlice.reducer;
