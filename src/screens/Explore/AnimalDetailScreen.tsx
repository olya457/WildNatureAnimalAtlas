import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Share,
  Alert,
  Image,
  Modal,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Background from '../../components/Background/Background';
import { getAnimalById } from '../../data/animals';
import { getAnimalImage } from '../../assets/images';
import { COLORS } from '../../utils/theme';
import { ExploreStackParamList } from '../../types';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

type NavProp = NativeStackNavigationProp<ExploreStackParamList, 'AnimalDetail'>;
type RouteProps = RouteProp<ExploreStackParamList, 'AnimalDetail'>;

const AnimalDetailScreen = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProps>();
  const { top, isSmallScreen, isVerySmallScreen } = useSafeSpacing();
  const [mapVisible, setMapVisible] = useState(false);

  const animal = getAnimalById(route.params.animalId);

  if (!animal) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        title: animal.name,
        message: `${animal.name} (${animal.type})\n\n${animal.description}\n\nFun Fact: ${animal.funFact}`,
      });
    } catch (e) {
      Alert.alert('Error', 'Could not share');
    }
  };

  return (
    <Background>
      <View style={[styles.container, { paddingTop: top }]}>
        <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>Explore Wildlife</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={[styles.imageContainer, isSmallScreen && styles.imageContainerSmall]}>
            <Image
              source={getAnimalImage(animal.imageKey)}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => setMapVisible(true)}
              activeOpacity={0.8}>
              <Text style={styles.mapButtonText}>📍 View on Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
              activeOpacity={0.8}>
              <Text style={styles.shareIcon}>↗</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.animalName}>{animal.name}</Text>
          <Text style={styles.type}>{animal.type}</Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusLabel}>Conservation Status</Text>
            <Text style={styles.statusValue}>{animal.conservationStatus}</Text>
          </View>

          <View style={styles.infoBlock}>
            <InfoRow icon="📍" label="Habitat" value={animal.habitat} />
            <InfoRow icon="🌍" label="Region" value={animal.region} />
            <InfoRow icon="🍃" label="Diet" value={animal.diet} />
            <InfoRow icon="⏳" label="Lifespan" value={animal.lifespan} />
            <InfoRow icon="📏" label="Size" value={animal.size} />
            <InfoRow icon="⚖️" label="Weight" value={animal.weight} />
            <InfoRow icon="ℹ️" label="Description" value={animal.description} />
          </View>

          <View style={styles.factBox}>
            <Text style={styles.factTitle}>💡 Fun Fact</Text>
            <Text style={styles.factText}>{animal.funFact}</Text>
          </View>

          <View style={styles.factsList}>
            <Text style={styles.factsListTitle}>✨ Interesting Facts</Text>
            {animal.interestingFacts.map((fact, index) => (
              <View key={index} style={styles.factItem}>
                <Text style={styles.factBullet}>•</Text>
                <Text style={styles.factItemText}>{fact}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={mapVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMapVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setMapVisible(false)}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={e => e.stopPropagation()}
              style={[
                styles.mapModalCard,
                isSmallScreen && styles.mapModalCardSmall,
                isVerySmallScreen && styles.mapModalCardVerySmall,
              ]}>
              <View style={styles.mapModalHeader}>
                <View style={styles.mapModalTitleWrap}>
                  <Text style={styles.mapModalTitle}>{animal.name}</Text>
                  <Text style={styles.mapModalCoords}>
                    {animal.coordinates.latitude.toFixed(4)},{' '}
                    {animal.coordinates.longitude.toFixed(4)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.mapCloseBtn}
                  onPress={() => setMapVisible(false)}
                  activeOpacity={0.7}>
                  <Text style={styles.mapCloseIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.mapContainer,
                  isSmallScreen && styles.mapContainerSmall,
                  isVerySmallScreen && styles.mapContainerVerySmall,
                ]}>
                <MapView
                  provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                  style={styles.map}
                  initialRegion={{
                    latitude: animal.coordinates.latitude,
                    longitude: animal.coordinates.longitude,
                    latitudeDelta: 15,
                    longitudeDelta: 15,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: animal.coordinates.latitude,
                      longitude: animal.coordinates.longitude,
                    }}
                    tracksViewChanges={false}>
                    <View style={styles.markerWrapper}>
                      <View style={styles.markerCircle}>
                        <Image
                          source={getAnimalImage(animal.imageKey)}
                          style={styles.markerImage}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={styles.markerPointer} />
                    </View>
                  </Marker>
                </MapView>
              </View>

              <TouchableOpacity
                style={styles.closeMapButton}
                onPress={() => setMapVisible(false)}
                activeOpacity={0.8}>
                <Text style={styles.closeMapButtonText}>Close Map</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    </Background>
  );
};

const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <View style={styles.infoRow}>
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>{icon}</Text>
    </View>
    <View style={styles.infoText}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 14,
    marginTop: 10,
  },
  titleSmall: {
    fontSize: 24,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: COLORS.primary,
    fontSize: 26,
    marginTop: -3,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainerSmall: {
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  mapButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#1A0B2E',
    fontWeight: '700',
    fontSize: 14,
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
  animalName: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  statusValue: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  infoBlock: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(157, 78, 221, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 19,
  },
  factBox: {
    backgroundColor: 'rgba(157, 78, 221, 0.25)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    marginBottom: 14,
  },
  factTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  factText: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 19,
  },
  factsList: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.15)',
  },
  factsListTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  factItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  factBullet: {
    color: COLORS.primary,
    fontSize: 14,
    marginRight: 8,
  },
  factItemText: {
    color: COLORS.text,
    fontSize: 13,
    flex: 1,
    lineHeight: 19,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mapModalCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.cardBgSolid,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  mapModalCardSmall: {
    padding: 12,
    borderRadius: 18,
  },
  mapModalCardVerySmall: {
    padding: 10,
  },
  mapModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  mapModalTitleWrap: {
    flex: 1,
  },
  mapModalTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  mapModalCoords: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  mapCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCloseIcon: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
  },
  mapContainerSmall: {
    height: 240,
  },
  mapContainerVerySmall: {
    height: 200,
  },
  map: {
    flex: 1,
  },
  markerWrapper: {
    alignItems: 'center',
  },
  markerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    backgroundColor: COLORS.cardBgSolid,
  },
  markerImage: {
    width: '100%',
    height: '100%',
  },
  markerPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.primary,
    marginTop: -1,
  },
  closeMapButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  closeMapButtonText: {
    color: '#1A0B2E',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default AnimalDetailScreen;