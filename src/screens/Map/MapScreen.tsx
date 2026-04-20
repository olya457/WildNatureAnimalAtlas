import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Modal,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Background from '../../components/Background/Background';
import { ANIMALS } from '../../data/animals';
import { getAnimalImage } from '../../assets/images';
import { COLORS } from '../../utils/theme';
import { MapStackParamList, Animal } from '../../types';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

type NavProp = NativeStackNavigationProp<MapStackParamList, 'MapView'>;

const MapScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { top, isSmallScreen, isVerySmallScreen } = useSafeSpacing();
  const [search, setSearch] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const filtered = useMemo(
    () =>
      ANIMALS.filter(
        a =>
          search === '' ||
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.type.toLowerCase().includes(search.toLowerCase()) ||
          a.habitat.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const openAnimal = (id: string) => {
    setSelectedAnimal(null);
    navigation.navigate('MapAnimalDetail', { animalId: id });
  };

  const openRandom = () => {
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    if (random) setSelectedAnimal(random);
  };

  return (
    <Background>
      <View style={[styles.container, { paddingTop: top }]}>
        <Text
          style={[
            styles.title,
            isSmallScreen && styles.titleSmall,
            isVerySmallScreen && styles.titleVerySmall,
          ]}>
          Interactive map
        </Text>

        <View style={[styles.searchWrapper, isSmallScreen && styles.searchWrapperSmall]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, isSmallScreen && styles.searchInputSmall]}
            placeholder="Search animals..."
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View
          style={[
            styles.mapWrapper,
            isSmallScreen && styles.mapWrapperSmall,
            isVerySmallScreen && styles.mapWrapperVerySmall,
          ]}>
          <MapView
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
            style={styles.map}
            initialRegion={{
              latitude: 10,
              longitude: 20,
              latitudeDelta: 120,
              longitudeDelta: 120,
            }}>
            {filtered.map(animal => (
              <Marker
                key={animal.id}
                coordinate={{
                  latitude: animal.coordinates.latitude,
                  longitude: animal.coordinates.longitude,
                }}
                onPress={() => setSelectedAnimal(animal)}
                tracksViewChanges={false}>
                <View style={styles.markerWrapper}>
                  <View
                    style={[
                      styles.markerCircle,
                      isSmallScreen && styles.markerCircleSmall,
                    ]}>
                    <Image
                      source={getAnimalImage(animal.imageKey)}
                      style={styles.markerImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.markerPointer} />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>

        <TouchableOpacity
          style={[
            styles.randomButton,
            isSmallScreen && styles.randomButtonSmall,
            isVerySmallScreen && styles.randomButtonVerySmall,
          ]}
          onPress={openRandom}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.randomButtonText,
              isSmallScreen && styles.randomButtonTextSmall,
            ]}>
            Open randomly ›
          </Text>
        </TouchableOpacity>

        <Modal
          visible={selectedAnimal !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedAnimal(null)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setSelectedAnimal(null)}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={e => e.stopPropagation()}
              style={[
                styles.previewCard,
                isSmallScreen && styles.previewCardSmall,
                isVerySmallScreen && styles.previewCardVerySmall,
              ]}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setSelectedAnimal(null)}
                activeOpacity={0.7}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>

              {selectedAnimal && (
                <>
                  <View
                    style={[
                      styles.previewImageWrapper,
                      isSmallScreen && styles.previewImageWrapperSmall,
                      isVerySmallScreen && styles.previewImageWrapperVerySmall,
                    ]}>
                    <Image
                      source={getAnimalImage(selectedAnimal.imageKey)}
                      style={styles.previewImage}
                      resizeMode="cover"
                    />
                  </View>

                  <Text
                    style={[
                      styles.previewName,
                      isSmallScreen && styles.previewNameSmall,
                    ]}
                    numberOfLines={1}>
                    {selectedAnimal.name}
                  </Text>
                  <Text
                    style={[
                      styles.previewType,
                      isSmallScreen && styles.previewTypeSmall,
                    ]}
                    numberOfLines={1}>
                    {selectedAnimal.type}
                  </Text>
                  <Text
                    style={[
                      styles.previewHabitat,
                      isSmallScreen && styles.previewHabitatSmall,
                    ]}
                    numberOfLines={2}>
                    📍 {selectedAnimal.habitat}
                  </Text>

                  <TouchableOpacity
                    style={[styles.detailBtn, isSmallScreen && styles.detailBtnSmall]}
                    onPress={() => openAnimal(selectedAnimal.id)}
                    activeOpacity={0.8}>
                    <Text
                      style={[
                        styles.detailBtnText,
                        isSmallScreen && styles.detailBtnTextSmall,
                      ]}>
                      View details ›
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
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
    marginBottom: 14,
    marginTop: 10,
  },
  titleSmall: {
    fontSize: 24,
    marginBottom: 10,
  },
  titleVerySmall: {
    fontSize: 20,
    marginBottom: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchWrapperSmall: {
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
  },
  searchInputSmall: {
    fontSize: 13,
  },
  mapWrapper: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    marginBottom: 200,
  },
  mapWrapperSmall: {
    marginBottom: 180,
    borderRadius: 16,
  },
  mapWrapperVerySmall: {
    marginBottom: 170,
    borderRadius: 14,
  },
  map: {
    flex: 1,
  },
  markerWrapper: {
    alignItems: 'center',
  },
  markerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    backgroundColor: COLORS.cardBgSolid,
  },
  markerCircleSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  randomButton: {
    position: 'absolute',
    bottom: 130,
    left: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 26,
    alignItems: 'center',
  },
  randomButtonSmall: {
    bottom: 120,
    paddingVertical: 12,
    borderRadius: 22,
  },
  randomButtonVerySmall: {
    bottom: 115,
    paddingVertical: 10,
    borderRadius: 20,
  },
  randomButtonText: {
    color: '#1A0B2E',
    fontSize: 14,
    fontWeight: '700',
  },
  randomButtonTextSmall: {
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  previewCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.cardBgSolid,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
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
  previewCardSmall: {
    padding: 16,
    borderRadius: 20,
  },
  previewCardVerySmall: {
    padding: 12,
    borderRadius: 18,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  closeIcon: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  previewImageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.primary,
    marginBottom: 16,
    marginTop: 8,
  },
  previewImageWrapperSmall: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  previewImageWrapperVerySmall: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewName: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  previewNameSmall: {
    fontSize: 18,
  },
  previewType: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  previewTypeSmall: {
    fontSize: 12,
    marginBottom: 6,
  },
  previewHabitat: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 18,
    textAlign: 'center',
  },
  previewHabitatSmall: {
    fontSize: 12,
    marginBottom: 14,
  },
  detailBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  detailBtnSmall: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  detailBtnText: {
    color: '#1A0B2E',
    fontSize: 15,
    fontWeight: '700',
  },
  detailBtnTextSmall: {
    fontSize: 14,
  },
});

export default MapScreen;