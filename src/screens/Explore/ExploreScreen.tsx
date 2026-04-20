import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Background from '../../components/Background/Background';
import AnimalCard from '../../components/AnimalCard/AnimalCard';
import { ANIMALS } from '../../data/animals';
import { COLORS } from '../../utils/theme';
import { AnimalCategory, ExploreStackParamList } from '../../types';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

type NavProp = NativeStackNavigationProp<ExploreStackParamList, 'ExploreList'>;

const CATEGORIES: AnimalCategory[] = ['Mammals', 'Birds', 'Reptiles'];

const ExploreScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { top, isSmallScreen, isVerySmallScreen } = useSafeSpacing();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<AnimalCategory>('Mammals');

  const filteredAnimals = useMemo(() => {
    return ANIMALS.filter(a => {
      const matchCategory = a.category === category;
      const matchSearch =
        search === '' ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.type.toLowerCase().includes(search.toLowerCase()) ||
        a.habitat.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  const openAnimal = (id: string) => {
    navigation.navigate('AnimalDetail', { animalId: id });
  };

  const openRandom = () => {
    const random = filteredAnimals[Math.floor(Math.random() * filteredAnimals.length)];
    if (random) openAnimal(random.id);
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
          Explore Wildlife
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

        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBtn,
                  isSmallScreen && styles.categoryBtnSmall,
                  category === cat && styles.categoryBtnActive,
                ]}
                onPress={() => setCategory(cat)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.categoryText,
                    isSmallScreen && styles.categoryTextSmall,
                    category === cat && styles.categoryTextActive,
                  ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {filteredAnimals.length === 0 ? (
          <View style={styles.emptyWrapper}>
            <Text style={styles.emptyText}>No results!</Text>
          </View>
        ) : (
          <FlatList
            data={filteredAnimals}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <AnimalCard animal={item} onPress={() => openAnimal(item.id)} />
              </View>
            )}
          />
        )}

        <TouchableOpacity style={styles.randomButton} onPress={openRandom} activeOpacity={0.8}>
          <Text style={styles.randomButtonText}>Open randomly ›</Text>
        </TouchableOpacity>
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
    marginBottom: 12,
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
  categoriesWrapper: {
    height: 52,
    marginBottom: 10,
  },
  categoriesContent: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingRight: 16,
  },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 22,
    marginRight: 10,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
  },
  categoryBtnSmall: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextSmall: {
    fontSize: 13,
  },
  categoryTextActive: {
    color: '#1A0B2E',
    fontWeight: '700',
  },
  list: {
    paddingBottom: 180,
    paddingTop: 4,
  },
  row: {
    justifyContent: 'space-between',
    gap: 10,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '49%',
  },
  emptyWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    color: COLORS.text,
    fontSize: 14,
  },
  randomButton: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  randomButtonText: {
    color: '#1A0B2E',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ExploreScreen;