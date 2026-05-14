import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/contexts/AuthContext";
import Button from "@/src/components/Button";
import { Colors, Spacing, Typography } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function Configuracoes() {

  const { user, logout } = useAuth();
  const handleLogout = () => {

    // Confirmação antes de sair — boa UX para ação destrutiva

    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logout();
            // O NavigationGuard detecta isAuthenticated = false e
            // redireciona automaticamente para /(auth)/login
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Configurações</Text>
        {/* Informações do usuário */}
        <View style={styles.perfilCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetra}>
              {user?.nome?.charAt(0).toUpperCase() ?? "?"}
            </Text>
          </View>
          <View>
            <Text style={styles.nome}>{user?.nome}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        
        {/* Espaçador */}
        <View style={{ flex: 1 }} />

        {/* Itens de Menu */}
        <View style={{ marginTop: Spacing[6], gap: Spacing[3] }}> 
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color={Colors.primary[600]} />
              <Text style={styles.menuItemText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="color-palette-outline" size={22} color={Colors.primary[600]} />
              <Text style={styles.menuItemText}>Aparência</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color={Colors.primary[600]} />
              <Text style={styles.menuItemText}>Ajuda & Suporte</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Espaçador controlado em vez de flex:1 para não empurrar demais */}
        <View style={{ height: Spacing[10] }} />

        {/* Botão de logout */}
        <Button
          label="Sair da conta"
          onPress={handleLogout}
          variant="danger"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  safe:        { flex: 1, backgroundColor: Colors.background },
  container:   { flex: 1, padding: Spacing[6] },
  titulo:      { fontSize: 24, fontWeight: "bold", color: Colors.textPrimary, marginBottom: Spacing[6] },
  perfilCard:  { flexDirection: "row", alignItems: "center", gap: Spacing[4], padding: Spacing[4], backgroundColor: Colors.surface, borderRadius: 16, borderWidth: 1, borderColor: Colors.border },
  avatar:      { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.primary[600], alignItems: "center", justifyContent: "center" },
  avatarLetra: { color: Colors.white, fontSize: 22, fontWeight: "bold" },
  nome:        { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.textPrimary },
  email:       { fontSize: Typography.fontSize.sm, color: Colors.textSecondary },
  menuItem:    { flexDirection: 'row', alignItems: 'center', padding: Spacing[4], backgroundColor: Colors.white, borderRadius: 12, borderWidth: 1, borderColor: Colors.border, gap: Spacing[3], },
  menuItemText:{ flex: 1, fontSize: Typography.fontSize.base, fontWeight: '500', color: Colors.textPrimary, },

}); 