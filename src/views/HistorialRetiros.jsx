import React, { useEffect, useState } from 'react';
import { FilterSideBar, Modal } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ArrowUpTrayIcon, CheckBadgeIcon, CheckIcon, ExclamationTriangleIcon, PencilSquareIcon, PlusCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';
import { fetchAllMedicamentos, fetchHistoricoRetiros, getCurrentSelectedNumber } from '../API/apiServices';

export default function HistorialRetiros() {
    const { 
        setFilterCancel, 
        setFilterPaused, 
        setAllDerivates, 
        setShowModal, 
        numero, 
        setNumero, 
        medications, 
        setMedications,
        addMedication,
        setAddMedication,
        historicoRetiros,
        setHistoricoRetiros
    } = userStateContext();
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [duration, setDuration] = useState(1);
    const [frequency, setFrequency] = useState(1);
    const [retiro, setRetiro] = useState('');
    const [cajasRetiro , setCajasRetiro] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [f_inic, setF_inic] = useState('');
    const [f_fin, setF_fin] = useState('');
    const [searchTermMedico, setSearchTermMedico] = useState('');

    const handleAddMedication = (event, id, droga, nombre_comercial, tipo_medicamento, droga_concentracion, unidades_caja, presentacion_farmaceutica) => {
        event.preventDefault();
        setAddMedication({
            id: id,
            droga: droga,
            nombre_comercial: nombre_comercial,
            tipo_medicamento: tipo_medicamento,
            droga_concentracion: droga_concentracion,
            unidades_caja: unidades_caja,
            presentacion_farmaceutica: presentacion_farmaceutica
        });
        console.log(addMedication);
    }

    const handleSetHistoricoRetiros = () => {
        setHistoricoRetiros({
            droga: droga,
            nombre_comercial: nombre_comercial,
            medico: medico,
            especialidad: especialidad,
            tipo_cuenta: tipo_cuenta,
            retiros_pendientes: retiros_pendientes,
            funcionario: funcionario,
            fecha_inicio_tto: fecha_inicio_tto,
            fecha_fin_tto: fecha_fin_tto,
            cantidad_retirada: cantidad_retirada
        });
    }

    //get current selected number by the User
    useEffect(() => {
        getCurrentSelectedNumber(setNumero)
    }, []);


    const customer_id = 1; //! cambiar por el id del customer que este siendo atendido
    //traer los registros de retiros
    useEffect(() => {
        const data = fetchHistoricoRetiros(customer_id, setHistoricoRetiros);
        console.log(data);
    }, []);

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
        {
            nombre: 'Laura',
            apellido: 'Fernandez',
            numeroRegistro: '445566',
            numeroCajaMedica: '778899',
            especialidad: ['Psiquiatría']
        },
        {
            nombre: 'Miguel',
            apellido: 'Garcia',
            numeroRegistro: '556677',
            numeroCajaMedica: '889900',
            especialidad: ['Oftalmología']
        },
        {
            nombre: 'Sofia',
            apellido: 'Hernandez',
            numeroRegistro: '667788',
            numeroCajaMedica: '990011',
            especialidad: ['Endocrinología']
        },
        {
            nombre: 'Diego',
            apellido: 'Ramirez',
            numeroRegistro: '778899',
            numeroCajaMedica: '110022',
            especialidad: ['Urología']
        },
        {
            nombre: 'Elena',
            apellido: 'Torres',
            numeroRegistro: '889900',
            numeroCajaMedica: '220033',
            especialidad: ['Reumatología']
        }];

    const filteredMedications = medications.filter(medication =>
        medication.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.droga.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.grupo_terapeutico.toLowerCase().includes(searchTerm.toLowerCase())
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

    return (
        <div className="flex">
            <IngresarMedSideBar />
            <div className='flex flex-col w-full h-[calc(100vh-4rem)]'>

            <div className="flex flex-col items-start w-full p-3 space-y-3">
                    <h2 className="text-2xl font-bold mb-2">Historial retiros</h2>
                    <div className="rounded-lg w-full h-[calc(100vh-35rem)] overflow-auto">
                        <form className="space-y-4">
                            <div className='flex'>
                                <div className='flex w-1/3'>
                                    <label htmlFor="f_inic" className="px-2 py-0.5 ml-3 text-sm font-roboto font-medium text-slate-600">
                                        Fecha inicio
                                    </label>
                                    <input
                                        id='f_inic'
                                        type="date"
                                        placeholder="Buscar medicamento..."
                                        className="px-2 py-0.5 ml-4 w-2/3 border rounded text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div> 
                                <div className='flex w-1/3'>
                                    <label htmlFor="f_fin" className="px-2 py-0.5 ml-3 text-sm font-roboto font-medium text-slate-600">
                                        Fecha fin
                                    </label>
                                    <input
                                        id='f_fin'
                                        type="date"
                                        placeholder="Buscar medicamento..."
                                        className="px-2 py-0.5 ml-4 w-2/3 border rounded text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='min-h-20 py-1 px-4'>
                                <table className="shadow-sm min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface p-2">
                                <thead className='sticky top-0 bg-blue-400 text-white whitespace-nowrap'>
                                    <tr>
                                        <th className="px-2 py-1 border-b">MOVIMIENTO_ID</th>
                                        <th className="px-2 py-1 border-b">FECHA</th>
                                        <th className="px-2 py-1 border-b">Droga</th>
                                        <th className="px-2 py-1 border-b">Marca comercial</th>
                                        <th className="px-2 py-1 border-b">Médico</th>
                                        <th className="px-2 py-1 border-b">Especialidad</th>
                                        <th className="px-2 py-1 border-b">Tipo Cuenta</th>
                                        <th className="px-2 py-1 border-b">Funcionario</th>
                                        <th className="px-2 py-1 border-b">Cantidad retirada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMedications.map((medication, index) => (
                                        <tr key={index} className='hover:bg-gray-100 cursor-pointer'>
                                            <td className="px-2 py-1 border-b">{medication.droga}</td>
                                            <td className="px-2 py-1 border-b">{medication.droga}</td>
                                            <td className="px-2 py-1 border-b">{medication.droga}</td>
                                            <td className="px-2 py-1 border-b">{medication.nombre_comercial}</td>
                                            <td className="px-2 py-1 border-b">{medication.medico}</td>
                                            <td className="px-2 py-1 border-b">{medication.especialidad}</td>
                                            <td className="px-2 py-1 border-b">{medication.tipo_cuenta}</td>
                                            <td className="px-2 py-1 border-b">{medication.funcionario}</td>
                                            <td className="px-2 py-1 border-b">{medication.cantidad_retirada}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                                {/* FIN Modal para buscar medicación -------------------------------------- */}
                            </div>
                        </form>
                    </div>
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
    );
};