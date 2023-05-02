import React, { useContext, useState } from 'react';

import { ActivityIndicator, Button, MD2Colors, Text } from 'react-native-paper';

import { AccountBackground, AccountContainer, AccountCover, AuthButton, AuthInput, Title, ErrorContainer } from '../components/account.styles';

import { AuthenticationContext } from '../../../../services/authentication/authentication.context';
import { View } from 'react-native';



export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, isLoading, error, resetError } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>AniFit</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <View style={{paddingTop: 16}}>
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </View>
        {error && (
          <ErrorContainer>
            <View style={{paddingTop: 16}}>
              <Text style={{color: "#ff0000"}}>{error}</Text>
            </View>
          </ErrorContainer>
        )}
        <View style={{paddingTop: 16}}>
          {!isLoading ? (
            <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => onLogin(email, password)}
          >
            Login
          </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={MD2Colors.blue300} />
          ) }
        </View>
      </AccountContainer>
      <View style={{paddingTop: 16}}>
        <AuthButton mode="contained" onPress={() => {navigation.goBack(), resetError()}}>
          Back
        </AuthButton>
      </View>
    </AccountBackground>
  );
};