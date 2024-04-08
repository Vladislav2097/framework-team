import type { ThemeState } from '@/types/interfaces';
import { defineStore } from 'pinia';
import lightThemeIcon from '@/assets/icons/light-theme-icon.svg';
import darkThemeIcon from '@/assets/icons/dark-theme-icon.svg';
import AppTheme from '@/types/themeTypes';

export default defineStore('theme', {
  state: (): ThemeState => ({
    theme: JSON.parse(localStorage.getItem('theme') ?? `"${AppTheme.Light}"`),
  }),
  getters: {
    themeIcon: (state): string => {
      return state.theme === AppTheme.Dark ? lightThemeIcon : darkThemeIcon;
    },
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === AppTheme.Dark ? AppTheme.Light : AppTheme.Dark;
      localStorage.setItem('theme', JSON.stringify(this.theme));
      // Обновляем класс у body в зависимости от темы
      document.body.dataset.theme = this.theme === 'dark' ? 'dark' : 'light';
    },
    initTheme() {
      document.body.dataset.theme = this.theme === 'dark' ? 'dark' : 'light';
    },
  },
});
