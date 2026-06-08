import { getFromApiReceitas } from './api';
import { extractRecipesFromResponse, mapApiReceitaToReceita } from '../utils/mealMapper';
import type { ApiReceita, PaginatedRecipesResponse, Receita, RecipeType } from '../types/meal';

function mapRecipeList(response: ApiReceita[] | PaginatedRecipesResponse): Receita[] {
  return extractRecipesFromResponse(response)
    .map(mapApiReceitaToReceita)
    .filter((recipe) => recipe.id);
}

async function getRecipesFallbackByType(limit: number) {
  const recipeTypes: RecipeType[] = ['doce', 'salgado', 'agridoce'];
  const lists = await Promise.all(
    recipeTypes.map((type) =>
      getFromApiReceitas<ApiReceita[]>(`/receitas/tipo/${type}`).catch(() => []),
    ),
  );

  return lists.flat().slice(0, limit);
}

export async function getRecipes(page = 1, limit = 10): Promise<Receita[]> {
  try {
    const data = await getFromApiReceitas<ApiReceita[] | PaginatedRecipesResponse>(
      `/receitas/todas?page=${page}&limit=${limit}`,
    );

    return mapRecipeList(data);
  } catch {
    const fallbackData = await getRecipesFallbackByType(limit);
    const recipes = mapRecipeList(fallbackData);

    if (recipes.length === 0) {
      throw new Error('Nao foi possivel carregar receitas agora.');
    }

    return recipes;
  }
}

export async function searchRecipes(term: string, page = 1, limit = 10): Promise<Receita[]> {
  const data = await getFromApiReceitas<ApiReceita[] | PaginatedRecipesResponse>(
    `/receitas/descricao?descricao=${encodeURIComponent(term)}&page=${page}&limit=${limit}`,
  );

  return mapRecipeList(data);
}

export async function getRecipeById(id: string | number): Promise<Receita | null> {
  const data = await getFromApiReceitas<ApiReceita>(`/receitas/${encodeURIComponent(String(id))}`);
  const recipe = mapApiReceitaToReceita(data);

  return recipe.id ? recipe : null;
}

export async function getRecipesByType(type: RecipeType): Promise<Receita[]> {
  const data = await getFromApiReceitas<ApiReceita[]>(`/receitas/tipo/${type}`);

  return mapRecipeList(data);
}
