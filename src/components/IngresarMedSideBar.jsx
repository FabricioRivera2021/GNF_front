// filepath: /c:/Users/user/Desktop/Desarrollo/Farmacia/GNF_react_front/src/components/IngresarMedSideBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';
import { ClipboardDocumentListIcon, CubeIcon, DocumentMagnifyingGlassIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';

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
        <div className='flex gap-1'>
          <DocumentPlusIcon className='w-6' />
          <p className='font-semibold'>Receta</p>
        </div>
      </NavLink>
      <NavLink
        to="/ventanilla/nuevoIngresoVentanillaCC"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1'>
          <ClipboardDocumentListIcon className='w-6'/>
          <p className='font-semibold'>Saldo</p>
        </div>
      </NavLink>
      <NavLink
        to="/ventanilla/historialRetiros"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1'>
          <DocumentMagnifyingGlassIcon className='w-6'/>
          <p className='font-semibold'>Historial</p>
        </div>
      </NavLink>
      <NavLink
        to="/ventanilla/retiroActual"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1'>
          <CubeIcon className='w-6'/>
          <p className='font-semibold'>Retiro</p>
        </div>
      </NavLink>
    </SideBar>
  );
}