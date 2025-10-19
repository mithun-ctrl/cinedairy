import { styles } from "@/assets/style/screen.loader.style";
import { COLORS } from '@/constant/colors';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';


const ScreenLoader = () => {
  return (
    <View 
      style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default ScreenLoader;
