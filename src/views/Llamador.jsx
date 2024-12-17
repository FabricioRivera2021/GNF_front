/**
 * Vista del menu de gestion de numeros
 */
import { useEffect, useState } from "react";
import { userStateContext } from '../context/ContextProvider';
import { fetchAllEstados } from '../API/apiServices'
import axios from 'axios';
import axiosClient from '../axios';
import { Modal, FilterSideBar, LlamadorTabla } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";

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

    useEffect(() => {
        // Fetch data from the Laravel API
        console.log("Use effect 1- fetch numbers and displays them");
            if(filterPaused){
            console.log("numeros pausados");
            axios
                .get("http://localhost:8000/api/filterPausedNumbers")
                .then(({data}) => {
                    console.log(data);
                    setNumeros(data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if(filterCancel){
            console.log("numeros cancelado");
            axios
                .get("http://localhost:8000/api/filterCancelNumbers")
                .then(({data}) => {
                    console.log(data);
                    setNumeros(data);
                    // setFilterPaused(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if(!filterPaused && !filterCancel){
            console.log("todos los numeros");
            fetch(API_URL + '/allNumbers/' + selectedFilter)
            .then(response => response.json())
            .then(data => {
                setNumeros(data);
                console.log(data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setError(error);
            });
        }
    }, [selectedFilter, numero, isDerivating, filterPaused, filterCancel]);

    useEffect(() => {
        //get current selected number by the User
        console.log("Use effect 2");
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
        console.log(numero);
    }, []);

    useEffect(() => {
        console.log("Use effect 3 - Fetch all estados");
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

    const handleSetNextState = (number) => {
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

    const handlePauseNumber = (number) => {
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

    const handleCancelNumber = (number) => {
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
                    handleClickFilter={handleClickFilter}
                    filterPausedNumber={() => setFilterPaused(true)}
                    filterCancelNumber={() => setFilterCancel(true)}
                />
                {/* ------------------------------------------------------------------------------------- */}
                <div className="w-full flex flex-col justify-between h-[calc(100vh-4rem)]" >
                    <LlamadorTabla
                        numeros={numeros}
                        comparePosition={comparePosition}
                        handleLlamarNumero={handleLlamarNumero}
                        position={position}
                        isChangingPosition={isChangingPosition}
                        numero={numero}
                    />
                    {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    <LlamadorPanel
                        numero={numero}
                        handleSetNextState={handleSetNextState}
                        handleDerivateTo={handleDerivateTo}
                        handleDerivateToPosition={handleDerivateToPosition}
                        handlePauseNumber={handlePauseNumber}
                        handleCancelNumber={handleCancelNumber}
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