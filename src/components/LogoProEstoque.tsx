import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../constants/theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  iconName: any; 
  iconLib: 'Ionicons' | 'MaterialCommunityIcons' | 'Entypo';
  title: string;
  subtitle: string;
}

export default function LogoProEstoque({ size = 'md', iconName, iconLib, title, subtitle }: LogoProps) {
  // AJUSTADO: Removida a duplicata de 'md' e corrigida a escala de fontes
  const config = {
    sm: { icon: 24, font: Typography.fontSize.xl, box: 60 },
    md: { icon: 32, font: Typography.fontSize['2xl'], box: 80 },
    lg: { icon: 40, font: Typography.fontSize['3xl'], box: 90 },
  };

  const selected = config[size];

  const renderIcon = () => {
    const props = { name: iconName, size: selected.icon, color: Colors.white };
    if (iconLib === 'MaterialCommunityIcons') return <MaterialCommunityIcons {...props} />;
    if (iconLib === 'Entypo') return <Entypo {...props} />;
    return <Ionicons {...props} />;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { width: selected.box, height: selected.box }]}>
        {renderIcon()}
      </View>
      
      <Text style={[styles.logoText, { fontSize: selected.font }]}>
        {title}
      </Text>

      <Text style={[styles.subtitleText, { fontSize: Typography.fontSize.md }]}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  iconBox: {
    backgroundColor: Colors.primary[600],
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing[3],
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoText: {
    fontWeight: Typography.fontWeight.bold as any,
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitleText: {
    color: Colors.textSecondary, // Cor vinda do seu theme.ts
    textAlign: 'center',
    marginTop: Spacing[1],
  }
});