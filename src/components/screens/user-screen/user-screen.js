import React, { useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components/native';

import { FlatList, View, ScrollView, RefreshControl, TouchableOpacity, Alert, Modal, } from 'react-native';

import { SafeArea } from '../../utility/safe-area.component';

import { FadeInView } from '../../animations/fade.animation';
import { Button, Card, Text } from 'react-native-paper';
import { db } from '../../../utils/firebase.utils';

import YoutubePlayer from "react-native-youtube-iframe";

import { FlashList } from '@shopify/flash-list';
import { doc, getDoc} from 'firebase/firestore';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const MainScrollView = styled.ScrollView`
  padding: 9px;
`;

const YtPlayer = styled(YoutubePlayer)`


`;
const ExerciseCard = styled(Card)`
  background-color: white;
  margin-bottom: 16px;
  padding: 11px;

`;
const Title = styled.Text`
  padding: 16px;
  font-family: Raleway_700Bold_Italic;
  font-size: 18px;
`;

const Comments = styled.Text`
  padding: 16px;
  font-family: Raleway_700Bold_Italic;
`;

const Info = styled.View`
  padding: 8px;
`;

const EditButton = styled(Button)`
  background-color: #000000;
  margin-left: 40px;
  margin-right: 40px;
`;

const FavouriteButton = styled(TouchableOpacity)`
    position: absolute;
    top: 4px;
    right: 5px;
    z-index: 9;
`;

const ShareButton = styled(Button)`
  background-color: #000000;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 9px;
`;
// const FlashyList = styled(FlashList)`
// padding: 16;
// `;

export const UserScreen = () => {
  const { user } = useContext(AuthenticationContext);
  const [users, setUsers] = useState([]);

  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);

  if ( user.uid === 'bjswav5cBaP54zhGmonhOXY7g3K2') return;
    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnapshot = await getDoc(docRef);
            const data = docSnapshot.data();

            setUsers(data);
        } catch (error) {
            console.log(error);

        }
      
    }
   fetchUsers()
   
   }, [])
  
  

  const pull = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1500)
  }

  return (
    <SafeArea>
      <FadeInView>
      <MainScrollView refreshControl = {
        <RefreshControl 
          refreshing = {refresh}
          onRefresh={() => pull()}
        />
      }>
      {users?.sharedItems?.map(exercise => {
            return (
                <ExerciseCard elevation={2} key={exercise.id}>              
                  <YtPlayer
                    height={170}
                    width={280}
                    play={playing}
                    videoId={exercise.imageUrl}
                    initialPlayerParams={{
                      loop: true
                    }}
                  />
                  <Info>
                    <Title>{exercise.name}</Title>
                    <Comments>{exercise.comments}</Comments>
                  </Info>
                </ExerciseCard>
              )
        })
      }
      </MainScrollView>
      </FadeInView>
    </SafeArea>
  )
}

