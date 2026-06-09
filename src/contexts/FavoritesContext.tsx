import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react';
import type { Receita } from '../types/meal';

type FavoriteRecipe = Receita;

type FavoritesState = {
  favorites: FavoriteRecipe[];
};

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: FavoriteRecipe }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'CLEAR_FAVORITES' };

type FavoritesContextValue = {
  favorites: FavoriteRecipe[];
  addFavorite: (recipe: FavoriteRecipe) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const initialState: FavoritesState = {
  favorites: [],
};

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const alreadyExists = state.favorites.some((recipe) => recipe.id === action.payload.id);

      if (alreadyExists) {
        return state;
      }

      return {
        favorites: [...state.favorites, action.payload],
      };
    }
    case 'REMOVE_FAVORITE':
      return {
        favorites: state.favorites.filter((recipe) => recipe.id !== action.payload),
      };
    case 'CLEAR_FAVORITES':
      return initialState;
    default:
      return state;
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addFavorite = useCallback((recipe: FavoriteRecipe) => {
    dispatch({ type: 'ADD_FAVORITE', payload: recipe });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
  }, []);

  const clearFavorites = useCallback(() => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  }, []);

  const isFavorite = useCallback(
    (id: string) => state.favorites.some((recipe) => recipe.id === id),
    [state.favorites],
  );

  const value = useMemo(
    () => ({
      favorites: state.favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      clearFavorites,
    }),
    [addFavorite, clearFavorites, isFavorite, removeFavorite, state.favorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider.');
  }

  return context;
}
