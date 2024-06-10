/**
 * Vista del menu de gestion de numeros
 */
import { useEffect, useState } from "react";
import { userStateContext } from '../context/ContextProvider';
import axios from 'axios';
import axiosClient from '../axios';
import renderLoadingLines from '../helpers/renderLoadingLines';
import { Modal } from '../components/index';
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const API_URL = import.meta.env.VITE_API_BASE_URL

export default function Llamador() {

    const [showModal, setShowModal] = useState(false);
    const [allDerivates, setAllDerivates] = useState([]);//posibles posiciones para derivar
    const [numeros, setNumeros] = useState([]);//numeros
    const [filtros, setFiltros] = useState([]);//filtros
    const [selectedFilter, setSelectedFilter] = useState(1); //filtro actual
    const [isLoading, setIsLoading] = useState(true);
    const [isDerivating, setIsDerivating] = useState(false);
    const [error, setError] = useState(null);
    const [comparePosition, setComparePosition] = useState('');
    const {currentUser, position, numero, setNumero} = userStateContext();

    useEffect(() => {
        // Fetch data from the Laravel API
        setIsLoading(true)
        fetch(API_URL + '/allNumbers/' + selectedFilter)
        .then(response => response.json())
        .then(data => {
            setNumeros(data);
            setIsLoading(false);
            // console.log(data[0].nombre[0].name);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
            setError(error);
        });
    }, [selectedFilter, numero, isDerivating]);

    useEffect(() => {
        //get current selected number by the User
        axios
        .get('http://localhost:8000/api/getCurrentSelectedNumber')
        .then(({data}) => {
            setNumero(data.nro)
            console.log(data.nro);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        // Fetch data from the Laravel API
        fetch(API_URL + '/allEstados')
        .then(response => response.json())
        .then(data => {
            setFiltros(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }, []);

    //comparar el estado del numero con la posicion del User
    useEffect(() => {
        const compare_position = position.split(" ");
        setComparePosition(compare_position[0])
        // console.log(compare_position[0]);
    }, [position]);

    const handleClickFilter = (id) => {
        // console.log(id);
        setSelectedFilter(id);
    }

    const handleSetNextState = (number) => {
        axios
            .post("http://localhost:8000/api/setNextState", {
                numero: number
            })
            .then(({data}) => {
                console.log(data)
                setNumero(null)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handlePauseNumber = (number) => {
        axios
            .post("http://localhost:8000/api/setPause", {
                numero: number
            })
            .then(({data}) => {
                console.log(data)
                setNumero(null)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleCancelNumber = (number) => {
        axios
            .post("http://localhost:8000/api/setCanceled", {
                numero: number
            })
            .then(({data}) => {
                console.log(data)
                setNumero(null)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //llama al numero, ademas de retomar pausado o cancelado
    const handleLlamarNumero = (id, paused, canceled) => {
        axios
            .post("http://localhost:8000/api/asignNumberToUser", {
                id: id,
                paused: paused,
                canceled: canceled,
            })
            .then(({data}) => {
                setNumero(data.nro)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDerivateTo = (number) => {
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
        handleCloseModal();
        axios
            .post("http://localhost:8000/api/derivateToPosition", {
                number: number,
                position: position
            })
            .then(({data}) => {
                console.log(data);
                setIsDerivating(false);
                setNumero(null);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    return (
        <>
            <div className="flex justify-between items-start">
                <div className="w-[12rem] pl-2 h-[calc(100vh-4rem)] flex flex-col items-start bg-slate-800 z-50 shadow-slate-900 ">
                    <div className="w-full">
                        <div className="space-y-4 mt-4 text-slate-100 whitespace-nowrap">
                            <div className="flex flex-col space-y-4 ml-3 mr-5">
                                <div className="flex flex-col space-y-4">
                                    {filtros.map((filtros) => (
                                        <button key={filtros.id}
                                            className={`rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 capitalize font-roboto text-sm
                                                        ${filtros.id == selectedFilter ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-800'}`}
                                            onClick={() => handleClickFilter(filtros.id)}
                                        >{filtros.estados}</button>
                                    ))}
                                    <hr />
                                    <div className="flex flex-col">
                                        {/* <label for="search"></label> */}
                                        <input className="rounded-sm h-7 text-slate-800 pl-1" placeholder="Buscar" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------------------------------------------------------------------------- */}
                <div className="w-full flex flex-col h-[calc(100vh-4rem)]" >
                    <div className="h-[35rem] overflow-auto">
                        <table  className="min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface">
                            <thead className="border-b dark:border-neutral-500 bg-blue-400 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Accion</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Nro.</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Fila</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">T. de espera</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Estado</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Nombre</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">T. de espera total</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100"></th>
                                </tr>
                            </thead>
                            <tbody className="odd">
                                { isLoading ? (
                                    <tr>
                                        {renderLoadingLines(7)}
                                    </tr>
                                    ) : error ? (
                                    <tr>
                                       <td> Error: {error.message} </td>
                                    </tr>
                                    ) : (numeros == '') ? (
                                        <tr className="odd:bg-slate-50 even:bg-gray-300">
                                            <td className='whitespace-nowrap px-1 py-1'>No hay numeros que mostrar</td>
                                        </tr>
                                    ) : (
                                    numeros.map((item, index) => (
                                        <tr key={index} className={`odd:bg-slate-50 even:bg-gray-300 ${(numero == item.numero) ? '!bg-blue-400 text-slate-100' : ''}
                                                                    ${(item.pausado == 1) ? 'odd:bg-yellow-100 even:bg-yellow-200' : ''}
                                                                    ${(item.cancelado == 1) ? 'odd:bg-red-300 even:bg-red-200' : ''}`}>
                                            <td className="whitespace-nowrap px-1 py-1 font-normal">
                                            {item.estado.includes(comparePosition) && position.includes(comparePosition) && item.pausado != 1 && item.cancelado != 1 && (numero != item.numero) && (
                                                <button className={`bg-blue-500 px-2 py-0.5 rounded-md hover:bg-blue-400 text-xs text-slate-100 font-roboto font-semibold
                                                                    ${(numero != null) ? 'bg-gray-400 hover:bg-gray-400' : ''}`}
                                                    onClick={() => handleLlamarNumero(item.nombre[0].numeros_id, item.pausado, item.cancelado)}
                                                    disabled={(numero != null || item.pausado == 1 || item.cancelado == 1)}
                                                >Llamar</button>
                                            )}
                                            {item.pausado == 1 && (
                                                <button className={`bg-blue-500 px-2 py-0.5 rounded-md hover:bg-blue-400 text-xs text-slate-100 font-roboto font-semibold
                                                                    ${(numero != null) ? '!bg-gray-400 hover:!bg-gray-400' : ''}`}
                                                    onClick={() => handleLlamarNumero(item.nombre[0].numeros_id, item.pausado, item.cancelado)}
                                                    disabled={(numero != null)}
                                                >Retomar pausado</button>
                                            )}
                                            {item.cancelado == 1 && (
                                                <button className={`bg-blue-500 px-2 py-0.5 rounded-md hover:bg-blue-400 text-xs text-slate-100 font-roboto font-semibold
                                                                    ${(numero != null) ? '!bg-gray-400 hover:!bg-gray-400' : ''}`}
                                                    onClick={() => handleLlamarNumero(item.nombre[0].numeros_id, item.pausado, item.cancelado)}
                                                    disabled={(numero != null)}
                                                >Retomar cancelado</button>
                                            )}
                                            </td>
                                            <td className="whitespace-nowrap px-1 py-1">{item.fila_prefix} {item.numero}</td>
                                            <td className="whitespace-nowrap px-1 py-1">{item.fila}</td>
                                            <td className="whitespace-nowrap px-1 py-1">12:35</td>
                                            <td className="whitespace-nowrap px-1 py-1">{item.estado}</td>
                                            <td className="whitespace-nowrap px-1 py-1">                                          
                                                {item.nombre.map((elem, idx) => (
                                                    <span key={idx}>{elem.name}</span>
                                                ))}
                                            </td>
                                            <td className="whitespace-nowrap px-1 py-1">50:14</td>
                                            <td className="whitespace-nowrap px-1 py-1">{item.user}</td>
                                        </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full">
                        <div className="bg-slate-100 flex justify-start items-center pt-2 w-full h-full">
                            <div className="bg-orange-400 h-[18vh] w-60 flex ml-1 flex-col justify-center items-center rounded shadow-sm">
                                <h2 className="text-4xl text-slate-700 font-bold whitespace-nowrap"></h2>
                                <p className="text-4xl text-slate-700 font-semibold">{numero}</p>
                            </div>
                            <div className=" flex flex-col justify-center items-center w-[50rem]">
                                <div className="flex px-14 rounded w-full gap-6 mb-2 text-slate-500">
                                    <p>Nombre: Pepita perez</p>
                                    <p>CI: 45062412</p>
                                    <p>Ultima concurrencia: 24/02/24</p>
                                </div>
                                <div className="flex px-14 rounded w-full gap-6">
                                    <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                        ${(numero) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                        disabled={!numero}            
                                                        onClick={() => handleSetNextState(numero)}
                                    >Derivar</button>
                                    <div>
                                        <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                        ${(numero) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                        disabled={!numero}
                                                        onClick={() => handleDerivateTo(numero)}
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
                                                                    onClick={() => handleDerivateToPosition(numero, item.estado)}
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
                    </div>
                </div>
                {/* -----------------------------------------------------------*-------------------------------------------------------------------------------------------------------------------- */}
            </div>
        </>
    )
}
