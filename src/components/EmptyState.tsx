import { Text, View } from 'react-native';

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#fff8f2',
        borderColor: '#f2d5c2',
        borderRadius: 8,
        borderWidth: 1,
        gap: 8,
        padding: 20,
      }}
    >
      <Text selectable style={{ color: '#7b321b', fontSize: 18, fontWeight: '700', textAlign: 'center' }}>
        {title}
      </Text>
      <Text selectable style={{ color: '#6b4b3e', fontSize: 15, lineHeight: 22, textAlign: 'center' }}>
        {message}
      </Text>
    </View>
  );
}
