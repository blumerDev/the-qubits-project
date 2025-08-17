import { Food, FOOD_CATEGORIES, FOOD_TAGS } from '../models/Food';
import { WeeklyMenu } from '../models/WeeklyMenu';

// Mock food data
export const mockFoods = [
  new Food({
    id: '1',
    name: 'Mediterranean Salad',
    description: 'Fresh salad with tomatoes, cucumbers, olives and feta cheese',
    category: FOOD_CATEGORIES.LUNCH,
    ingredients: ['lettuce', 'tomato', 'cucumber', 'olives', 'feta cheese', 'olive oil'],
    nutritionalInfo: { calories: 250, protein: 8, carbs: 12, fat: 18 },
    preparationTime: 15,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.VEGETARIAN, FOOD_TAGS.HEALTHY, FOOD_TAGS.QUICK],
    servings: 2,
    rating: 4.5
  }),
  
  new Food({
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh salmon with herbs and lemon, served with vegetables',
    category: FOOD_CATEGORIES.DINNER,
    ingredients: ['salmon', 'lemon', 'fine herbs', 'broccoli', 'carrots'],
    nutritionalInfo: { calories: 420, protein: 35, carbs: 8, fat: 25 },
    preparationTime: 25,
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.HIGH_PROTEIN, FOOD_TAGS.HEALTHY],
    servings: 1,
    rating: 4.8
  }),

  new Food({
    id: '3',
    name: 'Oatmeal with Fruits',
    description: 'Creamy oatmeal with fresh fruits and nuts',
    category: FOOD_CATEGORIES.BREAKFAST,
    ingredients: ['oatmeal', 'almond milk', 'banana', 'blueberries', 'walnuts', 'honey'],
    nutritionalInfo: { calories: 320, protein: 12, carbs: 45, fat: 8 },
    preparationTime: 10,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.VEGETARIAN, FOOD_TAGS.HEALTHY, FOOD_TAGS.QUICK],
    servings: 1,
    rating: 4.3
  }),

  new Food({
    id: '4',
    name: 'Chicken Curry',
    description: 'Tender chicken in curry sauce with basmati rice',
    category: FOOD_CATEGORIES.DINNER,
    ingredients: ['chicken breast', 'curry', 'coconut milk', 'basmati rice', 'onion', 'garlic'],
    nutritionalInfo: { calories: 480, protein: 32, carbs: 38, fat: 18 },
    preparationTime: 40,
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.SPICY, FOOD_TAGS.COMFORT],
    servings: 2,
    rating: 4.6
  }),

  new Food({
    id: '5',
    name: 'Green Smoothie',
    description: 'Nutritious smoothie with spinach, mango and pineapple',
    category: FOOD_CATEGORIES.BEVERAGE,
    ingredients: ['spinach', 'mango', 'pineapple', 'banana', 'coconut water'],
    nutritionalInfo: { calories: 180, protein: 4, carbs: 42, fat: 1 },
    preparationTime: 5,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.VEGAN, FOOD_TAGS.HEALTHY, FOOD_TAGS.QUICK],
    servings: 1,
    rating: 4.4
  }),

  new Food({
    id: '6',
    name: 'Pasta Primavera',
    description: 'Pasta with fresh seasonal vegetables',
    category: FOOD_CATEGORIES.LUNCH,
    ingredients: ['pasta', 'zucchini', 'cherry tomatoes', 'bell peppers', 'basil', 'olive oil'],
    nutritionalInfo: { calories: 380, protein: 14, carbs: 58, fat: 12 },
    preparationTime: 20,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.VEGETARIAN, FOOD_TAGS.COMFORT],
    servings: 2,
    rating: 4.2
  }),

  new Food({
    id: '7',
    name: 'Yogurt with Granola',
    description: 'Greek yogurt with homemade granola and berries',
    category: FOOD_CATEGORIES.SNACK,
    ingredients: ['greek yogurt', 'granola', 'blueberries', 'raspberries', 'honey'],
    nutritionalInfo: { calories: 280, protein: 15, carbs: 32, fat: 8 },
    preparationTime: 5,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.VEGETARIAN, FOOD_TAGS.HIGH_PROTEIN, FOOD_TAGS.QUICK],
    servings: 1,
    rating: 4.7
  }),

  new Food({
    id: '8',
    name: 'Fish Tacos',
    description: 'Tacos with grilled fish and mango salsa',
    category: FOOD_CATEGORIES.LUNCH,
    ingredients: ['white fish', 'tortillas', 'cabbage', 'mango', 'cilantro', 'lime'],
    nutritionalInfo: { calories: 350, protein: 28, carbs: 35, fat: 12 },
    preparationTime: 25,
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.HIGH_PROTEIN, FOOD_TAGS.SPICY],
    servings: 2,
    rating: 4.5
  })
];

// Sample weekly menu
export const mockWeeklyMenu = new WeeklyMenu({
  id: 'week-1',
  weekStartDate: new Date('2024-01-15'),
  name: 'Healthy January Menu',
  description: 'Balanced menu focused on nutritious and fresh meals',
  meals: {
    monday: {
      breakfast: '3', // Oatmeal with Fruits
      lunch: '1', // Mediterranean Salad
      dinner: '2', // Grilled Salmon
      snack: '7' // Yogurt with Granola
    },
    tuesday: {
      breakfast: '3',
      lunch: '6', // Pasta Primavera
      dinner: '4', // Chicken Curry
      beverage: '5' // Green Smoothie
    },
    wednesday: {
      breakfast: '7',
      lunch: '8', // Fish Tacos
      dinner: '2',
      snack: '5'
    },
    thursday: {
      breakfast: '3',
      lunch: '1',
      dinner: '4'
    },
    friday: {
      breakfast: '7',
      lunch: '6',
      dinner: '2'
    },
    saturday: {
      breakfast: '3',
      lunch: '8',
      dinner: '4'
    },
    sunday: {
      breakfast: '7',
      lunch: '1',
      dinner: '2'
    }
  },
  isActive: true
});

// Function to get suggestions based on preferences
export const getSuggestions = (preferences = {}) => {
  const { 
    category, 
    tags = [], 
    maxPreparationTime, 
    difficulty,
    excludeIngredients = []
  } = preferences;

  return mockFoods.filter(food => {
    // Filter by category
    if (category && food.category !== category) return false;
    
    // Filter by tags
    if (tags.length > 0 && !tags.some(tag => food.tags.includes(tag))) return false;
    
    // Filter by preparation time
    if (maxPreparationTime && food.preparationTime > maxPreparationTime) return false;
    
    // Filter by difficulty
    if (difficulty && food.difficulty !== difficulty) return false;
    
    // Exclude unwanted ingredients
    if (excludeIngredients.length > 0) {
      const hasExcludedIngredient = excludeIngredients.some(ingredient => 
        food.ingredients.some(foodIngredient => 
          foodIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      if (hasExcludedIngredient) return false;
    }
    
    return true;
  });
};

// Function to generate automatic menu
export const generateWeeklyMenu = (preferences = {}) => {
  const breakfasts = getSuggestions({ ...preferences, category: FOOD_CATEGORIES.BREAKFAST });
  const lunches = getSuggestions({ ...preferences, category: FOOD_CATEGORIES.LUNCH });
  const dinners = getSuggestions({ ...preferences, category: FOOD_CATEGORIES.DINNER });
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const meals = {};
  
  days.forEach((day, index) => {
    meals[day] = {
      breakfast: breakfasts[index % breakfasts.length]?.id || null,
      lunch: lunches[index % lunches.length]?.id || null,
      dinner: dinners[index % dinners.length]?.id || null
    };
  });
  
  return new WeeklyMenu({
    id: `generated-${Date.now()}`,
    weekStartDate: new Date(),
    name: 'Automatically Generated Menu',
    description: 'Menu created based on your preferences',
    meals
  });
};