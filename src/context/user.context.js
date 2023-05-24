import React, { createContext, useEffect, useState } from 'react'
import { fetchUsers } from '../utils/firebase.utils';

export const UsersContext = createContext({
  users: {},
  setUsers: () => null,
});

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState({});

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const users = await fetchUsers();
  //     console.log(users);
      
  //     setUsers(users);
  //   }
  //   getUsers();
  // }, []);

  const value = { users, setUsers };
  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};