import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
  Button
} from '@mui/material';
import {
  AccessTime,
  Restaurant,
  Favorite,
  FavoriteBorder,
  Edit,
  Delete
} from '@mui/icons-material';
import { useFood } from '../../context/FoodContext';

function FoodCard({ 
  food, 
  showActions = false, 
  onEdit, 
  onDelete, 
  onSelect,
  compact = false 
}) {
  const { getFoodById } = useFood();
  
  // Si recibimos solo un ID, obtenemos el objeto completo
  const foodData = typeof food === 'string' ? getFoodById(food) : food;
  
  if (!foodData) return null;

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit && onEdit(foodData);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete && onDelete(foodData.id);
  };

  const handleSelect = () => {
    onSelect && onSelect(foodData);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snack: 'Snack',
      dessert: 'Dessert',
      beverage: 'Beverage'
    };
    return labels[category] || category;
  };

  return (
    <Card
      sx={{
        height: compact ? 200 : 'auto',
        display: 'flex',
        flexDirection: compact ? 'row' : 'column',
        cursor: onSelect ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: onSelect ? 'translateY(-4px)' : 'none',
          boxShadow: onSelect ? '0 8px 25px rgba(127, 176, 105, 0.2)' : 'inherit',
        },
      }}
      onClick={handleSelect}
    >
      <CardMedia
        component="img"
        sx={{
          width: compact ? 120 : '100%',
          height: compact ? '100%' : 200,
          objectFit: 'cover',
        }}
        image={foodData.image}
        alt={foodData.name}
      />
      
      <CardContent sx={{ flexGrow: 1, p: compact ? 2 : 3 }}>
        {/* Header con título y rating */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 1 
        }}>
          <Typography 
            variant={compact ? "h6" : "h5"} 
            sx={{ 
              fontWeight: 600,
              color: '#2F4F2F',
              fontSize: compact ? '1rem' : '1.25rem',
              lineHeight: 1.2,
              flexGrow: 1
            }}
          >
            {foodData.name}
          </Typography>
          
          {!compact && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <Rating 
                value={foodData.rating} 
                precision={0.1} 
                size="small" 
                readOnly 
              />
              <Typography variant="caption" sx={{ ml: 0.5, color: '#7A8471' }}>
                ({foodData.rating})
              </Typography>
            </Box>
          )}
        </Box>

        {/* Descripción */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#7A8471', 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: compact ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {foodData.description}
        </Typography>

        {/* Información nutricional y tiempo */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          mb: 2,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTime sx={{ fontSize: 16, color: '#7A8471' }} />
            <Typography variant="caption" sx={{ color: '#7A8471' }}>
              {foodData.preparationTime} min
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Restaurant sx={{ fontSize: 16, color: '#7A8471' }} />
            <Typography variant="caption" sx={{ color: '#7A8471' }}>
              {foodData.servings} {foodData.servings === 1 ? 'serving' : 'servings'}
            </Typography>
          </Box>

          {foodData.nutritionalInfo?.calories && (
            <Typography variant="caption" sx={{ 
              color: '#7FB069', 
              fontWeight: 600,
              backgroundColor: 'rgba(127, 176, 105, 0.1)',
              padding: '2px 8px',
              borderRadius: 2
            }}>
              {foodData.nutritionalInfo.calories} cal
            </Typography>
          )}
        </Box>

        {/* Tags y categoría */}
        {!compact && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              label={getCategoryLabel(foodData.category)}
              size="small"
              sx={{
                backgroundColor: '#E8F5E8',
                color: '#2F4F2F',
                fontWeight: 500
              }}
            />
            
            <Chip
              label={foodData.difficulty}
              size="small"
              sx={{
                backgroundColor: getDifficultyColor(foodData.difficulty),
                color: 'white',
                fontWeight: 500
              }}
            />
            
            {foodData.tags.slice(0, 2).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#7FB069',
                  color: '#7FB069'
                }}
              />
            ))}
            
            {foodData.tags.length > 2 && (
              <Chip
                label={`+${foodData.tags.length - 2}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#7A8471',
                  color: '#7A8471'
                }}
              />
            )}
          </Box>
        )}

        {/* Acciones */}
        {showActions && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 2 
          }}>
            <Box>
              <IconButton 
                onClick={handleEdit}
                sx={{ color: '#7FB069' }}
                size="small"
              >
                <Edit />
              </IconButton>
              <IconButton 
                onClick={handleDelete}
                sx={{ color: '#F44336' }}
                size="small"
              >
                <Delete />
              </IconButton>
            </Box>
            
            <IconButton 
              sx={{ color: '#E91E63' }}
              size="small"
            >
              <FavoriteBorder />
            </IconButton>
          </Box>
        )}

        {/* Botón de selección para menús */}
        {onSelect && !showActions && (
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              borderColor: '#7FB069',
              color: '#7FB069',
              '&:hover': {
                backgroundColor: 'rgba(127, 176, 105, 0.08)',
                borderColor: '#5C8A4A',
              },
            }}
          >
            Select
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default FoodCard;