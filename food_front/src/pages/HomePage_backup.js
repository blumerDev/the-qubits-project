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
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    image: ''
  });

  // Mock data for the meal prep layout
  const currentDate = new Date();
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const sampleRecipes = [
    { name: 'paleo pancakes', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop' },
    { name: 'chia seed pudding', image: 'https://images.unsplash.com/photo-1511909525232-61113c912358?w=300&h=200&fit=crop' },
    { name: 'sweet potato hash', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&h=200&fit=crop' },
    { name: 'stuffed peppers', image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=300&h=200&fit=crop' },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarItems = [
    { icon: <Home />, label: 'Home', action: () => navigate('/') },
    { icon: <Restaurant />, label: 'Foods', action: () => navigate('/foods') },
    { icon: <Favorite />, label: 'Favorites', action: () => {} },
    { icon: <Person />, label: 'Profile', action: () => {} },
    { icon: <Settings />, label: 'Settings', action: () => {} },
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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f6f0', position: 'relative' }}>
      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : '-280px',
          width: '280px',
          height: '100vh',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
          transition: 'left 0.3s ease',
          zIndex: 1300,
          boxShadow: sidebarOpen ? '10px 0 30px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#2c2c2c', fontWeight: 600 }}>Menu</Typography>
            <IconButton onClick={toggleSidebar} size="small"><Close /></IconButton>
          </Box>
        </Box>
        <Box sx={{ py: 2 }}>
          {sidebarItems.map((item, index) => (
            <Box
              key={index}
              onClick={item.action}
              sx={{
                display: 'flex', alignItems: 'center', px: 3, py: 2, cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { backgroundColor: '#f8f6f0', borderRight: '3px solid #C8DDB5' }
              }}
            >
              <Box sx={{ color: '#5A7A52', mr: 2 }}>{item.icon}</Box>
              <Typography sx={{ color: '#2c2c2c', fontSize: '0.95rem' }}>{item.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Overlay */}
      {sidebarOpen && (
        <Box
          sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1200 }}
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton
                onClick={toggleSidebar}
                sx={{
                  mr: 2, backgroundColor: '#E8E8E8', borderRadius: '12px',
                  boxShadow: '4px 4px 8px #D1D1D1, -4px -4px 8px #FFFFFF',
                  '&:hover': { boxShadow: 'inset 2px 2px 4px #D1D1D1, inset -2px -2px 4px #FFFFFF' }
                }}
              >
                <Menu sx={{ color: '#5A7A52' }} />
              </IconButton>
              <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 300, color: '#2c2c2c', fontFamily: 'Georgia, serif' }}>
                weekly meal prep ✧˖°
              </Typography>
            </Box>
            <Typography sx={{ fontStyle: 'italic', color: '#666', fontSize: '1rem', ml: 7 }}>
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

            {/* Right Column - Flavor Files */}
            <Grid item xs={12} md={9}>
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
                <Grid container spacing={2}>
                  {allRecipes.slice(0, 10).map((recipe, index) => (
                    <Grid item xs={6} md={2.4} key={index}>
                      <Card sx={{ cursor: 'pointer' }} onClick={() => navigate('/foods')}>
                        <CardMedia component="img" height="120" image={recipe.image} alt={recipe.name} />
                        <CardContent sx={{ p: 1 }}>
                          <Typography sx={{ fontSize: '0.7rem', textAlign: 'center', color: '#2c2c2c' }}>
                            🥄 {recipe.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
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