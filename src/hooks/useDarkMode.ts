import { useEffect, useState } from "react";

const useDarkMode = () => {
  const key = "isDarkMode";
  const [isDark, setIsDark] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : true;
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    //This adds or removes .dark class to both body and each individual pokemon cards
    if (isDark) {
      // logic
    } else {
      // more logic
    }
    try {
      window.localStorage.setItem(key, isDark);
    } catch (e) {
      console.error("Error in setting preference");
    }
  });
  return [isDark, setIsDark];
};

export default useDarkMode;
