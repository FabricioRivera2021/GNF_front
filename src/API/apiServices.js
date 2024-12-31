import axiosClient from "../axiosCustom";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllNumbers = (filter) => axiosClient.get(
    `${API_URL}/allNumbers/${filter}`
);

export const fetchPausedNumbers = () => axiosClient.get(
    'http://localhost:8000/api/filterPausedNumbers'
);

export const fetchCancelNumbers = () => axiosClient.get(
    'http://localhost:8000/api/filterCancelNumbers'
);

export const getCurrentSelectedNumber = () => axiosClient.get(
    'http://localhost:8000/api/getCurrentSelectedNumber'
);

export const fetchAllEstados = () => axiosClient.get(
    `${API_URL}/allEstados`
);

export const assignNumberToUser = (id, paused, canceled) => axiosClient.post(
    'http://localhost:8000/api/asignNumberToUser', { id: id, paused: paused, canceled: canceled }
);

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
 * Funcionan en conjunto en el componente LlamadorPanel.jsx
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