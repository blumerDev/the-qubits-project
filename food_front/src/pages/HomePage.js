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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Restaurant,
  Add,
  Close,
  Home,
  Person,
  Settings,
  Favorite,
  Menu,
} from '@mui/icons-material';
import { useFood } from '../context/FoodContext';

function HomePage() {
  const navigate = useNavigate();
  const { foods, addFood } = useFood();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    image: ''
  });

  // Mock data for the meal prep layout
  const currentDate = new Date();
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Weekly meal data
  const weeklyMeals = {
    monday: { breakfast: 'paleo pancakes', lunch: 'quinoa salad', dinner: 'grilled salmon' },
    tuesday: { breakfast: 'chia pudding', lunch: 'chicken wrap', dinner: 'pasta primavera' },
    wednesday: { breakfast: 'smoothie bowl', lunch: 'lentil soup', dinner: 'stir fry' },
    thursday: { breakfast: 'oatmeal', lunch: 'caesar salad', dinner: 'stuffed peppers' },
    friday: { breakfast: 'yogurt parfait', lunch: 'sandwich', dinner: 'tacos' },
    saturday: { breakfast: 'french toast', lunch: 'soup', dinner: 'pizza' },
    sunday: { breakfast: 'eggs benedict', lunch: 'salad bowl', dinner: 'roast chicken' }
  };

  const sampleRecipes = [
    { name: 'paleo pancakes', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop' },
    { name: 'chia seed pudding', image: 'https://images.unsplash.com/photo-1511909525232-61113c912358?w=300&h=200&fit=crop' },
    { name: 'sweet potato hash', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&h=200&fit=crop' },
    { name: 'stuffed peppers', image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=300&h=200&fit=crop' },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const mainSidebarItems = [
    { icon: <Home />, label: 'Home', action: () => { setActiveIcon(0); navigate('/'); } },
    { icon: <Restaurant />, label: 'Foods', action: () => { setActiveIcon(1); navigate('/foods'); } },
    { icon: <Favorite />, label: 'Favorites', action: () => { setActiveIcon(2); console.log('Favorites clicked'); } },
    { icon: <Person />, label: 'Profile', action: () => { setActiveIcon(3); console.log('Profile clicked'); } },
  ];
  
  const bottomSidebarItems = [
    { icon: <Settings />, label: 'Settings', action: () => { setActiveIcon(4); console.log('Settings clicked'); } },
  ];

  const handleAddFood = () => setShowAddDialog(true);
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

  const allRecipes = [...sampleRecipes, ...foods.slice(0, 8)];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f6f0', display: 'flex' }}>
      {/* Fixed Sidebar - Always Visible */}
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          bottom: 40,
          left: 24,
          width: '65px',
          backgroundColor: '#C8DDB5',
          borderRadius: '0 20px 20px 0',
          zIndex: 1300,
          boxShadow: '8px 8px 16px #A5C792, -8px -8px 16px #EBF5D8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 3
        }}
      >
        {/* Main icons group */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {mainSidebarItems.map((item, index) => (
            <IconButton
              key={index}
              onClick={item.action}
              sx={{
                width: 44,
                height: 44,
                mb: 2,
                backgroundColor: activeIcon === index ? '#A8C895' : 'transparent',
                borderRadius: '12px',
                boxShadow: activeIcon === index ? 'inset 2px 2px 4px #8FB07C, inset -2px -2px 4px #C2E6AF' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: activeIcon === index ? 'scale(0.95)' : 'scale(1)',
                '&:hover': {
                  backgroundColor: activeIcon === index ? '#A8C895' : 'rgba(255,255,255,0.15)',
                  transform: 'scale(0.9)',
                  boxShadow: activeIcon === index ? 'inset 3px 3px 6px #8FB07C, inset -3px -3px 6px #C2E6AF' : '2px 2px 4px rgba(165, 199, 146, 0.3), -2px -2px 4px rgba(235, 245, 216, 0.3)'
                },
                '&:active': {
                  transform: 'scale(0.85)',
                  transition: 'all 0.1s ease'
                }
              }}
            >
              <Box sx={{ 
                color: activeIcon === index ? '#ffffff' : '#5A7A52', 
                fontSize: '1.2rem',
                transition: 'color 0.3s ease'
              }}>
                {item.icon}
              </Box>
            </IconButton>
          ))}
        </Box>

        {/* Bottom icons group */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {bottomSidebarItems.map((item, index) => (
            <IconButton
              key={index}
              onClick={item.action}
              sx={{
                width: 44,
                height: 44,
                backgroundColor: activeIcon === 4 ? '#A8C895' : 'transparent',
                borderRadius: '12px',
                boxShadow: activeIcon === 4 ? 'inset 2px 2px 4px #8FB07C, inset -2px -2px 4px #C2E6AF' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: activeIcon === 4 ? 'scale(0.95)' : 'scale(1)',
                '&:hover': {
                  backgroundColor: activeIcon === 4 ? '#A8C895' : 'rgba(255,255,255,0.15)',
                  transform: 'scale(0.9)',
                  boxShadow: activeIcon === 4 ? 'inset 3px 3px 6px #8FB07C, inset -3px -3px 6px #C2E6AF' : '2px 2px 4px rgba(165, 199, 146, 0.3), -2px -2px 4px rgba(235, 245, 216, 0.3)'
                },
                '&:active': {
                  transform: 'scale(0.85)',
                  transition: 'all 0.1s ease'
                }
              }}
            >
              <Box sx={{ 
                color: activeIcon === 4 ? '#ffffff' : '#5A7A52', 
                fontSize: '1.2rem',
                transition: 'color 0.3s ease'
              }}>
                {item.icon}
              </Box>
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* Main Content with Left Margin */}
      <Box sx={{ ml: '108px', flex: 1, p: { xs: 2, md: 4 }, width: 'calc(100% - 108px)' }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 300, color: '#2c2c2c', mb: 1, fontFamily: 'Georgia, serif' }}>
              weekly meal prep ✧˖°
            </Typography>
            <Typography sx={{ fontStyle: 'italic', color: '#666', fontSize: '1rem' }}>
              "you gotta nourish in order to flourish"
            </Typography>
          </Box>

          <Grid container spacing={5}>
            {/* Left Column */}
            <Grid item xs={12} md={3}>
              {/* Time Tablets */}
              <Box sx={{ mb: 4, display: 'flex', gap: 1 }}>
                <Paper sx={{ px: 2, py: 8, backgroundColor: '#C8DDB5', textAlign: 'center', flex: 1 }}>
                  <Typography variant="h1" sx={{ fontSize: '3.5rem', fontWeight: 300, color: 'white', lineHeight: 1 }}>
                    {new Date().getHours().toString().padStart(2, '0')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', fontSize: '0.8rem', textTransform: 'uppercase' }}>hours</Typography>
                </Paper>
                <Paper sx={{ px: 2, py: 8, backgroundColor: '#F4C2A1', textAlign: 'center', flex: 1 }}>
                  <Typography variant="h1" sx={{ fontSize: '3.5rem', fontWeight: 300, color: 'white', lineHeight: 1 }}>
                    {new Date().getMinutes().toString().padStart(2, '0')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', fontSize: '0.8rem', textTransform: 'uppercase' }}>minutes</Typography>
                </Paper>
              </Box>

              {/* Sample Image */}
              <Paper sx={{ mb: 3, overflow: 'hidden' }}>
                <Box sx={{ height: 200, backgroundImage: 'url(https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </Paper>

              {/* Meal Prep Cards */}
              <Grid container spacing={2}>
                {weekDays.slice(0, 4).map((day, index) => (
                  <Grid item xs={6} key={day}>
                    <Paper sx={{
                      p: 2, backgroundColor: '#E8E8E8', textAlign: 'center', borderRadius: '20px', cursor: 'pointer',
                      border: 'none', aspectRatio: '1/1', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                      boxShadow: '8px 8px 16px #D1D1D1, -8px -8px 16px #FFFFFF', transition: 'all 0.2s ease',
                      '&:hover': { boxShadow: 'inset 4px 4px 8px #D1D1D1, inset -4px -4px 8px #FFFFFF', transform: 'scale(0.98)' }
                    }}>
                      <Box sx={{
                        width: 45, height: 45, backgroundColor: '#E8E8E8', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto',
                        boxShadow: 'inset 2px 2px 4px #D1D1D1, inset -2px -2px 4px #FFFFFF'
                      }}>
                        <Typography sx={{ color: '#5A7A52', fontSize: '1.3rem' }}>
                          {index === 0 ? '🌡️' : index === 1 ? '☁️' : index === 2 ? '🎵' : '🛒'}
                        </Typography>
                      </Box>
                      <Typography sx={{ color: '#5A7A52', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.2 }}>
                        {index === 0 ? 'Temperature' : index === 1 ? 'Weather' : index === 2 ? 'Playlist' : 'Your Bag'}
                      </Typography>
                      <Typography sx={{ color: '#8A9A82', fontSize: '0.8rem', mt: 0.5, fontWeight: 400 }}>
                        {index === 0 ? 'Checker' : index === 1 ? '' : index === 2 ? 'Favorite' : 'Shopping'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Right Column - Weekly Calendar & Flavor Files */}
            <Grid item xs={12} md={9}>
              {/* Meal Prep Cards */}
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ color: '#2c2c2c', fontSize: '0.9rem', mb: 3 }}>🍽️ MEAL MANAGEMENT</Typography>
                <Grid container spacing={2}>
                  {[
                    { icon: '📋', title: 'Tu Menú', subtitle: 'Semanal', action: () => console.log('Tu menú clicked') },
                    { icon: '🛒', title: 'Compras del', subtitle: 'Super', action: () => console.log('Compras clicked') },
                    { icon: '👨‍🍳', title: 'Recetas', subtitle: 'Favoritas', action: () => navigate('/foods') },
                    { icon: '✨', title: 'Crear Nuevo', subtitle: 'Menú', action: () => setShowAddDialog(true) }
                  ].map((item, index) => (
                    <Grid item xs={6} md={3} key={index}>
                      <Paper sx={{
                        p: 2, backgroundColor: '#E8E8E8', textAlign: 'center', borderRadius: '20px', cursor: 'pointer',
                        border: 'none', aspectRatio: '1/1', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        boxShadow: '8px 8px 16px #D1D1D1, -8px -8px 16px #FFFFFF', transition: 'all 0.2s ease',
                        '&:hover': { boxShadow: 'inset 4px 4px 8px #D1D1D1, inset -4px -4px 8px #FFFFFF', transform: 'scale(0.98)' }
                      }}
                      onClick={item.action}
                      >
                        <Box sx={{
                          width: 45, height: 45, backgroundColor: '#E8E8E8', borderRadius: '12px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto',
                          boxShadow: 'inset 2px 2px 4px #D1D1D1, inset -2px -2px 4px #FFFFFF'
                        }}>
                          <Typography sx={{ color: '#5A7A52', fontSize: '1.3rem' }}>
                            {item.icon}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#5A7A52', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.2 }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ color: '#8A9A82', fontSize: '0.8rem', mt: 0.5, fontWeight: 400 }}>
                          {item.subtitle}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Weekly Menu Section */}
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ color: '#2c2c2c', fontSize: '0.9rem', mb: 3 }}>📅 MENÚ DE LA SEMANA</Typography>
                <Grid container spacing={2}>
                  {weekDays.map((day, index) => (
                    <Grid item xs={12} md={1.7} key={day}>
                      <Paper sx={{
                        p: 2, backgroundColor: '#E8E8E8', borderRadius: '20px', cursor: 'pointer',
                        border: 'none', minHeight: '180px', display: 'flex', flexDirection: 'column',
                        boxShadow: '8px 8px 16px #D1D1D1, -8px -8px 16px #FFFFFF', transition: 'all 0.2s ease',
                        '&:hover': { boxShadow: 'inset 4px 4px 8px #D1D1D1, inset -4px -4px 8px #FFFFFF', transform: 'scale(0.98)' }
                      }}>
                        <Typography sx={{ 
                          color: '#5A7A52', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', 
                          textAlign: 'center', mb: 2, borderBottom: '1px solid #D1D1D1', pb: 1 
                        }}>
                          {day.substring(0, 3)}
                        </Typography>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{
                            backgroundColor: '#ffffff', borderRadius: '8px', p: 1,
                            boxShadow: 'inset 1px 1px 2px #D1D1D1, inset -1px -1px 2px #FFFFFF'
                          }}>
                            <Typography sx={{ color: '#8A9A82', fontSize: '0.6rem', textTransform: 'uppercase', mb: 0.5 }}>
                              Desayuno
                            </Typography>
                            <Typography sx={{ color: '#2c2c2c', fontSize: '0.65rem', fontWeight: 500, lineHeight: 1.2 }}>
                              {weeklyMeals[day]?.breakfast}
                            </Typography>
                          </Box>
                          <Box sx={{
                            backgroundColor: '#ffffff', borderRadius: '8px', p: 1,
                            boxShadow: 'inset 1px 1px 2px #D1D1D1, inset -1px -1px 2px #FFFFFF'
                          }}>
                            <Typography sx={{ color: '#8A9A82', fontSize: '0.6rem', textTransform: 'uppercase', mb: 0.5 }}>
                              Almuerzo
                            </Typography>
                            <Typography sx={{ color: '#2c2c2c', fontSize: '0.65rem', fontWeight: 500, lineHeight: 1.2 }}>
                              {weeklyMeals[day]?.lunch}
                            </Typography>
                          </Box>
                          <Box sx={{
                            backgroundColor: '#ffffff', borderRadius: '8px', p: 1,
                            boxShadow: 'inset 1px 1px 2px #D1D1D1, inset -1px -1px 2px #FFFFFF'
                          }}>
                            <Typography sx={{ color: '#8A9A82', fontSize: '0.6rem', textTransform: 'uppercase', mb: 0.5 }}>
                              Cena
                            </Typography>
                            <Typography sx={{ color: '#2c2c2c', fontSize: '0.65rem', fontWeight: 500, lineHeight: 1.2 }}>
                              {weeklyMeals[day]?.dinner}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Flavor Files */}
              <Paper sx={{ p: 3, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#2c2c2c', fontSize: '0.9rem' }}>🥄 FLAVOR FILES</Typography>
                  <Button
                    onClick={handleAddFood}
                    startIcon={<Add />}
                    sx={{
                      backgroundColor: '#C8DDB5', color: '#2c2c2c', fontSize: '0.7rem', textTransform: 'lowercase',
                      px: 2, py: 0.5, minWidth: 'auto', '&:hover': { backgroundColor: '#A8C895' }
                    }}
                  >
                    add new
                  </Button>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  overflowX: 'auto', 
                  pb: 1,
                  '&::-webkit-scrollbar': {
                    height: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                    borderRadius: '3px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#C8DDB5',
                    borderRadius: '3px',
                  }
                }}>
                  {allRecipes.slice(0, 10).map((recipe, index) => (
                    <Card 
                      key={index} 
                      sx={{ 
                        cursor: 'pointer', 
                        minWidth: '150px',
                        maxWidth: '150px',
                        flexShrink: 0,
                        transition: 'transform 0.2s ease',
                        '&:hover': { transform: 'scale(1.02)' }
                      }} 
                      onClick={() => navigate('/foods')}
                    >
                      <CardMedia component="img" height="100" image={recipe.image} alt={recipe.name} />
                      <CardContent sx={{ p: 1 }}>
                        <Typography sx={{ fontSize: '0.7rem', textAlign: 'center', color: '#2c2c2c' }}>
                          🥄 {recipe.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Add Food Dialog */}
      <Dialog open={showAddDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f6f0', color: '#2c2c2c' }}>
          <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>🥄 Add New Flavor</Typography>
          <IconButton onClick={handleCloseDialog}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, backgroundColor: '#f8f6f0' }}>
          <TextField
            autoFocus fullWidth label="Food name" value={newFood.name}
            onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }} placeholder="e.g. homemade pasta"
          />
          <TextField
            fullWidth label="Description (optional)" multiline rows={2} value={newFood.description}
            onChange={(e) => setNewFood(prev => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }} placeholder="Brief description of your dish..."
          />
          <TextField
            fullWidth label="Image URL (optional)" value={newFood.image}
            onChange={(e) => setNewFood(prev => ({ ...prev, image: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: '#f8f6f0' }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#666', textTransform: 'lowercase' }}>cancel</Button>
          <Button
            onClick={handleSaveFood} variant="contained"
            sx={{ backgroundColor: '#C8DDB5', color: '#2c2c2c', textTransform: 'lowercase', '&:hover': { backgroundColor: '#A8C895' } }}
          >
            add flavor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HomePage;