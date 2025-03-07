export {}; // 모듈로 해석되는 것을 방지
declare global {
  type Nullable<T> = T | null;
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
