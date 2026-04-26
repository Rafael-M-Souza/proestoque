import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../src/constants/theme';

export default function Config() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Configurações em branco</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.background 
  },
  text: { color: Colors.textSecondary }
});