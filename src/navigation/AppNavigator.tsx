import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RecipeDetailsScreen } from '../screens/RecipeDetailsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  RecipeDetails: { id: string };
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fffaf5',
    primary: '#d95f25',
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#fffaf5' },
        headerTintColor: '#2f201a',
        tabBarActiveTintColor: '#d95f25',
        tabBarInactiveTintColor: '#856b5e',
        tabBarStyle: { backgroundColor: '#fffaf5', borderTopColor: '#f0d8c8' },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Receitas', tabBarLabel: 'Home' }} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favoritos', tabBarLabel: 'Favoritos' }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: '#fffaf5' },
          headerStyle: { backgroundColor: '#fffaf5' },
          headerTintColor: '#2f201a',
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
