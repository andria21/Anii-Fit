import React, { useContext } from 'react'

import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';

import { AccountBackground, AccountContainer, AccountCover, AuthButton, AuthInput, Title, ErrorContainer } from '../components/account.styles';


import { AuthenticationContext } from '../../../../services/authentication/authentication.context';

import { View } from 'react-native';

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");
  const { onRegister, isLoading, error, resetError } = useContext(AuthenticationContext);

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
        <View style={{paddingTop: 16}}>
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </View>
        {error && (
          <ErrorContainer>
            <View style={{paddingTop: 16}}>
              <Text>{error}</Text>
            </View>
          </ErrorContainer>
        )}
        <View style={{paddingTop: 16}}>
          {!isLoading ? (
            <AuthButton
            icon="email"
            mode="contained"
            onPress={() => onRegister(email, password, repeatedPassword)}
          >
            Register
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