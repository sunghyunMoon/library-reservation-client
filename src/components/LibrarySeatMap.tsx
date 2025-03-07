import React, { useCallback } from 'react';
import LibrarySeatComponent from './LibrarySeat';
import styles from '../styles/LibrarySeatMap.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    LibrarySeat,
    LibrarySeatStatus,
    LibrarySeatType,
} from '../types/states';
import { useFetchLibrarySeatsQuery } from '../redux/apis/librarySeatApi';
import { useLibrarySeatManager } from '../hooks/useLibrarySeatManager';
import LoadingIndicator from './LoadingIndicator';

const LibrarySeatMap: React.FC = () => {
    const { data: librarySeats = [], isLoading } = useFetchLibrarySeatsQuery(
        undefined,
        {
            pollingInterval: 2000,
        }
    );
    const navigate = useNavigate();
    const mySeat = useSelector((state: RootState) => state.mySeat);
    const { validateLibrarySeat, reserveLibrarySeat } = useLibrarySeatManager();

    const handleSpotClick = useCallback(
        async (
            id: string,
            type: LibrarySeatType,
            status: LibrarySeatStatus
        ) => {
            if (mySeat.status !== '비점유') {
                if (status === '점유' && id === mySeat.librarySeatId) {
                    navigate(`/reserve/${id}`);
                } else {
                    alert(`주차면 ${mySeat.librarySeatId}번에 예약하셨습니다.`);
                }
            } else {
                if (status === '비점유') {
                    const isValid = await validateLibrarySeat(id);
                    if (isValid) {
                        await reserveLibrarySeat(id);
                    }
                } else {
                    return;
                }
            }
        },
        [mySeat, validateLibrarySeat, reserveLibrarySeat, navigate]
    );

    if (isLoading) {
        return <LoadingIndicator message="주차장 데이터를 불러오는 중..." />;
    }

    return (
        <div className={styles.librarySeatMap}>
            <h1 className={styles.title}>지하 주차장 도면</h1>

            <div className={styles.libraryLayout}>
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {librarySeats
                            .slice(rowIndex * 5, rowIndex * 5 + 5)
                            .map((seat: LibrarySeat) => (
                                <LibrarySeatComponent
                                    key={seat.id}
                                    id={seat.id}
                                    type={seat.type}
                                    status={seat.status}
                                    handleSpotClick={handleSpotClick}
                                />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LibrarySeatMap;
