export type RecipeType = 'doce' | 'salgado' | 'agridoce';

export type Receita = {
  id: string;
  nome: string;
  categoria: string;
  imagem: string;
  ingredientes: string[];
  modoPreparo: string[];
  tipo?: RecipeType | string;
};

export type ApiReceita = {
  id?: number | string | null;
  receita?: string | null;
  ingredientes?: string | null;
  modo_preparo?: string | null;
  link_imagem?: string | null;
  tipo?: RecipeType | string | null;
  created_at?: string | null;
  IngredientesBase?: Array<{
    id?: number | string | null;
    nomesIngrediente?: string[] | null;
    receita_id?: number | string | null;
  }> | null;
};

export type PaginatedRecipesResponse = {
  data?: ApiReceita[];
  items?: ApiReceita[];
  meta?: {
    page?: number;
    limit?: number;
    itemCount?: number;
    pageCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
  };
  links?: Record<string, string>;
};
