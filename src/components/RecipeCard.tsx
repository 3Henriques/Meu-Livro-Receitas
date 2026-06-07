import { Image, Pressable, Text, View } from 'react-native';
import type { Receita } from '../types/meal';

type RecipeCardProps = {
  recipe: Receita;
  onPress: () => void;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function RecipeCard({ recipe, onPress, actionLabel, onActionPress }: RecipeCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? '#fff1e5' : '#ffffff',
        borderColor: '#f0d8c8',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 12,
        minHeight: 112,
        padding: 10,
      })}
    >
      <Image
        accessibilityIgnoresInvertColors
        source={{ uri: recipe.imagem }}
        style={{ borderRadius: 8, height: 92, width: 92 }}
      />
      <View style={{ flex: 1, gap: 10, justifyContent: 'center' }}>
        <Text selectable numberOfLines={2} style={{ color: '#2f201a', fontSize: 17, fontWeight: '700' }}>
          {recipe.nome}
        </Text>
        <Text selectable numberOfLines={1} style={{ color: '#6b4b3e', fontSize: 14 }}>
          {recipe.categoria}
        </Text>
        <Text style={{ color: '#986043', fontSize: 14, fontWeight: '600' }}>Ver detalhes</Text>
      </View>
      {actionLabel && onActionPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={(event) => {
            event.stopPropagation();
            onActionPress();
          }}
          style={({ pressed }) => ({
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: pressed ? '#ead4c4' : '#f8e7db',
            borderRadius: 8,
            minWidth: 82,
            paddingHorizontal: 10,
            paddingVertical: 9,
          })}
        >
          <Text style={{ color: '#8c3d1c', fontSize: 13, fontWeight: '700', textAlign: 'center' }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
}
