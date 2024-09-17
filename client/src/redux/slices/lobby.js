import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getLobby = createAsyncThunk(
    'lobby/getLobby',
    async () => {
        let response = await axios.get('http://localhost:8080/api/lobbies');
        console.log(response.data);
        return response.data;
    }
);

const lobbySlice = createSlice({
    name: 'games',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLobby.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(getLobby.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getLobby.rejected, (state, action) => {
            state.loading = false;
            state.error = action;
        })
    }
});

export const lobbyReducer = lobbySlice.reducer;