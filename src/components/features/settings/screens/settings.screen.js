import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { Avatar, List, Text } from "react-native-paper";

import styled from "styled-components/native";

import { SafeArea } from "../../../utility/safe-area.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
// import { Text } from "../../../typography/text.component";
// import { FadeInView } from "../../../components/animations/fade.animation";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

const SettingsBackground = styled.ImageBackground.attrs({
  source: require('../../../../../assets/background-bg.jpg')
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const SettingsItem = styled(List.Item)`
  padding: 16px;
  background-color: rgba(255,255,255,0.5) */
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );
  
  return (
    <SettingsBackground>
      <TransparentSafeArea>
      <ScrollView>
        <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            {!photo && (
              <Avatar.Icon size={180} icon="human" backgroundColor="#696AC3" />
            )}
            {photo && (
              <Avatar.Image
                size={180}
                source={{ uri: photo }}
                backgroundColor="#2182BD"
              />
            )}
          </TouchableOpacity>
          <View style={{paddingTop: 16}}>
            <Text style={{color: "#696AC3"}}>
              {user.email}
            </Text>
          </View>
        </AvatarContainer>
        <List.Section>
          {/* <SettingsItem
            title="Favourites"
            description="View your favourites"
            left={(props) => <List.Icon {...props} color="black" icon="heart" />}
            onPress={() => navigation.navigate("Favourites")}
          /> */}
          <SettingsItem
            title="Logout"
            left={(props) => <List.Icon {...props} color="black" icon="door" />}
            onPress={onLogout}
          />
        </List.Section>
        </ScrollView>
      </TransparentSafeArea>
    </SettingsBackground>
  );
};