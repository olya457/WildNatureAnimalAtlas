import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { IMAGES } from '../../assets/images';

interface BackgroundProps {
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground source={IMAGES.background} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 5, 30, 0.3)',
  },
});

export default Background;