import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
  useTheme,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import {
  LocalPizza,
  Fastfood,
  RamenDining,
  LocalDrink,
  Restaurant,
  DinnerDining,
  TrendingUp,
  CalendarToday,
  Close,
  Visibility,
  ArrowForward
} from '@mui/icons-material';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/food/FoodCard';
import WeeklyMenuCard from '../components/menu/WeeklyMenuCard';
import { FOOD_CATEGORIES } from '../models/Food';

function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { 
    foods, 
    currentWeeklyMenu, 
    setFilters, 
    generateSuggestions,
    getStats 
  } = useFood();
  
  const [selectedFood, setSelectedFood] = useState(null);
  
  const stats = getStats();

  const menuCategories = [
    { 
      icon: <LocalPizza sx={{ fontSize: 40 }} />, 
      name: 'Breakfast',
      category: FOOD_CATEGORIES.BREAKFAST,
      color: '#7FB069',
      bgColor: 'rgba(127, 176, 105, 0.1)',
      count: stats.categories[FOOD_CATEGORIES.BREAKFAST] || 0
    },
    { 
      icon: <Fastfood sx={{ fontSize: 40 }} />, 
      name: 'Lunch',
      category: FOOD_CATEGORIES.LUNCH,
      color: '#7FB069',
      bgColor: '#7FB069',
      count: stats.categories[FOOD_CATEGORIES.LUNCH] || 0
    },
    { 
      icon: <RamenDining sx={{ fontSize: 40 }} />, 
      name: 'Dinner',
      category: FOOD_CATEGORIES.DINNER,
      color: '#7FB069',
      bgColor: 'rgba(127, 176, 105, 0.1)',
      count: stats.categories[FOOD_CATEGORIES.DINNER] || 0
    },
    { 
      icon: <LocalDrink sx={{ fontSize: 40 }} />, 
      name: 'Beverages',
      category: FOOD_CATEGORIES.BEVERAGE,
      color: '#7FB069',
      bgColor: 'rgba(127, 176, 105, 0.1)',
      count: stats.categories[FOOD_CATEGORIES.BEVERAGE] || 0
    },
    { 
      icon: <Restaurant sx={{ fontSize: 40 }} />, 
      name: 'Snacks',
      category: FOOD_CATEGORIES.SNACK,
      color: '#7FB069',
      bgColor: 'rgba(127, 176, 105, 0.1)',
      count: stats.categories[FOOD_CATEGORIES.SNACK] || 0
    },
    { 
      icon: <DinnerDining sx={{ fontSize: 40 }} />, 
      name: 'Desserts',
      category: FOOD_CATEGORIES.DESSERT,
      color: '#7FB069',
      bgColor: 'rgba(127, 176, 105, 0.1)',
      count: stats.categories[FOOD_CATEGORIES.DESSERT] || 0
    },
  ];

  // Obtener las comidas más populares (por rating)
  const topRatedFoods = foods
    .filter(food => food.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const handleCategoryClick = (category) => {
    setFilters({ category });
    generateSuggestions({ category });
    navigate('/foods'); // Navegar a la página de comidas con filtro aplicado
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
  };

  const handleCloseDialog = () => {
    setSelectedFood(null);
  };

  const handleViewWeeklyMenu = () => {
    navigate('/menus'); // Navegar directamente a la página de menús
  };

  const handleExploreAllFoods = () => {
    navigate('/foods');
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #A8D49A 0%, #7FB069 50%, #F8FDF6 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          opacity: 0.5,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          opacity: 0.3,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '70vh',
            py: 8,
          }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                    fontWeight: 700,
                    color: '#ffffff',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    mb: 2,
                    lineHeight: 0.9,
                  }}
                >
                  Let's Eat
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.25rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 4,
                    maxWidth: 400,
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  Plan your weekly meals and maintain a healthy and organized diet.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#7FB069',
                    color: '#ffffff',
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    borderRadius: 6,
                    boxShadow: '0 4px 20px rgba(127, 176, 105, 0.4)',
                    '&:hover': {
                      backgroundColor: '#5C8A4A',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(127, 176, 105, 0.5)',
                    },
                  }}
                  onClick={handleExploreAllFoods}
                >
                  Explore Foods
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 300, md: 400 },
                    height: { xs: 300, md: 400 },
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=350&h=350&fit=crop&crop=center"
                    alt="Healthy Food Bowl"
                    style={{
                      width: '90%',
                      height: '90%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Floating vegetables */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '10%',
                      right: '10%',
                      fontSize: '2rem',
                      animation: 'float 3s ease-in-out infinite',
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-10px)' },
                      },
                    }}
                  >
                    🥕
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '15%',
                      left: '5%',
                      fontSize: '2rem',
                      animation: 'float 3s ease-in-out infinite 1s',
                    }}
                  >
                    🍅
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '20%',
                      left: '15%',
                      fontSize: '1.5rem',
                      animation: 'float 3s ease-in-out infinite 2s',
                    }}
                  >
                    🥬
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              onClick={handleExploreAllFoods}
              sx={{
                borderColor: '#7FB069',
                color: '#7FB069',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(127, 176, 105, 0.08)',
                  borderColor: '#5C8A4A',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View All Foods by Category
            </Button>
          </Box>
        </Box>


        {/* Current Weekly Menu */}
        {currentWeeklyMenu && (
          <Box sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  color: '#2F4F2F',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                <CalendarToday sx={{ mr: 2, verticalAlign: 'middle' }} />
                Weekly Menu
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Visibility />}
                onClick={handleViewWeeklyMenu}
                sx={{
                  borderColor: '#7FB069',
                  color: '#7FB069'
                }}
              >
                View Complete
              </Button>
            </Box>
            
            <WeeklyMenuCard 
              weeklyMenu={currentWeeklyMenu} 
              onSelect={handleViewWeeklyMenu}
            />
          </Box>
        )}

        {/* Top Rated Foods */}
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              color: '#2F4F2F',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            <TrendingUp sx={{ mr: 2, verticalAlign: 'middle' }} />
            Top Rated Foods
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: '#7A8471',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Discover our community's favorite foods, selected for their exceptional taste and nutritional quality.
          </Typography>
          
          {topRatedFoods.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {topRatedFoods.map((food) => (
                <Grid item xs={12} sm={6} md={4} key={food.id}>
                  <FoodCard
                    food={food}
                    onSelect={handleFoodClick}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              color: '#7A8471'
            }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                No rated foods yet
              </Typography>
              <Typography variant="body2">
                Be the first to rate our delicious foods!
              </Typography>
            </Box>
          )}
          
          {topRatedFoods.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowForward />}
                onClick={handleExploreAllFoods}
                sx={{
                  borderColor: '#7FB069',
                  color: '#7FB069',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(127, 176, 105, 0.08)',
                    borderColor: '#5C8A4A',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Explore All Foods
              </Button>
            </Box>
          )}
        </Box>

        {/* Estadísticas Rápidas */}
        <Box sx={{ py: 6 }}>
          <Paper sx={{ 
            p: 4, 
            backgroundColor: '#F8FDF6',
            borderRadius: 4
          }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: 4,
                color: '#2F4F2F',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Our Food Community
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ 
                    color: '#7FB069', 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}>
                    {stats.totalFoods}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#7A8471' }}>
                    Available Foods
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ 
                    color: '#7FB069', 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}>
                    {stats.weeklyMenu?.completionPercentage.toFixed(0) || 0}%
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#7A8471' }}>
                    Complete Menu
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ 
                    color: '#7FB069', 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}>
                    {Object.keys(stats.categories).length}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#7A8471' }}>
                    Categories
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ 
                    color: '#7FB069', 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}>
                    {Object.keys(stats.tags).length}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#7A8471' }}>
                    Tags
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>

      {/* Dialog para detalles de comida (solo para vista rápida) */}
      <Dialog
        open={!!selectedFood}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h5" sx={{ color: '#2F4F2F', fontWeight: 600 }}>
            {selectedFood?.name}
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedFood && (
            <FoodCard 
              food={selectedFood} 
              showActions={false}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default HomePage;