import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Background from '../../components/Background/Background';
import { ONBOARDING_SLIDES } from '../../data/onboarding';
import { getOnboardingImage } from '../../assets/images';
import { COLORS } from '../../utils/theme';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';
import { RootStackParamList } from '../../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { top, bottom, isSmallScreen, isVerySmallScreen } = useSafeSpacing();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = ONBOARDING_SLIDES[currentIndex];

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    navigation.replace('MainTabs');
  };

  const imageSize = isVerySmallScreen ? 140 : isSmallScreen ? 180 : 230;

  return (
    <Background>
      <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.imageWrapper, { width: imageSize, height: imageSize }]}>
            <Image
              source={getOnboardingImage(currentSlide.imageKey)}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <Text
            style={[
              styles.title,
              isSmallScreen && styles.titleSmall,
              isVerySmallScreen && styles.titleVerySmall,
            ]}>
            {currentSlide.title}
          </Text>

          <Text style={[styles.description, isSmallScreen && styles.descriptionSmall]}>
            {currentSlide.description}
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {ONBOARDING_SLIDES.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.dotActive]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>
              {currentIndex === ONBOARDING_SLIDES.length - 1 ? 'Start' : 'Next'} ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={finish} activeOpacity={0.7} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageWrapper: {
    borderRadius: 500,
    borderWidth: 4,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  titleSmall: {
    fontSize: 22,
    marginBottom: 12,
  },
  titleVerySmall: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  descriptionSmall: {
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textMuted,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextButtonText: {
    color: '#1A0B2E',
    fontSize: 16,
    fontWeight: '700',
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});

export default OnboardingScreen;