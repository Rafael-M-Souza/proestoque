import { 
  View, Text, StyleSheet, SafeAreaView, 
  KeyboardAvoidingView, Platform, TouchableOpacity, 
  TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '../../src/constants/theme';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import LogoProEstoque from '../../src/components/LogoProEstoque';

export default function Login() {
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.content}>
            
            <View style={{ marginBottom: Spacing[8] }}>
              <LogoProEstoque 
                size="lg" 
                iconLib="MaterialCommunityIcons" 
                iconName="card-text" 
                title="PROESTOQUE" 
                subtitle='Bem-vindo de volta'
              />
            </View>

            <Input 
              leftIcon="mail-outline" 
              placeholder="E-mail" 
              keyboardType="email-address" 
              autoCapitalize="none"
            />
            <Input 
              leftIcon="lock-closed-outline" 
              placeholder="Senha" 
              isPassword 
            />

            <TouchableOpacity 
              onPress={() => router.push('/(auth)/recuperar-senha')} 
              style={styles.linkEsqueci}
            >
              <Text style={styles.linkText}>
                <Text style={styles.linkTextSecundario}>Esqueci minha senha</Text>
              </Text>
            </TouchableOpacity>

            <Button 
              label="Entrar" 
              fullWidth
              onPress={() => router.replace('/(tabs)')} 
            />

            <TouchableOpacity 
              onPress={() => router.push('/(auth)/cadastro')}
              style={styles.linkCriar}
            >
              <Text style={styles.linkText}>
                <Text style={styles.linkDestaque}>Não tem conta? Cadastrar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: Spacing[6],
  },
  
  linkEsqueci: { 
    alignItems: 'center', // Adicionado para centralizar
    marginBottom: Spacing[6],
    marginTop: Spacing[1], // Espaço após o input de senha
    paddingVertical: Spacing[1] 
  },
  linkCriar: { 
    marginTop: Spacing[6], 
    alignItems: 'center',
    padding: Spacing[2], // Área de toque maior
  },
  linkText: { 
    color: Colors.textSecondary, 
    fontSize: Typography.fontSize.base 
  },
  linkTextSecundario: {
    color: Colors.primary[600],
    fontWeight: Typography.fontWeight.medium as any,
  },
  linkDestaque: { 
    fontWeight: Typography.fontWeight.bold as any, 
    color: Colors.primary[600] 
  },
});