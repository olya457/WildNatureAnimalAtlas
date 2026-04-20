import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { COLORS } from '../../utils/theme';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

const TAB_ICONS: { [key: string]: string } = {
  Explore: '🔍',
  Facts: '💡',
  Map: '📍',
  Quiz: '❓',
  Crossword: '🔠',
};

const TAB_LABELS: { [key: string]: string } = {
  Explore: 'Explore',
  Facts: 'Facts',
  Map: 'Map',
  Quiz: 'Quiz',
  Crossword: 'Crossword',
};

const BottomNav: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { navBottomOffset, isSmallScreen, isVerySmallScreen } = useSafeSpacing();

  return (
    <View style={[styles.wrapper, { bottom: navBottomOffset }]}>
      <View
        style={[
          styles.container,
          isSmallScreen && styles.containerSmall,
          isVerySmallScreen && styles.containerVerySmall,
        ]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const icon = TAB_ICONS[route.name] || '•';
          const label = TAB_LABELS[route.name] || route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.iconWrapper,
                  isSmallScreen && styles.iconWrapperSmall,
                  isFocused && styles.iconWrapperActive,
                ]}>
                <Text style={[styles.icon, isSmallScreen && styles.iconSmall]}>{icon}</Text>
              </View>
              <Text
                style={[
                  styles.label,
                  isSmallScreen && styles.labelSmall,
                  isFocused && styles.labelActive,
                ]}
                numberOfLines={1}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 12,
    right: 12,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.navBg,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  containerSmall: {
    paddingVertical: 6,
    borderRadius: 22,
  },
  containerVerySmall: {
    paddingVertical: 4,
    borderRadius: 18,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconWrapperSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  iconWrapperActive: {
    backgroundColor: COLORS.navActiveBg,
  },
  icon: {
    fontSize: 20,
  },
  iconSmall: {
    fontSize: 16,
  },
  label: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  labelSmall: {
    fontSize: 9,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default BottomNav;