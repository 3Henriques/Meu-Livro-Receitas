import { Pressable, Text, View } from 'react-native';

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View
      style={{
        backgroundColor: '#fff0ed',
        borderColor: '#f4b4a7',
        borderRadius: 8,
        borderWidth: 1,
        gap: 12,
        padding: 16,
      }}
    >
      <Text selectable style={{ color: '#8a2415', fontSize: 15, lineHeight: 22 }}>
        {message}
      </Text>
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          style={({ pressed }) => ({
            alignItems: 'center',
            alignSelf: 'flex-start',
            backgroundColor: pressed ? '#b9451b' : '#d95f25',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
          })}
        >
          <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '700' }}>Tentar novamente</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
