import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { RecipeCard } from '../components/RecipeCard';
import { useFavorites } from '../contexts/FavoritesContext';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen() {
  const navigation = useNavigation<Navigation>();
  const { favorites, removeFavorite } = useFavorites();

  return (
    <FlatList
      contentContainerStyle={{ gap: 12, padding: 16, paddingBottom: 28 }}
      contentInsetAdjustmentBehavior="automatic"
      data={favorites}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <EmptyState
          title="Nenhuma receita favorita"
          message="Abra os detalhes de uma receita e toque em adicionar aos favoritos."
        />
      }
      renderItem={({ item }) => (
        <RecipeCard
          actionLabel="Remover"
          recipe={item}
          onActionPress={() => removeFavorite(item.id)}
          onPress={() => navigation.navigate('RecipeDetails', { id: item.id })}
        />
      )}
    />
  );
}
