import { ActivityIndicator, Text, View } from 'react-native';

type LoadingProps = {
  message?: string;
};

export function Loading({ message = 'Carregando...' }: LoadingProps) {
  return (
    <View style={{ alignItems: 'center', gap: 12, padding: 24 }}>
      <ActivityIndicator color="#d95f25" size="large" />
      <Text selectable style={{ color: '#6b4b3e', fontSize: 15 }}>
        {message}
      </Text>
    </View>
  );
}
