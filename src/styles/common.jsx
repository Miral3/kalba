const Common = {
  colors: {
    black: ["#000000", "#1C1C20", "#171715", "#555B60", "#505050", "#222222"],
    white: ["#FFFFFF", "#ececec;"],
    gray: [
      "#F5F5F5",
      "#F0F0F0",
      "#848484",
      "#E6E6E6",
      "#D6D6D6",
      "#616b8a",
      "#9496c8",
      "#98a0a7",
      "#F2F5F7",
      "#dddbe7",
      "#3d3d3d",
    ],
    indigo: ["#383F4C", "#272B35", "#2D2D38", "#252530", "#28282F"],
    brown: ["#5E4A3E"],
    basic: ["#E5E2D6"],
    red: ["#DA2A29", "#E93636", "#FF4500"],
    purple: ["#6a7497", "#42376c", "#38385A", "#212032", "#49485f"],
    blue: ["#297fb9", "#4b7bec"],
    yellow: ["#e5c133"],
    green: ["#1aab8a"],
  },
  gradient: [
    "linear-gradient(0deg,#6d779a,#8c96ae)",
    "linear-gradient(0deg,#49417a,#635c91)",
    "linear-gradient(to right, #373a46, #8a94ad)",
    "linear-gradient(to right, #7450ae, #8a94ad)",
  ],
  fontSize: {
    t: ["36px", "28px"],
    h: ["24px", "20px", "15px"],
    b: ["18px", "16px", "13px"],
    c: ["11px", "12px"],
    l: ["45px", "35px", "32px"],
  },
  display: {
    mobile: "425px",
    tabletS: "576px",
    tablet: "768px",
    laptop: "1020px",
    desktop: "1400px",
  },
  mediaQuery: {
    mobileS: `@media (min-width: 410px)`,
    mobile: `@media (min-width: 425px)`,
    tabletS: `@media (min-width: 576px)`,
    tablet: `@media (min-width: 768px)`,
    laptop: `@media (min-width: 1020px)`,
    desktop: `@media (min-width: 1400px)`,
  },
};

export default Common;
