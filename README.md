# Meu Livro de Receitas

Aplicativo mobile desenvolvido com React Native e Expo para a disciplina de Desenvolvimento Mobile / Engenharia de Software.

## Descricao

O Meu Livro de Receitas permite pesquisar receitas, visualizar detalhes completos e salvar receitas favoritas. O app consome dados reais da API-Receitas, uma API brasileira de receitas, e organiza a interface em telas simples para busca, detalhes e favoritos.

## Problema que o app resolve

Muitas pessoas querem consultar receitas rapidamente pelo celular e guardar ideias para cozinhar depois. Este app centraliza a busca e os favoritos em uma experiencia simples, adequada para uso cotidiano e para demonstrar os conceitos da disciplina.

## Publico-alvo

Pessoas que gostam de cozinhar, estudantes procurando ideias de refeicoes e usuarios que desejam encontrar receitas por nome de forma rapida.

## Funcionalidades

- Listar receitas brasileiras.
- Pesquisar receitas por nome ou descricao, como bolo, frango, arroz, chocolate e cenoura.
- Listar receitas retornadas pela API-Receitas.
- Abrir detalhes de uma receita selecionada.
- Exibir imagem, nome, tipo/categoria, ingredientes e modo de preparo.
- Adicionar e remover receitas dos favoritos.
- Visualizar todas as receitas favoritas.
- Remover receitas diretamente da tela de favoritos.
- Tratar carregamento, erro de API e lista vazia.

## API utilizada

API-Receitas: https://api-receitas-pi.vercel.app

Repositorio/documentacao: https://github.com/DenilsonRabelo/API-Receitas

Endpoints usados:

```text
GET https://api-receitas-pi.vercel.app/receitas/todas?page=1&limit=10
GET https://api-receitas-pi.vercel.app/receitas/descricao?descricao=bolo&page=1&limit=10
GET https://api-receitas-pi.vercel.app/receitas/1
GET https://api-receitas-pi.vercel.app/receitas/tipo/doce
```

Observacao: a rota `/receitas/todas` pode oscilar dependendo da disponibilidade da API hospedada. O service tenta essa rota primeiro e, caso ela falhe, usa uma alternativa com rotas publicas de tipo (`doce`, `salgado` e `agridoce`) para manter a listagem inicial funcionando.

## Adaptacao dos dados da API

A API-Receitas usa campos como `receita`, `modo_preparo` e `link_imagem`. As telas nao dependem diretamente desses nomes. O fluxo foi separado assim:

- `src/services/api.ts`: configura a URL base e o `fetch` com tratamento de erro.
- `src/utils/mealMapper.ts`: converte os dados crus da API-Receitas para o formato interno do app.
- `src/services/mealService.ts`: consome a API e retorna receitas ja mapeadas.
- `src/types/meal.ts`: define o contrato interno `Receita`.

Formato interno usado pelas telas:

```ts
export type Receita = {
  id: string;
  nome: string;
  categoria: string;
  imagem: string;
  ingredientes: string[];
  modoPreparo: string[];
  tipo?: string;
};
```

## Tecnologias utilizadas

- React Native
- Expo SDK 54
- TypeScript
- React Navigation
- Context API
- `useState`
- `useEffect`
- `useReducer`
- Fetch API

## Estrutura de pastas

```text
src/
  components/
    EmptyState.tsx
    ErrorMessage.tsx
    Loading.tsx
    RecipeCard.tsx
  contexts/
    FavoritesContext.tsx
  navigation/
    AppNavigator.tsx
  screens/
    FavoritesScreen.tsx
    HomeScreen.tsx
    RecipeDetailsScreen.tsx
  services/
    api.ts
    mealService.ts
  types/
    meal.ts
  utils/
    mealMapper.ts
App.tsx
README.md
```

## Como executar localmente

Instale as dependencias:

```bash
npm install
```

Inicie o projeto:

```bash
npx expo start
```

Depois, abra no Expo Go pelo QR Code ou execute em um emulador Android/iOS.

## Prints

Espaco reservado para prints da entrega:

- Home com busca de receitas.

<p align="center">
  <img width="287" alt="Home" src="https://github.com/user-attachments/assets/10df322e-f9cd-4b24-a1a1-9d485974403a" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="286" alt="Busca" src="https://github.com/user-attachments/assets/932da380-f7b9-4e8c-af70-3d58f5c42216" />
</p>

- Tela de detalhes da receita.

<p align="center">
  <img width="286" alt="Detalhes da receita" src="https://github.com/user-attachments/assets/107e4fd6-afaa-49a5-b194-3541d200850f" />
</p>

- Tela de favoritos.

<p align="center">
  <img width="282" alt="Favoritos" src="https://github.com/user-attachments/assets/2270bcc8-3329-4f3b-9667-c4453943bb89" />
</p>


## Checklist dos requisitos academicos

- [x] React Native com Expo.
- [x] Projeto em TypeScript.
- [x] React Navigation.
- [x] Stack Navigation entre lista e detalhes.
- [x] Bottom Tab Navigation entre Home e Favoritos.
- [x] Uso de `useState` para estados locais.
- [x] Uso de `useEffect` para chamadas da API.
- [x] Uso de `useReducer` para favoritos.
- [x] Uso de Context API para compartilhar favoritos.
- [x] Consumo da API-Receitas com `fetch`.
- [x] Tratamento de loading.
- [x] Tratamento de erro.
- [x] Tratamento de lista vazia.
- [x] Codigo organizado em componentes, telas, contexto, navegacao, services e tipos.
- [x] README estruturado para entrega no GitHub.
