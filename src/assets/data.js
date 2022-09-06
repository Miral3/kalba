/**
 * @Todo 필요한 컴포넌트 옆에 data.js 파일 만들어서 사용하기
 */
export const rankingCategoryItems = [
  {
    id: 1,
    name: "지원량",
    value: "donations",
    url: "/leaderboards/donations",
  },
  {
    id: 2,
    name: "공격력",
    value: "score",
    url: "/leaderboards/score",
  },
];

export const standardCategoryItems = [
  {
    id: 1,
    name: "영웅",
    value: "heroes",
    url: "/standardTable/heroes",
  },
  {
    id: 2,
    name: "펫",
    value: "pets",
    url: "/standardTable/pets",
  },
  {
    id: 3,
    name: "유닛",
    value: "troops",
    url: "/standardTable/troops",
  },
  {
    id: 4,
    name: "마법",
    value: "spells",
    url: "/standardTable/spells",
  },
  {
    id: 5,
    name: "시즈머신",
    value: "siegeMachines",
    url: "/standardTable/siegeMachines",
  },
];

export const donationsRankingTableColumns = [
  {
    id: 1,
    header: "순위",
    accessor: "donationRank",
  },
  {
    id: 2,
    header: "이름",
    accessor: "name",
  },
  {
    id: 3,
    header: "지원량",
    accessor: "donations",
  },
  {
    id: 4,
    header: "현재직책",
    accessor: "role",
  },
  {
    id: 5,
    header: "예상직책",
    accessor: "role",
  },
];
export const attackPowerRankingTableColumns = [
  {
    id: 1,
    header: "순위",
    accessor: "yonghaScoreRank",
  },
  {
    id: 2,
    header: "이름",
    accessor: "name",
  },
  {
    id: 3,
    header: "트로피",
    accessor: "trophies",
  },
  {
    id: 4,
    header: "홀",
    accessor: "townHallLevel",
  },
  {
    id: 5,
    header: "공격력",
    accessor: "yonghaScore",
  },
];
export const standardTableColumns = [
  {
    id: 1,
    header: "종류",
    accessor: "korean",
  },
  {
    id: 2,
    header: "최대 점수",
    accessor: "maxScore",
  },
  {
    id: 3,
    header: "최대 레벨",
    accessor: "maxLevel",
  },
  {
    id: 4,
    header: "비례 점수",
    accessor: "value",
  },
];
