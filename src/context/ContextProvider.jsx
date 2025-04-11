import { set } from "date-fns";
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
  filterPaused: false,
  filterCancel: false,
  showMedicationModal: false,
  showMedicoModal: false,
  showTreatmentModal: false,
  medications: [],
  tratamientos: [],
  addMedication: {},
  historicoRetiros: [],
  startDate: 1,
  treatmentDays: 0,
  events: [],
  medico: {},
  allMedicos: [],
  setCurrentUser: () => {},
  setUserToken: () => {},
  setPosition: () => {},
  setNumero: () => {},
  setNumerosTV: () => {},
  setShowModal: () => {},
  setAllDerivates: () => {},
  setFiltros: () => {},
  setFilterPaused: () => {}, 
  setFilterCancel: () => {},
  setShowMedicationModal: () => {},
  setShowMedicoModal: () => {},
  setShowTreatmentModal: () => {},
  setMedications: () => {},
  setTratamientos: () => {},
  setAddMedication: () => {},
  setHistoricoRetiros: () => {},
  setStartDate: () => {},
  setTreatmentDays: () => {},
  setEvents: () => {},
  setMedico: () => {},
  setAllMedicos: () => {},
});

export const ContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [filterPaused, setFilterPaused] = useState(false);//cantidad numeros pausados
  const [filterCancel, setFilterCancel] = useState(false);//cantidad numeros cancelados
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [position, setPosition] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isChangingPosition, setIsChangingPosition] = useState(false);
  const [allDerivates, setAllDerivates] = useState([]);//posibles posiciones para derivar
  const [numero, setNumero] = useState({'nro': null, 'estado': "none", 'fila': "none", 'prefix': "none", 'lugar': "none"});
  const [numerosTV, setNumerosTV] = useState([]);//array para guardar los numeros que ya fueron llamados y mostarlos en la TV
  const [filtros, setFiltros] = useState([]);//filtros para la tabla de llamador
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showMedicoModal, setShowMedicoModal] = useState(false);
  const [medications, setMedications] = useState([]);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [tratamientos, setTratamientos] = useState([]);
  const [addMedication, setAddMedication] = useState({});
  const [historicoRetiros, setHistoricoRetiros] = useState([]); //historico de retiros
  const [startDate, setStartDate] = useState(new Date());//set start date as today
  const [treatmentDays, setTreatmentDays] = useState(0);
  const [events, setEvents] = useState([
    {
      title: `Tratamiento (${treatmentDays} días)`,
      start: startDate,
      end: new Date(startDate.getTime() + treatmentDays * 24 * 60 * 60 * 1000), // Calcula la fecha de fin
      allDay: true
    }
  ]);
  const [medico, setMedico] = useState({});
  const [allMedicos, setAllMedicos] = useState([]);

  //funcion para agregar un nuevo numero a la TV
  const addNumeroTV = (nuevoNumero) => {
    setNumerosTV((prev) => {
      const updatedArray = [nuevoNumero, ...prev];
      return updatedArray.length > 5 ? updatedArray.slice(-5) : updatedArray;
    });
  };

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
        setFiltros,
        filterCancel,
        setFilterCancel,
        filterPaused,
        setFilterPaused,
        addNumeroTV,
        showMedicationModal,
        setShowMedicationModal,
        showMedicoModal,
        setShowMedicoModal,
        medications,
        setMedications,
        tratamientos,
        setTratamientos,
        addMedication,
        setAddMedication,
        historicoRetiros,
        setHistoricoRetiros,
        showTreatmentModal,
        setShowTreatmentModal,
        startDate,
        setStartDate,
        treatmentDays,
        setTreatmentDays,
        events,
        setEvents,
        medico,
        setMedico,
        allMedicos,
        setAllMedicos
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const userStateContext = () => useContext(StateContext);