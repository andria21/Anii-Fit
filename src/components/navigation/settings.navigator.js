import React from "react";
import { SettingsScreen } from "../features/settings/screens/settings.screen";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { CameraScreen } from "../features/settings/screens/camera.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings1"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};