import { createContext, useState } from 'react';

const UserContext = createContext();

const initialUser = { id: 1, name: 'Miguel' };

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const data = { user, isLoginClicked, setIsLoginClicked };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };

export default UserContext;
