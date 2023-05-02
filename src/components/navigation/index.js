import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';

import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : (<AccountNavigator />)}
    </NavigationContainer>
  )
  
};

{/* 
    <View>
      <Text>Not Authenticated!</Text>
    </View> 
*/}