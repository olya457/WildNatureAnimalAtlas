import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from 'react-native';
import Background from '../../components/Background/Background';
import { COLORS } from '../../utils/theme';
import { useApp } from '../../context/AppContext';
import { getRandomFact } from '../../data/facts';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

const MAX_GENERATIONS = 5;

const FactsScreen = () => {
  const { top, isSmallScreen } = useSafeSpacing();
  const { factsRemaining, setFactsRemaining, currentFact, setCurrentFact } = useApp();

  const handleGenerate = () => {
    if (factsRemaining <= 0) return;
    const newFact = getRandomFact();
    setCurrentFact(newFact);
    setFactsRemaining(factsRemaining - 1);
  };

  const handleShare = async () => {
    if (!currentFact) return;
    try {
      await Share.share({ message: `🐾 Wildlife Fact:\n${currentFact}` });
    } catch (e) {
      Alert.alert('Error', 'Could not share');
    }
  };

  const disabled = factsRemaining <= 0;

  return (
    <Background>
      <View style={[styles.container, { paddingTop: top }]}>
        <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>Facts Generator</Text>

        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsLabel}>✨ Generations Left</Text>
            <View style={styles.dots}>
              {Array.from({ length: MAX_GENERATIONS }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i < factsRemaining ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              ))}
            </View>
          </View>
          <Text style={styles.statsText}>
            {factsRemaining} of {MAX_GENERATIONS} remaining today
          </Text>
        </View>

        <View style={[styles.factCard, isSmallScreen && styles.factCardSmall]}>
          <Text style={styles.pawIcon}>🐾</Text>
          <Text style={[styles.factText, isSmallScreen && styles.factTextSmall]}>
            {currentFact || 'Tap the button below to generate\nan amazing wildlife fact!'}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.generateButton, disabled && styles.generateButtonDisabled]}
            onPress={handleGenerate}
            disabled={disabled}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.generateButtonText,
                disabled && styles.generateButtonTextDisabled,
              ]}>
              ↻ {disabled ? 'No Generations Left' : 'Generate Fact'}
            </Text>
          </TouchableOpacity>

          {!disabled && currentFact ? (
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
              activeOpacity={0.8}>
              <Text style={styles.shareIcon}>↗</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {disabled ? (
          <Text style={styles.comeBack}>Come back tomorrow for more facts!</Text>
        ) : null}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 18,
    marginTop: 10,
  },
  titleSmall: {
    fontSize: 24,
    marginBottom: 14,
  },
  statsCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.15)',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statsLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  dotInactive: {
    backgroundColor: COLORS.textMuted,
  },
  statsText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  factCard: {
    backgroundColor: 'rgba(157, 78, 221, 0.25)',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  factCardSmall: {
    minHeight: 170,
    paddingVertical: 20,
  },
  pawIcon: {
    fontSize: 36,
    marginBottom: 14,
  },
  factText: {
    color: COLORS.text,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  factTextSmall: {
    fontSize: 14,
    lineHeight: 21,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  generateButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: 'rgba(157, 78, 221, 0.3)',
  },
  generateButtonText: {
    color: '#1A0B2E',
    fontWeight: '700',
    fontSize: 14,
  },
  generateButtonTextDisabled: {
    color: COLORS.textMuted,
  },
  shareButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    color: '#1A0B2E',
    fontSize: 22,
    fontWeight: '700',
  },
  comeBack: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default FactsScreen;