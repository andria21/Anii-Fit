import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import styled from 'styled-components/native';
import { LogBox } from 'react-native';
import {AppRegistry} from 'react-native';

import { Navigation } from './src/components/navigation';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';

import { CategoriesProvider } from './src/components/exercises/categories.context';
import { CatProvider } from './src/context/card.context';

import {
  useFonts,
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light_Italic,
  Raleway_400Regular_Italic,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black_Italic,
} from '@expo-google-fonts/raleway';
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';


export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light_Italic,
    Raleway_400Regular_Italic,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  
  // if (!isAuthenticated) return null;
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
  return (
    <>
      <CatProvider>
        <AuthenticationContextProvider>
          <CategoriesProvider>
            <Navigation />
          </CategoriesProvider>
        </AuthenticationContextProvider>
      </CatProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};

AppRegistry.registerComponent(App);