import React, { useState, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, 
  StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"; // Importante para o contraste no roxo
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing } from "@/src/constants/theme";
import { PRODUTOS_MOCK, CATEGORIAS_MOCK, type Produto } from "@/src/data/mockData";

export default function ProdutosScreen() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  const produtosFiltrados = useMemo(() => {
    return PRODUTOS_MOCK.filter((p) => {
      const nomeMatch = p.nome.toLowerCase().includes(busca.toLowerCase().trim());
      const categoriaMatch = categoriaAtiva ? p.categoriaId === categoriaAtiva : true;
      return nomeMatch && categoriaMatch;
    });
  }, [busca, categoriaAtiva]);

  const renderProduto = ({ item }: { item: Produto }) => (
    <View style={styles.produtoCard}>
      <View style={styles.produtoIconBox}>
        <Ionicons
          name={CATEGORIAS_MOCK.find((c) => c.id === item.categoriaId)?.icone ?? "cube-outline"}
          size={22}
          color={Colors.primary[600]}
        />
      </View>
      <View style={styles.produtoInfo}>
        <Text style={styles.produtoNome}>{item.nome}</Text>
        <Text style={styles.produtoSub}>{item.quantidade} {item.unidade} em estoque</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
    </View>
  );

  const ListHeader = () => (
    <View>
      {/* 1. Cabeçalho */}
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeSection}>
          <View>
            <Text style={styles.userName}>Produtos</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={45} color={Colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Barra de busca */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Buscar no estoque..."
            value={busca}
            onChangeText={setBusca}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* 3. Chips de categoria */}
      <View style={{ height: 55 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.chipsContainer}
        >
          <TouchableOpacity 
            style={[styles.chip, !categoriaAtiva && styles.chipAtivo]}
            onPress={() => setCategoriaAtiva(null)}
          >
            <Text style={[styles.chipText, !categoriaAtiva && styles.chipTextAtivo]}>Todos</Text>
          </TouchableOpacity>

          {CATEGORIAS_MOCK.map((cat) => (
            <TouchableOpacity 
              key={cat.id}
              style={[styles.chip, categoriaAtiva === cat.id && styles.chipAtivo]}
              onPress={() => setCategoriaAtiva(cat.id)}
            >
              <Text style={[styles.chipText, categoriaAtiva === cat.id && styles.chipTextAtivo]}>
                {cat.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* FAIXA ROXA SUPERIOR */}
      <View style={styles.topPurpleBar}>
        <SafeAreaView edges={['top']}>
          <StatusBar style="light" />
          <View style={styles.topBarContent}>
          </View>
        </SafeAreaView>
      </View>

      <FlatList<Produto>
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={40} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>Nenhum produto encontrado para "{busca}".</Text>
          </View>
        }
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  
  //faixa roxa superior
  topPurpleBar: {
    backgroundColor: Colors.primary[600],
  },
  topBarContent: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    color: '#FFF',
    fontSize: Typography.fontSize.sm,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  // Cabeçalho
  welcomeContainer: { paddingHorizontal: Spacing[6], paddingTop: Spacing[6] },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[4],
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
  addButton: { padding: 0 },

  // Busca
  searchSection: { paddingHorizontal: Spacing[6], marginBottom: Spacing[6] },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing[4],
    borderRadius: 12,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: { flex: 1, marginLeft: Spacing[2], fontSize: Typography.fontSize.base },

  // Chips 
  chipsContainer: { paddingHorizontal: Spacing[6], gap: Spacing[2], paddingBottom: Spacing[4] },
  chip: {
    paddingHorizontal: Spacing[4],
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipAtivo: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  chipText: { color: Colors.textSecondary, fontWeight: '500' },
  chipTextAtivo: { color: Colors.white },

  // Listagem
  listPadding: { paddingBottom: 40 },
  produtoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing[6], // Movi o padding horizontal para o card para a lista fluir melhor
    padding: Spacing[4],
    borderRadius: 12,
    marginBottom: Spacing[3],
  },
  produtoIconBox: {
    width: 40,
    height: 40,
    backgroundColor: Colors.background,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing[3],
  },
  produtoInfo: { flex: 1 },
  produtoNome: { fontSize: Typography.fontSize.base, fontWeight: '600', color: Colors.textPrimary },
  produtoSub: { fontSize: Typography.fontSize.sm, color: Colors.textSecondary, marginTop: 2 },

  emptyState: { alignItems: 'center', marginTop: 60, gap: Spacing[2] },
  emptyText: { color: Colors.textSecondary, textAlign: 'center', paddingHorizontal: Spacing[10] }
});