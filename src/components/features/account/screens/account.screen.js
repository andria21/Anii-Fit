import React from 'react'
import { View } from 'react-native';
import { AccountBackground, AccountCover, AccountContainer, AuthButton, Title } from '../components/account.styles';

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title>AniFit</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}>
          Login
        </AuthButton>
        <View style={{paddingTop: 16}}>
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}>
            Register
          </AuthButton>
        </View>
      </AccountContainer>
    </AccountBackground>
  );
};