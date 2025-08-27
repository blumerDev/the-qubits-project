import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';

function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: 'none',
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          py: 1,
          minHeight: { xs: '56px', md: '64px' },
        }}
      >
        {/* Center Section - Logo only */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%'
        }}>
          <Typography
            onClick={handleLogoClick}
            sx={{
              color: '#1a1a1a',
              fontWeight: 400,
              fontSize: { xs: '20px', md: '24px' },
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': {
                color: '#666666',
              },
              transition: 'color 0.2s ease',
            }}
          >
            Food
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;