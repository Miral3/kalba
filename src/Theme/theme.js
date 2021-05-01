//하드코딩을 줄이기 위한 현제 태마에 따른 속성들의 색 지정 

export const lightTheme = {
  bgColors: {
    section: '#f5f5f5',
    footer: '#f0f0f0',
    listFirstHeader: '#5e4a3e',
    listSecondHeader: '#E6E2D6',
    listContents: '#ffffff',
    category: '#f0f0f0',
  },
  fontColors: {
    footer: '#000000',
    listHeader: '#5e4a3e',
    listName: '#000000',
    listInfo: '#000000',
    category: '#000000',
  },
  borderColors: {
    list: '1px solid #e6e6e6',
    listName: '1px solid #000000',
    category: '1px solid #d6d6d6',
  }
}

export const darkTheme = {
  bgColors: {
    section: '#1c1c20',
    footer: '#171715',
    listFirstHeader: '#252530',
    listSecondHeader: '#282830',
    listContents: '#2d2d38',
    category: '#31313d',
  },
  fontColors: {
    footer: '#ffffff',
    listHeader: '#7a798d',
    listName: '#ffffff',
    listInfo: '#9e9eb1',
    category: '#ffffff',
  },
  borderColors: {
    list: '1px solid #1C1C20',
    listName: '1px solid #ffffff',
    category: '1px solid #1c1d21',
  }
}

export const theme = {
  lightTheme,
  darkTheme,
};