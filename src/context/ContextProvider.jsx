import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  position: 1,
  setCurrentUser: () => {},
  setUserToken: () => {},
  setPosition: () => {}
});

export const ContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [position, setPosition] = useState(1);

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token)
    } else {
      localStorage.removeItem('TOKEN')
    }
    _setUserToken(token);
  }


  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const userStateContext = () => useContext(StateContext);
