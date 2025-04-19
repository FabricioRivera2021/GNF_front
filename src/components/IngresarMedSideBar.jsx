// filepath: /c:/Users/user/Desktop/Desarrollo/Farmacia/GNF_react_front/src/components/IngresarMedSideBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';

export default function IngresarMedSideBar() {
  return (
    <SideBar>
      <NavLink
        to="/ventanilla/nuevoIngresoVentanilla"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        Ingresar medicacion
      </NavLink>
      <NavLink
        to="/ventanilla/nuevoIngresoVentanillaCC"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        Ingr. med. desde CC
      </NavLink>
      <NavLink
        to="/ventanilla/historialRetiros"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        Ver ultimos retiros
      </NavLink>
      <NavLink
        to="/ventanilla/retiroActual"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        Ver Medicacion que retira
      </NavLink>
    </SideBar>
  );
}