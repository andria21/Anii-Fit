import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, updateDoc, addDoc, arrayUnion, arrayRemove, FieldValue, deleteField } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDjLD37ftFTa0fcWCb0ryajhts0BzkO0No",
  authDomain: "anifit-423a4.firebaseapp.com",
  projectId: "anifit-423a4",
  storageBucket: "anifit-423a4.appspot.com",
  messagingSenderId: "42852656035",
  appId: "1:42852656035:web:0cd7b4efba7b4d25d4f016"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title);
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title] = items;
    return acc;
  }, {});

  return categoryMap;
}

export const getCategoriesAndDocumentsa = async () => {
  const colRef = collection(db, "categories2");
  const items = [];
  try {
    const docsSnap = await getDocs(colRef);
    const cattyMap = docsSnap.forEach(doc => {
        // console.log(doc.data());
        // console.log(doc.id); 
        items.push(doc.data());
        return items;
    });

    return items;

} catch (error) {
    console.log(error);
}
}

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    const sharedItems = [];

    try {
        await setDoc(userDocRef, {
        email,
        createdAt,
        sharedItems,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const updateVideoDoc = async (key, imageUrl) => {
  const collectionRef = doc(db, "categories1", "videos");

  // Atomically add a new region to the "regions" array field.
  await updateDoc(collectionRef, {
    items: [key]={
      imageUrl: imageUrl
    }
  });
  
}

export const addNewDocument = async (data) => {
  const docRef = await addDoc(collection(db, "categories2"), data);
  console.log("Document written with ID: ", docRef.id);
  
}

export const uploadData = async (data) => {
  const collectionRef = doc(db, "categories", "videos");

  await updateDoc(collectionRef, {
    items: arrayUnion(data)
});
}

export const removeData = async (data) => {
  const collectionRef = doc(db, "categories", "videos");

  await updateDoc(collectionRef, {
    items: arrayRemove(data)
    
});
}

export const fetchUsers = async () => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    
    return data;
  });
}