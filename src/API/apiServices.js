/**
 * Llamadas a la API de laravel
 */

import axios from "axios";
import axiosClient from "../axiosCustom";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllNumbers = (filter, setNumeros, setError) => {
    axios
        .get(`${API_URL}/allNumbers/${filter}`)
        .then(({ data }) => {
            setNumeros(data);
        })
        .catch((error) => {
            console.error('There was an error fetching the data!', error);
            setError(error);
        });
}

export const fetchPausedNumbers = (setNumeros) => {
    axios
        .get('http://localhost:8000/api/filterPausedNumbers')
        .then(({ data }) => {
            setNumeros(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const fetchCancelNumbers = (setNumeros) => {
    axios
        .get('http://localhost:8000/api/filterCancelNumbers')
        .then(({ data }) => {
            setNumeros(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getCurrentSelectedNumber = (setNumero) => {
    axios
        .get('http://localhost:8000/api/getCurrentSelectedNumber')
        .then(({data}) => {
            setNumero({
                'nro': data.nro,
                'estado': data.estado,
                'fila': data.fila,
                'prefix': data.prefix,
                'lugar': data.lugar,
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

export const fetchAllEstados = (setFiltros) => {
    axios
        .get(`${API_URL}/allEstados`)
        .then(response => {
            setFiltros(response.data); // Access the data from the response
        })
        .catch(error => {
            console.error('Error fetching estados:', error);
        });
}

//! convertir esto a websocket
export const handleLlamarNumero = (id, paused, canceled, setNumero) => {
    console.log("handleLlamarNumero");
    axios
        .post("http://localhost:8000/api/asignNumberToUser", {
            id: id,
            paused: paused,
            canceled: canceled,
        })
        .then(({data}) => {
            //logica nueva
            const nuevoNumero = {
                'nro': data.nro,
                'estado': data.estado,
                'fila': data.fila,
                'prefix': data.prefix,
                'lugar': data.lugar
            };
            setNumero(nuevoNumero);

            console.log("sending broadcast to llamador TV");
        })
        .catch((error) => {
            console.log(error);
        })
}

// Cambia el estado del numero seleccionado al siguiente estado
export const handleSetNextState = (number, setNumero) => {
    console.log("handleSetNextState");
    axios
        .post("http://localhost:8000/api/setNextState", {
            numero: number
        })
        .then(({data}) => {
            console.log(data)
            setNumero({
                'nro': null,
                'estado': "none",
                'fila': "none",
                'prefix': "none",
                'lugar': "none",
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

// Setea el numero al estado de pausado
// a websocket
export const handlePauseNumber = (number, setNumero) => {
    console.log("handlePauseNumber");
    axios
        .post("http://localhost:8000/api/setPause", {
            numero: number
        })
        .then(({data}) => {
            console.log(data);
            // setPausedCount++;
            setNumero({
                'nro': null,
                'estado': "none",
                'fila': "none",
                'prefix': "none",
                'lugar': "none",
            });
        })
        .catch((error) => {
            console.log(error);
        })
}

// Setea el numero al estado de cancelado
// a websocket
export const handleCancelNumber = (number, setNumero) => {
    console.log("handleCancelNumber");
    axios
        .post("http://localhost:8000/api/setCanceled", {
            numero: number
        })
        .then(({data}) => {
            console.log(data);
            // setPausedCount++;
            setNumero({
                'nro': null,
                'estado': "none",
                'fila': "none",
                'prefix': "none",
                'lugar': "none",
            });
        })
        .catch((error) => {
            console.log(error);
        })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Estas dos funciones son de la parte de derivar el numero a una posicion cualquiera
 * Funcionan en conjunto en el componente LlamadorPanel.jsx y el componente Llamador.jsx
 */
// Setea el modal para derivar el numero
export const handleDerivateTo = (number, setShowModal, setAllDerivates) => {
    console.log("handleDerivateTo");
    setShowModal(true);
    axios
        .get("http://localhost:8000/api/derivateTo", {
            number: number,
        })
        .then(({data}) => {
            console.log(data);
            setAllDerivates(data);
        })
        .catch((error) => {
            console.log(error);
        })
}

// Deriva el numero a la posicion seleccionada
export const handleDerivateToPosition = (number, position, setIsDerivating, setNumero, setShowModal) => {
    console.log("handleDerivateToPosition");
    setShowModal(false);
    axios
        .post("http://localhost:8000/api/derivateToPosition", {
            number: number,
            position: position
        })
        .then(({data}) => {
            console.log(data);
            setIsDerivating(false);
            setNumero({
                'nro': null,
                'estado': "none",
                'fila': "none",
                'prefix': "none",
                'lugar': "none",
            });
        })
        .catch((error) => {
            console.log(error);
        })
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//trae todos los medicamentos de la base de datos
export const fetchAllMedicamentos = (setMedicamentos) => {
    axios
        .get(`${API_URL}/allMedications`)
        .then(response => {
        //   console.log("allmedications endpoint", response.data);
            setMedicamentos(response.data);
        })
        .catch(error => {
            console.error('Error fetching medicamentos:', error);
        });
}

//trae todos los medicos
export const fetchAllMedicos = (setAllMedicos) => {
    axios
        .get(`${API_URL}/allMedicos`)
        .then(response => {
        //   console.log("allmedicos endpoint", response.data);
            setAllMedicos(response.data);
        })
        .catch(error => {
            console.error('Error fetching medicos:', error);
        });
}

//trae todos los tratamiendos de un usuario en particular
export const fetchTratamiento = (customer_id, setTratamientos) => {
    console.log(`${API_URL}/allTreatments/${customer_id}`);
    axios
        .get(`${API_URL}/allTreatments/${customer_id}`)   
        .then(response => {
            setTratamientos(response.data);
            console.log(response.data);
            
        })
        .catch(error => {
            console.error('Error fetching tratamientos:', error);
        });
}

//crear un nuevo tratamiento
export const createTreatment = (
      startDate,
      medico, //id
      medication, //id
      currentUser, //id
      treatmentDays,
      interval,
      numero
    ) => {

    const endDate = new Date(startDate); // Clonar startDate
    endDate.setDate(endDate.getDate() + treatmentDays - 1);

    // Format dates to 'YYYY-MM-DD'
    const formatDate = (date) => {
      return date.toISOString().split('T')[0]; // '2025-05-09'
    };

    const tratamiento = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      ttoDiaMes: 10, //hardcodeado
      medicoID: medico,
      medicationID: medication,
      customerID: 1, //hardcodeado
      userID: currentUser, 
      activo: true, //hardcodeado
      treatmentDays: treatmentDays,
      totalDiasPendientes: 10, //harcdcodeado
      retirosPorMes: 10, //hardcodeado
      retirosPendientes: 10, //hardcodeado
      tipoTto: 'Comun', //hardcodeado
      frecuencia: interval,
      cantidadDiaria: 10, //hardcodeado
      numero: numero, //para conseguir el id del customer desde el backend
    }

    console.log(`${API_URL}/createTreatment`);
    axios
        .post(`${API_URL}/createTreatment`, {
          tratamiento
        })
        .then(response => {;
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error creating tratamiento:', error);
        });
}

const handleCreateTreatment = (startDate, treatmentDays, interval, totalDoses, medicationId) => {

  const endDate = new Date(startDate); // Clonar startDate
  endDate.setDate(endDate.getDate() + treatmentDays - 1);

  return () => {
    startDate
    treatmentDays
    endDate
    interval
    totalDoses
    medicationId
    medico.id
    currentUser.id
    numero
    // console.log("customer", customer); -> por ahora lo conseguimos desde el backend a travez del id del numero (sabiendo que usuario esta asignado a ese numero)
  };
}

export const fetchHistoricoRetiros = (customer_id, setHistoricoRetiros) => {
    console.log(`${API_URL}/historicoRetiros/${customer_id}`);
    axios
        .get(`${API_URL}/historicoRetiros/${customer_id}`)
        .then(response => {
            setHistoricoRetiros(response.data);
        })
        .catch(error => {
            console.error('Error fetching historico retiros:', error);
        });
}


//medicaciones que se estan creando en el catalogo

//drogas
export const fetchAllDrugs = (setDrugs) => {
    console.log(`${API_URL}/allDrugs`);
    axios
        .get(`${API_URL}/allDrugs`)
        .then(response => {
            response.data.sort((a, b) => a.droga.localeCompare(b.droga)); //ordenar por orden alfabetico
            setDrugs(response.data);
        })
        .catch(error => {
            console.error('Error fetching drugs:', error);
        });
}

//crear nueva droga
export const createNewDrug = async (drugName) => {
    axios.post(`${API_URL}/createDrug`, { droga: drugName })
      .then(response => {
        console.log('Droga creada exitosamente:', response.data);
        // Aquí puedes agregar lógica adicional, como actualizar la lista de drogas o mostrar un mensaje de éxito
      })
      .catch(error => {
        console.error('Error al crear la droga:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      });
}

//traer los datos de lab, unidades, y presentacion para el formulario de medicacion
//labs
export const fetchLabs = (setLabs) => {
    console.log(`${API_URL}/allLab`);
    axios
        .get(`${API_URL}/allLab`)
        .then(response => {
            // response.data.sort((a, b) => a.lab.localeCompare(b.lab)); //ordenar por orden alfabetico
            setLabs(response.data);
        })
        .catch(error => {
            console.error('Error fetching lobs:', error);
        });
}

// unidades
export const fetchUnits = (setUnits) => {
    console.log(`${API_URL}/allUnidades`);
    axios
        .get(`${API_URL}/allUnidades`)
        .then(response => {
            setUnits(response.data);
        })
        .catch(error => {
            console.error('Error fetching units:', error);
        });
    }

// presentaciones
export const fetchPresentaciones = (setPresentaciones) => {
    console.log(`${API_URL}/allPresentaciones`);
    axios
    .get(`${API_URL}/allPresentaciones`)
    .then(response => {
            // response.data.sort((a, b) => a.pres.localeCompare(b.pres)); //ordenar por orden alfabetico
            console.log(response.data);
            setPresentaciones(response.data);
        })
        .catch(error => {
            console.error('Error fetching Presentaciones:', error);
        });
}

//crear nuevo medicamento
export const createNewMedication = (newMedication) => {
    console.log(`${API_URL}/newMedication`);
    axios
        .post(`${API_URL}/newMedication`, { medication: newMedication })
        .then(response => {
            console.log('Medication creada:', response.data);
            // Aquí puedes agregar lógica adicional, como actualizar la lista de drogas o mostrar un mensaje de éxito
        })
        .catch(error => {
            console.error('Error al crear la droga:', error);
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        });
}