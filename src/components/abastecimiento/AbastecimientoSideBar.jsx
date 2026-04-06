import React from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../SideBar';
import { ClipboardDocumentListIcon, CubeIcon, DocumentMagnifyingGlassIcon, DocumentPlusIcon, ExclamationCircleIcon, SunIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { userStateContext } from '../../context/ContextProvider';

export default function AbastecimientoSideBar() {

  const {preConfirmacion} = userStateContext();

  return (
    <SideBar>
      <NavLink
        to="/abastecimiento/medicacion"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1'>
          <DocumentPlusIcon className='w-6' />
          <p className='font-semibold'>Ingresos</p>
        </div>
      </NavLink>
      <NavLink
        to="/abastecimiento/stock"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1'>
          <ClipboardDocumentListIcon className='w-6'/>
          <p className='font-semibold'>Stock</p>
        </div>
      </NavLink>
      <NavLink
        to="/abastecimiento/catalogos"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1'>
          <DocumentMagnifyingGlassIcon className='w-6'/>
          <p className='font-semibold'>Catalogos</p>
        </div>
      </NavLink>
      <NavLink
        to="/abastecimiento/nuevoCatalogo"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1'>
          <DocumentPlusIcon className='w-6'/>
          <p className='font-semibold'>Medicamentos</p>
        </div>
      </NavLink>
      <NavLink
        to="/abastecimiento/movimientos"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1'>
          <DocumentMagnifyingGlassIcon className='w-6'/>
          <p className='font-semibold'>Movimientos</p>
        </div>
      </NavLink>
      <NavLink
        to="/abastecimiento/alertas"
        className={({ isActive }) =>
          isActive
            ? 'rounded-sm py-1 text-left pl-1 bg-blue-500 text-white px-10'
            : 'rounded-sm py-1 text-left pl-1 hover:bg-blue-400 hover:text-slate-100 bg-slate-100 text-slate-700 px-10'
        }
      >
        <div className='flex gap-1 justify-between w-full'>
          <CubeIcon className='w-7'/>
          <div className='flex gap-1 items-end justify-between w-full'>
            <p className='font-semibold'>Alertas</p>
          </div>
        </div>
      </NavLink>
    </SideBar>
  );
}