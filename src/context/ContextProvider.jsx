import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  position: '',
  numero: {},
  isChangingPosition: false,
  numerosTV: [],
  setCurrentUser: () => {},
  setUserToken: () => {},
  setPosition: () => {},
  setNumero: () => {},
  setNumerosTV: () => {}
});

export const ContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [position, setPosition] = useState('');
  const [ isChangingPosition, setIsChangingPosition ] = useState(false);
  const [numero, setNumero] = useState({
    'nro': null,
    'estado': "none",
    'fila': "none",
    'prefix': "none",
    'lugar': "none",
  });
  const [numerosTV, setNumerosTV] = useState([]);//array para guardar los numeros que ya fueron llamados y mostarlos en la TV

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
        isChangingPosition,
        setIsChangingPosition,
        position,
        setPosition,
        numero,
        setNumero,
        numerosTV,
        setNumerosTV
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const userStateContext = () => useContext(StateContext);
