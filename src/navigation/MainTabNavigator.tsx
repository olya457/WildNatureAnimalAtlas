import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import AnimalDetailScreen from '../screens/Explore/AnimalDetailScreen';
import FactsScreen from '../screens/Facts/FactsScreen';
import MapScreen from '../screens/Map/MapScreen';
import MapAnimalDetailScreen from '../screens/Map/AnimalDetailScreen';
import QuizScreen from '../screens/Quiz/QuizScreen';
import CrosswordScreen from '../screens/Crossword/CrosswordScreen';
import BottomNav from '../components/BottomNav/BottomNav';
import { MainTabParamList, ExploreStackParamList, MapStackParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const MapStack = createNativeStackNavigator<MapStackParamList>();

const ExploreNavigator = () => (
  <ExploreStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <ExploreStack.Screen name="ExploreList" component={ExploreScreen} />
    <ExploreStack.Screen name="AnimalDetail" component={AnimalDetailScreen} />
  </ExploreStack.Navigator>
);

const MapNavigator = () => (
  <MapStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <MapStack.Screen name="MapView" component={MapScreen} />
    <MapStack.Screen name="MapAnimalDetail" component={MapAnimalDetailScreen} />
  </MapStack.Navigator>
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Facts" component={FactsScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Crossword" component={CrosswordScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;