import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: "dark",
    backgroundColor: "gray",
    color: "white",
  },
  light: {
    name: "light",
    backgroundColor: "white",
    color: "blue",
  },
};

// 1. 保有目前的配置
// 2. 切換 theme

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(themes.light); // 預設值是亮的配色

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 自訂的 hook
export function useTheme() {
  return useContext(ThemeContext);
}
export default ThemeContext;
