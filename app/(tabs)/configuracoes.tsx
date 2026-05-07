// 1. Importamos os "Core Components" da biblioteca nativa
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    // 2. A View é o container pai (equivalente estrutural da <div>)
    <View style={styles.container}>
      {/* 3. O Text é OBRIGATÓRIO para exibir strings */}
      <Text style={styles.titulo}>Olá, Mundo Mobile! 📱</Text>
    </View>
  );
}

// 4. Estilização (Processada pela Yoga Engine)
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz a View ocupar 100% da tela disponível
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0f4f8'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0369a1'
  }
});