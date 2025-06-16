import React, { useState } from 'react'
import IngresarMedSideBar from '../components/IngresarMedSideBar'
import { Modal } from '../components';

const preConfirmacion = JSON.parse(localStorage.getItem('preConfirmacion'));

export default function RetiroActual(){

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  }

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
                        <tr className='rounded-sm py-1 text-left pl-1 capitalize font-roboto text-sm odd:bg-slate-50 even:bg-gray-100 hover:bg-slate-200 cursor-pointer'
                          onClick={() => {
                            handleModalOpen(item);
                          }}>
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
                        </tr>
                      </tbody>
                      )) : 'no hay datos' }
                    </table>
                    <Modal show={openModal} handleClose={() => setOpenModal(false)}>
                      { selectedItem && (
                        <div className='flex flex-col space-y-2'>
                          <h2 className='text-lg font-bold'>Detalles de la medicación</h2>
                          <p><strong>Droga:</strong> {selectedItem.medicationNombre}</p>
                          <p><strong>Concentración:</strong> {selectedItem.medicationConcentracion}</p>
                          <p><strong>Marca Comercial:</strong> {selectedItem.medicationMarca}</p>
                          <p><strong>Médico:</strong> {selectedItem.medicoNombre}</p>
                          <p><strong>Especialidad:</strong> {selectedItem.medicoEspecialidad}</p>
                          <p><strong>Tipo Cuenta:</strong> {selectedItem.tipo_tto}</p>
                          <p><strong>Funcionario:</strong> {selectedItem.userName}</p>
                          <p><strong>Fecha Inicio:</strong> {new Date(selectedItem.startDate).toLocaleDateString('es-ES')}</p>
                          <button>Editar</button>
                          <button>Eliminar</button>
                        </div>
                      )}
                    </Modal>
                    {/* FIN Modal para buscar medicación -------------------------------------- */}
                </div>
                <button
                  onClick={() => {
                    //borra el localstorage y recarga la página
                    localStorage.removeItem('preConfirmacion');
                    window.location.reload();
                  }} 
                className='bg-red-500 text-white px-4 py-2 rounded-md mx-2 my-3'>Eliminar todas</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}