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
  Restaurant,
  MenuBook,
  Settings,
  Close,
  Add,
  Star,
  ShoppingCart,
} from '@mui/icons-material';

function FullscreenMenu({ isOpen, onToggle }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);
  
  // Obtener el día de la semana actual y fecha
  const getDayOfWeek = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
  };

  const getCurrentDate = () => {
    const today = new Date();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    return `${day} de ${month}, ${year}`;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { 
      text: 'ADD FOOD', 
      icon: <Add />, 
      description: 'Add Food',
      path: '/add-food'
    },
    { 
      text: 'FOODS', 
      icon: <Restaurant />, 
      description: 'Foods',
      path: '/foods'
    },
    { 
      text: 'SUPERMARKET', 
      icon: <ShoppingCart />, 
      description: 'Supermarket',
      path: '/cart'
    },
    { 
      text: 'RATINGS', 
      icon: <Star />, 
      description: 'Ratings',
      path: '/ratings'
    },
    { 
      text: 'SETTINGS', 
      icon: <Settings />, 
      description: 'Settings',
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
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

        {/* Sección del Usuario - Centro circular */}
        <Box
          sx={{
            position: 'absolute',
            left: '30%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 15,
            width: { xs: 220, md: 400 },
            height: { xs: 220, md: 400 },
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(15px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontSize: { xs: '18px', md: '22px' },
              fontWeight: 700,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              marginBottom: theme.spacing(1),
              textAlign: 'center',
            }}
          >
            MEAL PLANNER
          </Typography>
          
          {/* Línea divisoria */}
          <Box
            sx={{
              width: '60px',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              margin: `${theme.spacing(0.5)} auto`,
              borderRadius: '1px',
            }}
          />
          
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '14px', md: '16px' },
              fontWeight: 500,
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              marginBottom: theme.spacing(0.5),
              textAlign: 'center',
            }}
          >
            Weekly & Monthly
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '12px', md: '14px' },
              fontWeight: 400,
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Food Organization
          </Typography>
        </Box>

        {/* Menu Items Following Semicircle - Lado Derecho */}
        <Box
          sx={{
            position: 'absolute',
            right: { xs: 80, md: 120 },
            top: '50%',
            transform: 'translateY(-50%)',
            width: { xs: 650, md: 750 },
            height: { xs: 650, md: 750 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {menuItems.map((item, index) => {
            // Calcular posición en semicírculo con márgenes para evitar superposición
            const totalAngle = Math.PI * 0.8; // Usar 80% del semicírculo para dejar espacio
            const startAngle = Math.PI * 0.1; // Comenzar 10% después del inicio
            const angle = startAngle + (index / (menuItems.length - 1)) * totalAngle;
            const radius = { xs: 280, md: 350 };
            const radiusValue = windowWidth < 768 ? radius.xs : radius.md;
            
            // Coordenadas para el semicírculo (centrado)
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
                  animationDelay: `${index * 0.1}s`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing(2),
                  '&:hover': {
                    transform: 'translate(-50%, -50%) scale(1.05)',
                    '& .menu-icon': {
                      borderColor: 'rgba(255, 255, 255, 1)',
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      '& svg': {
                        color: '#2F4F2F',
                      },
                    },
                    '& .menu-text': {
                      color: '#2F4F2F',
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
                    width: { xs: 60, md: 70 },
                    height: { xs: 60, md: 70 },
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: {
                      fontSize: { xs: 18, md: 20 },
                      color: 'white',
                      transition: 'color 0.3s ease',
                    },
                  })}
                </Box>

                {/* Text Label - A la derecha del ícono */}
                <Typography
                  className="menu-text"
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontSize: { xs: '14px', md: '16px' },
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'color 0.3s ease',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            );
          })}
          
          {/* Semicírculo central decorativo - desde la izquierda */}
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 580, md: 720 },
              height: { xs: 580, md: 720 },
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRight: 'none',
              pointerEvents: 'none',
              top: '50%',
              left: { xs: '-290px', md: '-330px' },
              transform: 'translateY(-50%)',
              zIndex: 5,
            }}
          />
          
        </Box>

      </Box>
    </Modal>
  );
}

export default FullscreenMenu;