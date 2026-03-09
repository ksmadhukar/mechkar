import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInter,
} from '@expo-google-fonts/inter';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_700Bold,
  useFonts as usePlayfair,
} from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { View } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from './src/theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [playfairLoaded] = usePlayfair({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_700Bold,
  });

  const fontsLoaded = interLoaded && playfairLoaded;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.backgroundPrimary }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" backgroundColor={Colors.backgroundPrimary} />
      <AppNavigator />
    </View>
  );
}
