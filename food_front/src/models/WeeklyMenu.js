import { FOOD_CATEGORIES } from './Food';

// Modelo para el menú semanal
export class WeeklyMenu {
  constructor({
    id,
    weekStartDate,
    name = '',
    description = '',
    meals = {},
    createdAt = new Date(),
    isActive = false
  }) {
    this.id = id;
    this.weekStartDate = new Date(weekStartDate);
    this.name = name;
    this.description = description;
    this.meals = this.initializeMeals(meals);
    this.createdAt = createdAt;
    this.isActive = isActive;
  }

  initializeMeals(meals = {}) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const categories = Object.values(FOOD_CATEGORIES);
    
    const initializedMeals = {};
    
    days.forEach(day => {
      initializedMeals[day] = {};
      categories.forEach(category => {
        initializedMeals[day][category] = meals[day]?.[category] || null;
      });
    });
    
    return initializedMeals;
  }

  // Agregar comida a un día específico
  addMeal(day, category, foodId) {
    if (this.meals[day] && Object.values(FOOD_CATEGORIES).includes(category)) {
      this.meals[day][category] = foodId;
    }
  }

  // Remover comida de un día específico
  removeMeal(day, category) {
    if (this.meals[day] && this.meals[day][category]) {
      this.meals[day][category] = null;
    }
  }

  // Obtener todas las comidas de un día
  getDayMeals(day) {
    return this.meals[day] || {};
  }

  // Obtener todas las comidas de la semana
  getAllMeals() {
    const allMeals = [];
    Object.values(this.meals).forEach(dayMeals => {
      Object.values(dayMeals).forEach(mealId => {
        if (mealId && !allMeals.includes(mealId)) {
          allMeals.push(mealId);
        }
      });
    });
    return allMeals;
  }

  // Verificar si el menú está completo
  isComplete() {
    const days = Object.keys(this.meals);
    return days.every(day => {
      const dayMeals = this.meals[day];
      return dayMeals.breakfast && dayMeals.lunch && dayMeals.dinner;
    });
  }

  // Obtener estadísticas del menú
  getStats() {
    const totalMeals = this.getAllMeals().length;
    const completeDays = Object.keys(this.meals).filter(day => {
      const dayMeals = this.meals[day];
      return dayMeals.breakfast && dayMeals.lunch && dayMeals.dinner;
    }).length;

    return {
      totalMeals,
      completeDays,
      completionPercentage: (completeDays / 7) * 100
    };
  }
}

// Días de la semana
export const DAYS_OF_WEEK = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday'
};

export const DAY_LABELS = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo'
};