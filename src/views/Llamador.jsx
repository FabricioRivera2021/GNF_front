/**
 * Vista del menu de gestion de numeros
 */
import { useEffect, useState } from "react";
import { userStateContext } from '../context/ContextProvider';
import { fetchAllEstados, fetchAllNumbers, fetchCancelNumbers, fetchPausedNumbers, getCurrentSelectedNumber, setCancel, setNextState, setPause } from '../API/apiServices'
import axios from 'axios';
import axiosClient from '../axios';
import { FilterSideBar, LlamadorTabla } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { handleCancelNumber, handleClickFilter, handleLlamarNumero, handlePauseNumber, handleSetNextState } from "../handlers/llamadorHandlers";

const API_URL = import.meta.env.VITE_API_BASE_URL

export default function Llamador() {

    const [showModal, setShowModal] = useState(false);
    const [allDerivates, setAllDerivates] = useState([]);//posibles posiciones para derivar
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

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDerivateTo = (number) => {
        console.log("handleDerivateTo");
        handleOpenModal();
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

    const handleDerivateToPosition = (number, position) => {
        console.log("handleDerivateToPosition");
        handleCloseModal();
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
                        handleSetNextState={(number) => handleSetNextState(number, setNextState)}
                        handleDerivateTo={handleDerivateTo}
                        handleDerivateToPosition={handleDerivateToPosition}
                        handlePauseNumber={(number) => handlePauseNumber(number, setPause)}
                        handleCancelNumber={(number) => handleCancelNumber(number, setCancel)}
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                        allDerivates={allDerivates}
                    />
                </div>
                {/* -----------------------------------------------------------*-------------------------------------------------------------------------------------------------------------------- */}
            </div>
        </>
    )
}