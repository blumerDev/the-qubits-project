import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Fab,
  Collapse,
  Paper
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { useFood } from '../../context/FoodContext';
import FoodCard from './FoodCard';
import { FOOD_CATEGORIES, FOOD_TAGS } from '../../models/Food';

function FoodList({ onAddFood, onEditFood, showActions = false, onSelectFood }) {
  const { 
    getFilteredFoods, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters, 
    clearFilters,
    deleteFood 
  } = useFood();

  const [showFilters, setShowFilters] = useState(false);
  
  const filteredFoods = getFilteredFoods();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ [filterName]: value });
  };

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    setFilters({ tags: newTags });
  };

  const handleDeleteFood = (foodId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta comida?')) {
      deleteFood(foodId);
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      breakfast: 'Desayuno',
      lunch: 'Almuerzo',
      dinner: 'Cena',
      snack: 'Snack',
      dessert: 'Postre',
      beverage: 'Bebida'
    };
    return labels[category] || category;
  };

  const getTagLabel = (tag) => {
    const labels = {
      'vegetarian': 'Vegetariano',
      'vegan': 'Vegano',
      'gluten-free': 'Sin Gluten',
      'dairy-free': 'Sin Lácteos',
      'low-carb': 'Bajo en Carbohidratos',
      'high-protein': 'Alto en Proteínas',
      'quick': 'Rápido',
      'healthy': 'Saludable',
      'comfort': 'Comfort Food',
      'spicy': 'Picante'
    };
    return labels[tag] || tag;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h4" sx={{ color: '#2F4F2F', fontWeight: 600 }}>
          Comidas ({filteredFoods.length})
        </Typography>
        
        {showActions && (
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={onAddFood}
            sx={{
              backgroundColor: '#7FB069',
              '&:hover': { backgroundColor: '#5C8A4A' }
            }}
          >
            Agregar Comida
          </Button>
        )}
      </Box>

      {/* Búsqueda */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar comidas por nombre, descripción o ingredientes..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#7A8471' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  startIcon={<FilterList />}
                  endIcon={showFilters ? <ExpandLess /> : <ExpandMore />}
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{ color: '#7FB069' }}
                >
                  Filtros
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            }
          }}
        />
      </Box>

      {/* Panel de Filtros */}
      <Collapse in={showFilters}>
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#F8FDF6' }}>
          <Grid container spacing={3}>
            {/* Categoría */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={filters.category || ''}
                  label="Categoría"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <MenuItem value="">Todas</MenuItem>
                  {Object.values(FOOD_CATEGORIES).map((category) => (
                    <MenuItem key={category} value={category}>
                      {getCategoryLabel(category)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Dificultad */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Dificultad</InputLabel>
                <Select
                  value={filters.difficulty || ''}
                  label="Dificultad"
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="easy">Fácil</MenuItem>
                  <MenuItem value="medium">Medio</MenuItem>
                  <MenuItem value="hard">Difícil</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Tiempo máximo */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Tiempo máximo (min)"
                type="number"
                value={filters.maxPreparationTime || ''}
                onChange={(e) => handleFilterChange('maxPreparationTime', 
                  e.target.value ? parseInt(e.target.value) : null
                )}
              />
            </Grid>

            {/* Botón limpiar filtros */}
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={clearFilters}
                sx={{
                  height: '40px',
                  borderColor: '#7FB069',
                  color: '#7FB069'
                }}
              >
                Limpiar Filtros
              </Button>
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2F4F2F' }}>
                Etiquetas:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.values(FOOD_TAGS).map((tag) => (
                  <Chip
                    key={tag}
                    label={getTagLabel(tag)}
                    clickable
                    onClick={() => handleTagToggle(tag)}
                    color={filters.tags?.includes(tag) ? 'primary' : 'default'}
                    variant={filters.tags?.includes(tag) ? 'filled' : 'outlined'}
                    size="small"
                    sx={{
                      '&.MuiChip-colorPrimary': {
                        backgroundColor: '#7FB069',
                        color: 'white'
                      }
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Collapse>

      {/* Lista de comidas */}
      {filteredFoods.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          color: '#7A8471'
        }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            No se encontraron comidas
          </Typography>
          <Typography variant="body2">
            Intenta ajustar los filtros o agregar nuevas comidas
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredFoods.map((food) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
              <FoodCard
                food={food}
                showActions={showActions}
                onEdit={onEditFood}
                onDelete={handleDeleteFood}
                onSelect={onSelectFood}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* FAB para agregar comida */}
      {showActions && (
        <Fab
          color="primary"
          aria-label="add food"
          onClick={onAddFood}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#7FB069',
            '&:hover': { backgroundColor: '#5C8A4A' }
          }}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
}

export default FoodList;