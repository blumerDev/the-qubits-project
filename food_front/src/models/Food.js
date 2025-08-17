// Modelo de datos para una comida
export class Food {
  constructor({
    id,
    name,
    description,
    category,
    ingredients = [],
    nutritionalInfo = {},
    preparationTime = 0, // en minutos
    difficulty = 'medium', // easy, medium, hard
    image = '',
    tags = [],
    recipe = '',
    servings = 1,
    createdAt = new Date(),
    rating = 0,
    reviews = []
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.ingredients = ingredients;
    this.nutritionalInfo = nutritionalInfo;
    this.preparationTime = preparationTime;
    this.difficulty = difficulty;
    this.image = image;
    this.tags = tags;
    this.recipe = recipe;
    this.servings = servings;
    this.createdAt = createdAt;
    this.rating = rating;
    this.reviews = reviews;
  }

  // Métodos de utilidad
  isVegetarian() {
    return this.tags.includes('vegetarian');
  }

  isVegan() {
    return this.tags.includes('vegan');
  }

  getCalories() {
    return this.nutritionalInfo.calories || 0;
  }

  getDifficultyLevel() {
    const levels = { easy: 1, medium: 2, hard: 3 };
    return levels[this.difficulty] || 2;
  }
}

// Categorías de comidas
export const FOOD_CATEGORIES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack',
  DESSERT: 'dessert',
  BEVERAGE: 'beverage'
};

// Tags comunes
export const FOOD_TAGS = {
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  GLUTEN_FREE: 'gluten-free',
  DAIRY_FREE: 'dairy-free',
  LOW_CARB: 'low-carb',
  HIGH_PROTEIN: 'high-protein',
  QUICK: 'quick',
  HEALTHY: 'healthy',
  COMFORT: 'comfort',
  SPICY: 'spicy'
};