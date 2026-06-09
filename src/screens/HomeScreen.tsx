import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '../components/Loading';
import { RecipeCard } from '../components/RecipeCard';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { getRecipes, searchRecipes } from '../services/mealService';
import type { Receita } from '../types/meal';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const [searchText, setSearchText] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [recipes, setRecipes] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  async function loadRecipes(query = '') {
    const normalizedQuery = query.trim();

    setLoading(true);
    setError('');
    setHasSearched(true);
    setLastSearch(normalizedQuery);

    try {
      const result = normalizedQuery ? await searchRecipes(normalizedQuery) : await getRecipes();
      setRecipes(result);
    } catch {
      setRecipes([]);
      setError('Erro ao carregar receitas. Verifique sua conexao e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ gap: 14, padding: 16, paddingBottom: 8 }}>
        <View style={{ gap: 8 }}>
          <Text selectable style={{ color: '#5e4034', fontSize: 15, lineHeight: 22 }}>
            Pesquise uma receita pelo nome ou descricao e abra os detalhes para ver ingredientes e preparo.
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput
              accessibilityLabel="Nome da receita"
              autoCorrect={false}
              onChangeText={setSearchText}
              onSubmitEditing={() => loadRecipes(searchText)}
              placeholder="Digite o nome da receita"
              placeholderTextColor="#9a8175"
              returnKeyType="search"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#e8c9b5',
                borderRadius: 8,
                borderWidth: 1,
                color: '#2f201a',
                flex: 1,
                fontSize: 16,
                minHeight: 48,
                paddingHorizontal: 14,
              }}
              value={searchText}
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => loadRecipes(searchText)}
              style={({ pressed }) => ({
                alignItems: 'center',
                backgroundColor: pressed ? '#b9451b' : '#d95f25',
                borderRadius: 8,
                justifyContent: 'center',
                minHeight: 48,
                paddingHorizontal: 18,
              })}
            >
              <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '700' }}>Buscar</Text>
            </Pressable>
          </View>
        </View>
        {error ? <ErrorMessage message={error} onRetry={() => loadRecipes(lastSearch || searchText)} /> : null}
        {loading ? <Loading message="Buscando receitas..." /> : null}
      </View>

      <FlatList
        contentContainerStyle={{ gap: 12, padding: 16, paddingTop: 8, paddingBottom: 28 }}
        contentInsetAdjustmentBehavior="automatic"
        data={loading ? [] : recipes}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        ListEmptyComponent={
          !loading && !error && hasSearched ? (
            <EmptyState
              title="Nenhuma receita encontrada"
              message="Tente pesquisar por outro termo, como bolo, frango, arroz, chocolate ou cenoura."
            />
          ) : null
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetails', { id: item.id })}
          />
        )}
      />
    </View>
  );
}
