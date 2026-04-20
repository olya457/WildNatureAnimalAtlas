import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/theme';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

interface CustomKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

const ROW_1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const ROW_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const ROW_3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({
  onKeyPress,
  onBackspace,
  onEnter,
}) => {
  const { isSmallScreen, isVerySmallScreen } = useSafeSpacing();

  const renderKey = (key: string) => (
    <TouchableOpacity
      key={key}
      style={[
        styles.key,
        isSmallScreen && styles.keySmall,
        isVerySmallScreen && styles.keyVerySmall,
      ]}
      onPress={() => onKeyPress(key)}
      activeOpacity={0.6}>
      <Text
        style={[
          styles.keyText,
          isSmallScreen && styles.keyTextSmall,
          isVerySmallScreen && styles.keyTextVerySmall,
        ]}>
        {key}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>{ROW_1.map(renderKey)}</View>
      <View style={styles.row}>{ROW_2.map(renderKey)}</View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.specialKey,
            styles.backspaceKey,
            isSmallScreen && styles.specialKeySmall,
          ]}
          onPress={onBackspace}
          activeOpacity={0.6}>
          <Text style={[styles.specialText, isSmallScreen && styles.specialTextSmall]}>
            ⌫
          </Text>
        </TouchableOpacity>
        {ROW_3.map(renderKey)}
        <TouchableOpacity
          style={[
            styles.specialKey,
            styles.enterKey,
            isSmallScreen && styles.specialKeySmall,
          ]}
          onPress={onEnter}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.enterText,
              isSmallScreen && styles.specialTextSmall,
            ]}>
            ✓
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
    gap: 4,
  },
  key: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.cardBgSolid,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    maxWidth: 38,
  },
  keySmall: {
    height: 38,
    maxWidth: 34,
    borderRadius: 6,
  },
  keyVerySmall: {
    height: 34,
    maxWidth: 30,
  },
  keyText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  keyTextSmall: {
    fontSize: 14,
  },
  keyTextVerySmall: {
    fontSize: 13,
  },
  specialKey: {
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(157, 78, 221, 0.4)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  specialKeySmall: {
    height: 38,
    paddingHorizontal: 10,
  },
  backspaceKey: {
    minWidth: 50,
  },
  enterKey: {
    backgroundColor: COLORS.primary,
    minWidth: 50,
  },
  specialText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  specialTextSmall: {
    fontSize: 16,
  },
  enterText: {
    color: '#1A0B2E',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default CustomKeyboard;