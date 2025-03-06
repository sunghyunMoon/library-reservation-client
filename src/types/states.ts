/*
 * 주차 면 상태 타입
 * 주차 면의 현재 상태를 나타냄
 */
export type LibrarySeatStatus = '비점유' | '점유' | '예약';

/*
 * 주차 면 타입
 * 특정 조건이 있는 주차 면 유형을 정의
 */
export type LibrarySeatType = '일반' | '장애인' | '전기차' | '여성' | '노약자';

/*
 * 주차 면 인터페이스
 * 주차 면 데이터를 구성하는 기본 구조
 */
export interface LibrarySeat {
    id: string; // 주차 면 ID
    type: LibrarySeatType; // 특별 주차 면 여부
    status: LibrarySeatStatus; // 현재 점유 여부
}

/*
 * mySeat 스키마에 따른 상태 타입 정의
 * 사용자 예약 정보
 */
export interface MySeatState {
    id: Nullable<string>; // 사용자 ID
    librarySeatId: Nullable<string>; // 예약된 주차 면 ID
    status: Nullable<LibrarySeatStatus>; // 예약 상태
    loading?: boolean; // 로딩 상태
    error?: Nullable<string>; // 에러 메시지
}
