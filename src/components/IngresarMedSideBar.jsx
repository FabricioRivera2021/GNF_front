import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { userStateContext } from '../context/ContextProvider';
import { fetchAllEstados } from '../API/apiServices';

export default function IngresarMedSideBar({ selectedFilter, filterPausedNumber, filterCancelNumber, handleClickFilter }) {

  return (
    <SideBar>
        <button>
            Ingresar medicacion
        </button>
        <button>
            Ingresar med. desde CC
        </button>
        <button>
            Ver ultimos retiros
        </button>
    </SideBar>
  );
}