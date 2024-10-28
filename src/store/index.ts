import { configureStore } from '@reduxjs/toolkit';

import moveSlice from './move-slice';

const store = configureStore({
    reducer: { move: moveSlice.reducer },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;