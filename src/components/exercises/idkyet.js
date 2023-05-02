import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native';
import { Card, Text } from 'react-native-paper';
import { Video } from 'expo-av';
import { View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { db, getCategoriesAndDocuments } from '../../utils/firebase.utils';

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, onSnapshot } from 'firebase/firestore';


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


export const IdkYet = () => {
  const [playing, setPlaying] = useState(false);
  const [allDocs, setAllDocs] = useState([]);
 
    const fetchPost = async () => {
      const collectionRef = doc(db, 'categories', 'videos');
      onSnapshot(collectionRef, (doc) => {
        setAllDocs(doc.data().items);
      })
    }
   
    useEffect(()=>{
        fetchPost();
    }, [])
  

  return (
    <>
    <ExerciseCard elevation={2}>
    {
      allDocs.map(doc => {
      <Info key={doc.id}>
        <Text>{doc.imageUrl}</Text>
        <Text>{doc.name}</Text>
        <Text>{doc.comments}</Text>
      </Info>
      })
    }
    </ExerciseCard>
    </>
  );
};