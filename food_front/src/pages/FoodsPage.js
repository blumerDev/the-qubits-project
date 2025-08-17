import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Alert
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useFood } from '../context/FoodContext';
import FoodList from '../components/food/FoodList';
import { Food, FOOD_CATEGORIES, FOOD_TAGS } from '../models/Food';

function FoodsPage() {
  const { addFood, updateFood } = useFood();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [foodForm, setFoodForm] = useState({
    name: '',
    description: '',
    category: '',
    ingredients: '',
    preparationTime: '',
    difficulty: 'medium',
    image: '',
    tags: [],
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });
  const [error, setError] = useState('');

  const handleAddFood = () => {
    setEditingFood(null);
    setFoodForm({
      name: '',
      description: '',
      category: '',
      ingredients: '',
      preparationTime: '',
      difficulty: 'medium',
      image: '',
      tags: [],
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
    setShowAddDialog(true);
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      description: food.description,
      category: food.category,
      ingredients: food.ingredients.join(', '),
      preparationTime: food.preparationTime.toString(),
      difficulty: food.difficulty,
      image: food.image,
      tags: food.tags,
      calories: food.nutritionalInfo?.calories?.toString() || '',
      protein: food.nutritionalInfo?.protein?.toString() || '',
      carbs: food.nutritionalInfo?.carbs?.toString() || '',
      fat: food.nutritionalInfo?.fat?.toString() || ''
    });
    setShowAddDialog(true);
  };

  const handleFormChange = (field, value) => {
    setFoodForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleTagToggle = (tag) => {
    const currentTags = foodForm.tags;
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    setFoodForm(prev => ({ ...prev, tags: newTags }));
  };

  const handleSaveFood = () => {
    // Validations
    if (!foodForm.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!foodForm.category) {
      setError('Category is required');
      return;
    }
    if (!foodForm.preparationTime || isNaN(parseInt(foodForm.preparationTime))) {
      setError('Preparation time must be a valid number');
      return;
    }

    try {
      const foodData = {
        id: editingFood ? editingFood.id : `food-${Date.now()}`,
        name: foodForm.name.trim(),
        description: foodForm.description.trim(),
        category: foodForm.category,
        ingredients: foodForm.ingredients.split(',').map(i => i.trim()).filter(i => i),
        nutritionalInfo: {
          calories: parseInt(foodForm.calories) || 0,
          protein: parseInt(foodForm.protein) || 0,
          carbs: parseInt(foodForm.carbs) || 0,
          fat: parseInt(foodForm.fat) || 0
        },
        preparationTime: parseInt(foodForm.preparationTime),
        difficulty: foodForm.difficulty,
        image: foodForm.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop',
        tags: foodForm.tags,
        servings: 1,
        rating: editingFood ? editingFood.rating : 0,
        reviews: editingFood ? editingFood.reviews : []
      };

      const newFood = new Food(foodData);

      if (editingFood) {
        updateFood(newFood);
      } else {
        addFood(newFood);
      }

      setShowAddDialog(false);
      setError('');
    } catch (err) {
      setError('Error saving food');
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
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#F8FDF6',
      py: 4
    }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#2F4F2F', 
              fontWeight: 700,
              mb: 1
            }}
          >
            Food Management
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#7A8471',
              maxWidth: 600
            }}
          >
            Manage your food catalog. You can add new recipes, edit existing ones and organize them by categories.
          </Typography>
        </Box>

        <FoodList
          showActions={true}
          onAddFood={handleAddFood}
          onEditFood={handleEditFood}
        />

        {/* Dialog to add/edit food */}
        <Dialog
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingFood ? 'Edit Food' : 'Add New Food'}
          </DialogTitle>
          
          <DialogContent sx={{ pt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              {/* Basic information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: '#2F4F2F' }}>
                  Basic Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Food name"
                  value={foodForm.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={foodForm.category}
                    label="Category"
                    onChange={(e) => handleFormChange('category', e.target.value)}
                  >
                    {Object.values(FOOD_CATEGORIES).map((category) => (
                      <MenuItem key={category} value={category}>
                        {getCategoryLabel(category)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={foodForm.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ingredients (separated by commas)"
                  multiline
                  rows={2}
                  value={foodForm.ingredients}
                  onChange={(e) => handleFormChange('ingredients', e.target.value)}
                  placeholder="e.g: tomato, lettuce, chicken, olive oil"
                />
              </Grid>

              {/* Preparation details */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: '#2F4F2F' }}>
                  Preparation Details
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Preparation time (minutes)"
                  type="number"
                  value={foodForm.preparationTime}
                  onChange={(e) => handleFormChange('preparationTime', e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={foodForm.difficulty}
                    label="Difficulty"
                    onChange={(e) => handleFormChange('difficulty', e.target.value)}
                  >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Nutritional information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: '#2F4F2F' }}>
                  Nutritional Information (optional)
                </Typography>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Calories"
                  type="number"
                  value={foodForm.calories}
                  onChange={(e) => handleFormChange('calories', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Protein (g)"
                  type="number"
                  value={foodForm.protein}
                  onChange={(e) => handleFormChange('protein', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Carbohydrates (g)"
                  type="number"
                  value={foodForm.carbs}
                  onChange={(e) => handleFormChange('carbs', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Fat (g)"
                  type="number"
                  value={foodForm.fat}
                  onChange={(e) => handleFormChange('fat', e.target.value)}
                />
              </Grid>

              {/* Image URL */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL (optional)"
                  value={foodForm.image}
                  onChange={(e) => handleFormChange('image', e.target.value)}
                  placeholder="https://example.com/imagen.jpg"
                />
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: '#2F4F2F' }}>
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {Object.values(FOOD_TAGS).map((tag) => (
                    <Chip
                      key={tag}
                      label={getTagLabel(tag)}
                      clickable
                      onClick={() => handleTagToggle(tag)}
                      color={foodForm.tags.includes(tag) ? 'primary' : 'default'}
                      variant={foodForm.tags.includes(tag) ? 'filled' : 'outlined'}
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
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setShowAddDialog(false)}
              sx={{ color: '#7A8471' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveFood}
              variant="contained"
              sx={{
                backgroundColor: '#7FB069',
                '&:hover': { backgroundColor: '#5C8A4A' }
              }}
            >
              {editingFood ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default FoodsPage;