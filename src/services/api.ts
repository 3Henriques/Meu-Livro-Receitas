const BASE_URL = 'https://api-receitas-pi.vercel.app';

export async function getFromApiReceitas<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${path}`);

    if (!response.ok) {
      throw new Error('Nao foi possivel carregar os dados da API-Receitas.');
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Ocorreu um erro inesperado ao acessar a API-Receitas.');
  }
}
