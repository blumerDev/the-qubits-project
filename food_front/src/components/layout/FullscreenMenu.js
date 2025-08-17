import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Home,
  Restaurant,
  CalendarToday,
  MenuBook,
  Person,
  Settings,
  Close,
  LocationOn,
  Description,
  MusicNote,
} from '@mui/icons-material';

function FullscreenMenu({ isOpen, onToggle }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { 
      text: 'INICIO', 
      icon: <Home />, 
      description: 'Página principal',
      path: '/'
    },
    { 
      text: 'COMIDAS', 
      icon: <Restaurant />, 
      description: 'Gestionar comidas',
      path: '/foods'
    },
    { 
      text: 'MENÚS', 
      icon: <CalendarToday />, 
      description: 'Menús semanales',
      path: '/menus'
    },
    { 
      text: 'RECETAS', 
      icon: <MenuBook />, 
      description: 'Libro de recetas',
      path: '/recipes'
    },
    { 
      text: 'PERFIL', 
      icon: <Person />, 
      description: 'Mi perfil',
      path: '/profile'
    },
    { 
      text: 'AJUSTES', 
      icon: <Settings />, 
      description: 'Configuración',
      path: '/settings'
    },
  ];

  const handleMenuItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
      onToggle(); // Cerrar el menú
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onToggle}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(25px)',
          backgroundColor: 'rgba(47, 79, 47, 0.1)',
        }
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: { xs: '100vw', md: '50vw' },
          height: '100vh',
          background: 'rgba(127, 176, 105, 0.15)',
          backdropFilter: 'blur(30px)',
          borderRadius: { xs: 0, md: '0 50% 50% 0' },
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(47, 79, 47, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(4),
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onToggle}
          sx={{
            position: 'absolute',
            top: { xs: 24, md: 32 },
            right: { xs: 24, md: 40 },
            color: '#2F4F2F',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid rgba(127, 176, 105, 0.3)',
            width: 48,
            height: 48,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderColor: 'rgba(127, 176, 105, 0.6)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <Close fontSize="medium" />
        </IconButton>

        {/* Menu Items Following Semicircle */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 300, md: 450 },
            height: { xs: 400, md: 500 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {menuItems.map((item, index) => {
            // Calcular posición en semicírculo
            const angle = (index / (menuItems.length - 1)) * Math.PI; // De 0 a π (semicírculo)
            const radius = { xs: 120, md: 160 };
            const radiusValue = windowWidth < 768 ? radius.xs : radius.md;
            
            // Coordenadas para el semicírculo (centrado en la parte derecha)
            const x = Math.cos(angle - Math.PI/2) * radiusValue;
            const y = Math.sin(angle - Math.PI/2) * radiusValue;
            
            return (
              <Box
                key={item.text}
                onClick={() => handleMenuItemClick(item)}
                sx={{
                  position: 'absolute',
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  opacity: 0,
                  animation: `fadeInScale 0.8s ease forwards`,
                  animationDelay: `${index * 0.15}s`,
                  '&:hover': {
                    transform: 'translate(-50%, -50%) scale(1.1)',
                    '& .menu-icon': {
                      borderColor: 'rgba(127, 176, 105, 1)',
                      backgroundColor: 'rgba(127, 176, 105, 0.9)',
                      '& svg': {
                        color: 'white',
                      },
                    },
                    '& .menu-label': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                  '@keyframes fadeInScale': {
                    to: {
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Icon Circle */}
                <Box
                  className="menu-icon"
                  sx={{
                    width: { xs: 70, md: 80 },
                    height: { xs: 70, md: 80 },
                    borderRadius: '50%',
                    border: '3px solid rgba(127, 176, 105, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 25px rgba(47, 79, 47, 0.2)',
                    position: 'relative',
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: {
                      fontSize: { xs: 28, md: 32 },
                      color: '#7FB069',
                      transition: 'color 0.3s ease',
                    },
                  })}
                </Box>

                {/* Text Label */}
                <Box
                  className="menu-label"
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%) translateY(10px)',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                    borderRadius: 2,
                    border: '1px solid rgba(127, 176, 105, 0.3)',
                    backdropFilter: 'blur(10px)',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#2F4F2F',
                      fontSize: '12px',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            );
          })}
          
          {/* Semicircle Guide Line (decorativo) */}
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 240, md: 320 },
              height: { xs: 240, md: 320 },
              borderRadius: '50%',
              border: '1px dashed rgba(127, 176, 105, 0.2)',
              borderLeft: 'none',
              transform: 'rotate(90deg)',
              pointerEvents: 'none',
            }}
          />
        </Box>

        {/* Brand Info */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: { xs: '50%', md: 40 },
            transform: { xs: 'translateX(-50%)', md: 'none' },
            maxWidth: { xs: 280, md: 320 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 4,
              padding: theme.spacing(3),
              border: '1px solid rgba(127, 176, 105, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(47, 79, 47, 0.1)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#7FB069',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Let's Eat
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#2F4F2F',
                fontSize: '18px',
                fontWeight: 700,
                marginY: theme.spacing(1),
              }}
            >
              Tu Aplicación de Comidas
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#7A8471',
                fontSize: '14px',
                lineHeight: 1.5,
              }}
            >
              Descubre, planifica y organiza tus comidas de forma inteligente y saludable.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default FullscreenMenu;