import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
  background-color: white;
`;