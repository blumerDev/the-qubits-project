import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Restaurant,
  LocalGroceryStore,
  Lightbulb,
  CalendarToday,
  Add,
  Close,
} from '@mui/icons-material';
import { useFood } from '../context/FoodContext';

function HomePage() {
  const navigate = useNavigate();
  const { foods, addFood } = useFood();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    image: ''
  });
  
  // Mock data for the meal prep layout
  const currentDate = new Date();
  const currentDay = currentDate.getDate().toString().padStart(2, '0');
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  
  const sampleMeals = {
    monday: { breakfast: 'paleo pancakes', lunch: 'stuffed peppers', dinner: 'honey mustard chicken' },
    tuesday: { breakfast: 'chia seed pudding', lunch: 'chickpea salad', dinner: 'chicken and rice' },
    wednesday: { breakfast: 'sweet potato hash', lunch: 'zucchini fritters', dinner: 'cilantro lime chicken' },
    thursday: { breakfast: 'paleo pancakes', lunch: 'stuffed peppers', dinner: 'honey mustard chicken' },
    friday: { breakfast: 'chia seed pudding', lunch: 'chickpea salad', dinner: 'chicken and rice' },
    saturday: { breakfast: 'sweet potato hash', lunch: 'zucchini fritters', dinner: 'cilantro lime chicken' },
    sunday: { breakfast: 'paleo pancakes', lunch: 'stuffed peppers', dinner: 'honey mustard chicken' }
  };

  const sampleRecipes = [
    { name: 'paleo pancakes', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop' },
    { name: 'chia seed pudding', image: 'https://images.unsplash.com/photo-1511909525232-61113c912358?w=300&h=200&fit=crop' },
    { name: 'sweet potato hash', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&h=200&fit=crop' },
    { name: 'stuffed peppers', image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=300&h=200&fit=crop' },
    { name: 'chickpea salad', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop' },
    { name: 'honey mustard chicken', image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=300&h=200&fit=crop' },
    { name: 'cilantro lime chicken', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=300&h=200&fit=crop' },
    { name: 'zucchini fritters', image: 'https://images.unsplash.com/photo-1583023721587-94c22a4ffd5e?w=300&h=200&fit=crop' }
  ];

  const shoppingCategories = [
    {
      name: 'bakery + bread',
      color: '#D2B48C',
      items: ['rye bread', 'bagels', 'english muffins', 'etc.']
    },
    {
      name: 'fruits + veggies', 
      color: '#FF6B6B',
      items: ['strawberries', 'cucumber', 'romain lettuce', 'etc.']
    },
    {
      name: 'meat + toppings',
      color: '#FF8E8E', 
      items: ['turkey bacon', 'pepperoni', 'shredded cheese', 'etc.']
    },
    {
      name: 'drinks + wine',
      color: '#8B4B8B',
      items: ['celsius', 'merlot', 'diet coke']
    },
    {
      name: 'treats + snacks',
      color: '#FFB347',
      items: ['goldfish', 'gummy worms', 'popcorn']
    },
    {
      name: 'milk + dairy',
      color: '#F5DEB3',
      items: ['oat milk', 'greek yogurt', 'coffee creamer']
    }
  ];

  const handleAddFood = () => {
    setShowAddDialog(true);
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setNewFood({ name: '', description: '', image: '' });
  };

  const handleSaveFood = () => {
    if (newFood.name.trim()) {
      const foodData = {
        id: `food-${Date.now()}`,
        name: newFood.name.trim(),
        description: newFood.description.trim(),
        image: newFood.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
        category: 'lunch',
        ingredients: [],
        nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        preparationTime: 30,
        difficulty: 'medium',
        tags: [],
        servings: 1,
        rating: 0,
        reviews: []
      };
      
      addFood(foodData);
      handleCloseDialog();
    }
  };

  // Combine sample recipes with actual foods from context
  const allRecipes = [
    ...sampleRecipes,
    ...foods.slice(0, 8) // Show first 8 foods from context
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f6f0',
      p: { xs: 2, md: 4 }
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 300,
              color: '#2c2c2c',
              mb: 1,
              fontFamily: 'Georgia, serif'
            }}
          >
            weekly meal prep ✧˖°
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontStyle: 'italic',
              color: '#666',
              fontSize: '1rem'
            }}
          >
            "you gotta nourish in order to flourish"
          </Typography>
        </Box>


        <Grid container spacing={5}>
          {/* Left Column */}
          <Grid item xs={12} md={3}>
            {/* Digital Time Display - Two Tablets */}
            <Box sx={{ mb: 4, display: 'flex', gap: 1 }}>
              <Paper sx={{ px: 2, py: 8, backgroundColor: '#C8DDB5', textAlign: 'center', flex: 1 }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: '3.5rem', 
                    fontWeight: 300, 
                    color: 'white',
                    lineHeight: 1
                  }}
                >
                  {new Date().getHours().toString().padStart(2, '0')}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'white',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase'
                  }}
                >
                  hours
                </Typography>
              </Paper>
              
              <Paper sx={{ px: 2, py: 8, backgroundColor: '#F4C2A1', textAlign: 'center', flex: 1 }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: '3.5rem', 
                    fontWeight: 300, 
                    color: 'white',
                    lineHeight: 1
                  }}
                >
                  {new Date().getMinutes().toString().padStart(2, '0')}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'white',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase'
                  }}
                >
                  minutes
                </Typography>
              </Paper>
            </Box>

            {/* Sample Image */}
            <Paper sx={{ mb: 3, overflow: 'hidden' }}>
              <Box 
                sx={{
                  height: 200,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </Paper>

            {/* Meal Prep Calendar */}
            <Paper sx={{ p: 3, backgroundColor: '#F4C2A1' }}>
              <Typography variant="h6" sx={{ color: '#2c2c2c', mb: 2, fontSize: '0.9rem' }}>
                📅 meals prepped
              </Typography>
              {weekDays.map((day) => (
                <FormControlLabel
                  key={day}
                  control={<Checkbox size="small" />}
                  label={day}
                  sx={{ 
                    display: 'block',
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.85rem',
                      color: '#2c2c2c'
                    }
                  }}
                />
              ))}
            </Paper>
          </Grid>

          {/* Weekly Planner */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 3, mb: 4, backgroundColor: '#E8E8E8' }}>
              <Typography variant="h6" sx={{ mb: 3, color: '#2c2c2c', fontSize: '0.9rem' }}>
                📅 WEEKLY PLANNER
              </Typography>
              
              <Grid container spacing={1}>
                <Grid item xs={1.5}>
                  <Box sx={{ height: 40 }} /> {/* Empty corner */}
                </Grid>
                {weekDays.map((day) => (
                  <Grid item xs={1.5} key={day}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textAlign: 'center', 
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        textTransform: 'lowercase',
                        color: '#2c2c2c'
                      }}
                    >
                      {day}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              {mealTypes.map((mealType) => (
                <Grid container spacing={1} key={mealType} sx={{ mb: 1 }}>
                  <Grid item xs={1.5}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.75rem',
                        textTransform: 'lowercase',
                        color: '#2c2c2c',
                        fontWeight: 500
                      }}
                    >
                      {mealType}
                    </Typography>
                  </Grid>
                  {weekDays.map((day) => (
                    <Grid item xs={1.5} key={`${day}-${mealType}`}>
                      <Box 
                        sx={{ 
                          backgroundColor: mealType === 'breakfast' ? '#F4C2A1' : 
                                         mealType === 'lunch' ? '#C8DDB5' : '#E8C5E8',
                          p: 1,
                          borderRadius: 1,
                          minHeight: 40
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontSize: '0.65rem',
                            color: '#2c2c2c',
                            textAlign: 'center'
                          }}
                        >
                          🥄 {sampleMeals[day]?.[mealType]}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Paper>

            {/* Flavor Files */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#2c2c2c', fontSize: '0.9rem' }}>
                  🥄 FLAVOR FILES
                </Typography>
                <Button
                  onClick={handleAddFood}
                  startIcon={<Add />}
                  sx={{
                    backgroundColor: '#C8DDB5',
                    color: '#2c2c2c',
                    fontSize: '0.7rem',
                    textTransform: 'lowercase',
                    px: 2,
                    py: 0.5,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: '#A8C895',
                    },
                  }}
                >
                  add new
                </Button>
              </Box>
              <Grid container spacing={2}>
                {allRecipes.slice(0, 10).map((recipe, index) => (
                  <Grid item xs={6} md={2.4} key={index}>
                    <Card sx={{ cursor: 'pointer' }} onClick={() => navigate('/foods')}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={recipe.image}
                        alt={recipe.name}
                      />
                      <CardContent sx={{ p: 1 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontSize: '0.7rem',
                            textAlign: 'center',
                            color: '#2c2c2c'
                          }}
                        >
                          🥄 {recipe.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Market Manifesto */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, color: '#2c2c2c', fontSize: '0.9rem' }}>
                🛒 MARKET MANIFESTO
              </Typography>
              <Grid container spacing={3}>
                {shoppingCategories.map((category, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Box sx={{ backgroundColor: category.color, p: 2, borderRadius: 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500,
                          mb: 2,
                          fontSize: '0.8rem',
                          color: '#2c2c2c'
                        }}
                      >
                        {category.name === 'bakery + bread' ? '🥖' : 
                         category.name === 'fruits + veggies' ? '🍎' :
                         category.name === 'meat + toppings' ? '🥓' :
                         category.name === 'drinks + wine' ? '🍷' :
                         category.name === 'treats + snacks' ? '🍿' : '🥛'} {category.name}
                      </Typography>
                      {category.items.map((item, itemIndex) => (
                        <FormControlLabel
                          key={itemIndex}
                          control={<Checkbox size="small" />}
                          label={item}
                          sx={{ 
                            display: 'block',
                            '& .MuiFormControlLabel-label': {
                              fontSize: '0.75rem',
                              color: '#2c2c2c'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Add New Food Dialog */}
      <Dialog
        open={showAddDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#f8f6f0',
          color: '#2c2c2c'
        }}>
          <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>
            🥄 Add New Flavor
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2, backgroundColor: '#f8f6f0' }}>
          <TextField
            autoFocus
            fullWidth
            label="Food name"
            value={newFood.name}
            onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
            placeholder="e.g. homemade pasta"
          />
          
          <TextField
            fullWidth
            label="Description (optional)"
            multiline
            rows={2}
            value={newFood.description}
            onChange={(e) => setNewFood(prev => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
            placeholder="Brief description of your dish..."
          />
          
          <TextField
            fullWidth
            label="Image URL (optional)"
            value={newFood.image}
            onChange={(e) => setNewFood(prev => ({ ...prev, image: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3, backgroundColor: '#f8f6f0' }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ color: '#666', textTransform: 'lowercase' }}
          >
            cancel
          </Button>
          <Button 
            onClick={handleSaveFood}
            variant="contained"
            sx={{
              backgroundColor: '#C8DDB5',
              color: '#2c2c2c',
              textTransform: 'lowercase',
              '&:hover': { backgroundColor: '#A8C895' }
            }}
          >
            add flavor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HomePage;