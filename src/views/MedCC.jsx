import React, { useEffect, useState } from 'react';
import { FilterSideBar, Modal } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, ArrowUpTrayIcon, CheckBadgeIcon, CheckIcon, ExclamationTriangleIcon, PencilSquareIcon, PlusCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';
import { fetchTratamiento, getCurrentSelectedNumber } from '../API/apiServices';

export default function MedCC () {
    const { setFilterCancel, setFilterPaused, setAllDerivates, setShowModal, showModal, numero, setNumero, showMedicoModal, setShowMedicoModal, showMedicationModal, setShowMedicationModal, tratamientos, setTratamientos } = userStateContext();
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [duration, setDuration] = useState(1);
    const [frequency, setFrequency] = useState(1);
    const [retiro, setRetiro] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermMedico, setSearchTermMedico] = useState('');

    //get current selected number by the User
    useEffect(() => {
        getCurrentSelectedNumber(setNumero)
    }, []);

    const customer_id = 1; //! cambiar por el id del customer que este siendo atendido
    //traer todos los medicamentos
    useEffect(() => {
        const data = fetchTratamiento(customer_id, setTratamientos);
        console.log(data);
    }, []);

    // const filteredMedications = medications.filter(medication =>
    //     medication.comercialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     medication.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     medication.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     medication.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     medication.category.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // const groupedMedications = filteredMedications.reduce((acc, medication) => {
    //     if (!acc[medication.drugName]) {
    //         acc[medication.drugName] = [];
    //     }
    //     acc[medication.drugName].push(medication);
    //     return acc;
    // }, {});

    // const filteredMedicos = medicos.filter(medico =>
    //     medico.nombre.toLowerCase().includes(searchTermMedico.toLowerCase()) ||
    //     medico.apellido.toLowerCase().includes(searchTermMedico.toLowerCase()) ||
    //     medico.numeroRegistro.includes(searchTermMedico) ||
    //     medico.numeroCajaMedica.includes(searchTermMedico) ||
    //     medico.especialidad.some(especialidad => especialidad.toLowerCase().includes(searchTermMedico.toLowerCase()))
    // );

    const handleClickFilter = (id) => {
        setFilterPaused(false);
        setFilterCancel(false);
        setSelectedFilter(id);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseMedicationModal = () => setShowMedicaitonModal(false);
    const handleCloseMedicoModal = () => setShowMedicoModal(false);

    return (
        <div className="flex">
            <IngresarMedSideBar />
            <div className='flex flex-col w-full h-[calc(100vh-4rem)]'>
                {/* Ingresar medicacion formulario */}
                <div className="flex flex-col items-start w-full p-3 space-y-3">
                    <h2 className="text-2xl font-bold mb-2">Cuenta corriente</h2>
                    <div className="rounded-lg w-full h-[calc(100vh-35rem)] overflow-auto">
                        <form className="space-y-4">
                            <div className='min-h-20 py-1 px-4'>
                            <table className="shadow-sm min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface p-2">
                            <thead className='sticky top-0 bg-blue-400 text-white whitespace-nowrap'>
                                <tr>
                                <th className="px-2 py-1 border-b">Vigencia Tto</th>
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
                                <th className="px-2 py-1 border-b">Stock</th>
                                <th className="px-2 py-1 border-b">Cantidad que retira</th>
                                <th className="px-2 py-1 border-b"></th>
                                <th className="px-2 py-1 border-b"></th>
                                </tr>
                            </thead>
                            <tbody className='whitespace-nowrap'>
                                {tratamientos.map((tto, index) => (
                                        <tr key={index}>
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
                                        <td className="px-2 py-1 border-b">{tto.medication.stock}</td>
                                        <td className="px-2 py-1 border-b flex gap-4">
                                            <button className='bg-blue-400 hover:bg-blue-600 rounded px-2 text-white'>-</button>
                                            <p className='px-2 bg-white border border-slate-700 rounded-sm shadow-sm'>0</p>
                                            <button className='bg-blue-400 hover:bg-blue-600 rounded px-2 text-white'>+</button>
                                        </td>
                                        <td className="px-2 py-1 border-b"><button className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'>Agregar a retiro</button></td>
                                        <td className="px-2 py-1 border-b flex gap-4">
                                            <button className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'>Editar CC</button>
                                            <button className='bg-red-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-red-600'>Cancelar CC</button>
                                        </td>
                                        </tr>
                                ))}
                            </tbody>
                            </table>
                                {/* FIN Modal para buscar medicación -------------------------------------- */}
                                
                            </div>
                        </form>
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
