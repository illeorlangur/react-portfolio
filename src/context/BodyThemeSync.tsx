'use client';

import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

export default function BodyThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
}