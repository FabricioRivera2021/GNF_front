import React, { useState } from 'react';
import { FilterSideBar, Modal } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ArrowUpTrayIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import IngresarMedSideBar from '../components/IngresarMedSideBar';

export const IngresarMed = () => {
    const { setFilterCancel, setFilterPaused, setAllDerivates, setShowModal, showModal, numero, setNumero, showMedicoModal, setShowMedicoModal, showMedicationModal, setShowMedicationModal } = userStateContext();
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [duration, setDuration] = useState(1);
    const [frequency, setFrequency] = useState(1);
    const [retiro, setRetiro] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const medications = [
        { comercialName: 'Dolosedol', drugName: 'Paracetamol', type: 'Comp', unit: '20 mg', category: 'Calmantes', ranurable: 'si', stock: 100 },
        { comercialName: 'Paracetamol Szabo', drugName: 'Paracetamol', type: 'Comp', unit: '20 mg', category: 'Calmantes', ranurable: 'si', stock: 80 },
        { comercialName: 'Metasedin', drugName: 'Metadona', type: 'Comp', unit: '10 mg', category: 'Calmantes', ranurable: 'si', stock: 50 },
        { comercialName: 'Primperan', drugName: 'Metoclopramida', type: 'Gotas', unit: '1 ml', category: 'Gastroenterologia', ranurable: '--', stock: 200 },
        { comercialName: 'Rivotril', drugName: 'Clonazepam', type: 'Comp', unit: '15 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 150 },
        { comercialName: 'Clonotine', drugName: 'Clonazepam', type: 'Comp', unit: '10 mg', category: 'Psicofarmaco', ranurable: 'No', stock: 120 },
        { comercialName: 'Regulapres', drugName: 'Losartan', type: 'Capsula', unit: '50 mg', category: 'Cardiologia', ranurable: 'si', stock: 75 },
    ];

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
        medico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.numeroRegistro.includes(searchTerm) ||
        medico.numeroCajaMedica.includes(searchTerm) ||
        medico.especialidad.some(especialidad => especialidad.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <div className="flex h-screen">
            <IngresarMedSideBar />
            <div className="flex flex-col w-full p-6 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
                    <h2 className="text-2xl font-bold mb-4">Ingresar Medicación</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="medicationName">Medicación</label>
                                <input
                                    className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-100 font-semibold leading-tight focus:outline-none focus:shadow-outline bg-blue-400 cursor-pointer hover:bg-blue-500"
                                    id="medicationName"
                                    type="button"
                                    value="Buscar medicación"
                                    onClick={() => setShowMedicationModal(true)}
                                />
                            </div>
                            {/* Modal para buscar medicación */}
                            <Modal show={showMedicationModal} handleClose={handleCloseMedicationModal}>
                                <h2 className="text-xl font-bold mb-4">Buscar medicación</h2>
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
                                            <th className="px-2 py-1 border-b">Nombre comercial</th>
                                            <th className="px-2 py-1 border-b">Droga</th>
                                            <th className="px-2 py-1 border-b">Presentación</th>
                                            <th className="px-2 py-1 border-b">Unidad</th>
                                            <th className="px-2 py-1 border-b">Ranurable</th>
                                            <th className="px-2 py-1 border-b">Categoria</th>
                                            <th className="px-2 py-1 border-b">Stock</th>
                                            <th className="px-2 py-1 border-b"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(groupedMedications).map((drugName, index) => (
                                            <React.Fragment key={index}>
                                                {groupedMedications[drugName].map((medication, subIndex) => (
                                                    <tr key={subIndex} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                                        {subIndex === 0 && (
                                                            <td className="px-2 py-1 border-b" rowSpan={groupedMedications[drugName].length}>
                                                                {medication.drugName}
                                                            </td>
                                                        )}
                                                        <td className="px-2 py-1 border-b">{medication.comercialName}</td>
                                                        <td className="px-2 py-1 border-b">{medication.type}</td>
                                                        <td className="px-2 py-1 border-b">{medication.unit}</td>
                                                        <td className="px-2 py-1 border-b">{medication.ranurable}</td>
                                                        <td className="px-2 py-1 border-b">{medication.category}</td>
                                                        <td className="px-2 py-1 border-b">{medication.stock}</td>
                                                        <td className="px-2 py-1 border-b">
                                                            <button><ArrowUpTrayIcon className="w-4 text-blue-400 hover:text-blue-600" /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </Modal>
                            {/* FIN Modal para buscar medicación -------------------------------------- */}
                            <div>
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
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
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
                </div>
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