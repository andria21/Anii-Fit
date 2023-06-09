import React, { useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components/native';

import { FlatList, View, ScrollView, RefreshControl, TouchableOpacity, Alert, Modal, } from 'react-native';

import { SafeArea } from '../../utility/safe-area.component';

import { FadeInView } from '../../animations/fade.animation';
import { CategoriesContext } from '../../exercises/categories.context';
import { Button, Card, Text } from 'react-native-paper';
import { addCollectionAndDocuments, addNewDocument, db, fetchUsers, removeData } from '../../../utils/firebase.utils';

import YoutubePlayer from "react-native-youtube-iframe";

import { FlashList } from '@shopify/flash-list';
import { ShareContext } from '../../../services/share/share.context';
import { AntDesign } from '@expo/vector-icons';
import { collection, getDocs, query } from 'firebase/firestore';

import { uploadArrayToUsers } from '../../../utils/firebase.utils';


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

export const ExercisesScreen = () => {
  const { categoriesMap, loading, setLoading } = useContext(CategoriesContext);
  const { share, addToShare, removeFromShare } = useContext(ShareContext);
  // const { users, setUsers } = useContext(UsersContext);
  const [users, setUsers] = useState([]);

  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [visible, setVisible] = useState(false);

  const toggleModal = () => setVisible(!visible);

   useEffect(() => {
    const getPosts = [];
    const fetchUsers = async () => {
      const collectionRef = collection(db, "users");
      const q = query(collectionRef);
    
      const querySnapshot = await getDocs(q);
      try {
        querySnapshot.forEach(doc => {
          const data = doc.data();
  
          getPosts.push({
            ...data,
            key: doc.id
          })
          setUsers(getPosts);
          // const data = doc.data();
          // data.id = doc.id;
          // setFetchData(data);;
        });
      } catch (error) {
        console.log(error);
      }
      
    }
   fetchUsers()
   
   }, [])

   // NEED TO ADD FEATURE THAT SHOWS MESSAGE " NO DATA FOUND FOR USER"

   // on pull refresh icons are red....
   // flashlist needed...

  useEffect(() => {
    setLoading(true);
    console.log("Refresh ->");
  }, [loading])

  const pull = () => {
    setRefresh(true);
    setLoading(false);

    setTimeout(() => {
      setRefresh(false);
      setLoading(true);
    }, 1500)
  }

  // const isFavourite = share.find((obj) => obj.id === exercise.id);

  return loading ? (
    <SafeArea>
      <FadeInView>
      <MainScrollView refreshControl = {
        <RefreshControl 
          refreshing = {refresh}
          onRefresh={() => pull()}
        />
      }>
      <ShareButton labelStyle={{ color: "cyan", fontSize: 14, }} onPress={toggleModal}>SHARE</ShareButton>
      <Modal
      visible={visible}
      animationType='slide'
      onRequestClose={toggleModal}
      >
        <SafeArea>
          <Button labelStyle={{ color: "red", fontSize: 16, }} onPress={toggleModal}>HIDEEEE</Button>
            
          {users?.map(item => (
            <ShareButton 
            labelStyle={{ color: "cyan", fontSize: 14, }} 
            key={item.key}
            onPress={async () => {
              if ( share.length === 0) return alert("Choose items to share first!");
              item.sharedItems.push(share)
              uploadArrayToUsers(item.key, share)
              alert("Exercises have been shared successfully with - " + item.email);
            }}
            >
              {item.email}
            </ShareButton>
          ))}
        </SafeArea>
      </Modal>
      {categoriesMap.videos?.map(exercise => {
        const isFavourite = share.find((obj) => obj.id === exercise.id);
          return (
            <ExerciseCard elevation={2} key={exercise.id}>

              <FavouriteButton onPress={() => isFavourite ? removeFromShare(exercise) : addToShare(exercise)
              }>
                <AntDesign 
                  name={
                    isFavourite ? "pluscircle" : "pluscircleo"
                  }
                  size={27}
                  color={
                    isFavourite ? "red" : "white"
                  }
                />
              </FavouriteButton>
              
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
                <EditButton labelStyle={{ color: "cyan", fontSize: 14, }} onPress={() => categoriesMap.videos?.filter(item => {
                  if (item === exercise) {
                    removeData(item)
                    setLoading(false)
                  }
                })}>DELETE
                </EditButton>
              </Info>
            </ExerciseCard>
          )
        })
      }
      </MainScrollView>
      </FadeInView>
    </SafeArea>
  ) : null
}

