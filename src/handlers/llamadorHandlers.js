
import { assignNumberToUser, setCancel, setNextState, setPause } from "../API/apiServices";

export const handleClickFilter = (id, setFilterCancel, setFilterPaused, setSelectedFilter) => {
    console.log("handleClickFilter");
    setFilterPaused(false);
    setFilterCancel(false);
    setSelectedFilter(id);
}

export const handleSetNextState = (number, setNumero) => {
    console.log("handleSetNextState");
    setNextState(number)
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
            console.log("Error in handleNextState:", error);
        })
}

export const handlePauseNumber = (number, setNumero) => {
    console.log("handlePauseNumber");
    setPause(number)
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
            console.log("Error in handlePause:", error);
        })
}

export const handleCancelNumber = (number, setNumero) => {
    console.log("handleCancelNumber");
    setCancel(number)
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
            console.log("Error in handleCancel:", error);
        })
}

//llama al numero, ademas de retomar pausado o cancelado
export const handleLlamarNumero = (id, paused, canceled, setNumero, setNumerosTV) => {
    console.log("handleLlamarNumero");
    assignNumberToUser(id, paused, canceled)
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
            console.log(nuevoNumero);

            setNumerosTV(prevNumeros => {   
                const nuevaLista = [nuevoNumero, ...prevNumeros];
                if (nuevaLista.length > 4) {
                  nuevaLista.pop(); // Elimina el último número si la lista tiene más de 5
                }
                return nuevaLista
            });
        })
        .catch((error) => {
            console.log(error);
        })
}