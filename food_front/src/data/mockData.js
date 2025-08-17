import { Food, FOOD_CATEGORIES, FOOD_TAGS } from '../models/Food';
import { WeeklyMenu } from '../models/WeeklyMenu';

// Datos mock de comidas
export const mockFoods = [
  new Food({
    id: '1',
    name: 'Ensalada Mediterránea',
    description: 'Ensalada fresca con tomates, pepinos, aceitunas y queso feta',
    category: FOOD_CATEGORIES.LUNCH,
    ingredients: ['lechuga', 'tomate', 'pepino', 'aceitunas', 'queso feta', 'aceite de oliva'],
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
    name: 'Salmón a la Plancha',
    description: 'Salmón fresco con hierbas y limón, acompañado de vegetales',
    category: FOOD_CATEGORIES.DINNER,
    ingredients: ['salmón', 'limón', 'hierbas finas', 'brócoli', 'zanahorias'],
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
    name: 'Avena con Frutas',
    description: 'Avena cremosa con frutas frescas y nueces',
    category: FOOD_CATEGORIES.BREAKFAST,
    ingredients: ['avena', 'leche de almendras', 'plátano', 'arándanos', 'nueces', 'miel'],
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
    name: 'Pollo al Curry',
    description: 'Pollo tierno en salsa de curry con arroz basmati',
    category: FOOD_CATEGORIES.DINNER,
    ingredients: ['pechuga de pollo', 'curry', 'leche de coco', 'arroz basmati', 'cebolla', 'ajo'],
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
    name: 'Smoothie Verde',
    description: 'Batido nutritivo con espinacas, mango y piña',
    category: FOOD_CATEGORIES.BEVERAGE,
    ingredients: ['espinacas', 'mango', 'piña', 'plátano', 'agua de coco'],
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
    description: 'Pasta con vegetales frescos de temporada',
    category: FOOD_CATEGORIES.LUNCH,
    ingredients: ['pasta', 'calabacín', 'tomates cherry', 'pimientos', 'albahaca', 'aceite de oliva'],
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
    name: 'Yogur con Granola',
    description: 'Yogur griego con granola casera y frutas del bosque',
    category: FOOD_CATEGORIES.SNACK,
    ingredients: ['yogur griego', 'granola', 'arándanos', 'frambuesas', 'miel'],
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
    name: 'Tacos de Pescado',
    description: 'Tacos con pescado a la parrilla y salsa de mango',
    category: FOOD_CATEGORIES.LUNCH,
    ingredients: ['pescado blanco', 'tortillas', 'repollo', 'mango', 'cilantro', 'lima'],
    nutritionalInfo: { calories: 350, protein: 28, carbs: 35, fat: 12 },
    preparationTime: 25,
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=300&h=300&fit=crop',
    tags: [FOOD_TAGS.HIGH_PROTEIN, FOOD_TAGS.SPICY],
    servings: 2,
    rating: 4.5
  })
];

// Menú semanal de ejemplo
export const mockWeeklyMenu = new WeeklyMenu({
  id: 'week-1',
  weekStartDate: new Date('2024-01-15'),
  name: 'Menú Saludable Enero',
  description: 'Menú balanceado enfocado en comidas nutritivas y frescas',
  meals: {
    monday: {
      breakfast: '3', // Avena con Frutas
      lunch: '1', // Ensalada Mediterránea
      dinner: '2', // Salmón a la Plancha
      snack: '7' // Yogur con Granola
    },
    tuesday: {
      breakfast: '3',
      lunch: '6', // Pasta Primavera
      dinner: '4', // Pollo al Curry
      beverage: '5' // Smoothie Verde
    },
    wednesday: {
      breakfast: '7',
      lunch: '8', // Tacos de Pescado
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

// Función para obtener sugerencias basadas en preferencias
export const getSuggestions = (preferences = {}) => {
  const { 
    category, 
    tags = [], 
    maxPreparationTime, 
    difficulty,
    excludeIngredients = []
  } = preferences;

  return mockFoods.filter(food => {
    // Filtrar por categoría
    if (category && food.category !== category) return false;
    
    // Filtrar por tags
    if (tags.length > 0 && !tags.some(tag => food.tags.includes(tag))) return false;
    
    // Filtrar por tiempo de preparación
    if (maxPreparationTime && food.preparationTime > maxPreparationTime) return false;
    
    // Filtrar por dificultad
    if (difficulty && food.difficulty !== difficulty) return false;
    
    // Excluir ingredientes no deseados
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

// Función para generar menú automático
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
    name: 'Menú Generado Automáticamente',
    description: 'Menú creado basado en tus preferencias',
    meals
  });
};