import styled from "styled-components/native";
import { Button, TextInput } from 'react-native-paper';

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../../assets/bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const AccountContainer = styled.View`
  padding: 32px;
  margin-top: 8px;
  
`;

export const AuthButton = styled(Button).attrs({
  color: "#2182BD",
})`
  padding: 8px;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title = styled.Text`
  font-size: 30px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

// export const AnimationWrapper = styled.View`
//   width: 100%;
//   height: 40%;
//   position: absolute;
//   top: 30px;
//   padding: 8px;
// `;