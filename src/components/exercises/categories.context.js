import React, { createContext, useEffect, useState } from 'react'
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
  loading: true,
  setLoading: () => null
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, [loading]);

  const value = { categoriesMap, loading, setLoading};
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};