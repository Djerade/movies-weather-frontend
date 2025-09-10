'use client';

import { IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useTheme } from '@/lib/use-theme';

export const ThemeToggle = () => {
  const { colorMode, setColorMode } = useTheme();
  
  const icon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;
  const label = colorMode === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair';

  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      _hover={{
        bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
      }}
    />
  );
};
