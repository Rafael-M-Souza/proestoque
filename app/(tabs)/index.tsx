import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors, Typography, Spacing } from '../../src/constants/theme';

export default function Home() {
  // Simulação do nome do usuário (pode vir de uma prop ou auth)
  const nomeUsuario = "Felipe"; 

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.saudacao}>Olá, {nomeUsuario}</Text>
          <Text style={styles.subtituloHome}>Visão geral do seu estoque</Text>
        </View>

        {/* Card Total em Produtos (Sem ícone) */}
        <View style={styles.fullCard}>
          <Text style={styles.cardTitle}>Total em produtos</Text>
          <Text style={styles.cardMainValue}>1.250</Text>
        </View>

        {/* Linha com Categorias e Alertas (Sem ícones) */}
        <View style={styles.row}>
          
          <View style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>Categorias</Text>
            <Text style={styles.smallCardValue}>15</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>Alertas</Text>
            {/* Número em vermelho conforme solicitado */}
            <Text style={[styles.smallCardValue, { color: '#E53935' }]}>04</Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  content: { padding: Spacing[6] },
  
  header: {
    marginBottom: Spacing[8],
  },
  saudacao: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold as any,
    color: '#000',
  },
  subtituloHome: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing[1],
  },

  fullCard: {
    backgroundColor: Colors.primary[600],
    width: '100%',
    padding: Spacing[6],
    borderRadius: 16,
    marginBottom: Spacing[6],
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.sm,
    textTransform: 'uppercase',
    fontWeight: Typography.fontWeight.medium as any,
  },
  cardMainValue: {
    color: Colors.white,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold as any,
    marginTop: Spacing[1],
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    backgroundColor: Colors.white,
    width: '48%',
    padding: Spacing[5],
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  smallCardTitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium as any,
  },
  smallCardValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.textPrimary,
    marginTop: Spacing[2],
  },
});