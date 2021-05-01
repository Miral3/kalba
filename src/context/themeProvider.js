// 현재 모드의 상태관리
// Context API는 전역적으로 상태 관리가 가능하므로 props로 state를 넘겨줄 필요가 없다.
// 따라서 Context API를 사용하여 사용자가 어느 컴포넌트에서든 무슨 모드인지 알 수 있도록
// 다크/라이트 모드 state, 그에 해당하는 다크/라이트 테마를 함께 넘겨주면 된다.
import { lightTheme, darkTheme } from '../Theme/theme';
import { createContext, useState, useContext, useCallback } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

// Provider로 제공하게 될 Context 객체 생성
const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const LocalTheme = window.localStorage.getItem('theme') || 'light';
  // Provider로 넘길 contextValue를 지정(ThemeMode, themeObject)
  const [ThemeMode, setThemeMode] = useState(LocalTheme);
  const themeObject = ThemeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  )
}

// 커스텀 훅을 이용하여 'light'와 'dark'테마의 토글 기능 처리
function useTheme() {
  const context = useContext(ThemeContext);
  const { ThemeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (ThemeMode === "light") {
      setThemeMode("dark");
      window.localStorage.setItem('theme', 'dark');
    }
    else {
      setThemeMode("light")
      window.localStorage.setItem('theme', 'light');
    };
    // eslint-disable-next-line
  }, [ThemeMode]);

  return [ThemeMode, toggleTheme];
}

export { ThemeProvider, useTheme };

export default ThemeProvider;
// App.js파일에서 ThemeProvider로 하위 컴포넌트들을 감싸므로써
// 하위 컴포넌트들에서 context value를 사용할 수 있게된다.