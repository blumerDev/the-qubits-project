import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockFoods, mockWeeklyMenu, getSuggestions, generateWeeklyMenu } from '../data/mockData';

// Estado inicial
const initialState = {
  foods: mockFoods,
  weeklyMenus: [mockWeeklyMenu],
  currentWeeklyMenu: mockWeeklyMenu,
  suggestions: [],
  filters: {
    category: '',
    tags: [],
    maxPreparationTime: null,
    difficulty: '',
    excludeIngredients: []
  },
  searchQuery: '',
  loading: false,
  error: null
};

// Tipos de acciones
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_FOOD: 'ADD_FOOD',
  UPDATE_FOOD: 'UPDATE_FOOD',
  DELETE_FOOD: 'DELETE_FOOD',
  SET_CURRENT_WEEKLY_MENU: 'SET_CURRENT_WEEKLY_MENU',
  UPDATE_WEEKLY_MENU: 'UPDATE_WEEKLY_MENU',
  ADD_WEEKLY_MENU: 'ADD_WEEKLY_MENU',
  SET_SUGGESTIONS: 'SET_SUGGESTIONS',
  SET_FILTERS: 'SET_FILTERS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  CLEAR_FILTERS: 'CLEAR_FILTERS'
};

// Reducer
function foodReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.ADD_FOOD:
      return { 
        ...state, 
        foods: [...state.foods, action.payload] 
      };
    
    case ACTIONS.UPDATE_FOOD:
      return {
        ...state,
        foods: state.foods.map(food => 
          food.id === action.payload.id ? action.payload : food
        )
      };
    
    case ACTIONS.DELETE_FOOD:
      return {
        ...state,
        foods: state.foods.filter(food => food.id !== action.payload)
      };
    
    case ACTIONS.SET_CURRENT_WEEKLY_MENU:
      return { ...state, currentWeeklyMenu: action.payload };
    
    case ACTIONS.UPDATE_WEEKLY_MENU:
      return {
        ...state,
        currentWeeklyMenu: action.payload,
        weeklyMenus: state.weeklyMenus.map(menu =>
          menu.id === action.payload.id ? action.payload : menu
        )
      };
    
    case ACTIONS.ADD_WEEKLY_MENU:
      return {
        ...state,
        weeklyMenus: [...state.weeklyMenus, action.payload]
      };
    
    case ACTIONS.SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    
    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case ACTIONS.CLEAR_FILTERS:
      return { 
        ...state, 
        filters: initialState.filters,
        searchQuery: '',
        suggestions: []
      };
    
    default:
      return state;
  }
}

// Contexto
const FoodContext = createContext();

// Hook personalizado para usar el contexto
export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood debe ser usado dentro de un FoodProvider');
  }
  return context;
};

// Provider
export const FoodProvider = ({ children }) => {
  const [state, dispatch] = useReducer(foodReducer, initialState);

  // Acciones
  const actions = {
    // Loading y errores
    setLoading: (loading) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
    },

    // Gestión de comidas
    addFood: (food) => {
      dispatch({ type: ACTIONS.ADD_FOOD, payload: food });
    },

    updateFood: (food) => {
      dispatch({ type: ACTIONS.UPDATE_FOOD, payload: food });
    },

    deleteFood: (foodId) => {
      dispatch({ type: ACTIONS.DELETE_FOOD, payload: foodId });
    },

    // Gestión de menús semanales
    setCurrentWeeklyMenu: (menu) => {
      dispatch({ type: ACTIONS.SET_CURRENT_WEEKLY_MENU, payload: menu });
    },

    updateWeeklyMenu: (menu) => {
      dispatch({ type: ACTIONS.UPDATE_WEEKLY_MENU, payload: menu });
    },

    addWeeklyMenu: (menu) => {
      dispatch({ type: ACTIONS.ADD_WEEKLY_MENU, payload: menu });
    },

    // Búsqueda y filtros
    setSearchQuery: (query) => {
      dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
    },

    setFilters: (filters) => {
      dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
    },

    clearFilters: () => {
      dispatch({ type: ACTIONS.CLEAR_FILTERS });
    },

    // Sugerencias
    generateSuggestions: (preferences = {}) => {
      const suggestions = getSuggestions(preferences);
      dispatch({ type: ACTIONS.SET_SUGGESTIONS, payload: suggestions });
      return suggestions;
    },

    // Generar menú automático
    generateAutoMenu: (preferences = {}) => {
      try {
        actions.setLoading(true);
        const newMenu = generateWeeklyMenu(preferences);
        actions.addWeeklyMenu(newMenu);
        actions.setCurrentWeeklyMenu(newMenu);
        return newMenu;
      } catch (error) {
        actions.setError('Error al generar el menú automático');
        throw error;
      } finally {
        actions.setLoading(false);
      }
    },

    // Obtener comida por ID
    getFoodById: (id) => {
      return state.foods.find(food => food.id === id);
    },

    // Filtrar comidas
    getFilteredFoods: () => {
      let filtered = state.foods;

      // Filtro por búsqueda
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(food =>
          food.name.toLowerCase().includes(query) ||
          food.description.toLowerCase().includes(query) ||
          food.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(query)
          )
        );
      }

      // Aplicar filtros adicionales
      filtered = getSuggestions({
        ...state.filters,
        foods: filtered
      });

      return filtered;
    },

    // Obtener estadísticas
    getStats: () => {
      const totalFoods = state.foods.length;
      const categories = {};
      const tags = {};

      state.foods.forEach(food => {
        // Contar por categorías
        categories[food.category] = (categories[food.category] || 0) + 1;
        
        // Contar por tags
        food.tags.forEach(tag => {
          tags[tag] = (tags[tag] || 0) + 1;
        });
      });

      const menuStats = state.currentWeeklyMenu ? state.currentWeeklyMenu.getStats() : null;

      return {
        totalFoods,
        categories,
        tags,
        weeklyMenu: menuStats,
        totalMenus: state.weeklyMenus.length
      };
    }
  };

  // Efecto para generar sugerencias cuando cambian los filtros
  useEffect(() => {
    if (Object.values(state.filters).some(filter => 
      Array.isArray(filter) ? filter.length > 0 : filter
    )) {
      actions.generateSuggestions(state.filters);
    }
  }, [state.filters]);

  const value = {
    ...state,
    ...actions
  };

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContext;