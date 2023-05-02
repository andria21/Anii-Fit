import React, { useContext, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components/native';

import { FlatList, View, ScrollView, RefreshControl } from 'react-native';

import { ExerciseInfo } from '../../exercises/exercise-info.component';
import { SafeArea } from '../../utility/safe-area.component';

import { FadeInView } from '../../animations/fade.animation';
import { CategoriesContext } from '../../exercises/categories.context';
import { Button, Card, Text } from 'react-native-paper';
import { addCollectionAndDocuments, addNewDocument, removeData } from '../../../utils/firebase.utils';
import SHOP_DATA from '../../../../video_data'
import VIDEO_DATA from '../../../../new-video-data'
import YoutubePlayer from "react-native-youtube-iframe";

import { FlashList } from '@shopify/flash-list';
import { updateVideoDoc } from '../../../utils/firebase.utils';
import { CatContext } from '../../../context/card.context';

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
  width: 10px;
`;
// const FlashyList = styled(FlashList)`
// padding: 16;
// `;

export const ExercisesScreen = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const { catMap } = useContext(CatContext);
  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])
  // Object.keys(categoriesMap).map(exercise => {
  //   console.log(exercise);
  // es logavs arrays cifrebs wtf
  // })
  

  // const handleKeys = (id, data) => {
  //   console.log(id);

  //   data.filter(item => {
  //     item.id !== id;
  //   })
  // }

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
      {
        categoriesMap.videos?.map(exercise => {
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
                <EditButton onPress={() => categoriesMap.videos?.filter(item => {
                  if (item === exercise) {
                    removeData(item)
                  }
                })}>Edit</EditButton>
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

