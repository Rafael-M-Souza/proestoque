import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, 
  Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Colors, Typography, Spacing } from '../../src/constants/theme';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import LogoProEstoque from '@/src/components/LogoProEstoque';

export default function Cadastro() {
  const router = useRouter();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erroSenha, setErroSenha] = useState('');

  const handleCadastro = () => {
    setErroSenha('');

    if (senha !== confirmarSenha) {
      setErroSenha('As senhas não coincidem');
      return;
    }

    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => router.replace('/(auth)/login') }
      ]);
    }, 2000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        > 
          <LogoProEstoque 
            size="md" 
            iconLib="MaterialCommunityIcons" 
            iconName="card-text" 
            title="Criar Conta" 
            subtitle=''
          />
          
          <Input 
            label="Nome completo"
            leftIcon="person-outline" 
            placeholder="Nome Completo" 
            value={nome}
            onChangeText={setNome}
          />
          
          <Input 
            label="E-mail"
            leftIcon="mail-outline" 
            placeholder="Ex: seuemail@ufgd.com" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input 
            label="Senha"
            leftIcon="lock-closed-outline" 
            placeholder="Crie uma senha forte" 
            isPassword 
            value={senha}
            onChangeText={setSenha}
          />

          <Input 
            label="Confirmar Senha"
            leftIcon="shield-checkmark-outline" 
            placeholder="Repita a senha" 
            isPassword 
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            error={erroSenha}
          />

          <View style={{ marginTop: Spacing[4] }}>
            <Button 
              label="Criar Conta" 
              onPress={handleCadastro} 
              loading={loading}
              fullWidth
            />
          </View>

          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.linkVoltar}
          >
            <Text style={styles.linkText}>
              <Text style={styles.linkDestaque}>Já tenho conta</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContent: { 
    padding: Spacing[6], 
    paddingTop: Spacing[10] 
  },
  linkVoltar: { 
    marginTop: Spacing[6], 
    alignItems: 'center',
    padding: Spacing[2]
  },
  linkText: { 
    color: Colors.textSecondary, 
    fontSize: Typography.fontSize.base 
  },
  linkDestaque: { 
    color: Colors.primary[600], 
    fontWeight: Typography.fontWeight.semibold as any 
  },
});