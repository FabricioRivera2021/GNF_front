import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  position: '',
  numero: {},
  isChangingPosition: false,
  numerosTV: [],
  showModal: false,
  allDerivates: [],
  filtros: [],
  setCurrentUser: () => {},
  setUserToken: () => {},
  setPosition: () => {},
  setNumero: () => {},
  setNumerosTV: () => {},
  setShowModal: () => {},
  setAllDerivates: () => {},
  setFiltros: () => {}
});

export const ContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [position, setPosition] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isChangingPosition, setIsChangingPosition] = useState(false);
  const [allDerivates, setAllDerivates] = useState([]);//posibles posiciones para derivar
  const [numero, setNumero] = useState({
    'nro': null,
    'estado': "none",
    'fila': "none",
    'prefix': "none",
    'lugar': "none",
  });
  const [numerosTV, setNumerosTV] = useState([]);//array para guardar los numeros que ya fueron llamados y mostarlos en la TV
  const [filtros, setFiltros] = useState([]);//filtros para la tabla de llamador

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
        setNumerosTV,
        showModal,
        setShowModal,
        allDerivates,
        setAllDerivates,
        filtros,
        setFiltros
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const userStateContext = () => useContext(StateContext);
