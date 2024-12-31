/**
 * Vista del menu de gestion de numeros
 */
import { useEffect, useState } from "react";
import { userStateContext } from '../context/ContextProvider';
import { 
    fetchAllEstados, 
    handleSetNextState, 
    handlePauseNumber,
    handleCancelNumber,
    handleDerivateToPosition,
    handleDerivateTo 
} from '../API/apiServices'
import axios from 'axios';
import axiosClient from '../axiosCustom';
import { FilterSideBar, LlamadorTabla } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { handleCancelNumber, handleClickFilter, handleLlamarNumero, handlePauseNumber, handleSetNextState } from "../handlers/llamadorHandlers";

const API_URL = import.meta.env.VITE_API_BASE_URL

export default function Llamador() {

    const [numeros, setNumeros] = useState([]);//numeros
    const [filtros, setFiltros] = useState([]);//filtros
    const [filterPaused, setFilterPaused] = useState(false);//cantidad numeros pausados
    const [filterCancel, setFilterCancel] = useState(false);//cantidad numeros cancelados
    const [selectedFilter, setSelectedFilter] = useState(1); //filtro actual
    const [isDerivating, setIsDerivating] = useState(false);
    const [error, setError] = useState(null);
    const [comparePosition, setComparePosition] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const {currentUser, position, numero, setNumero, isChangingPosition, numerosTV, setNumerosTV} = userStateContext();

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    //Filtrar los numeros y mostrarlos en pantalla
    useEffect(() => {
        if (filterPaused) {
            fetchPausedNumbers()
                .then(({ data }) => {
                    setNumeros(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (filterCancel) {
            fetchCancelNumbers()
                .then(({ data }) => {
                    setNumeros(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            fetchAllNumbers(selectedFilter)
                .then(({ data }) => {
                    setNumeros(data);
                })
                .catch((error) => {
                    console.error('There was an error fetching the data!', error);
                    setError(error);
                });
        }
    }, [selectedFilter, numero, isDerivating, filterPaused, filterCancel]);

    useEffect(() => {
        //get current selected number by the User
        getCurrentSelectedNumber()
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
    }, []);

    useEffect(() => {
        fetchAllEstados()
            .then(response => {
                setFiltros(response.data); // Access the data from the response
            })
            .catch(error => {
                console.error('Error fetching estados:', error);
            });
    }, []);

    // comparar el estado del numero con la posicion del User
    useEffect(() => {
        console.log("Use effect 4");
        const compare_position = position.split(" ");
        setComparePosition(compare_position[0])
    }, [position]);

    const handleClickFilter = (id) => {
        console.log("handleClickFilter");
        setFilterPaused(false);
        setFilterCancel(false);
        setSelectedFilter(id);
    }

    //llama al numero, ademas de retomar pausado o cancelado
    const handleLlamarNumero = (id, paused, canceled) => {
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

                console.log(nuevoNumero);
                setNumerosTV(prevNumeros => {   
                    const nuevaLista = [nuevoNumero, ...prevNumeros];
                    if (nuevaLista.length > 4) {
                      nuevaLista.pop(); // Elimina el último número si la lista tiene más de 5
                    }
                    return nuevaLista
                });
                console.log(numerosTV);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="flex justify-between items-start">{/* Main */}
                <FilterSideBar
                    filtros={filtros}
                    selectedFilter={selectedFilter}
                    handleClickFilter={(id) => handleClickFilter(id, setFilterCancel, setFilterPaused, setSelectedFilter)}
                    filterPausedNumber={() => setFilterPaused(true)}
                    filterCancelNumber={() => setFilterCancel(true)}
                />
                {/* ------------------------------------------------------------------------------------- */}
                <div className="w-full flex flex-col justify-between h-[calc(100vh-4rem)]" >
                    <LlamadorTabla
                        numeros={numeros}
                        comparePosition={comparePosition}
                        handleLlamarNumero={(id, paused, canceled) => handleLlamarNumero(id, paused, canceled, setNumero, setNumerosTV)}
                        position={position}
                        isChangingPosition={isChangingPosition}
                        numero={numero}
                    />
                    {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    <LlamadorPanel
                        numero={numero}
                        handleSetNextState={(number) => handleSetNextState(number, setNumero)}
                        handleDerivateToPosition={(number, position) => handleDerivateToPosition(number, position, setShowModal, setIsDerivating, setNumero)}
                        handlePauseNumber={(number) => handlePauseNumber(number, setNumero)}
                        handleCancelNumber={(number) => handleCancelNumber(number, setNumero)}
                    />
                </div>
                {/* -----------------------------------------------------------*-------------------------------------------------------------------------------------------------------------------- */}
            </div>
        </>
    )
}