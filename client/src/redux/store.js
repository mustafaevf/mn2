import { configureStore } from '@reduxjs/toolkit';
import { lobbyReducer } from './slices/lobby';

const store = configureStore({
    reducer: {lobby: lobbyReducer},
});

export default store;