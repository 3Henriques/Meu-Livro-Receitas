import type { ApiReceita, PaginatedRecipesResponse, Receita } from '../types/meal';

export const RECIPE_PLACEHOLDER_IMAGE =
  'https://placehold.co/600x400/f8e7db/8c3d1c.png?text=Meu+Livro+de+Receitas';

function toText(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function splitIngredients(value: unknown) {
  const text = toText(value);

  if (!text) {
    return [];
  }

  return text
    .split(/,|;|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitPreparationSteps(value: unknown) {
  const text = toText(value);

  if (!text) {
    return [];
  }

  return text
    .replace(/\s+/g, ' ')
    .split(/(?:^|\s)\d+\.\s*/)
    .map((step) => step.trim())
    .filter(Boolean);
}

function formatCategory(tipo: unknown) {
  const text = toText(tipo, 'Receita');

  if (!text) {
    return 'Receita';
  }

  return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
}

export function extractRecipesFromResponse(response: ApiReceita[] | PaginatedRecipesResponse): ApiReceita[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.items)) {
    return response.items;
  }

  return [];
}

export function mapApiReceitaToReceita(apiRecipe: ApiReceita): Receita {
  const id = apiRecipe.id == null ? '' : String(apiRecipe.id);
  const tipo = toText(apiRecipe.tipo);
  const ingredientes = splitIngredients(apiRecipe.ingredientes);

  return {
    id,
    nome: toText(apiRecipe.receita, 'Receita sem nome'),
    categoria: formatCategory(tipo),
    imagem: toText(apiRecipe.link_imagem, RECIPE_PLACEHOLDER_IMAGE),
    ingredientes,
    modoPreparo: splitPreparationSteps(apiRecipe.modo_preparo),
    tipo: tipo || undefined,
  };
}
