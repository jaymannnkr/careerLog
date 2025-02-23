export type InputInfo = {
  id: string;
  userName: string;
  orgName: string;
  importantElement: Elements;
  pointElement: Elements;
};

/**
 * 요소
 * work: 업무
 * reward: 보상
 * grow: 성장
 * environment: 환경
 * relration: 관계
 * value: 가치
 */
export type Elements = {
  work: number;
  reward: number;
  grow: number;
  environment: number;
  relration: number;
  value: number;
};
