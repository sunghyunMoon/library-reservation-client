import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MySeatState } from '../../types/states.ts';
import {
    fetchMySeatService,
    updateMySeatService,
} from '../../api/service/mySeatService.ts';

/* 초기 상태 */
const initialState: MySeatState = {
    id: 'user',
    librarySeatId: null,
    status: null,
    loading: false,
    error: null,
};

/* 비동기 액션: 예약 상태 업데이트 */
export const updateMySeat = createAsyncThunk(
    'mySeat/update',
    async ({ id, librarySeatId, status }: MySeatState) => {
        return await updateMySeatService({ id, librarySeatId, status });
    }
);

/* 비동기 액션: 예약 상태 가져오기 */
export const fetchMySeat = createAsyncThunk(
    'mySeat/fetch',
    async (userId: string) => {
        return await fetchMySeatService(userId);
    }
);

/** Slice 정의 */
const mySeatSlice = createSlice({
    name: 'mySeat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 예약 상태 업데이트
            .addCase(updateMySeat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateMySeat.fulfilled,
                (state, action: PayloadAction<MySeatState>) => {
                    state.loading = false;
                    state.id = action.payload.id;
                    state.librarySeatId = action.payload.librarySeatId;
                    state.status = action.payload.status;
                }
            )
            .addCase(updateMySeat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || '예약 상태 업데이트 실패';
            })
            .addCase(fetchMySeat.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchMySeat.fulfilled,
                (state, action: PayloadAction<MySeatState>) => {
                    state.loading = false;
                    state.id = action.payload.id;
                    state.librarySeatId = action.payload.librarySeatId;
                    state.status = action.payload.status;
                }
            )
            .addCase(fetchMySeat.rejected, (state, action) => {
                state.loading = false;
                state.id = null; // 초기화 실패 시 상태를 기본값으로 설정
                state.librarySeatId = null;
                state.status = null;
                state.error = action.error.message || '예약 상태 초기화 실패';
            });
    },
});

export default mySeatSlice.reducer;
