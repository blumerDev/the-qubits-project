import React from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Box,
  InputAdornment,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Search,
  Notifications,
  Chat,
  Add,
  Menu,
} from '@mui/icons-material';
import { useFood } from '../../context/FoodContext';

function Header({ onMenuClick }) {
  const theme = useTheme();
  const { searchQuery, setSearchQuery } = useFood();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e9e9e9',
        boxShadow: 'rgba(0, 0, 0, 0.06) 0px 1px 0px 0px',
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          padding: '8px 24px',
          minHeight: '64px',
        }}
      >
        {/* Left Section - Logo and Menu */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing(3),
          width: 240,
          flexShrink: 0,
        }}>
          <IconButton
            onClick={onMenuClick}
            sx={{
              color: '#111111',
              padding: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Menu />
          </IconButton>
          
          <Typography
            variant="h3"
            sx={{
              color: '#7FB069',
              fontWeight: 700,
              fontSize: '24px',
              letterSpacing: '-0.02em',
            }}
          >
            Food
          </Typography>
        </Box>

        {/* Center Section - Search Bar */}
        <Box sx={{ 
          flexGrow: 1, 
          maxWidth: 600, 
          paddingX: theme.spacing(4),
        }}>
          <TextField
            fullWidth
            placeholder="Buscar comidas por nombre, ingredientes..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#767676' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 6,
                backgroundColor: '#f7f7f7',
                height: 48,
                fontSize: '16px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover': {
                  backgroundColor: '#efefef',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 0 2px #7FB069',
                },
              },
              '& .MuiInputBase-input': {
                padding: '12px 16px 12px 0',
                fontSize: '16px',
                color: '#111111',
                '&::placeholder': {
                  color: '#767676',
                  opacity: 1,
                },
              },
            }}
          />
        </Box>

        {/* Right Section - Actions */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: theme.spacing(1),
        }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: '#7FB069',
              color: '#ffffff',
              borderRadius: 6,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '16px',
              padding: '8px 16px',
              minWidth: 80,
              height: 40,
              '&:hover': {
                backgroundColor: '#5C8A4A',
              },
            }}
          >
            Create
          </Button>

          <IconButton 
            sx={{ 
              color: '#5f5f5f',
              padding: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                color: '#111111',
              },
            }}
          >
            <Notifications />
          </IconButton>

          <IconButton 
            sx={{ 
              color: '#5f5f5f',
              padding: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                color: '#111111',
              },
            }}
          >
            <Chat />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;