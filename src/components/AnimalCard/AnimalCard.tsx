import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Animal } from '../../types';
import { COLORS } from '../../utils/theme';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';
import { getAnimalImage } from '../../assets/images';

interface AnimalCardProps {
  animal: Animal;
  onPress: () => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onPress }) => {
  const { isSmallScreen } = useSafeSpacing();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.imageContainer, isSmallScreen && styles.imageContainerSmall]}>
        <Image
          source={getAnimalImage(animal.imageKey)}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <View style={styles.textContainer}>
            <Text style={[styles.name, isSmallScreen && styles.nameSmall]} numberOfLines={1}>
              {animal.name}
            </Text>
            <Text style={styles.type} numberOfLines={1}>
              {animal.type}
            </Text>
            <Text style={styles.habitat} numberOfLines={1}>
              {animal.habitat}
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: 'rgba(60, 30, 90, 0.5)',
  },
  imageContainerSmall: {
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  nameSmall: {
    fontSize: 13,
  },
  type: {
    fontSize: 10,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginBottom: 3,
  },
  habitat: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '300',
    marginLeft: 6,
  },
});

export default AnimalCard;