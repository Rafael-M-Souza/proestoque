import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons'; 
import { Colors, Typography, Spacing } from '../../src/constants/theme';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import LogoProEstoque from '../../src/components/LogoProEstoque';

export default function RecuperarSenha() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleRecuperar = () => {
    if (email.trim() === '') return;
    setEnviado(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <View style={styles.container}>
          
          <View style={styles.content}>

            <View style={{ marginBottom: Spacing[8] }}>
              <LogoProEstoque 
                size="md" 
                iconLib="Entypo" 
                iconName="lock" 
                title="Recuperar Senha"
                subtitle="Informe seu e-mail e enviaremos um link" 
              />
            </View>

            {!enviado ? (
              <View>
                <Input 
                  label="E-mail"
                  leftIcon="mail-outline" 
                  placeholder="E-mail cadastrado" 
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <Button label="Enviar Link" onPress={handleRecuperar} fullWidth />
              </View>
            ) : (
              <View style={styles.sucessoContainer}>
                <View style={styles.cardSucesso}>
                  <Entypo name="mail" size={48} color={Colors.success.border} style={{ marginBottom: Spacing[2] }} />
                  <Text style={styles.tituloEmailEnviado}>E-mail enviado!</Text>
                  <Text style={styles.descricaoCentro}>Verifique sua caixa de entrada</Text>
                </View>
                
                <Button label="Voltar ao Login" variant="outline" onPress={() => router.back()} fullWidth />
              </View>
            )}
          </View>

          {!enviado && (
            <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
              <Text style={styles.textoVoltar}>Cancelar</Text>
            </TouchableOpacity>
          )}

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: Spacing[6],
  },
  content: { 
    flex: 1, 
    justifyContent: 'center',
  },
  sucessoContainer: {
    alignItems: 'center',
  },
  cardSucesso: {
    width: '100%',
    backgroundColor: '#E8F5E9',
    padding: Spacing[6],
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.success.border,
    marginBottom: Spacing[6],
  },
  tituloEmailEnviado: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: '#3e7944',
    marginBottom: Spacing[1],
  },
  descricaoCentro: { 
    fontSize: Typography.fontSize.base, 
    color: '#398a41', 
    textAlign: 'center', 
    lineHeight: 20 
  },
  botaoVoltar: { 
    paddingVertical: Spacing[4], 
    alignItems: 'center' 
  },
  textoVoltar: { 
    color: Colors.primary[600], 
    fontSize: Typography.fontSize.base, 
    fontWeight: Typography.fontWeight.medium as any 
  }
});