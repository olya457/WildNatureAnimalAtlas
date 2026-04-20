import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Background from '../../components/Background/Background';
import { IMAGES } from '../../assets/images';
import { RootStackParamList } from '../../types';
import { useApp } from '../../context/AppContext';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>;

const LoadingScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { isLoading } = useApp();
  const { isSmallScreen } = useSafeSpacing();

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoading, navigation]);

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IMAGES.logo}
          style={[styles.logo, isSmallScreen && styles.logoSmall]}
          resizeMode="contain"
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
  logoSmall: {
    width: 160,
    height: 160,
  },
});

export default LoadingScreen;