import React, { useState } from 'react'
import IngresarMedSideBar from '../components/IngresarMedSideBar'
import { CalendarTreatment, Modal } from '../components';
import { userStateContext } from '../context/ContextProvider';
import { useEffect } from 'react';


export default function RetiroActual(){
  const {tratamientos, preConfirmacion, setPreConfirmacion } = userStateContext();

  useEffect(() => {
    // Obtener los items que haya en preconfirmacion al montar el componente y actualizar el componente
    if (preConfirmacion && preConfirmacion.length > 0) {
      setTtoShowMedicationOnModal(preConfirmacion[0]);
    }
  }, []);

  const [ttoShowMedicationOnModal, setTtoShowMedicationOnModal] = useState({});
  // const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModalCC, setOpenModalCC] = useState(false);

  const handleModalOpen = (item) => {
    console.log('item', item);
    
    setSelectedItem(item);
    setOpenModalCC(true);
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
                        <th className="px-2 py-1 border-b">Fecha inicio tto.</th>
                        <th className="px-2 py-1 border-b">Fecha fin tto.</th>
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
                          <td className="px-2 py-1 border-b">{new Date(new Date(item.startDate).setDate(new Date(item.startDate).getDate() + item.treatmentDays)).toLocaleDateString('es-ES')}</td>
                          <td className="px-2 py-1 border-b">Example cajas que retira</td>
                        </tr>
                      </tbody>
                      )) : 'no hay datos' }
                    </table>
                    <Modal show={openModalCC} handleClose={() => setOpenModalCC(false)}>
                      <div className='flex gap-4'>
                        <div className="mt-4">
                          <div className='flex flex-col gap-2 items-center'>
                            <CalendarTreatment mode='view' treatments={tratamientos} />
                          </div>
                        </div>
                        <div>
                          <div className='bg-yellow-100 rounded-md shadow-md p-1 text-slate-500'>
                            <h3 className="text-lg font-bold">{(selectedItem) ? selectedItem.medicationNombre : ''} {(selectedItem) ? `( ${selectedItem.medicationMarca} )` : ''}</h3>
                            <p className='border-b'>Médico: {(selectedItem) ? selectedItem.medicoNombre : ''}</p>
                            <p className='border-b'>Especialidad: {(selectedItem) ? selectedItem.medicoEspecialidad : ''}</p>
                            <p className='border-b'>Tipo de tratamiento: {(selectedItem) ? selectedItem.tipo_tto : ''}</p>
                            <p className='border-b'>Tratamiento: {(selectedItem) ? selectedItem.treatmentDays : ''} dias</p>
                            <p className='border-b'>Frecuencia: cada {(selectedItem) ? selectedItem.interval : ''} hs</p>
                            <p className='border-b'>Fecha inicio tto.: {(selectedItem) ? new Date(selectedItem.startDate).toLocaleDateString('es-ES') : ''}</p>
                            <p>Fecha fin tto.: {
                                            selectedItem 
                                              ? new Date(new Date(selectedItem.startDate).setDate(new Date(selectedItem.startDate).getDate() + selectedItem.treatmentDays)).toLocaleDateString('es-ES') 
                                              : ''}
                            </p>
                          </div>
                          <div className='bg-blue-100 rounded-md p-1 shadow-md text-slate-700 mt-2 mb-2'>
                            <p>Retiro actual comprende desde 01/02/2023 hasta 02/03/2023</p>
                            {/* <p>Retiros pendientes: {(selectedItem) ? selectedItem. : ''.pendientes} caja/s</p> */}
                            {/* <p>Puede retirar: {(selectedItem) ? selectedItem. : ''.ret_mes} caja/s</p> */}
                          </div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">Cantidad a retirar:</label>
                          <div className='flex gap-2 items-center'>
                            <input type="number" className="border w-1/2 border-gray-300 rounded-md p-2" placeholder="..." />
                            <p>Cajas</p>
                          </div>
                          <button className='bg-blue-400 text-white rounded-md shadow-sm px-2 py-0.5 mt-2 hover:bg-blue-500 hover:shadow-md' onClick={console.log('Agregar a retiro')}>Agregar a retiro</button>
                        </div>
                      </div>
                    </Modal>
                    {/* FIN Modal para buscar medicación -------------------------------------- */}
                </div>
                <button
                  onClick={() => {
                    //borra el localstorage y recarga la página
                    setPreConfirmacion([]); // Esto limpia el estado y el localStorage
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