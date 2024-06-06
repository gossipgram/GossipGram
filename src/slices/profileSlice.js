import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    loading: false,
    isPrivate: false
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state , value) {
            state.user = value.payload;
        },
        setLoading(state , value) {
            state.loading = value.payload;
        },
        setIsPrivate(state , value) {
            state.isPrivate = value.payload;
        }
    },
});

export const {setUser , setLoading} = profileSlice.actions;
export default profileSlice.reducer;