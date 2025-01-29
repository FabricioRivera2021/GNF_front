import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { userStateContext } from '../context/ContextProvider';
import { fetchAllEstados } from '../API/apiServices';

export default function FilterSideBar({ selectedFilter, filterPausedNumber, filterCancelNumber, handleClickFilter }) {
  const { filtros, setFiltros } = userStateContext();

  useEffect(() => {
    fetchAllEstados(setFiltros);
  }, []);

  return (
    <SideBar>
      {filtros.map((filtro) => (
        <button
          key={filtro.id}
          className={`rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 capitalize font-roboto text-sm
                      ${filtro.id == selectedFilter ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-800'}
                      ${filtro.estado == 'finalizado' ? 'bg-green-500 text-white' : ''}`}
          onClick={() => handleClickFilter(filtro.id)}
        >
          {filtro.estados}
        </button>
      ))}
      <hr />
      <div className="flex flex-col">
        <input className="rounded-sm h-7 text-slate-800 pl-1" placeholder="Buscar" type="text" />
      </div>
      <div className="flex flex-col justify-between pt-10 gap-4 h-full">
        <div className="flex flex-col gap-4">
          <button
            className="rounded-sm py-1 text-center pl-1 bg-yellow-400 hover:bg-yellow-200 text-slate-700 capitalize font-roboto text-sm"
            onClick={() => filterPausedNumber()}
          >
            Ver pausados
          </button>
          <button
            className="rounded-sm py-1 text-center pl-1 bg-red-500 hover:bg-red-600 text-slate-100 capitalize font-roboto text-sm"
            onClick={() => filterCancelNumber()}
          >
            Ver cancelados
          </button>
        </div>
      </div>
    </SideBar>
  );
}
