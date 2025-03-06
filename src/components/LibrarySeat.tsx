import React from 'react';
import styles from '../styles/LibrarySeat.module.css';
import {
    LibrarySeat,
    LibrarySeatStatus,
    LibrarySeatType,
} from '../types/states';

interface LibrarySeatProps extends LibrarySeat {
    handleSpotClick: (
        id: string,
        type: LibrarySeatType,
        status: LibrarySeatStatus
    ) => void;
}

const LibrarySeatComponent: React.FC<LibrarySeatProps> = ({
    id,
    type,
    status,
    handleSpotClick,
}) => {
    return (
        <div
            className={`${styles.librarySeat} ${
                status === '비점유'
                    ? styles.available
                    : status === '점유'
                      ? styles.occupied
                      : styles.reserved
            }`}
            onClick={() => handleSpotClick(id, type, status)}
        >
            <div className={styles.id}>{id}번</div>
            <div className={styles.type}>{type}</div>
            <div className={styles.status}>{status}</div>
        </div>
    );
};

export default React.memo(LibrarySeatComponent);
