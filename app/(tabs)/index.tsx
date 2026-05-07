import { useState, useMemo, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// Importações do tema
import { Colors, Typography, Spacing } from "@/src/constants/theme";
import {
  PRODUTOS_MOCK,
  CATEGORIAS_MOCK,
  getProdutosComEstoqueBaixo,
  getValorTotalEstoque,
  formatarPreco,
  type Produto,
} from "@/src/data/mockData";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const alertas = useMemo(() => getProdutosComEstoqueBaixo(), []);
  const valorTotal = useMemo(() => getValorTotalEstoque(), []);

  const dataHoje = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const cardsResumo = [
    { id: "total", titulo: "Produtos", valor: PRODUTOS_MOCK.length, icone: "cube-outline" as const, cor: Colors.primary[600] },
    { id: "alertas", titulo: "Alertas", valor: alertas.length, icone: "alert-circle-outline" as const, cor: "#E53935" },
    { id: "categorias", titulo: "Categorias", valor: CATEGORIAS_MOCK.length, icone: "grid-outline" as const, cor: Colors.primary[700] },
    { id: "valor", titulo: "Em Estoque", valor: formatarPreco(valorTotal), icone: "cash-outline" as const, cor: Colors.success.border },
  ];

  const DashboardHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.userName}>Olá, João 👋</Text>
          <Text style={styles.dateText}>{dataHoje}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/produtos")}
        >
          <Ionicons name="add-circle" size={45} color={Colors.primary[600]} />
        </TouchableOpacity>
      </View>

      {/* Grid de Cards */}
      <View style={styles.grid}>
        {cardsResumo.map((card) => (
          <View key={card.id} style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: card.cor + '20' }]}>
              <Ionicons name={card.icone} size={22} color={card.cor} />
            </View>
            <Text style={styles.cardValue}>{card.valor}</Text>
            <Text style={styles.cardLabel}>{card.titulo}</Text>
          </View>
        ))}
      </View>

      {/* Alertas Críticos */}
      {alertas.length > 0 && (
        <View style={styles.alertSection}>
          <View style={styles.alertHeader}>
            <Ionicons name="warning" size={20} color="#E53935" />
            <Text style={styles.alertTitle}>Estoque crítico ({alertas.length})</Text>
          </View>
          {alertas.slice(0, 3).map((produto) => (
            <View key={produto.id} style={styles.alertItem}>
              <Text style={styles.alertProductName}>{produto.nome}</Text>
              <Text style={styles.alertProductQty}>
                {produto.quantidade} / <Text style={{fontWeight: 'bold'}}>{produto.quantidadeMinima}</Text> {produto.unidade}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Produtos recentes</Text>
    </View>
  );

  const renderProduto = ({ item }: { item: Produto }) => {
    const emAlerta = item.quantidade < item.quantidadeMinima;
    const semEstoque = item.quantidade === 0;
    const badgeColor = semEstoque ? '#FFEBEE' : emAlerta ? '#FFF3E0' : '#E8F5E9';
    const textColor = semEstoque ? '#C62828' : emAlerta ? '#EF6C00' : '#2E7D32';

    return (
      <View style={styles.productItem}>
        <View style={styles.productIconBox}>
          <Ionicons
            name={CATEGORIAS_MOCK.find((c) => c.id === item.categoriaId)?.icone ?? "cube-outline"}
            size={24}
            color={Colors.primary[600]}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.nome}</Text>
          <Text style={styles.productQty}>{item.quantidade} {item.unidade} em estoque</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={[styles.badgeText, { color: textColor }]}>
            {semEstoque ? "Esgotado" : emAlerta ? "Baixo" : "Normal"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      {/* 1. FAIXA ROXA SUPERIOR  */}
      <View style={styles.topPurpleBar}>
        <SafeAreaView edges={['top']}>
          <StatusBar style="light" />
          <View style={styles.topBarContent} />
        </SafeAreaView>
      </View>

      {/* 2. LISTA CONTEÚDO */}
      <FlatList<Produto>
        data={PRODUTOS_MOCK.slice(0, 10)}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        ListHeaderComponent={DashboardHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  listContent: { paddingBottom: Spacing[8] },
  headerContainer: { padding: Spacing[6] },
  
  // Faixa roxa superior 
  topPurpleBar: {
    backgroundColor: Colors.primary[600],
  },
  topBarContent: {
    height: 30, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Saudação
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[6],
  },
  userName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.textPrimary,
  },
  dateText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  addButton: { padding: 4 },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing[4],
    marginBottom: Spacing[8],
  },
  card: {
    backgroundColor: Colors.white,
    width: '47%',
    padding: Spacing[4],
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing[2],
  },
  cardValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.textPrimary,
  },
  cardLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },

  // Alertas
  alertSection: {
    backgroundColor: '#FFF5F5',
    padding: Spacing[4],
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FED7D7',
    marginBottom: Spacing[8],
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    marginBottom: Spacing[3],
  },
  alertTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold as any,
    color: '#C53030',
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: '#FEB2B2',
  },
  alertProductName: { fontSize: Typography.fontSize.sm, color: '#2D3748' },
  alertProductQty: { fontSize: Typography.fontSize.xs, color: '#C53030' },

  // Lista
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.textPrimary,
    marginBottom: Spacing[4],
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing[6],
    marginBottom: Spacing[3],
    padding: Spacing[4],
    borderRadius: 12,
  },
  productIconBox: {
    width: 45,
    height: 45,
    backgroundColor: Colors.background,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing[4],
  },
  productInfo: { flex: 1 },
  productName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium as any,
    color: Colors.textPrimary,
  },
  productQty: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: Spacing[2],
    paddingVertical: Spacing[1],
    borderRadius: 6,
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: 'bold',
  },
});