import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from '../../theme/theme';
import Header from './Header';
import { FoodProvider } from '../../context/FoodContext';

function Layout({ children }) {
  return (
    <FoodProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          
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