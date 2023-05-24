import React, { createContext, useEffect, useState } from 'react'
import { fetchUsers } from '../utils/firebase.utils';

export const UsersContext = createContext({
  users: {},
});

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      console.log(users);
      
      setUsers(users);
    }
    getUsers();
  }, []);

  const value = { users };
  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};