/**
 * Vista del menu de gestion de numeros
 */

import { useEffect, useState } from "react";
const API_URL = "http://127.0.0.1:8000/api"

export default function Llamador() {

    const [numeros, setNumeros] = useState([]);//numeros
    const [filtros, setFiltros] = useState([]);//filtros
    const [selectedFilter, setSelectedFilter] = useState(0); //filtro actual
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the Laravel API
        fetch(API_URL + '/allNumbers/' + selectedFilter)
        .then(response => response.json())
        .then(data => {
            setNumeros(data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
            setError(error);
        });
    }, [selectedFilter]);

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

    const handleClickFilter = (id) => {
        console.log(id);
        setSelectedFilter(id);
    }

    return (
        <>
            <div className="flex justify-between items-start">
                <div className="w-[12rem] pl-2 h-[calc(100vh-4rem)] flex flex-col items-start bg-slate-800 z-50 shadow-slate-900 ">
                    <div className="w-full">
                        <div className="space-y-4 mt-4 text-slate-100 whitespace-nowrap">
                            <div className="flex flex-col space-y-4 ml-3 mr-5">
                            <h5>Filtros</h5>
                                <div className="flex flex-col space-y-4">
                                    {filtros.map((filtros) => (
                                        <button key={filtros.id}
                                            className={`rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 capitalize
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
                        <table  className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 bg-blue-400 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Accion</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100"><a href="#">Nro.</a></th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Fila</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100"><a href="#">T. de espera</a></th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Estado</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">Nombre</th>
                                    <th scope="col" className="px-1 py-1 text-slate-100">En proceso</th>
                                </tr>
                            </thead>
                            <tbody className="odd">
                                { isLoading ? (
                                    <tr className="font-semibold text-slate-600 bg-slate-200 shadow-md">
                                        <td className="px-5 py-1">Loading...</td>
                                    </tr>
                                    ) : error ? (
                                    <tr>
                                       <td> Error: {error.message} </td>
                                    </tr>
                                    ) : (
                                    numeros.map((item, index) => (
                                        <tr key={index} className="odd:bg-slate-50 even:bg-gray-300">
                                        <td className="whitespace-nowrap px-1 py-1 font-normal">
                                        <a className="bg-blue-600 px-5 py-0.5 text-slate-100 rounded-md font-semibold hover:bg-blue-500 rounded-tl-none" href="#">Llamar</a>
                                        </td>
                                        <td className="whitespace-nowrap px-1 py-1">{item.fila_prefix} {item.numero}</td>
                                        <td className="whitespace-nowrap px-1 py-1">{item.fila}</td>
                                        <td className="whitespace-nowrap px-1 py-1">tiempo de espera</td>
                                        <td className="whitespace-nowrap px-1 py-1">{item.estado}</td>
                                        <td className="whitespace-nowrap px-1 py-1">{item.nombre}</td>
                                        <td className="whitespace-nowrap px-1 py-1"></td>
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
                                <h2 className="text-4xl text-slate-700 font-bold whitespace-nowrap">Sin numero</h2>
                                <span className="text-xl text-slate-700 font-semibold"></span>
                            </div>
                            <div className=" flex flex-col justify-center items-center w-[50rem]">
                                <div className="flex px-14 rounded w-full gap-6 mb-2 text-slate-500">
                                    <p>Nombre: Pepita perez</p>
                                    <p>CI: 45062412</p>
                                    <p>Ultima concurrencia: 24/02/24</p>
                                </div>
                                <div className="flex px-14 rounded w-full gap-6">
                                    <button className="bg-slate-300 hover:bg-blue-400 hover:text-white text-slate-700 px-2 rounded-md shadow-md">
                                        Derivar
                                    </button>
                                    <button className="bg-slate-300 hover:bg-blue-400 hover:text-white text-slate-700 px-2 rounded-md shadow-md">
                                        Derivar a..
                                    </button>
                                    <button className="bg-slate-300 hover:bg-blue-400 hover:text-white text-slate-700 px-2 rounded-md shadow-md">
                                        Pausar
                                    </button>
                                    <button className="bg-slate-300 hover:bg-blue-400 hover:text-white text-slate-700 px-2 rounded-md shadow-md">
                                        Cancelar
                                    </button>
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
