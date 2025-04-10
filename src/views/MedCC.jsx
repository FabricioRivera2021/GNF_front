import React, { useEffect, useState } from 'react';
import { Modal } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';
import { fetchTratamiento, getCurrentSelectedNumber } from '../API/apiServices';

export default function MedCC () {
    const { setFilterCancel, setFilterPaused, setAllDerivates, setShowModal, showModal, numero, setNumero, 
            showMedicoModal, setShowMedicoModal, showMedicationModal, setShowMedicationModal, tratamientos, setTratamientos } = userStateContext();
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [openModalCC, setOpenModalCC] = useState(false);
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

    const handleClickFilter = (id) => {
        setFilterPaused(false);
        setFilterCancel(false);
        setSelectedFilter(id);
    };

    const handleOpenModal = () => {
        setOpenModalCC(true);
    }

    return (
      <div className="flex">
        <IngresarMedSideBar />
        <div className='flex flex-col w-[calc(100vw-4rem)] h-[calc(100vh-4rem)]'>
          <div className="flex flex-col items-start w-full p-3 space-y-3">
            <h2 className="text-2xl font-bold mb-2">Cuenta corriente</h2>
            <div className="rounded-lg overflow-auto">
              <div className='py-1 px-4'>
                <table className="shadow-sm text-left text-sm font-roboto font-medium text-slate-600 text-surface p-2">
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
                    </tr>
                  </thead>
                  <tbody className='whitespace-nowrap'>
                    {tratamientos.map((tto, index) => (
                      <tr key={index} 
                          className='hover:bg-gray-100 cursor-pointer' 
                          onClick={
                            () => {
                              handleOpenModal();
                              setTtoShowMedicationOnModal({
                                  id: index,
                                  marca: tto.medication.nombre_comercial,
                                  droga: tto.medication.droga,
                                  concentracion: tto.medication.droga_concentracion,
                                  tto_dias: tto.total_tto_dias,
                                  frec: tto.frecuencia,
                                  pendientes: tto.retiros_pendientes,
                                  ret_mes: tto.retiros_por_mes,
                                  f_inic: tto.fecha_inicio,
                                  f_fin: tto.fecha_fin
                                });
                            }}
                      >
                        <td className="px-2 py-1 border-b">{tto.activo ? <ArrowUpCircleIcon className='w-6 text-green-400' /> : <ArrowDownCircleIcon className='w-6 text-red-400' />}</td>
                        <td className="px-2 py-1 border-b">{tto.medication.droga}</td>
                        <td className="px-2 py-1 border-b">2 comp/dia!!!</td>
                        <td className="px-2 py-1 border-b">{tto.total_tto_dias} dias</td>
                        <td className="px-2 py-1 border-b">{tto.medicos.nombre} {tto.medicos.apellido}</td>
                        <td className="px-2 py-1 border-b">{tto.medicos.especialidad}</td>
                        <td className="px-2 py-1 border-b">{tto.tipo_tto}</td>
                        <td className="px-2 py-1 border-b">{tto.retiros_pendientes} caja/s</td>
                        <td className="px-2 py-1 border-b">{tto.retiros_por_mes} caja/s</td>
                        <td className="px-2 py-1 border-b">{tto.user.name}</td>
                        <td className="px-2 py-1 border-b">{tto.fecha_inicio}</td>
                        <td className="px-2 py-1 border-b">{tto.fecha_fin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal show={openModalCC} handleClose={() => setOpenModalCC(false)}>
                <div className='flex flex-col gap-4'>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold">{ttoShowMedicationOnModal.droga} {ttoShowMedicationOnModal.concentracion}</h3>
                    </div>
                    <div className='bg-yellow-100 rounded-md p-1 text-slate-500'>
                      <p className='border-b'>Marca: {ttoShowMedicationOnModal.marca}</p>
                      <p className='border-b'>Tratamiento: {ttoShowMedicationOnModal.tto_dias} dias</p>
                      <p className='border-b'>Frecuencia: 1 comp cada 8 hs por 30 dias</p>
                      <p className='border-b'>Retiros pendientes: {ttoShowMedicationOnModal.pendientes} caja/s</p>
                      <p className='border-b'>Puede retirar: {ttoShowMedicationOnModal.ret_mes} caja/s</p>
                      <p className='border-b'>Fecha inicio tto.: {ttoShowMedicationOnModal.f_inic}</p>
                      <p className='border-b'>Fecha fin tto.: {ttoShowMedicationOnModal.f_fin}</p>
                      <p>Funcionario: ADMIN</p>
                    </div>
                    <p className='px-1 py-0.5'>Fecha actual: 10/04/2025</p>
                    <p className='px-1 py-0.5'>Retiro actual comprende desde 01/02/2023 hasta 02/03/2023</p>
                    {/* agregar calendario para ver fechas de retiro de manera mas facil */}
                    {/* PENDIENTE */}
                  </div>
                  <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Cantidad a retirar:</label>
                    <div className='flex gap-2 items-center'>
                      <input type="number" className="border w-1/2 border-gray-300 rounded-md p-2" placeholder="..." />
                      <p>Cajas</p>
                    </div>
                    <button className='bg-blue-400 text-white rounded-md shadow-sm px-2 py-0.5 mt-2' onClick={console.log('Agregar a retiro')}>Agregar a retiro</button>
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
