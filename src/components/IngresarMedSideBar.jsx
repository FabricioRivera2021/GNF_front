import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { userStateContext } from '../context/ContextProvider';
import { fetchAllEstados } from '../API/apiServices';

export default function IngresarMedSideBar({ selectedFilter, filterPausedNumber, filterCancelNumber, handleClickFilter }) {

  return (
    <SideBar>
        <button className='rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 capitalize font-roboto text-sm bg-blue-500 text-white px-10'>
            Ingresar medicacion
        </button>
        <button className='rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 capitalize font-roboto text-sm bg-slate-100 text-slate-700 px-10'>
            Ingr. med. desde CC
        </button>
        <button className='rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 capitalize font-roboto text-sm bg-slate-100 text-slate-700 px-10'>
            Ver ultimos retiros
        </button>
    </SideBar>
  );
}