import { Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useSafeSpacing = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const bottomOffset = Platform.OS === 'ios' ? 20 : 30;
  const topOffset = Platform.OS === 'ios' ? 20 : 30;

  return {
    top: Math.max(insets.top, topOffset),
    bottom: Math.max(insets.bottom, bottomOffset),
    navBottomOffset: bottomOffset,
    navTopOffset: topOffset,
    width,
    height,
    isSmallScreen: height < 700,
    isVerySmallScreen: height < 600,
  };
};