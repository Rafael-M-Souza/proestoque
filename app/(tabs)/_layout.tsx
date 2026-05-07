import { Tabs } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary[600],
      tabBarInactiveTintColor: Colors.textSecondary,
      headerStyle: { backgroundColor: Colors.background },
      headerTintColor: Colors.textPrimary,
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
      <Tabs.Screen
        name="index" // Home
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />     
      <Tabs.Screen
        name="produtos" // Produtos
        options={{
          title: 'Produtos',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="folder" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracoes" // Configurações
        options={{
          title: 'Config',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}