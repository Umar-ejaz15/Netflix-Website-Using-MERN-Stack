import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlayMovies: null,
    },
    reducers: {
        getNowPlayingMovies: (state, action) => {
            state.nowPlayMovies = action.payload;
        },
    },
});

export const { getNowPlayingMovies } = movieSlice.actions;
export default movieSlice.reducer;
