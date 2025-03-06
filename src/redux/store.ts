import { configureStore, AnyAction } from '@reduxjs/toolkit';
import mySeatReducer from './slices/mySeatSlice.ts';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { librarySeatApi } from './apis/librarySeatApi.ts';

const store = configureStore({
    reducer: {
        mySeat: mySeatReducer,
        [librarySeatApi.reducerPath]: librarySeatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(librarySeatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

export default store;
