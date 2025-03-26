type Theme = 'light' | 'dark' | 'system';

/**
 * Gets the current theme setting or returns a default
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'system';
  }
  
  return (localStorage.getItem('theme') as Theme) || 'system';
}

/**
 * Sets the theme and persists it to localStorage
 */
export function setTheme(theme: Theme): void {
  const root = window.document.documentElement;
  
  // Remove old theme class
  root.classList.remove('light', 'dark');
  
  // For system theme, detect from OS preference
  if (theme === 'system') {
    localStorage.removeItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
    return;
  }
  
  // Apply theme class
  root.classList.add(theme);
  
  // Save to localStorage for persistence
  localStorage.setItem('theme', theme);
}

/**
 * Toggles between light and dark themes
 */
export function toggleTheme(): Theme {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  setTheme(newTheme);
  return newTheme;
}

/**
 * Initializes theme based on stored preference or system default
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  const root = window.document.documentElement;
  const theme = getTheme();
  
  // For system theme, detect from OS preference
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
    
    // Add listener for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
    });
    return;
  }
  
  // Apply stored theme
  root.classList.add(theme);
} 