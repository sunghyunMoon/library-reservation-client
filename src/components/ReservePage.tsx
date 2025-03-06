import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/ReservePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { updateMySeat } from '../redux/slices/mySeatSlice.ts';
import { AppDispatch } from '../redux/store.ts';
import { useUpdateLibrarySeatMutation } from '../redux/apis/librarySeatApi.ts';
import Button from './Button.tsx';
import useHandleBeforeUnload from '../hooks/useHandleBeforeUnload.tsx';
import Timer from './Timer.tsx';
import { updateMySeatServiceKeepAlive } from '../api/service/mySeatService.ts';

const ReservePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [updateLibrarySeat] = useUpdateLibrarySeatMutation();

    // Redux에서 사용자 예약 정보 가져오기
    const mySeat = useSelector((state: RootState) => state.mySeat);

    // 브라우저 종료 시 예약 상태를 처리
    useHandleBeforeUnload({
        condition: mySeat.status === '예약', // "예약" 상태일 때만 실행
        onUnload: () => {
            updateLibrarySeat({ id: mySeat.librarySeatId!, status: '비점유' });
            updateMySeatServiceKeepAlive({
                id: mySeat.id!,
                librarySeatId: null,
                status: '비점유',
            });
        },
    });

    const handleTimeExpire = useCallback(() => {
        if (mySeat.status !== '점유') {
            dispatch(
                updateMySeat({
                    id: mySeat.id!,
                    librarySeatId: mySeat.librarySeatId!,
                    status: '비점유',
                })
            );
            updateLibrarySeat({
                id: mySeat.librarySeatId!,
                status: '비점유',
            });
            navigate('/libraryseatmap');
        }
    }, [dispatch, mySeat, updateLibrarySeat, navigate]);

    const handleSpotUpdate = (status: '점유' | '비점유', message?: string) => {
        dispatch(
            updateMySeat({
                id: 'user',
                librarySeatId: mySeat.librarySeatId,
                status: status,
            })
        );
        updateLibrarySeat({ id: mySeat.librarySeatId!, status });

        if (message) {
            alert(message.replace('{id}', `${mySeat.librarySeatId}`));
        }

        navigate('/libraryseatmap');
    };

    if (!id || !mySeat) {
        return <div>해당 주차 면을 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.reservePage}>
            <div className={styles.card}>
                {mySeat?.status === '점유' ? (
                    <>
                        <h2>주차 면 {mySeat?.librarySeatId} 사용 완료</h2>
                        <div className={styles.actions}>
                            <Button
                                className={styles.completeButton}
                                onClick={() =>
                                    handleSpotUpdate(
                                        '비점유',
                                        `주차 면 {id} 사용이 완료되었습니다.`
                                    )
                                }
                            >
                                사용 완료
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>주차 면 {mySeat?.librarySeatId} 예약</h2>
                        <div className={styles.actions}>
                            <Button
                                className={styles.reserveButton}
                                onClick={() => handleSpotUpdate('점유')}
                            >
                                예약
                            </Button>
                        </div>
                    </>
                )}
                <Button
                    className={styles.backButton}
                    onClick={() =>
                        mySeat.status === '예약'
                            ? handleSpotUpdate('비점유')
                            : navigate('/libraryseatmap')
                    }
                >
                    뒤로가기
                </Button>
            </div>
            {mySeat.status === '예약' && (
                <Timer
                    initialTime={300} // 초기 시간: 5분
                    onTimeExpire={handleTimeExpire} // 시간이 만료되었을 때 처리
                />
            )}
        </div>
    );
};

export default ReservePage;
