import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native';
import { Card, Text } from 'react-native-paper';
import { Video } from 'expo-av';
import { View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

import { CategoriesContext } from './categories.context';

const ExerciseCardCover = styled(Card.Cover)`
  padding: 20px;
  background-color: white;
`;

const ExerciseCard = styled(Card)`
  background-color: white;
  margin-bottom: 16px;
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


export const ExerciseInfo = ({ exercise }) => {
  const [playing, setPlaying] = useState(false);
  // const { categoriesMap } = useContext(CategoriesContext);
  const { imageUrl, id, name, comments } = exercise;
  // const {
  //   name = "Deadlift",
  //   photos = [
  //     "https://cdn.pixabay.com/photo/2017/01/02/11/52/workout-1946596_960_720.jpg"
  //   ],
  //   comments = "4sets 5reps",
  // } = exercise;

  return (
    <>
    <ExerciseCard elevation={2} key={id}>
      {/* <ExerciseCardCover key={name} source={{ uri: photos[0]}} /> */}

      <YoutubePlayer
        key={id}
        height={300}
        width={288}
        margin={16}
        play={playing}
        videoId={imageUrl}
        initialPlayerParams={{
          loop: true
        }}
      />
      <Info>
        <Title>{name}</Title>
        <Comments>{comments}</Comments>
      </Info>
      

    </ExerciseCard>
    </>
  );
};