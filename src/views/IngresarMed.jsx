import React, { useState } from 'react'
import { FilterSideBar, Modal } from '../components/index';
import LlamadorPanel from "../components/LlamadorPanel";
import { userStateContext } from '../context/ContextProvider';
import { ArrowUpTrayIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import IngresarMedSideBar from '../components/IngresarMedSideBar';

export const IngresarMed = () => {
  const { setFilterCancel, setFilterPaused, setAllDerivates, setShowModal, showModal, numero, setNumero } = userStateContext();
  const [selectedFilter, setSelectedFilter] = useState(1); //filtro actual
  const [duration, setDuration] = useState(1); //filtro actual
  const [frequency, setFrequency] = useState(1); // State variable for range value
  const [retiro, setRetiro] = useState(0); // State variable for range value
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

  const handleClickFilter = (id) => {
    console.log("handleClickFilter");
    setFilterPaused(false);
    setFilterCancel(false);
    setSelectedFilter(id);
  }

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex">
      {/* Reutilizar sideFilter para que se puedan filtrar temas del ingreso de recetas */}

      {/* Main div */}
      <div className='flex flex-col w-full h-[calc(100vh-4rem)] bg-blue-100 justify-between'>
        {/* Sub Div with medication */}
        <div className='flex justify-between w-[calc(100%)] h-[calc(100vh-4rem)]'>
          <div className='w-full p-2'>
            <div className="max-full mx-auto bg-white p-8 rounded-lg shadow-md whitespace-nowrap">
              <h2 className="text-2xl font-bold mb-6">Ingresar Medicación</h2>
              <form className='whitespace-nowrap'>
                <div className="grid grid-cols-3 gap-2">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicationName">
                      Medicación
                    </label>
                    <input
                      className="shadow appearance-none border rounded-md w-full py-2 px-3 cursor-pointer text-gray-100 bg-blue-500 leading-tight focus:outline-none focus:shadow-outline hover:shadow-md hover:bg-blue-600"
                      id="medicationName"
                      type="button"
                      value='Buscar medicación'
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                  <Modal show={showModal} handleClose={() => setShowModal(false)}>
                    <h2 className="text-xl font-bold mb-4">Buscar medicación</h2>
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="mb-4 p-2 border rounded w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 border-b">Nombre comercial</th>
                          <th className="px-4 py-2 border-b">Droga</th>
                          <th className="px-4 py-2 border-b">Presentación</th>
                          <th className="px-4 py-2 border-b">Unidad</th>
                          <th className="px-4 py-2 border-b">Ranurable</th>
                          <th className="px-4 py-2 border-b">Categoria</th>
                          <th className="px-4 py-2 border-b">Stock</th>
                          <th className="px-4 py-2 border-b"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(groupedMedications).map((drugName, index) => {
                          return (
                            <React.Fragment key={index}>
                              {groupedMedications[drugName].map((medication, subIndex) => (
                                <tr
                                  key={subIndex}
                                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                >
                                  {subIndex === 0 && (
                                    <td
                                      className="px-4 py-2 border-b"
                                      rowSpan={groupedMedications[drugName].length}
                                    >
                                      {medication.drugName}
                                    </td>
                                  )}
                                  <td className="px-4 py-2 border-b">{medication.comercialName}</td>
                                  <td className="px-4 py-2 border-b">{medication.type}</td>
                                  <td className="px-4 py-2 border-b">{medication.unit}</td>
                                  <td className="px-4 py-2 border-b">{medication.ranurable}</td>
                                  <td className="px-4 py-2 border-b">{medication.category}</td>
                                  <td className="px-4 py-2 border-b">{medication.stock}</td>
                                  <td className="px-4 py-2 border-b"><button><ArrowUpTrayIcon className='w-6 text-blue-400 hover:text-blue-600' /></button></td>
                                </tr>
                              ))}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </Modal>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicationName">
                      Médico tratante
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="medicationName"
                      type="text"
                    />
                    <label className='flex items-center justify-start gap-2' htmlFor="sinMedico">
                      <input type="checkbox" name="sin_medico" id="sin_medico" />
                      Sin médico
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequency">
                      Frecuencia x dia
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="medicationName"
                      type="number"
                      value={0} //agregar MG o ML segun tipo de forma farmaceutica
                    />
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
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weeklyDosage">
                      Puede retirar
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="medicationName"
                      type="readonly"
                      value={'3 cajas'}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weeklyDosage">
                      Cantidad que retira
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="medicationName"
                      type="number"
                      value={0}
                    />
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
              <table className="text-left text-sm font-roboto font-medium text-slate-600 whitespace-nowrap">
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
                    <td className="px-4 py-2 whitespace-nowrap"><button><PencilSquareIcon className='text-blue-400 hover:text-blue-600 w-6' /></button></td>
                    <td className="px-4 py-2 whitespace-nowrap"><button><TrashIcon className='w-6 text-red-400 hover:text-red-600' /></button></td>
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
                    <td className="px-4 py-2 whitespace-nowrap"><button><PencilSquareIcon className='text-blue-400 hover:text-blue-600 w-6' /></button></td>
                    <td className="px-4 py-2 whitespace-nowrap"><button><TrashIcon className='w-6 text-red-400 hover:text-red-600' /></button></td>
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
                    <td className="px-4 py-2 whitespace-nowrap"><button><PencilSquareIcon className='text-blue-400 hover:text-blue-600 w-6' /></button></td>
                    <td className="px-4 py-2 whitespace-nowrap"><button><TrashIcon className='w-6 text-red-400 hover:text-red-600' /></button></td>
                  </tr>
                </tbody>
                <button className="mt-4 ml-1 flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">Ver detale de retiro y generar factura <TrashIcon className='w-6 text-red-400 hover:text-red-600' /></button>
              </table>
            </div>
            {/* --------------------------------------------------------------------------- */}
            <div className="max-full bg-white p-8 rounded-lg shadow-md">
                
            </div>
            {/* --------------------------------------------------------------------------- */}
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
