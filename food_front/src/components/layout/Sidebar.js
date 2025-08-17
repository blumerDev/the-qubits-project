import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Home,
  Search,
  Restaurant,
  Lightbulb,
  MenuBook,
  Person,
  Settings,
  Notifications,
  BookmarkBorder,
} from '@mui/icons-material';

function Sidebar({ isOpen, onToggle }) {
  const theme = useTheme();

  const mainItems = [
    { text: 'Home', icon: <Home />, href: '#home', active: true },
    { text: 'Explore', icon: <Search />, href: '#explore' },
    { text: 'Create', icon: <Restaurant />, href: '#create' },
  ];

  const userItems = [
    { text: 'Profile', icon: <Person />, href: '#profile' },
    { text: 'Saved', icon: <BookmarkBorder />, href: '#saved' },
    { text: 'Notifications', icon: <Notifications />, href: '#notifications' },
  ];

  const moreItems = [
    { text: 'Suggestions', icon: <Lightbulb />, href: '#suggestions' },
    { text: 'Menu Planning', icon: <MenuBook />, href: '#menu' },
    { text: 'Settings', icon: <Settings />, href: '#settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e9e9e9',
          position: 'relative',
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ padding: theme.spacing(5, 3, 3, 3) }}>
        <Typography
          variant="h3"
          sx={{
            color: '#e60023',
            fontWeight: 700,
            fontSize: '28px',
            letterSpacing: '-0.02em',
          }}
        >
          Food
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, paddingX: 1 }}>
        <List sx={{ padding: 0 }}>
          {mainItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={item.active}
              href={item.href}
              sx={{
                borderRadius: 3,
                margin: '2px 8px',
                padding: '12px 16px',
                minHeight: 48,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ margin: '16px 20px', borderColor: '#e9e9e9' }} />

        <List sx={{ padding: 0 }}>
          {userItems.map((item) => (
            <ListItemButton
              key={item.text}
              href={item.href}
              sx={{
                borderRadius: 3,
                margin: '2px 8px',
                padding: '12px 16px',
                minHeight: 48,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ margin: '16px 20px', borderColor: '#e9e9e9' }} />

        <List sx={{ padding: 0 }}>
          {moreItems.map((item) => (
            <ListItemButton
              key={item.text}
              href={item.href}
              sx={{
                borderRadius: 3,
                margin: '2px 8px',
                padding: '12px 16px',
                minHeight: 48,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* User Profile at Bottom */}
      <Box sx={{ padding: theme.spacing(2, 3, 4, 3) }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(3),
            padding: theme.spacing(2),
            borderRadius: 3,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <Avatar sx={{ width: 40, height: 40 }}>F</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#111111',
                fontSize: '16px',
              }}
            >
              Florencia
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#767676',
                fontSize: '14px',
              }}
            >
              Food Enthusiast
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;