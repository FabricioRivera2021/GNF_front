import React, { useState } from 'react'
import { FilterSideBar } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export const IngresarMed = () => {
        const { setFilterCancel, setFilterPaused, setAllDerivates, setShowModal, numero, setNumero, } = userStateContext();
        const [selectedFilter, setSelectedFilter] = useState(1); //filtro actual
        const [duration, setDuration] = useState(1); //filtro actual
        const [frequency, setFrequency] = useState(1); // State variable for range value

        const handleClickFilter = (id) => {
                console.log("handleClickFilter");
                setFilterPaused(false);
                setFilterCancel(false);
                setSelectedFilter(id);
        }

        return (
                <div className="flex">
                        {/* Reutilizar sideFilter para que se puedan filtrar temas del ingreso de recetas */}
                        <FilterSideBar
                                selectedFilter={selectedFilter}
                                handleClickFilter={(id) => handleClickFilter(id, setFilterCancel, setFilterPaused, setSelectedFilter)}
                                filterPausedNumber={() => setFilterPaused(true)}
                                filterCancelNumber={() => setFilterCancel(true)}
                        />

                        {/* Main div */}
                        <div className='flex flex-col w-full h-[calc(100vh-4rem)] bg-blue-100 justify-between'>
                                {/* Sub Div with medication */}
                                <div className='flex justify-between w-[calc(95%)] h-[calc(100vh-4rem)]'>
                                        <div className='w-2/3 p-2'>
                                                <div className="max-full mx-auto bg-white p-8 rounded-lg shadow-md">
                                                        <h2 className="text-2xl font-bold mb-6">Ingresar Medicación</h2>
                                                        <form>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicationName">
                                                                        Nombre de la Medicación
                                                                        </label>
                                                                        <input
                                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                        id="medicationName"
                                                                        type="text"
                                                                        placeholder="Nombre de la Medicación"
                                                                        />
                                                                </div>
                                                                <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicationName">
                                                                        Nombre del medico tratante
                                                                        </label>
                                                                        <input
                                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                        id="medicationName"
                                                                        type="text"
                                                                        placeholder="Nombre del medico tratante"
                                                                        />
                                                                        <label className='flex items-center justify-start gap-2' htmlFor="sinMedico">
                                                                                <input type="checkbox" name="sin_medico" id="sin_medico"/>
                                                                                Sin médico 
                                                                        </label>
                                                                </div>
                                                                <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequency">
                                                                                Frecuencia x dia
                                                                        </label>
                                                                        <select
                                                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                                id="frequency"
                                                                                value={frequency}
                                                                                onChange={(e) => setFrequency(e.target.value)}
                                                                        >
                                                                        {Array.from({ length: 30 }, (_, i) => i + 1).map((value) => (
                                                                                <option key={value} value={value}>
                                                                                {value}
                                                                                </option>
                                                                        ))}
                                                                        </select>
                                                                </div>
                                                                <div className="mb-4">
                                                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weeklyDosage">
                                                                                Duración tto.
                                                                        </label>
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
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                <button
                                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                        type="button"
                                                                >
                                                                        Agregar
                                                                </button>
                                                                </div>
                                                        </form>
                                                </div>
                                        </div>
                                        <div className="w-full p-2 flex flex-col gap-2">
                                                <div className="bg-white p-8 rounded-lg shadow-md">
                                                        <h2 className="text-2xl font-bold mb-6">Detalle medicación</h2>
                                                        <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600">
                                                        <thead>
                                                                <tr className='bg-blue-400'>
                                                                        <th className="px-4 py-2 text-white">Medico</th>
                                                                        <th className="px-4 py-2 text-white">Medicamento</th>
                                                                        <th className="px-4 py-2 text-white">Frecuencia</th>
                                                                        <th className="px-4 py-2 text-white">Duración</th>
                                                                        <th className="px-4 py-2 text-white">Tipo de retiro</th>
                                                                        <th className="px-4 py-2 text-white">Cantidad</th>
                                                                        <th className="px-4 py-2 text-white">Cantidad cajas/fcos</th>
                                                                        <th className="px-4 py-2 text-white">Retira</th>
                                                                        <th className="px-4 py-2 text-white"></th>
                                                                        <th className="px-4 py-2 text-white"></th>
                                                                </tr>
                                                        </thead>
                                                        <tbody>
                                                                <tr className='odd:bg-slate-50 even:bg-gray-200'>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Sin médico</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Medicamento 1</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">2 comp. x dia</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">30 dias</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Receta</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">60 comp</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">2 cajas</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">1 caja</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap"><button><PencilSquareIcon className='text-blue-400 hover:text-blue-600 w-6'/></button></td>
                                                                        <td className="px-4 py-2 whitespace-nowrap"><button><TrashIcon className='w-6 text-red-400 hover:text-red-600'/></button></td>
                                                                </tr>
                                                                <tr className='odd:bg-slate-50 even:bg-gray-200'>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Juan Perez</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Medicamento 2</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">1 comp. x dia</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">1 semana</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Receta</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">7 comp</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">1 caja</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">No retira</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap"><button><PencilSquareIcon className='text-blue-400 hover:text-blue-600 w-6'/></button></td>
                                                                        <td className="px-4 py-2 whitespace-nowrap"><button><TrashIcon className='w-6 text-red-400 hover:text-red-600'/></button></td>
                                                                </tr>
                                                                <tr className='odd:bg-slate-50 even:bg-gray-200'>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Maria Rodriguez</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Medicamento 3</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">20 gts. x dia</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">3 meses restantes</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">Cuenta cronicos</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">150 gts.</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">1 fco.</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">1 fco.</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap"><button><PencilSquareIcon className='text-blue-400 hover:text-blue-600 w-6'/></button></td>
                                                                        <td className="px-4 py-2 whitespace-nowrap"><button><TrashIcon className='w-6 text-red-400 hover:text-red-600'/></button></td>
                                                                </tr>
                                                        </tbody>
                                                        </table>
                                                </div>
                                                <div className="max-full bg-white p-8 rounded-lg shadow-md">
                                                        <h2 className="text-2xl font-bold mb-6">Detalle retiro</h2>
                                                        <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600">
                                                        <thead>
                                                                <tr className='bg-blue-400'>
                                                                        <th className="px-4 py-2 text-white">Cantidad cajas/frascos</th>
                                                                        <th className="px-4 py-2 text-white">Total facturación</th>
                                                                </tr>
                                                        </thead>
                                                        <tbody>
                                                                <tr className='odd:bg-slate-50 even:bg-gray-200'>
                                                                        <td className="px-4 py-2 whitespace-nowrap">2</td>
                                                                        <td className="px-4 py-2 whitespace-nowrap">$ 180.00</td>
                                                                </tr>
                                                                <div className="flex items-center justify-between">
                                                                        <button
                                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                                type="button"
                                                                        >
                                                                        Generar factura
                                                                        </button>
                                                                </div>
                                                        </tbody>
                                                        </table>
                                                </div>
                                        </div>
                                </div>

                                {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
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
        )
}
