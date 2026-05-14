import { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import { Colors, Spacing } from "@/src/constants/theme";

export default function Login() {
  const { login, isLoading } = useAuth(); // ← hook do contexto
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    try {
      await login(email, senha); // ← chama o login do contexto
      // O NavigationGuard detecta isAuthenticated = true e redireciona
      // automaticamente para /(tabs) — NÃO precisa de router.replace aqui!
    } catch (error) {
      Alert.alert("Erro", "E-mail ou senha inválidos.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bem-vindo de volta 👋</Text>

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="mail-outline"
          returnKeyType="next"
        />

        <Input
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          isPassword
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        <Button
          label="Entrar"
          onPress={handleLogin}
          loading={isLoading}
          fullWidth
        />

        <Button
          label="Criar conta"
          onPress={() => router.push("/(auth)/cadastro")}
          variant="ghost"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing[6], justifyContent: "center", gap: Spacing[2] },
  titulo:    { fontSize: 28, fontWeight: "bold", color: Colors.textPrimary, marginBottom: Spacing[4] },
});