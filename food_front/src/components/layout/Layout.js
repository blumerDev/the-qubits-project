import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from '../../theme/theme';
import FullscreenMenu from './FullscreenMenu';
import Header from './Header';
import { FoodProvider } from '../../context/FoodContext';

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <FoodProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <FullscreenMenu isOpen={menuOpen} onToggle={toggleMenu} />
          
          <Header onMenuClick={toggleMenu} />
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflow: 'auto',
            }}
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </FoodProvider>
  );
}

export default Layout;