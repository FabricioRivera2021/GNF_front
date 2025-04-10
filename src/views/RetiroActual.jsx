import React from 'react'
import IngresarMedSideBar from '../components/IngresarMedSideBar'

export default function RetiroActual(){
  return (
    <>
    <div className='flex'>
      <IngresarMedSideBar />
      <div className='flex flex-col w-[calc(100vw-4rem)] h-[calc(100vh-4rem)]'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h1 className='text-3xl font-bold text-slate-600'>Ver Medicacion que retira</h1>
          <p className='text-orange-500 text-xl'>Esta funcionalidad no esta disponible en este momento.</p>
        </div>
      </div>
    </div>
    </>
  )
}