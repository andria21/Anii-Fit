import React, { createContext, useEffect, useState } from 'react'
import { getCategoriesAndDocumentsa } from '../utils/firebase.utils';


export const CatContext = createContext({
  catMap: {},
});

export const CatProvider = ({ children }) => {
  const [catMap, setCatMap] = useState({});


  useEffect(() => {
    const getCategoriesMap = async () => {
      const cattyMap = await getCategoriesAndDocumentsa();
      setCatMap(cattyMap);
    }
    getCategoriesMap();
  }, []);

  const value = { catMap };
  return (
    <CatContext.Provider value={value}>
      {children}
    </CatContext.Provider>
  );
};