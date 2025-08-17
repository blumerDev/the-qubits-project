import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Avatar,
  Button,
  LinearProgress
} from '@mui/material';
import {
  Restaurant,
  CalendarToday,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { useFood } from '../../context/FoodContext';
import { DAY_LABELS } from '../../models/WeeklyMenu';

function WeeklyMenuCard({ weeklyMenu, onEdit, onSelect, showActions = false }) {
  const { getFoodById } = useFood();

  if (!weeklyMenu) return null;

  const stats = weeklyMenu.getStats();
  const isActive = weeklyMenu.isActive;

  const getDayMealImage = (day) => {
    const dayMeals = weeklyMenu.getDayMeals(day);
    const firstMeal = dayMeals.breakfast || dayMeals.lunch || dayMeals.dinner;
    if (firstMeal) {
      const food = getFoodById(firstMeal);
      return food?.image || '';
    }
    return '';
  };

  const formatDate = (date) => {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 6);
    
    return `${date.getDate()}/${date.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}`;
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(weeklyMenu);
    }
  };

  return (
    <Card
      sx={{
        cursor: onSelect ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        border: isActive ? '2px solid #7FB069' : '1px solid #E8F5E8',
        '&:hover': {
          transform: onSelect ? 'translateY(-4px)' : 'none',
          boxShadow: onSelect ? '0 8px 25px rgba(127, 176, 105, 0.2)' : 'inherit',
        },
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 2 
        }}>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#2F4F2F',
                mb: 0.5
              }}
            >
              {weeklyMenu.name || 'Menú Sin Nombre'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: '#7A8471' }} />
              <Typography variant="body2" sx={{ color: '#7A8471' }}>
                {formatDate(weeklyMenu.weekStartDate)}
              </Typography>
            </Box>

            {isActive && (
              <Chip
                label="Activo"
                size="small"
                icon={<CheckCircle />}
                sx={{
                  backgroundColor: '#7FB069',
                  color: 'white',
                  fontWeight: 500
                }}
              />
            )}
          </Box>

          {/* Progreso */}
          <Box sx={{ textAlign: 'right', minWidth: 80 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#7FB069', 
                fontWeight: 700,
                fontSize: '1.25rem'
              }}
            >
              {Math.round(stats.completionPercentage)}%
            </Typography>
            <Typography variant="caption" sx={{ color: '#7A8471' }}>
              Completo
            </Typography>
          </Box>
        </Box>

        {/* Descripción */}
        {weeklyMenu.description && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#7A8471', 
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {weeklyMenu.description}
          </Typography>
        )}

        {/* Barra de progreso */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={stats.completionPercentage}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#E8F5E8',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#7FB069',
                borderRadius: 3,
              },
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 1 
          }}>
            <Typography variant="caption" sx={{ color: '#7A8471' }}>
              {stats.completeDays} de 7 días completos
            </Typography>
            <Typography variant="caption" sx={{ color: '#7A8471' }}>
              {stats.totalMeals} comidas
            </Typography>
          </Box>
        </Box>

        {/* Preview de días con imágenes */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#2F4F2F' }}>
            Vista previa de la semana:
          </Typography>
          <Grid container spacing={1}>
            {Object.keys(DAY_LABELS).slice(0, 7).map((day) => {
              const dayMeals = weeklyMenu.getDayMeals(day);
              const hasAllMeals = dayMeals.breakfast && dayMeals.lunch && dayMeals.dinner;
              const mealCount = Object.values(dayMeals).filter(meal => meal).length;
              const image = getDayMealImage(day);

              return (
                <Grid item xs key={day}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={image}
                      sx={{
                        width: 32,
                        height: 32,
                        mx: 'auto',
                        mb: 0.5,
                        border: hasAllMeals ? '2px solid #7FB069' : '2px solid #E8F5E8',
                        backgroundColor: hasAllMeals ? '#7FB069' : '#F0F0F0'
                      }}
                    >
                      {!image && <Restaurant sx={{ fontSize: 16, color: hasAllMeals ? 'white' : '#7A8471' }} />}
                    </Avatar>
                    <Typography variant="caption" sx={{ 
                      display: 'block',
                      color: hasAllMeals ? '#7FB069' : '#7A8471',
                      fontSize: '0.7rem'
                    }}>
                      {DAY_LABELS[day].slice(0, 3)}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      display: 'block',
                      color: '#7A8471',
                      fontSize: '0.65rem'
                    }}>
                      {mealCount}/3
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Estadísticas */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: '#F8FDF6',
          borderRadius: 2,
          mb: showActions ? 2 : 0
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#7FB069', fontWeight: 700 }}>
              {stats.totalMeals}
            </Typography>
            <Typography variant="caption" sx={{ color: '#7A8471' }}>
              Comidas
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#7FB069', fontWeight: 700 }}>
              {stats.completeDays}
            </Typography>
            <Typography variant="caption" sx={{ color: '#7A8471' }}>
              Días Completos
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#7FB069', fontWeight: 700 }}>
              {7 - stats.completeDays}
            </Typography>
            <Typography variant="caption" sx={{ color: '#7A8471' }}>
              Pendientes
            </Typography>
          </Box>
        </Box>

        {/* Acciones */}
        {showActions && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(weeklyMenu);
              }}
              sx={{
                borderColor: '#7FB069',
                color: '#7FB069',
                '&:hover': {
                  backgroundColor: 'rgba(127, 176, 105, 0.08)',
                },
              }}
            >
              Editar
            </Button>
            
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(weeklyMenu);
              }}
              sx={{
                backgroundColor: '#7FB069',
                '&:hover': {
                  backgroundColor: '#5C8A4A',
                },
              }}
            >
              Ver Detalles
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default WeeklyMenuCard;