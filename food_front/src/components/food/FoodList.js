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
    if (window.confirm('Are you sure you want to delete this food?')) {
      deleteFood(foodId);
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

  const getTagLabel = (tag) => {
    const labels = {
      'vegetarian': 'Vegetarian',
      'vegan': 'Vegan',
      'gluten-free': 'Gluten Free',
      'dairy-free': 'Dairy Free',
      'low-carb': 'Low Carb',
      'high-protein': 'High Protein',
      'quick': 'Quick',
      'healthy': 'Healthy',
      'comfort': 'Comfort Food',
      'spicy': 'Spicy'
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
          Foods ({filteredFoods.length})
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
            Add Food
          </Button>
        )}
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search foods by name, description or ingredients..."
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
                  Filters
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

      {/* Filters Panel */}
      <Collapse in={showFilters}>
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#F8FDF6' }}>
          <Grid container spacing={3}>
            {/* Category */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category || ''}
                  label="Category"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {Object.values(FOOD_CATEGORIES).map((category) => (
                    <MenuItem key={category} value={category}>
                      {getCategoryLabel(category)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Difficulty */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={filters.difficulty || ''}
                  label="Difficulty"
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Maximum time */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Maximum time (min)"
                type="number"
                value={filters.maxPreparationTime || ''}
                onChange={(e) => handleFilterChange('maxPreparationTime', 
                  e.target.value ? parseInt(e.target.value) : null
                )}
              />
            </Grid>

            {/* Clear filters button */}
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
                Clear Filters
              </Button>
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2F4F2F' }}>
                Tags:
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

      {/* Food list */}
      {filteredFoods.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          color: '#7A8471'
        }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            No foods found
          </Typography>
          <Typography variant="body2">
            Try adjusting the filters or adding new foods
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

      {/* FAB to add food */}
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