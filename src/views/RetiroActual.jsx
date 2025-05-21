import React from 'react'
import IngresarMedSideBar from '../components/IngresarMedSideBar'

const preConfirmacion = JSON.parse(localStorage.getItem('preConfirmacion'));

export default function RetiroActual(){
  return (
    <>
    <div className='flex'>
      <IngresarMedSideBar />
      <div className='flex flex-col w-[calc(100vw-4rem)] h-[calc(100vh-4rem)]'>
        <div className='flex flex-col items-start w-full h-full p-3 space-y-1'>
          <h1 className='text-2xl font-bold mb-2'>Medicación que retira</h1>
          <div className='flex flex-wrap flex-col items-start justify-start rounded-lg w-[calc(100%-2%)] h-[calc(100%-8%)] p-4 gap-4'>
            {/* table list */}
            <div className="rounded-lg w-full h-[calc(100vh-10rem)] overflow-auto">          
                <div className='min-h-20 py-1 px-4'>
                    <table className="shadow-sm min-w-full text-left text-sm font-roboto text-slate-600 text-surface p-2">
                    <thead className='sticky top-0 bg-blue-400 text-white whitespace-nowrap'>
                      <tr>
                        <th className="px-2 py-1 border-b"></th>
                        <th className="px-2 py-1 border-b">Droga</th>
                        <th className="px-2 py-1 border-b">Concentracion</th>
                        <th className="px-2 py-1 border-b">Marca comercial</th>
                        <th className="px-2 py-1 border-b">Médico</th>
                        <th className="px-2 py-1 border-b">Especialidad</th>
                        <th className="px-2 py-1 border-b">Tipo Cuenta</th>
                        <th className="px-2 py-1 border-b">Funcionario</th>
                        <th className="px-2 py-1 border-b">FECHA inicio</th>
                        <th className="px-2 py-1 border-b">Cantidad retirada</th>
                        <th className="px-2 py-1 border-b"></th>
                      </tr>
                    </thead>
                    { preConfirmacion && preConfirmacion.length > 0
                      ? preConfirmacion.map((item, index) => (
                      <tbody>
                        <tr className='rounded-sm py-1 text-left pl-1 capitalize font-roboto text-sm odd:bg-slate-50 even:bg-gray-100'>
                          <td className='py-1'>{index + 1}</td>
                          <td className="px-2 py-1 border-b text-slate-700 font-semibold">{item.medicationNombre}</td>
                          <td className="px-2 py-1 border-b">{item.medicationConcentracion}</td>
                          <td className="px-2 py-1 border-b">{item.medicationMarca}</td>
                          <td className="px-2 py-1 border-b">{item.medicoNombre}</td>
                          <td className="px-2 py-1 border-b">{item.medicoEspecialidad}</td>
                          <td className="px-2 py-1 border-b">{item.tipo_tto}</td>
                          <td className="px-2 py-1 border-b">{item.userName}</td>
                          <td className="px-2 py-1 border-b">{new Date(item.startDate).toLocaleDateString('es-ES')}</td>
                          <td className="px-2 py-1 border-b">Example cajas que retira</td>
                          <td className='flex py-1 items-center gap-2'>
                            <button className='bg-yellow-500 hover:bg-yellow-400 text-white px-4 shadow-md rounded-md'>Editar</button>
                            <button className='bg-red-500 hover:bg-red-400 text-white px-4 shadow-md rounded-md'>Eliminar</button>
                          </td>
                        </tr>
                      </tbody>
                      )) : 'no hay datos' }
                    </table>
                    {/* FIN Modal para buscar medicación -------------------------------------- */}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}