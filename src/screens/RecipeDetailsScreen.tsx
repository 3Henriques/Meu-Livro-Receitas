import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '../components/Loading';
import { useFavorites } from '../contexts/FavoritesContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { getRecipeById } from '../services/mealService';
import type { Receita } from '../types/meal';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetails'>;

export function RecipeDetailsScreen({ route }: Props) {
  const { id } = route.params;
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();
  const [recipe, setRecipe] = useState<Receita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadDetails() {
    setLoading(true);
    setError('');

    try {
      const result = await getRecipeById(id);
      setRecipe(result);
    } catch {
      setRecipe(null);
      setError('Nao foi possivel carregar os detalhes da receita.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDetails();
  }, [id]);

  if (loading) {
    return <Loading message="Carregando detalhes..." />;
  }

  if (error) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }} contentInsetAdjustmentBehavior="automatic">
        <ErrorMessage message={error} onRetry={loadDetails} />
      </ScrollView>
    );
  }

  if (!recipe) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }} contentInsetAdjustmentBehavior="automatic">
        <EmptyState title="Receita nao encontrada" message="A API nao retornou detalhes para esta receita." />
      </ScrollView>
    );
  }

  const favorite = isFavorite(recipe.id);

  return (
    <ScrollView contentContainerStyle={{ gap: 18, padding: 16, paddingBottom: 32 }} contentInsetAdjustmentBehavior="automatic">
      <Image
        accessibilityIgnoresInvertColors
        source={{ uri: recipe.imagem }}
        style={{ aspectRatio: 1.35, borderRadius: 8, width: '100%' }}
      />

      <View style={{ gap: 10 }}>
        <Text selectable style={{ color: '#2f201a', fontSize: 28, fontWeight: '800', lineHeight: 34 }}>
          {recipe.nome}
        </Text>
        <Text selectable style={{ color: '#6b4b3e', fontSize: 16 }}>
          {recipe.categoria}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          if (favorite) {
            removeFavorite(recipe.id);
          } else {
            addFavorite(recipe);
          }
        }}
        style={({ pressed }) => ({
          alignItems: 'center',
          backgroundColor: favorite ? (pressed ? '#8a2415' : '#a9361d') : pressed ? '#b9451b' : '#d95f25',
          borderRadius: 8,
          paddingVertical: 14,
        })}
      >
        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '800' }}>
          {favorite ? 'Remover dos favoritos' : 'Favoritar'}
        </Text>
      </Pressable>

      <View style={{ gap: 10 }}>
        <Text selectable style={{ color: '#2f201a', fontSize: 21, fontWeight: '800' }}>
          Ingredientes
        </Text>
        <View style={{ backgroundColor: '#ffffff', borderColor: '#f0d8c8', borderRadius: 8, borderWidth: 1, padding: 14 }}>
          {recipe.ingredientes.length > 0 ? recipe.ingredientes.map((item, index) => (
            <Text
              key={`${item}-${index}`}
              selectable
              style={{ color: '#4d3429', fontSize: 15, lineHeight: 24 }}
            >
              {`\u2022 ${item}`}
            </Text>
          )) : (
            <Text selectable style={{ color: '#4d3429', fontSize: 15, lineHeight: 24 }}>
              Ingredientes nao informados.
            </Text>
          )}
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text selectable style={{ color: '#2f201a', fontSize: 21, fontWeight: '800' }}>
          Modo de preparo
        </Text>
        <View style={{ gap: 10 }}>
          {recipe.modoPreparo.length > 0 ? recipe.modoPreparo.map((step, index) => (
            <Text key={`${step}-${index}`} selectable style={{ color: '#4d3429', fontSize: 16, lineHeight: 25 }}>
              {`${index + 1}. ${step}`}
            </Text>
          )) : (
            <Text selectable style={{ color: '#4d3429', fontSize: 16, lineHeight: 25 }}>
              Modo de preparo nao informado.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
