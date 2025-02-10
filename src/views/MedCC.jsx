import React, { useEffect, useState } from 'react';
import { FilterSideBar, Modal } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ArrowUpTrayIcon, CheckBadgeIcon, CheckIcon, ExclamationTriangleIcon, PencilSquareIcon, PlusCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';
import { getCurrentSelectedNumber } from '../API/apiServices';

export default function ngresarMed () {
    const { setFilterCancel, setFilterPaused, setAllDerivates, setShowModal, showModal, numero, setNumero, showMedicoModal, setShowMedicoModal, showMedicationModal, setShowMedicationModal } = userStateContext();
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

    const medications = [
        { comercialName: 'Dolosedol', drugName: 'Paracetamol', type: 'Comp', unit: '20 mg', category: 'Calmantes', ranurable: 'si', stock: 100 },
        { comercialName: 'Paracetamol Szabo', drugName: 'Paracetamol', type: 'Comp', unit: '20 mg', category: 'Calmantes', ranurable: 'si', stock: 80 },
        { comercialName: 'Metasedin', drugName: 'Metadona', type: 'Comp', unit: '10 mg', category: 'Calmantes', ranurable: 'si', stock: 50 },
        { comercialName: 'Primperan', drugName: 'Metoclopramida', type: 'Gotas', unit: '1 ml', category: 'Gastroenterologia', ranurable: '--', stock: 200 },
        { comercialName: 'Rivotril', drugName: 'Clonazepam', type: 'Comp', unit: '15 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 150 },
    ];

    const ttos = [
        { id: 1, 
          medic: 'Juan Perez', 
          especialidad: 'Cardiologia', 
          name: 'Losartan', 
          duration: '60 días', 
          f_inicio:'20/02/2025', 
          f_fin:'20/04/2025', 
          frequency: 'Cada 8 horas', 
          retiro: 1,
          enFechaDeRetiro: 2,
          stock: 100,
          cantidadRetirada: 1
        },
        { id: 2, 
          medic: 'Maria Gomez', 
          especialidad: 'Pediatría', 
          name: 'Paracetamol', 
          duration: '7 días', 
          f_inicio:'20/02/2025', 
          f_fin:'27/02/2025', 
          frequency: 'Cada 8 horas', 
          retiro: 0,
          enFechaDeRetiro: 1,
          stock: 100,
          cantidadRetirada: 1
        },
        { id: 3, 
          medic: 'Carlos Lopez', 
          especialidad: 'Dermatología', 
          name: 'Ibuprofeno', 
          duration: '7 días', 
          f_inicio:'20/02/2025', 
          f_fin:'27/02/2025', 
          frequency: 'Cada 8 horas', 
          retiro: 1,
          enFechaDeRetiro: 0,
          stock: 100,
          cantidadRetirada: 0
        },
    ]

    const medicos = [
        {
            nombre: 'Juan',
            apellido: 'Perez',
            numeroRegistro: '123456',
            numeroCajaMedica: '987654',
            especialidad: ['Cardiología', 'Medicina Interna']
        },
        {
            nombre: 'Maria',
            apellido: 'Gomez',
            numeroRegistro: '654321',
            numeroCajaMedica: '123987',
            especialidad: ['Pediatría']
        },
        {
            nombre: 'Carlos',
            apellido: 'Lopez',
            numeroRegistro: '112233',
            numeroCajaMedica: '445566',
            especialidad: ['Dermatología', 'Alergología']
        },
        {
            nombre: 'Ana',
            apellido: 'Martinez',
            numeroRegistro: '223344',
            numeroCajaMedica: '556677',
            especialidad: ['Ginecología', 'Obstetricia']
        },
        {
            nombre: 'Luis',
            apellido: 'Rodriguez',
            numeroRegistro: '334455',
            numeroCajaMedica: '667788',
            especialidad: ['Neurología']
        },
    ];

    const filteredMedications = medications.filter(medication =>
        medication.comercialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedMedications = filteredMedications.reduce((acc, medication) => {
        if (!acc[medication.drugName]) {
            acc[medication.drugName] = [];
        }
        acc[medication.drugName].push(medication);
        return acc;
    }, {});

    const filteredMedicos = medicos.filter(medico =>
        medico.nombre.toLowerCase().includes(searchTermMedico.toLowerCase()) ||
        medico.apellido.toLowerCase().includes(searchTermMedico.toLowerCase()) ||
        medico.numeroRegistro.includes(searchTermMedico) ||
        medico.numeroCajaMedica.includes(searchTermMedico) ||
        medico.especialidad.some(especialidad => especialidad.toLowerCase().includes(searchTermMedico.toLowerCase()))
    );

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
                <div className="flex flex-col items-start w-full bg-slate-100 p-3 space-y-3">
                    <h2 className="text-2xl font-bold mb-2">Cuenta corriente</h2>
                    <div className="rounded-lg w-full h-[calc(100vh-35rem)] overflow-auto">
                        <form className="space-y-4">
                            <div className='min-h-20 py-1 px-4'>
                            <table className="shadow-sm min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface p-2">
                            <thead className='sticky top-0 bg-blue-400 text-white whitespace-nowrap'>
                                <tr>
                                <th className="px-2 py-1 border-b">Médico</th>
                                <th className="px-2 py-1 border-b">Especialidad</th>
                                <th className="px-2 py-1 border-b">Droga</th>
                                <th className="px-2 py-1 border-b">Fecha inicio tto.</th>
                                <th className="px-2 py-1 border-b">Fecha fin tto.</th>
                                <th className="px-2 py-1 border-b">Duracion</th>
                                <th className="px-2 py-1 border-b">Mes que retira</th>
                                <th className="px-2 py-1 border-b">Puede retirar</th>
                                <th className="px-2 py-1 border-b">Stock</th>
                                <th className="px-2 py-1 border-b">Cantidad que retira</th>
                                <th className="px-2 py-1 border-b"></th>
                                <th className="px-2 py-1 border-b"></th>
                                </tr>
                            </thead>
                            <tbody className='whitespace-nowrap'>
                                {ttos.map((tto, index) => (
                                        <tr key={index}>
                                        <td className="px-2 py-1 border-b">{tto.medic}</td>
                                        <td className="px-2 py-1 border-b">{tto.especialidad}</td>
                                        <td className="px-2 py-1 border-b">{tto.name}</td>
                                        <td className="px-2 py-1 border-b">{tto.f_inicio}</td>
                                        <td className="px-2 py-1 border-b">{tto.f_fin}</td>
                                        <td className="px-2 py-1 border-b">{tto.duration}</td>
                                        <td className="px-2 py-1 border-b">{tto.retiro}</td>
                                        <td className="px-2 py-1 border-b">{tto.enFechaDeRetiro}</td>
                                        <td className="px-2 py-1 border-b">{tto.stock}</td>
                                        <td className="px-2 py-1 border-b flex gap-4">
                                            <button>-</button>
                                            <p>0</p>
                                            <button>+</button>
                                        </td>
                                        <td className="px-2 py-1 border-b"><button className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'>Agregar a retiro</button></td>
                                        <td className="px-2 py-1 border-b">
                                            <button className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'>Editar</button>
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
