import React from 'react';
import { Text, View, TextInput } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native';

import { ExercisesScreen } from '../screens/exercises-screen/exercises-screen';
import { UploadScreen } from '../screens/upload-screen/upload.screen';
import { SettingsNavigator } from './settings.navigator';
import { IdkYet } from '../exercises/idkyet';

const Tab = createBottomTabNavigator();

const Tab_ICON = {
  Exercises: "walk",
  Upload: "cloud-upload",
  Settings: "md-settings",
  Profile: "person"
};

const createScreenOptions = ({ route }) => {
  const iconName = Tab_ICON[route.name];
  return {
    tabBarIcon: ({ size, color}) => (
      <Ionicons name={iconName} size={size} color={"#696AC3"} tabBarActiveBackgroundColor="696AC3" />
    )
  };
};

export const AppNavigator = () => {
  return (
      <Tab.Navigator
        screenOptions={createScreenOptions}
      >
        <Tab.Screen name="Exercises" component={ExercisesScreen} options={{tabBarActiveTintColor: "#696AC3"}} />
        <Tab.Screen name="Upload" component={UploadScreen} options={{tabBarActiveTintColor: "#696AC3"}} />
        <Tab.Screen name="Settings" component={SettingsNavigator} options={{tabBarActiveTintColor: "#696AC3"}} />
        <Tab.Screen name="IdkYet" component={IdkYet} options={{tabBarActiveTintColor: "#696AC3"}} />
      </Tab.Navigator>
  );
};