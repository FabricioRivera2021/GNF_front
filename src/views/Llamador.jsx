/**
 * Vista del menu de gestion de numeros
 */
import { useEffect, useState } from "react";
import { userStateContext } from '../context/ContextProvider';
import { fetchAllEstados } from '../API/apiServices'
import axios from 'axios';
import axiosClient from '../axios';
import renderLoadingLines from '../helpers/renderLoadingLines';
import { Modal, FilterSideBar, LlamadorTabla } from '../components/index';
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { calculateTimeDifference } from "../Utils/utils";

const API_URL = import.meta.env.VITE_API_BASE_URL

export default function Llamador() {

    const [showModal, setShowModal] = useState(false);
    const [allDerivates, setAllDerivates] = useState([]);//posibles posiciones para derivar
    const [numeros, setNumeros] = useState([]);//numeros
    const [filtros, setFiltros] = useState([]);//filtros
    const [filterPaused, setFilterPaused] = useState(false);//cantidad numeros pausados
    const [filterCancel, setFilterCancel] = useState(false);//cantidad numeros cancelados
    const [selectedFilter, setSelectedFilter] = useState(1); //filtro actual
    const [isLoading, setIsLoading] = useState(true); //! quizas halla que borrar esto
    const [isDerivating, setIsDerivating] = useState(false);
    const [error, setError] = useState(null);
    const [comparePosition, setComparePosition] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const {currentUser, position, numero, setNumero, isChangingPosition, numerosTV, setNumerosTV} = userStateContext();


    // console.log(numero);
    

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Fetch data from the Laravel API
        console.log("Use effect 1- fetch numbers and displays them");
        setIsLoading(true)
        if(filterPaused){
            console.log("numeros pausados");
            axios
                .get("http://localhost:8000/api/filterPausedNumbers")
                .then(({data}) => {
                    console.log(data);
                    setNumeros(data);
                    // setFilterPaused(false);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
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
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                })
        }
        if(!filterPaused && !filterCancel){
            console.log("todos los numeros");
            fetch(API_URL + '/allNumbers/' + selectedFilter)
            .then(response => response.json())
            .then(data => {
                setNumeros(data);
                console.log(data);
                // setIsLoading(false);
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
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching estados:', error);
                setIsLoading(false);
            });
    }, []);

    // comparar el estado del numero con la posicion del User
    useEffect(() => {
        console.log("Use effect 4");
        const compare_position = position.split(" ");
        setComparePosition(compare_position[0])
        setIsLoading(false);
    }, [position]);

    const handleClickFilter = (id) => {
        console.log("handleClickFilter");
        setIsLoading(true)
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

    const filterPausedNumber = () => {
        console.log("filterPausedNumber");
        setFilterCancel(false);
        setFilterPaused(true);
    }

    const filterCancelNumber = () => {
        console.log("filterCancelNumber");
        setFilterPaused(false);
        setFilterCancel(true);
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
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
                        error={error}
                    />
                    {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    <div className="w-full">
                        {
                            numero.nro != null && (
                                <div className="bg-slate-100 flex justify-start items-center pt-2 w-full h-full">
                                    <div className="h-[10vh] w-56 flex ml-1 flex-col justify-center items-center rounded shadow-sm bg-blue-500 mb-2">
                                        <p className="text-6xl text-white font-semibold whitespace-nowrap">{numero.prefix} {numero.nro}</p>
                                    </div>
                                    <div className=" flex flex-col justify-center items-center w-[50rem]">
                                        <div className="flex px-14 rounded w-full gap-6 mb-2 text-slate-500">
                                            <p>Nombre: Nombre generico</p>
                                            <p>CI: 45062412</p>
                                            <p>Ultima concurrencia: 24/02/24</p>
                                        </div>
                                        <div className="flex px-14 rounded w-full gap-6">
                                            <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                                ${(numero.nro) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                                disabled={!numero.nro}            
                                                                onClick={() => handleSetNextState(numero.nro)}
                                            >Derivar</button>
                                            <div>
                                                <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                                ${(numero.nro) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                                disabled={!numero.nro}
                                                                onClick={() => handleDerivateTo(numero.nro)}
                                                >Derivar a..</button>
                                                <Modal show={showModal} handleClose={handleCloseModal}>
                                                    <h2 className="text-xl font-bold mb-2">Derivar a..</h2>
                                                    <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface">
                                                        <tbody className="odd">
                                                            {allDerivates.map((item, index) => (
                                                                <tr key={index} className="border-b-2">
                                                                    <td className="whitespace-nowrap px-1 py-1">{item.estado}</td>
                                                                    <td className="whitespace-nowrap px-1 py-1">
                                                                        <button
                                                                            onClick={() => handleDerivateToPosition(numero.nro, item.estado)}
                                                                        >
                                                                            <ArrowRightCircleIcon 
                                                                                className="w-6 stroke-blue-500 hover:stroke-blue-400" 
                                                                            />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </Modal>
                                            </div>
                                            <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                                ${(numero) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                                disabled={!numero}
                                                                onClick={() => handlePauseNumber(numero)}
                                            >Pausar</button>
                                            <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                                ${(numero) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                                disabled={!numero}
                                                                onClick={() => handleCancelNumber(numero)}
                                            >Cancelar</button>
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* -----------------------------------------------------------*-------------------------------------------------------------------------------------------------------------------- */}
            </div>
        </>
    )
}
