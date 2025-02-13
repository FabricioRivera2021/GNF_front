import React, { useEffect, useState } from 'react';
import { FilterSideBar, Modal } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ArrowUpTrayIcon, CheckBadgeIcon, CheckIcon, ExclamationTriangleIcon, PencilSquareIcon, PlusCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';
import { fetchAllMedicamentos, getCurrentSelectedNumber } from '../API/apiServices';

export default function ngresarMed () {
    const { setFilterCancel, setFilterPaused, setAllDerivates, setShowModal, showModal, numero, setNumero, showMedicoModal, setShowMedicoModal, showMedicationModal, setShowMedicationModal, medications, setMedications } = userStateContext();
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

    //traer todos los medicamentos
    useEffect(() => {
        fetchAllMedicamentos(setMedications);
    }, []);

    // const medications = [
    //     { comercialName: 'Dolosedol', drugName: 'Paracetamol', type: 'Comp', unit: '20 mg', category: 'Calmantes', ranurable: 'si', stock: 100 },
    //     { comercialName: 'Paracetamol Szabo', drugName: 'Paracetamol', type: 'Comp', unit: '20 mg', category: 'Calmantes', ranurable: 'si', stock: 80 },
    //     { comercialName: 'Metasedin', drugName: 'Metadona', type: 'Comp', unit: '10 mg', category: 'Calmantes', ranurable: 'si', stock: 50 },
    //     { comercialName: 'Primperan', drugName: 'Metoclopramida', type: 'Gotas', unit: '1 ml', category: 'Gastroenterologia', ranurable: '--', stock: 200 },
    //     { comercialName: 'Rivotril', drugName: 'Clonazepam', type: 'Comp', unit: '15 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 150 },
    //     { comercialName: 'Clonotine', drugName: 'Clonazepam', type: 'Comp', unit: '10 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 120 },
    //     { comercialName: 'Regulapres', drugName: 'Losartan', type: 'Capsula', unit: '50 mg', category: 'Cardiologia', ranurable: 'si', stock: 75 },
    //     { comercialName: 'Aspirina Bayer', drugName: 'Ácido Acetilsalicílico', type: 'Comp', unit: '100 mg', category: 'Antiinflamatorio', ranurable: 'si', stock: 300 },
    //     { comercialName: 'Omeprazol Actavis', drugName: 'Omeprazol', type: 'Capsula', unit: '40 mg', category: 'Gastroenterologia', ranurable: 'si', stock: 180 },
    //     { comercialName: 'Ibuprofeno Bago', drugName: 'Ibuprofeno', type: 'Comp', unit: '400 mg', category: 'Antiinflamatorio', ranurable: 'si', stock: 220 },
    //     { comercialName: 'Amoxicilina MK', drugName: 'Amoxicilina', type: 'Capsula', unit: '500 mg', category: 'Antibiotico', ranurable: 'si', stock: 140 },
    //     { comercialName: 'Zitromax', drugName: 'Azitromicina', type: 'Suspensión', unit: '200 mg/5ml', category: 'Antibiotico', ranurable: 'No', stock: 90 },
    //     { comercialName: 'Diclofenaco Sandoz', drugName: 'Diclofenaco', type: 'Comp', unit: '50 mg', category: 'Antiinflamatorio', ranurable: 'si', stock: 175 },
    //     { comercialName: 'Loratadina Genfar', drugName: 'Loratadina', type: 'Jarabe', unit: '5 mg/5ml', category: 'Antihistaminico', ranurable: 'si', stock: 130 },
    //     { comercialName: 'Cetirizina Medley', drugName: 'Cetirizina', type: 'Comp', unit: '10 mg', category: 'Antihistaminico', ranurable: 'si', stock: 90 },
    //     { comercialName: 'Atorvastatina Pfizer', drugName: 'Atorvastatina', type: 'Comp', unit: '20 mg', category: 'Cardiologia', ranurable: 'si', stock: 110 },
    //     { comercialName: 'Metformina Teva', drugName: 'Metformina', type: 'Comp', unit: '850 mg', category: 'Diabetes', ranurable: 'si', stock: 200 },
    //     { comercialName: 'Insulina Lantus', drugName: 'Insulina Glargina', type: 'Inyeccion', unit: '100 UI/ml', category: 'Diabetes', ranurable: 'No', stock: 50 },
    //     { comercialName: 'Sertralina Almus', drugName: 'Sertralina', type: 'Comp', unit: '50 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 85 },
    //     { comercialName: 'Fluoxetina Arrow', drugName: 'Fluoxetina', type: 'Comp', unit: '20 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 95 },
    //     { comercialName: 'Salbutamol MDI', drugName: 'Salbutamol', type: 'Inhalador', unit: '100 mcg/dosis', category: 'Neumologia', ranurable: 'si', stock: 160 },
    //     { comercialName: 'Budesonida Nebu', drugName: 'Budesonida', type: 'Nebulizador', unit: '0.5 mg/ml', category: 'Neumologia', ranurable: 'si', stock: 130 },
    //     { comercialName: 'Montelukast Pensa', drugName: 'Montelukast', type: 'Comp', unit: '10 mg', category: 'Neumologia', ranurable: 'si', stock: 95 },
    //     { comercialName: 'Enalapril Cinfa', drugName: 'Enalapril', type: 'Comp', unit: '10 mg', category: 'Cardiologia', ranurable: 'si', stock: 120 },
    //     { comercialName: 'Levotiroxina Normon', drugName: 'Levotiroxina', type: 'Comp', unit: '100 mcg', category: 'Endocrinologia', ranurable: 'si', stock: 140 },
    //     { comercialName: 'Hidrocortisona Braun', drugName: 'Hidrocortisona', type: 'Inyeccion', unit: '100 mg', category: 'Endocrinologia', ranurable: 'No', stock: 60 },
    //     { comercialName: 'Furosemida Lasix', drugName: 'Furosemida', type: 'Comp', unit: '40 mg', category: 'Diuretico', ranurable: 'si', stock: 90 },
    //     { comercialName: 'Espironolactona Ratiopharm', drugName: 'Espironolactona', type: 'Comp', unit: '25 mg', category: 'Diuretico', ranurable: 'si', stock: 85 },
    //     { comercialName: 'Gabapentina Aristo', drugName: 'Gabapentina', type: 'Capsula', unit: '300 mg', category: 'Neurologia', ranurable: 'No', stock: 80 },
    //     { comercialName: 'Pregabalina Almus', drugName: 'Pregabalina', type: 'Capsula', unit: '75 mg', category: 'Neurologia', ranurable: 'No', stock: 75 },
    //     { comercialName: 'Carbamazepina Normon', drugName: 'Carbamazepina', type: 'Comp', unit: '200 mg', category: 'Neurologia', ranurable: 'No', stock: 95 },
    //     { comercialName: 'Duloxetina Sandoz', drugName: 'Duloxetina', type: 'Capsula', unit: '60 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 70 },
    //     { comercialName: 'Risperidona Almus', drugName: 'Risperidona', type: 'Comp', unit: '2 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 65 },
    //     { comercialName: 'Quetiapina Teva', drugName: 'Quetiapina', type: 'Comp', unit: '100 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 60 }
    // ];

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

    const handleCloseModal = () => setShowModal(false);
    const handleCloseMedicationModal = () => setShowMedicaitonModal(false);
    const handleCloseMedicoModal = () => setShowMedicoModal(false);

    return (
        <div className="flex">
            <IngresarMedSideBar />
            <div className='flex flex-col w-full h-[calc(100vh-4rem)]'>
                {/* Ingresar medicacion formulario */}
                <div className="flex flex-col items-start w-full bg-slate-100 p-3 space-y-3">
                    <h2 className="text-2xl font-bold mb-2">Ingresar Medicación</h2>
                    <div className='flex items-end justify-start gap-2'>
                      <input
                        className="shadow appearance-none border rounded-md ml-4 py-2 px-2 text-gray-100 font-semibold leading-tight 
                        focus:outline-none focus:shadow-outline bg-blue-400 cursor-pointer hover:bg-blue-500"
                        id="medicationName"
                        type="button"
                        value="Buscar médico"
                        onClick={() => {
                          setSearchTermMedico('');
                          setShowMedicoModal(true);}
                        }
                        />
                      <div className='flex items-center gap-2'>
                        <p className='text-slate-400 font-bold'>No se ingreso médico</p>
                        <CheckBadgeIcon className='w-6 text-green-500' /> 
                        <ExclamationTriangleIcon className='w-6 text-orange-400' />
                      </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar medicamento..."
                        className="p-2 ml-4 w-1/2 border rounded text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="rounded-lg w-full h-[calc(100vh-35rem)] overflow-auto">
                        <form className="space-y-4">
                            <div className='min-h-20 py-1 px-4'>
                            <table className="shadow-sm min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface p-2">
                            <thead className='sticky top-0 bg-blue-400 text-white'>
                                <tr>
                                <th className="px-2 py-1 border-b">Droga</th>
                                <th className="px-2 py-1 border-b">F. venc.</th>
                                <th className="px-2 py-1 border-b">Nombre comercial</th>
                                <th className="px-2 py-1 border-b">Concentración</th>
                                <th className="px-2 py-1 border-b">Presentación</th>
                                <th className="px-2 py-1 border-b">Unidad</th>
                                <th className="px-2 py-1 border-b">Via administración</th>
                                <th className="px-2 py-1 border-b">Tipo</th>
                                <th className="px-2 py-1 border-b">Estado</th>
                                <th className="px-2 py-1 border-b">Ranurable</th>
                                <th className="px-2 py-1 border-b">Laboratorio</th>
                                <th className="px-2 py-1 border-b">Stock</th>
                                <th className="px-2 py-1 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(groupedMedications).map((drugName, index) => (
                                <React.Fragment key={index}>
                                    {groupedMedications[drugName].map((medication, subIndex) => (
                                    <tr key={subIndex} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        {/* {subIndex === 0 && (
                                        <td className="px-2 py-1 border-b" rowSpan={groupedMedications[drugName].length}>
                                            {medication.droga}
                                        </td>
                                        )} */}
                                        <td className="px-2 py-1 border-b">{medication.droga}</td>
                                        <td className="px-2 py-1 border-b">{medication.fecha_vencimiento}</td>
                                        <td className="px-2 py-1 border-b">{medication.nombre_comercial}</td>
                                        <td className="px-2 py-1 border-b">{medication.droga_concentracion}</td>
                                        <td className="px-2 py-1 border-b">{medication.presentacion_farmaceutica}</td>
                                        <td className="px-2 py-1 border-b">{medication.unidad_medida}</td>
                                        <td className="px-2 py-1 border-b">{medication.via_administracion}</td>
                                        <td className="px-2 py-1 border-b">{medication.tipo_medicamento}</td>
                                        <td className="px-2 py-1 border-b">{medication.estado}</td>
                                        <td className="px-2 py-1 border-b">{medication.ranurable}</td>
                                        <td className="px-2 py-1 border-b">{medication.laboratorio}</td>
                                        <td className="px-2 py-1 border-b">{medication.stock}</td>
                                        <td className="px-2 py-1 border-b">
                                            <button className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'>Agregar</button>
                                        </td>
                                    </tr>
                                    ))}
                                </React.Fragment>
                                ))}
                            </tbody>
                            </table>
                                {/* FIN Modal para buscar medicación -------------------------------------- */}
                                
                            </div>
                        </form>
                    </div>
                    <Modal show={showMedicoModal} handleClose={handleCloseMedicoModal}>
                            <h2 className="text-xl font-bold mb-4">Buscar médico</h2>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="mb-4 p-2 border rounded w-full text-sm"
                                value={searchTermMedico}
                                onChange={(e) => setSearchTermMedico(e.target.value)}
                            />
                            <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600">
                            <thead>
                                <tr>
                                <th className="px-2 py-1 border-b">Nombre</th>
                                <th className="px-2 py-1 border-b">Apellido</th>
                                <th className="px-2 py-1 border-b">Número de Registro</th>
                                <th className="px-2 py-1 border-b">Número de Caja Médica</th>
                                <th className="px-2 py-1 border-b">Especialidad</th>
                                <th className="px-2 py-1 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMedicos.map((medico, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="px-2 py-1 border-b">{medico.nombre}</td>
                                    <td className="px-2 py-1 border-b">{medico.apellido}</td>
                                    <td className="px-2 py-1 border-b">{medico.numeroRegistro}</td>
                                    <td className="px-2 py-1 border-b">{medico.numeroCajaMedica}</td>
                                    <td className="px-2 py-1 border-b">{medico.especialidad.join(', ')}</td>
                                    <td className="px-2 py-1 border-b"><button className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'>Agregar</button></td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                      </Modal>
                </div>
                <div className="flex items-center mx-7 mt-4 gap-4">
                    <div className='flex w-fit items-end rounded-md shadow-md border-orange-500 border-x-2 border-y-2 py-0.5 px-2 gap-5 text-lg'>
                        <div className='flex font-bold'>
                            <p className='text-slate-700 mb-1'>Clonazepam</p>
                        </div>
                        <div className='flex gap-4 items-center font-normal'>
                            <p className='text-slate-600 mb-1'>Psicofarmaco</p>
                            <p className='text-slate-600 mb-1'>50mg</p>
                            <p className='text-slate-600 mb-1'>20 Comprimidos</p>
                            <p className='text-slate-600 mb-1'>CONTROLADO</p>
                            <ExclamationTriangleIcon className='w-6 text-orange-400' />
                        </div>
                    </div>
                </div>
                <div className="items-start w-full p-3 space-y-6">
                    <div className="rounded-lg w-full overflow-auto">
                        <form className="space-y-4">
                            <div className='min-h-20 p-4 flex gap-4 items-end'>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="duration">Duración tto.</label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    >
                                        <optgroup label="1 dia hasta 6 dias">
                                            {Array.from({ length: 6 }, (_, i) => i + 1).map((value) => (
                                                <option key={value} value={value}>
                                                    {value} {value === 1 ? 'dia' : 'dias'}
                                                </option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="1 semana a 3 semanas">
                                            {Array.from({ length: 3 }, (_, i) => i + 1).map((value) => (
                                                <option key={value + 6} value={value + 6}>
                                                    {value} {value === 1 ? 'semana' : 'semanas'}
                                                </option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="1 mes a 6 meses">
                                            {Array.from({ length: 6 }, (_, i) => i + 1).map((value) => (
                                                <option key={value + 9} value={value + 9}>
                                                    {value} {value === 1 ? 'mes' : 'meses'}
                                                </option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="frequency">Frecuencia</label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="duration"
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}
                                    >
                                        <option value="hora">Por hora</option>
                                        <option value="dia">Por dia</option>
                                        <option value="dias">Cada x dias</option>
                                        <option value="evento">Sobre evento</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="frequency">Frecuencia x dia</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="frequency"
                                        type="number"
                                        value={0}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="weeklyDosage">Puede retirar</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="weeklyDosage"
                                        type="text"
                                        readOnly
                                        value="3 cajas"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="quantity">Cantidad que retira</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="quantity"
                                        type="number"
                                        value={0}
                                    />
                                </div>
                                <div>
                                <button className="mt-4 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Agregar medicacion a retiro
                                </button>
                                </div>
                                {/* ###################################################################################################################### */}
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


{/* <div>
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="medicationName">Médico tratante</label>
        <input
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-100 font-semibold leading-tight focus:outline-none focus:shadow-outline bg-blue-400 cursor-pointer hover:bg-blue-500"
            id="medicationName"
            type="button"
            value="Buscar médico"
            onClick={() => setShowModal(true)}
        />

        <label className="flex items-center justify-start gap-2 text-sm mt-2" htmlFor="sinMedico">
            <input type="checkbox" name="sin_medico" id="sin_medico" />
            Sin médico
        </label>
    </div>
    <Modal show={showModal} handleClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Buscar médico</h2>
        <input
            type="text"
            placeholder="Buscar..."
            className="mb-4 p-2 border rounded w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600">
        <thead>
            <tr>
            <th className="px-2 py-1 border-b">Nombre</th>
            <th className="px-2 py-1 border-b">Apellido</th>
            <th className="px-2 py-1 border-b">Número de Registro</th>
            <th className="px-2 py-1 border-b">Número de Caja Médica</th>
            <th className="px-2 py-1 border-b">Especialidad</th>
            <th className="px-2 py-1 border-b"></th>
            </tr>
        </thead>
        <tbody>
            {filteredMedicos.map((medico, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="px-2 py-1 border-b">{medico.nombre}</td>
                <td className="px-2 py-1 border-b">{medico.apellido}</td>
                <td className="px-2 py-1 border-b">{medico.numeroRegistro}</td>
                <td className="px-2 py-1 border-b">{medico.numeroCajaMedica}</td>
                <td className="px-2 py-1 border-b">{medico.especialidad.join(', ')}</td>
                <td className="px-2 py-1 border-b"><button className='bg-blue-400 px-2 py-0.5 rounded-sm shadow-sm text-white hover:bg-blue-600'>Agregar</button></td>
            </tr>
            ))}
        </tbody>
        </table>
    </Modal>
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="frequency">Frecuencia x dia</label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="frequency"
            type="number"
            value={0}
        />
    </div>
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="duration">Duración tto.</label>
        <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
        >
            <optgroup label="1 dia hasta 6 dias">
                {Array.from({ length: 6 }, (_, i) => i + 1).map((value) => (
                    <option key={value} value={value}>
                        {value} {value === 1 ? 'dia' : 'dias'}
                    </option>
                ))}
            </optgroup>
            <optgroup label="1 semana a 3 semanas">
                {Array.from({ length: 3 }, (_, i) => i + 1).map((value) => (
                    <option key={value + 6} value={value + 6}>
                        {value} {value === 1 ? 'semana' : 'semanas'}
                    </option>
                ))}
            </optgroup>
            <optgroup label="1 mes a 6 meses">
                {Array.from({ length: 6 }, (_, i) => i + 1).map((value) => (
                    <option key={value + 9} value={value + 9}>
                        {value} {value === 1 ? 'mes' : 'meses'}
                    </option>
                ))}
            </optgroup>
        </select>
    </div>
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="weeklyDosage">Puede retirar</label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="weeklyDosage"
            type="text"
            readOnly
            value="3 cajas"
        />
    </div>
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="quantity">Cantidad que retira</label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            value={0}
        />
    </div> */}




{/* Ver medicacion antes de agregar
<div className='p-5'>
<div className="p-4 bg-blue-400 rounded-lg shadow-md">
<table className="text-left text-sm font-roboto font-medium text-white">
<tbody>
    <tr>
    <td className="px-2 py-1 border-b uppercase"><strong>Nombre Comercial:</strong></td>
    <td className="px-2 py-1 border-b">Paracetamol</td>
    </tr>
    <tr>
    <td className="px-2 py-1 border-b uppercase"><strong>Droga:</strong></td>
    <td className="px-2 py-1 border-b">Paracetamol</td>
    </tr>
    <tr>
    <td className="px-2 py-1 border-b uppercase"><strong>Presentación:</strong></td>
    <td className="px-2 py-1 border-b">Comp.</td>
    </tr>
    <tr>
    <td className="px-2 py-1 border-b uppercase"><strong>Unidad:</strong></td>
    <td className="px-2 py-1 border-b">mg</td>
    </tr>
    <tr>
    <td className="px-2 py-1 border-b uppercase"><strong>Categoría:</strong></td>
    <td className="px-2 py-1 border-b">Analgesico</td>
    </tr>
    <tr>
    <td className="px-2 py-1 border-b uppercase"><strong>Ranurable:</strong></td>
    <td className="px-2 py-1 border-b">SI</td>
    </tr>
    <tr>
    <td className="px-2 py-1 border-b uppercase"><strong>Stock:</strong></td>
    <td className="px-2 py-1 border-b">150</td>
    </tr>
</tbody>
</table>
</div>
</div> */}





{/* Ver detalle de medicacion agregada
<div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Detalle medicación</h2>
    <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600">
        <thead>
            <tr className="bg-blue-400 text-white">
                <th className="px-4 py-2">Medico</th>
                <th className="px-4 py-2">Medicamento</th>
                <th className="px-4 py-2">Frecuencia</th>
                <th className="px-4 py-2">Duración</th>
                <th className="px-4 py-2">Tipo de retiro</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Cantidad cajas/fcos</th>
                <th className="px-4 py-2">Retira</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
            </tr>
        </thead>
        <tbody>
            <tr className="odd:bg-slate-50 even:bg-gray-200">
                <td className="px-4 py-2">Sin médico</td>
                <td className="px-4 py-2">Medicamento 1</td>
                <td className="px-4 py-2">2 comp. x dia</td>
                <td className="px-4 py-2">30 dias</td>
                <td className="px-4 py-2">Receta</td>
                <td className="px-4 py-2">60 comp</td>
                <td className="px-4 py-2">2 cajas</td>
                <td className="px-4 py-2">1 caja</td>
                <td className="px-4 py-2"><button><PencilSquareIcon className="text-blue-400 hover:text-blue-600 w-6" /></button></td>
                <td className="px-4 py-2"><button><TrashIcon className="w-6 text-red-400 hover:text-red-600" /></button></td>
            </tr>
            <tr className="odd:bg-slate-50 even:bg-gray-200">
                <td className="px-4 py-2">Juan Perez</td>
                <td className="px-4 py-2">Medicamento 2</td>
                <td className="px-4 py-2">1 comp. x dia</td>
                <td className="px-4 py-2">1 semana</td>
                <td className="px-4 py-2">Receta</td>
                <td className="px-4 py-2">7 comp</td>
                <td className="px-4 py-2">1 caja</td>
                <td className="px-4 py-2">No retira</td>
                <td className="px-4 py-2"><button><PencilSquareIcon className="text-blue-400 hover:text-blue-600 w-6" /></button></td>
                <td className="px-4 py-2"><button><TrashIcon className="w-6 text-red-400 hover:text-red-600" /></button></td>
            </tr>
            <tr className="odd:bg-slate-50 even:bg-gray-200">
                <td className="px-4 py-2">Maria Rodriguez</td>
                <td className="px-4 py-2">Medicamento 3</td>
                <td className="px-4 py-2">20 gts. x dia</td>
                <td className="px-4 py-2">3 meses restantes</td>
                <td className="px-4 py-2">Cuenta cronicos</td>
                <td className="px-4 py-2">150 gts.</td>
                <td className="px-4 py-2">1 fco.</td>
                <td className="px-4 py-2">1 fco.</td>
                <td className="px-4 py-2"><button><PencilSquareIcon className="text-blue-400 hover:text-blue-600 w-6" /></button></td>
                <td className="px-4 py-2"><button><TrashIcon className="w-6 text-red-400 hover:text-red-600" /></button></td>
            </tr>
        </tbody>
    </table>
    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Ver detalle de retiro y generar factura
    </button>
</div> */}