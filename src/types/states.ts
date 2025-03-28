/*
 * 좌석 상태 타입
 * 좌석의 현재 상태를 나타냄
 */
export type LibrarySeatStatus = '비점유' | '점유' | '예약';

/*
 * 좌석 타입
 * 특정 조건이 있는 좌석 유형을 정의
 */
export type LibrarySeatType = '일반' | '장애인' | '전기차' | '여성' | '노약자';

/*
 * 좌석 인터페이스
 * 좌석 데이터를 구성하는 기본 구조
 */
export interface LibrarySeat {
    id: string; // 좌석 ID
    type: LibrarySeatType; // 특별 좌석 여부
    status: LibrarySeatStatus; // 현재 점유 여부
}

/*
 * mySeat 스키마에 따른 상태 타입 정의
 * 사용자 예약 정보
 */
export interface MySeatState {
    id: Nullable<string>; // 사용자 ID
    librarySeatId: Nullable<string>; // 예약된 좌석 ID
    status: Nullable<LibrarySeatStatus>; // 예약 상태
    loading?: boolean; // 로딩 상태
    error?: Nullable<string>; // 에러 메시지
}
