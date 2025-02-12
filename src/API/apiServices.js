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
            setMedicamentos(response.data);
        })
        .catch(error => {
            console.error('Error fetching medicamentos:', error);
        });
}