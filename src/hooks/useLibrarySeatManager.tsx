import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { updateMySeat } from '../redux/slices/mySeatSlice';
import {
    librarySeatApi,
    useUpdateLibrarySeatMutation,
} from '../redux/apis/librarySeatApi';

export const useLibrarySeatManager = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [updateLibrarySeat] = useUpdateLibrarySeatMutation();
    const navigate = useNavigate();

    /**
     * 특정 좌석의 유효성을 검사하는 함수
     * @param id - 좌석 ID
     * @returns {boolean} - 유효성 검사 결과
     */
    const validateLibrarySeat = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                const result = await dispatch(
                    librarySeatApi.endpoints.fetchLibrarySeatById.initiate(id)
                ).unwrap();

                if (result.status !== '비점유') {
                    alert(
                        '현재 좌석은 이미 예약되었습니다. 다른 좌석을 선택해주세요.'
                    );
                    return false;
                }

                return true;
            } catch (error) {
                console.error('유효성 검사 중 오류 발생:', error);
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                return false;
            }
        },
        [dispatch]
    );

    /**
     * 좌석을 예약하는 함수
     * @param id - 좌석 ID
     * @param type - 좌석 타입
     */
    const reserveLibrarySeat = useCallback(
        async (id: string) => {
            try {
                await updateLibrarySeat({ id, status: '예약' });
                dispatch(
                    updateMySeat({
                        id: 'user',
                        librarySeatId: id,
                        status: '예약',
                    })
                );
                // dispatch(setMySeat({ id, type, status: '예약' }));
                navigate(`/reserve/${id}`);
            } catch (error) {
                console.error('예약 처리 중 오류 발생:', error);
                alert('예약 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
            }
        },
        [dispatch, navigate, updateLibrarySeat]
    );

    return { validateLibrarySeat, reserveLibrarySeat };
};
