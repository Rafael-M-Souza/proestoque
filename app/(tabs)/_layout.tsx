import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracoes" // Configurações
        options={{
          title: 'Config',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}