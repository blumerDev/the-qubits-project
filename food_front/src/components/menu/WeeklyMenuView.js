import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  ExpandMore,
  AutoAwesome,
  RestaurantMenu,
  Schedule
} from '@mui/icons-material';
import { useFood } from '../../context/FoodContext';
import FoodCard from '../food/FoodCard';
import FoodList from '../food/FoodList';
import { DAY_LABELS, DAYS_OF_WEEK } from '../../models/WeeklyMenu';
import { FOOD_CATEGORIES } from '../../models/Food';

function WeeklyMenuView({ weeklyMenu, onSave, readOnly = false }) {
  const { 
    foods, 
    getFoodById, 
    generateSuggestions, 
    generateAutoMenu,
    updateWeeklyMenu 
  } = useFood();
  
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFoodDialog, setShowFoodDialog] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(weeklyMenu);
  const [suggestions, setSuggestions] = useState([]);

  const handleMealClick = (day, category) => {
    if (readOnly) return;
    
    setSelectedDay(day);
    setSelectedCategory(category);
    
    // Generate suggestions for this category
    const daysSuggestions = generateSuggestions({ category });
    setSuggestions(daysSuggestions);
    setShowFoodDialog(true);
  };

  const handleFoodSelect = (food) => {
    if (!selectedDay || !selectedCategory) return;
    
    const updatedMenu = { ...currentMenu };
    updatedMenu.addMeal(selectedDay, selectedCategory, food.id);
    
    setCurrentMenu(updatedMenu);
    setShowFoodDialog(false);
    
    if (onSave) {
      onSave(updatedMenu);
    }
  };

  const handleRemoveMeal = (day, category, event) => {
    event.stopPropagation();
    
    const updatedMenu = { ...currentMenu };
    updatedMenu.removeMeal(day, category);
    
    setCurrentMenu(updatedMenu);
    
    if (onSave) {
      onSave(updatedMenu);
    }
  };

  const handleAutoGenerate = () => {
    if (window.confirm('Generate complete menu automatically? This will replace existing meals.')) {
      const newMenu = generateAutoMenu();
      setCurrentMenu(newMenu);
      
      if (onSave) {
        onSave(newMenu);
      }
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

  const getCategoryColor = (category) => {
    const colors = {
      breakfast: '#FF9800',
      lunch: '#4CAF50',
      dinner: '#3F51B5',
      snack: '#E91E63',
      dessert: '#9C27B0',
      beverage: '#00BCD4'
    };
    return colors[category] || '#7FB069';
  };

  const stats = currentMenu.getStats();

  return (
    <Box>
      {/* Header with statistics */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: '#F8FDF6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ color: '#2F4F2F', fontWeight: 600 }}>
            {currentMenu.name || 'Weekly Menu'}
          </Typography>
          
          {!readOnly && (
            <Button
              variant="contained"
              startIcon={<AutoAwesome />}
              onClick={handleAutoGenerate}
              sx={{
                backgroundColor: '#7FB069',
                '&:hover': { backgroundColor: '#5C8A4A' }
              }}
            >
              Generate Automatic
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#7FB069', fontWeight: 700 }}>
                {stats.totalMeals}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7A8471' }}>
                Assigned Meals
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#7FB069', fontWeight: 700 }}>
                {stats.completeDays}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7A8471' }}>
                Complete Days
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#7FB069', fontWeight: 700 }}>
                {Math.round(stats.completionPercentage)}%
              </Typography>
              <Typography variant="body2" sx={{ color: '#7A8471' }}>
                Progress
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#7FB069', fontWeight: 700 }}>
                21
              </Typography>
              <Typography variant="body2" sx={{ color: '#7A8471' }}>
                Target Meals
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Weekly menu */}
      <Grid container spacing={2}>
        {Object.keys(DAY_LABELS).map((day) => {
          const dayMeals = currentMenu.getDayMeals(day);
          const isComplete = dayMeals.breakfast && dayMeals.lunch && dayMeals.dinner;
          
          return (
            <Grid item xs={12} key={day}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ color: '#2F4F2F', fontWeight: 600 }}>
                      {DAY_LABELS[day]}
                    </Typography>
                    
                    <Chip
                      label={isComplete ? 'Complete' : 'Pending'}
                      size="small"
                      color={isComplete ? 'success' : 'default'}
                      sx={{
                        backgroundColor: isComplete ? '#7FB069' : '#E0E0E0',
                        color: isComplete ? 'white' : '#666'
                      }}
                    />
                    
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                      {Object.values(FOOD_CATEGORIES).slice(0, 3).map((category) => {
                        const mealId = dayMeals[category];
                        return (
                          <Box
                            key={category}
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: mealId ? getCategoryColor(category) : '#E0E0E0'
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {Object.values(FOOD_CATEGORIES).slice(0, 3).map((category) => {
                      const mealId = dayMeals[category];
                      const food = mealId ? getFoodById(mealId) : null;
                      
                      return (
                        <Grid item xs={12} md={4} key={category}>
                          <Card
                            sx={{
                              minHeight: 200,
                              cursor: readOnly ? 'default' : 'pointer',
                              border: `2px solid ${getCategoryColor(category)}20`,
                              '&:hover': {
                                borderColor: readOnly ? 'inherit' : getCategoryColor(category),
                                transform: readOnly ? 'none' : 'translateY(-2px)',
                              },
                              transition: 'all 0.3s ease'
                            }}
                            onClick={() => handleMealClick(day, category)}
                          >
                            <CardContent sx={{ p: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Chip
                                  label={getCategoryLabel(category)}
                                  size="small"
                                  sx={{
                                    backgroundColor: getCategoryColor(category),
                                    color: 'white',
                                    fontWeight: 600
                                  }}
                                />
                                
                                {food && !readOnly && (
                                  <IconButton
                                    size="small"
                                    onClick={(e) => handleRemoveMeal(day, category, e)}
                                    sx={{ color: '#F44336' }}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                )}
                              </Box>
                              
                              {food ? (
                                <FoodCard food={food} compact />
                              ) : (
                                <Box sx={{ 
                                  display: 'flex', 
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minHeight: 120,
                                  color: '#7A8471',
                                  textAlign: 'center'
                                }}>
                                  <RestaurantMenu sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                                  <Typography variant="body2">
                                    {readOnly ? 'Unassigned' : 'Click to add'}
                                  </Typography>
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialog to select food */}
      <Dialog
        open={showFoodDialog}
        onClose={() => setShowFoodDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">
            Select {getCategoryLabel(selectedCategory)} for {selectedDay ? DAY_LABELS[selectedDay] : ''}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {suggestions.length > 0 ? (
            <Grid container spacing={2}>
              {suggestions.map((food) => (
                <Grid item xs={12} sm={6} md={4} key={food.id}>
                  <FoodCard
                    food={food}
                    onSelect={handleFoodSelect}
                    compact
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ py: 4, textAlign: 'center', color: '#7A8471' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                No suggestions available
              </Typography>
              <Typography variant="body2">
                No foods found for this category
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFoodDialog(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default WeeklyMenuView;