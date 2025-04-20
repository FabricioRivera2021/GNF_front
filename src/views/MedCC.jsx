import React, { useEffect, useState } from 'react';
import { CalendarTreatment, Modal } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, ExclamationCircleIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';
import { fetchTratamiento, getCurrentSelectedNumber } from '../API/apiServices';
import { parse } from 'date-fns';

export default function MedCC () {
    const { setFilterCancel, setFilterPaused, setAllDerivates, setShowModal, showModal, numero, setNumero, 
            showMedicoModal, setShowMedicoModal, showMedicationModal, setShowMedicationModal, tratamientos, setTratamientos, setEvents } = userStateContext();
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [openModalCC, setOpenModalCC] = useState(false);
    const [viewTreatment, setViewTreatment] = useState({});
    const [ttoShowMedicationOnModal, setTtoShowMedicationOnModal] = useState({});

    //get current selected number by the User
    useEffect(() => {
        getCurrentSelectedNumber(setNumero)
    }, []);

    const customer_id = 1; //! cambiar por el id del customer que este siendo atendido
    //traer todos los tratamientos del cliente
    useEffect(() => {
        const data = fetchTratamiento(customer_id, setTratamientos);
        console.log(data);
    }, []);

    // useEffect(() => {
    //   const mappedEvents = tratamientos.map((t) => {
  
    //     const endDate = new Date(t.fecha_inicio);
    //     endDate.setDate(endDate.getDate() + t.total_tto_dias - 1);
      
    //     return ({
    //       title: `Tratamiento (${t.total_tto_dias} días)`,
    //       start: new Date(t.fecha_inicio),
    //       end: endDate,
    //       allDay: true,
    //     });
    //   });
    //   setEvents(mappedEvents);
    // }, [tratamientos]);

    const handleClickFilter = (id) => {
        setFilterPaused(false);
        setFilterCancel(false);
        setSelectedFilter(id);
    };

    // const handleOpenModal = () => {
    //   console.log(viewTreatment);

    //   setOpenModalCC(true);
    
    //   const endDate = new Date(viewTreatment.fecha_inic);
    //   endDate.setDate(endDate.getDate() + viewTreatment.treatment - 1);
    //   const mappedEvent = {
    //     title: `Tratamiento (${viewTreatment.treatment} días)`,
    //     start: new Date(viewTreatment.fecha_inic),
    //     end: endDate,
    //     allDay: true,
    //   };
    //   setEvents([mappedEvent]);
    // }

    return (
      <div className="flex">
        <IngresarMedSideBar />
        <div className='flex flex-col w-[calc(100vw-4rem)] h-[calc(100vh-4rem)]'>
          <div className="flex flex-col items-start w-full p-3 space-y-3">
            <h2 className="text-2xl font-bold mb-2">Cuenta corriente</h2>
            <div className="rounded-lg overflow-auto w-full">
              <div className='py-1 px-4 w-11/12'>
                <table className="shadow-sm text-left text-xs font-roboto font-medium text-slate-600 text-surface p-2 w-full">
                  <thead className='sticky top-0 bg-blue-400 text-white whitespace-nowrap'>
                    <tr>
                      <th className="px-2 py-1 border-b">Tto</th>
                      <th className="px-2 py-1 border-b">Droga</th>
                      <th className="px-2 py-1 border-b">Tratamiento</th>
                      <th className="px-2 py-1 border-b">Duracion</th>
                      <th className="px-2 py-1 border-b">Médico</th>
                      <th className="px-2 py-1 border-b">Especialidad</th>
                      <th className="px-2 py-1 border-b">Tipo Cuenta</th>
                      <th className="px-2 py-1 border-b">Retiros pendientes</th>
                      <th className="px-2 py-1 border-b">Puede retirar</th>
                      <th className="px-2 py-1 border-b">Funcionario</th>
                      <th className="px-2 py-1 border-b">Fecha inicio tto.</th>
                      <th className="px-2 py-1 border-b">Fecha fin tto.</th>
                      <th className="px-2 py-1 border-b"></th>
                    </tr>
                  </thead>
                  <tbody className='whitespace-nowrap'>
                    {tratamientos.map((tto, index) => (
                      <tr key={index} 
                          className='hover:bg-gray-100 cursor-pointer' 
                          onClick={() => {
                            const treatmentData = {
                              fecha_inic: tto.fecha_inicio,
                              treatment: tto.total_tto_dias
                            };
                          
                            setViewTreatment(treatmentData);
                            console.log(treatmentData);
                            
                            const endDate = new Date(treatmentData.fecha_inic);
                            endDate.setDate(endDate.getDate() + treatmentData.treatment - 1);
                            const mappedEvent = {
                              title: `Tratamiento (${treatmentData.treatment} días)`,
                              start: new Date(treatmentData.fecha_inic),
                              end: endDate,
                              allDay: true,
                            };
                            setEvents([mappedEvent]);
                          
                            setTtoShowMedicationOnModal({
                              id: index,
                              marca: tto.medication.nombre_comercial,
                              droga: tto.medication.droga,
                              concentracion: tto.medication.droga_concentracion,
                              tto_dias: tto.total_tto_dias,
                              frecuencia: tto.frecuencia,
                              cantidad_diaria: tto.cantidad_diaria,
                              pendientes: tto.retiros_pendientes,
                              ret_mes: tto.retiros_por_mes,
                              f_inic: tto.fecha_inicio,
                              f_fin: tto.fecha_fin
                            });
                          
                            setOpenModalCC(true);
                          }}
                      >
                        <td className="px-2 py-1 border-b">{tto.activo ? <ArrowUpCircleIcon className='w-6 text-green-400' /> : <ArrowDownCircleIcon className='w-6 text-red-400' />}</td>
                        <td className="px-2 py-1 border-b">{tto.medication.droga}</td>
                        <td className="px-2 py-1 border-b">{tto.cantidad_diaria} cada {tto.frecuencia} hs</td>
                        <td className="px-2 py-1 border-b">{tto.total_tto_dias} dias</td>
                        <td className="px-2 py-1 border-b">{tto.medicos.nombre} {tto.medicos.apellido}</td>
                        <td className="px-2 py-1 border-b">{tto.medicos.especialidad}</td>
                        <td className="px-2 py-1 border-b">{tto.tipo_tto}</td>
                        <td className="px-2 py-1 border-b">{tto.retiros_pendientes} caja/s</td>
                        <td className="px-2 py-1 border-b">{tto.retiros_por_mes} caja/s</td>
                        <td className="px-2 py-1 border-b">{tto.user.name}</td>
                        <td>
                          <p className="px-2 py-1 border-b font-semibold text-slate-500 rounded-md shadow-sm">
                            {new Date(tto.fecha_inicio).toLocaleDateString('es-ES')}
                          </p>
                        </td>
                        <td>
                          <p className="px-2 py-1 border-b font-semibold text-slate-500 rounded-md shadow-sm">
                            {new Date(tto.fecha_fin).toLocaleDateString('es-ES')}
                          </p>
                        </td>
                        <td className="px-2 py-1 border-b">
                          {new Date() > new Date(tto.fecha_fin) 
                            ?
                              <div className='flex items-center gap-1'>
                                <ExclamationCircleIcon className='w-6 text-orange-400' />
                                <p className='text-gray-400'>Vencida</p>
                              </div>
                            : 
                              <div className='flex items-center gap-1'>
                                <CheckBadgeIcon className='w-6 text-green-400' />
                                <p className='text-gray-400'>Vigente</p>
                              </div>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal show={openModalCC} handleClose={() => setOpenModalCC(false)}>
                <div className='flex gap-4'>
                  <div className="mt-4">
                    <div className='flex flex-col gap-2 items-center'>
                      <CalendarTreatment mode='view' treatments={tratamientos} />
                    </div>
                  </div>
                  <div>
                    <div className='bg-yellow-100 rounded-md shadow-md p-1 text-slate-500'>
                      <h3 className="text-lg font-bold">{ttoShowMedicationOnModal.droga} {ttoShowMedicationOnModal.concentracion}</h3>
                      <p className='border-b'>Marca: {ttoShowMedicationOnModal.marca}</p>
                      <p className='border-b'>Tratamiento: {ttoShowMedicationOnModal.tto_dias} dias</p>
                      <p className='border-b'>Frecuencia: {ttoShowMedicationOnModal.cantidad_diaria} comp cada {ttoShowMedicationOnModal.frecuencia} hs por 30 dias</p>
                      <p className='border-b'>Fecha inicio tto.: {new Date(ttoShowMedicationOnModal.f_inic).toLocaleDateString('es-ES')}</p>
                      <p>Fecha fin tto.: {new Date(ttoShowMedicationOnModal.f_fin).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div className='bg-blue-100 rounded-md p-1 shadow-md text-slate-700 mt-2 mb-2'>
                      <p>Retiro actual comprende desde 01/02/2023 hasta 02/03/2023</p>
                      <p>Retiros pendientes: {ttoShowMedicationOnModal.pendientes} caja/s</p>
                      <p>Puede retirar: {ttoShowMedicationOnModal.ret_mes} caja/s</p>
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
            </div>
          </div>
          <div className='bottom-0 fixed w-full'>
            <LlamadorPanel
              numero={numero}
              handleSetNextState={(number) => handleSetNextState(number, setNumero)}
              handleDerivateTo={(number) => handleDerivateTo(number, setShowModal, setAllDerivates)}
              handleDerivateToPosition={(number, position) => handleDerivateToPosition(number, position, setIsDerivating, setNumero, setShowModal)}
              handlePauseNumber={(number) => handlePauseNumber(number, setNumero)}
              handleCancelNumber={(number) => handleCancelNumber(number, setNumero)}
              />
          </div>
        </div>
      </div>
    );
};