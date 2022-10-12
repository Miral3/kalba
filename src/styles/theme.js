import Common from "./common";

export const lightTheme = {
  text: {
    text: Common.colors.black[0],
    thead: Common.colors.brown[0],
    tbody: Common.colors.black[0],
    logoutBtn: Common.colors.black[0],
    logo: Common.colors.red[0],
    description: Common.colors.black[3],
    disabledBtn: Common.colors.white[0],
  },
  bg: {
    body: Common.colors.gray[0],
    footer: Common.colors.gray[1],
    caption: Common.colors.brown[0],
    thead: Common.colors.basic[0],
    tbody: Common.colors.white[0],
    container: Common.colors.gray[1],
    logoutBtn: Common.colors.gray[0],
    modal: Common.colors.white[0],
    description: Common.colors.gray[8],
    disabledBtn: Common.colors.gray[4],
    skeleton: Common.colors.gray[3],
  },
  border: {
    tr: `1px solid ${Common.colors.gray[3]}`,
    category: `1px solid ${Common.colors.gray[4]}`,
    logoutBtn: `1px solid ${Common.colors.gray[3]}`,
    avatar: `2px solid ${Common.colors.gray[3]}`,
  },
  hover: {
    tbody: Common.colors.gray[1],
    categoryItem: Common.colors.gray[4],
  },
  gradient: {
    skeleton: `linear-gradient(
      90deg,
      #dfe3e8 0px,
      #efefef 40px,
      #dfe3e8 80px
    )`,
  },
};

export const darkTheme = {
  text: {
    text: Common.colors.white[0],
    thead: "#7a798d",
    tbody: "#9e9eb1",
    logoutBtn: "#7a798d",
    logo: Common.colors.white[0],
    description: Common.colors.gray[2],
    disabledBtn: Common.colors.gray[2],
  },
  bg: {
    body: "#1c1c1f",
    footer: Common.colors.black[2],
    caption: Common.colors.indigo[3],
    thead: "#282830",
    tbody: Common.colors.indigo[2],
    container: Common.colors.indigo[2],
    logoutBtn: Common.colors.indigo[4],
    modal: Common.colors.black[5],
    description: Common.colors.gray[10],
    disabledBtn: Common.colors.gray[10],
    skeleton: Common.colors.black[5],
  },
  border: {
    tr: `1px solid ${Common.colors.black[1]}`,
    category: `1px solid ${Common.colors.black[1]}`,
    logoutBtn: `1px solid ${Common.colors.black[1]}`,
    avatar: `2px solid ${Common.colors.black[3]}`,
  },
  hover: {
    tbody: "#282830",
    categoryItem: Common.colors.indigo[4],
  },
  gradient: {
    skeleton: `linear-gradient(
      90deg,
      #222222 0px,
      rgba(34, 34, 34, 0.3) 40px,
      #222222 80px
    )`,
  },
};
