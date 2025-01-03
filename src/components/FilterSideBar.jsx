import React, { useEffect, useState } from 'react'
import { handleClickFilter } from '../Utils/utils'
import { userStateContext } from '../context/ContextProvider'
import { fetchAllEstados } from '../API/apiServices';

export default function FilterSideBar({ selectedFilter, handleClickFilter, filterPausedNumber, filterCancelNumber }){

  const { filtros, setFiltros } = userStateContext();

  useEffect(() => {
    fetchAllEstados(setFiltros)
  }, []);

  return (
    <>
        <div className="w-[12rem] pl-2 h-[calc(100vh-4rem)] flex flex-col items-start bg-slate-800 z-50 shadow-slate-900 ">
            <div className="w-full h-full">
                <div className="space-y-4 mt-4 text-slate-100 whitespace-nowrap h-[95%]">
                    <div className="flex flex-col space-y-4 ml-3 mr-5 h-full">
                        <div className="flex flex-col space-y-4 h-[100%]">
                            {filtros.map((filtros) => (
                                <button key={filtros.id}
                                    className={`rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 capitalize font-roboto text-sm
                                                ${filtros.id == selectedFilter ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-800'}
                                                ${filtros.estado == 'finalizado' ? 'bg-green-500 text-white' : ''}`}
                                    onClick={() => handleClickFilter(filtros.id)}
                                >{filtros.estados}</button>
                            ))}
                            <hr />
                            <div className="flex flex-col">
                                <input className="rounded-sm h-7 text-slate-800 pl-1" placeholder="Buscar" type="text" />
                            </div>
                            <div className="flex flex-col justify-between pt-10 gap-4 h-full">
                                <div className="flex flex-col gap-4">
                                    <button className="rounded-sm py-1 text-center pl-1 bg-yellow-400 hover:bg-yellow-200 text-slate-700 capitalize font-roboto text-sm"
                                            onClick={() => filterPausedNumber()}>{/*Mostrar solo los numeros pausados, poner el filtro en 1 y luego filtrar por pausado*/}
                                        Ver pausados
                                    </button>
                                    <button className="rounded-sm py-1 text-center pl-1 bg-red-500 hover:bg-red-600 text-slate-100 capitalize font-roboto text-sm"
                                            onClick={() => filterCancelNumber()}>
                                        Ver cancelados
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
