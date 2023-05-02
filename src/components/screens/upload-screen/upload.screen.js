import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Form, FormItem } from 'react-native-form-component';
import { SafeArea } from '../../utility/safe-area.component';

//import storage from '@react-native-firebase/storage';
// import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text, TextInput } from 'react-native-paper';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { uploadData } from '../../../utils/firebase.utils';


export const AccountContainer = styled.View`
  padding: 32px;
  margin-top: 8px;
`;

export const AuthInput = styled(TextInput)`
  margin-bottom: 16px;
`;
export const TextArea = styled(TextInput)`
  height:150px;
  text-align-vertical: 'top';
`;

export const Title = styled.Text`
  font-size: 30px;
`;

 export const UploadScreen = () => {

  const [text, SetText] = useState("");
  const [textArea, setTextArea] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  const data = {
    id: randomNumber,
    name: text,
    imageUrl: videoUrl,
    comments: textArea,
  };

  const handleUpload = () => {
    if ( data.name.length && data.imageUrl.length && data.comments.length ) {
      uploadData(data);
      alert(" Your data has been uploaded! ");
      SetText("");
      setTextArea("");
      setVideoUrl("");
    } else {
      alert("Please fill out all inputs!")
    }
    
  }

  return (
    <SafeArea>
      <ScrollView>
      <AccountContainer>
        <AuthInput
          label="Name"
          value={text}
          textContentType="none"
          keyboardType="default"
          autoCapitalize="sentences"
          onChangeText={(t) => SetText(t)}
        />
        <AuthInput
          label="Video URL (youtube)"
          value={videoUrl}
          textContentType="none"
          keyboardType="default"
          autoCapitalize="sentences"
          onChangeText={(url) => setVideoUrl(url)}
        />
        <TextArea
          label="Comments"
          multiline={false}
          numberOfLines={10}
          value={textArea}
          textContentType="none"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(ta) => setTextArea(ta)}
        />
        </AccountContainer>
         <Button title="Select" onPress={() => handleUpload()}>UPLOAD</Button>
      </ScrollView>
    </SafeArea>
  );
};