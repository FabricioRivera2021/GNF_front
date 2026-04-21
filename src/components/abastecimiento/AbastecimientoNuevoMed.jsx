import React, { useEffect, useState } from 'react'
import Modal from '../Modal';
import { createNewDrug, fetchAllDrugs } from '../../API/apiServices';
import axios from 'axios';

function AbastecimientoNuevoMed() {

  const [modal, setModal] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)

  const handleCreateNewCatalogDrug = () => {
    setModal(true);
  }

  const handleConfirmCreateDrug = () => {
    setConfirmationModal(true);
  }

  const handleCreateNewDrug = async (drugName) => {
    createNewDrug(drugName);
  }

  const handleAddDrugToForm = () => {
    // Lógica para agregar la droga seleccionada al formulario de creación de medicamento
    // Se debe actualizar la tabla con las drogas que componen el medicamento
    // nombre de la droga, concentracion de la droga en x cantidad de medicacion, etc. se toman de los inputs del modal
    console.log("Adding drug to form:", selectedDrugName);
    console.log("Concentration de la droga: ", drugConcentration," ", drugConcentrationUnit, " en ", newMedication.concentracionBase, " ", newMedication.unidad);
    // agregarla a la lista de drugs
    const newDrug = {
      id: Date.now(),
      name: selectedDrugName,
      concentration: drugConcentration,
      unit: drugConcentrationUnit,
      base: newMedication.concentracionBase,
      baseUnit: newMedication.unidad
    };
    setDrugsInMedicationBase(prev => [...prev, newDrug]);
  }

  const handleRemoveDrug = (id) => {
    setDrugsInMedicationBase(prev =>
      prev.filter(drug => drug.id !== id)
    );
  };

  const handleAddNewMedication = () => {
    //se quiere ingresar una nueva medicacion
    const newMedication = {
      name: name,
      lab: lab,
      codigoInterno: cod,
      codigoBarras: codBarras,
      vademecum: vademecum,
      estado: estado,
      presentacion: presentacion,
      unidad: unidad,
      drug: drugsInMedicationBase,
      requireColdStorage: reqColdStrg,
      ranurable: ranurable,
      ventaBajoReceta: ventaBajoReceta,
      medicacionControlada: medicacionControlada
    }

    console.log(newMedication);
  }

  const [newDrugName, setNewDrugName] = useState('');
  const [selectedDrugName, setSelectedDrugName] = useState('');
  const [enableNewDrugInput, setEnableNewDrugInput] = useState(false);
  const [drugs, setDrugs] = useState([]); //lista con las drigas que seran cargadas en la medicacion
  const [drugsInMedicationBase, setDrugsInMedicationBase] = useState(() => {
    const stored = localStorage.getItem('selectedDrugs');
    return stored ? JSON.parse(stored) : [];
  });
  const [newMedication, setNewMedication] = useState(() => {
    const storedMedications = localStorage.getItem('newMedicationForm')
    return storedMedications ? JSON.parse(storedMedications) : {
      name: '',
      lab: '',
      codigoInterno: '',
      codigoBarras: '',
      vademecum: '',
      estado: '',
      presentacion: '',
      concentracionBase: '',
      unidad: '',
      drug: drugsInMedicationBase,
      requireColdStorage: '',
      ranurable: '',
      ventaBajoReceta: '',
      medicacionControlada: ''
    }
  }); //medicacion que va a ser creada en el formulario
  const [medicationBaseConcentration, setMedicationBaseConcentration] = useState('');
  const [medicationBaseConcentrationUnit, setMedicationBaseConcentrationUnit] = useState('');
  const [drugConcentration, setDrugConcentration] = useState('');
  const [drugConcentrationUnit, setDrugConcentrationUnit] = useState('mg');

  //helper para armar el form de medicacion
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setNewMedication(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // USE EFFECTS--------------------------------------------------------------------
  useEffect(() => {
    //cuando el estado cambie actualizar el local storage como backup de lo que se esta ingresando
    localStorage.setItem(
      'selectedDrugs', JSON.stringify(drugsInMedicationBase)
    );
  }, [drugsInMedicationBase])

  useEffect(() => {
    //preservar el formulario de medicacion en el local storage
    localStorage.setItem(
      'newMedicationForm', JSON.stringify(newMedication)
    );
  }, [newMedication])

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modal]);

  useEffect(() => {
    const stored = localStorage.getItem('selectedDrugs')
    if (stored) {
      const drogas = JSON.parse(stored);
      console.log("drogas:", drogas);
    }
  }, []);

  useEffect(() => {
    const storedMedications = localStorage.getItem('newMedicationForm')
    if (storedMedications) {
      const medications = JSON.parse(storedMedications);
      console.log("Form de medicacion:", medications);
    }
  }, []);

  useEffect(() => {
    fetchAllDrugs(setDrugs);
  }, []);

  useEffect(() => {
    console.log("Unidad:", medicationBaseConcentrationUnit);
  }, [medicationBaseConcentrationUnit]);

  return (
    <>
      <div className='bg-white p-6 rounded-lg w-full overflow-auto '>
        <h1 className='font-bold text-2xl'>Crear Medicamento</h1>
        <div className='grid grid-cols-7 gap-6 mt-4'>
          <div className='border-2 p-4 col-span-2 rounded-lg'>
            <h2 className='font-semibold text-lg mb-2'>Datos generales</h2>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='nombre comercial'>
                <input 
                  type="text"
                  name='name' 
                  value={newMedication.name}
                  placeholder='Nombre Comercial' 
                  className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='laboratorio'>
                <select 
                  className='w-full pl-2 py-0.5 bg-transparent border-0 border-b rounded-sm border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="laboratorio" id="laboratorio"
                  name='lab'
                  value={newMedication.lab}
                  onChange={handleChange}
                >
                  <option value="roche" selected>Roche</option>
                  <option value="megalabs">Megalabs</option>
                  <option value="celsius">Celsius</option>
                  <option value="abbot">Abbot</option>
                </select>
              </label>
            </div>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='Codigo interno'>
                <input 
                  type="text" 
                  placeholder='Código Interno' 
                  className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'
                  name='codigoInterno'
                  value={newMedication.codigoInterno}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='Codigo de barras'>
                <input 
                  type="text" 
                  placeholder='Código de Barras' 
                  className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'
                  name='codigoBarras'
                  value={newMedication.codigoBarras}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='flex flex-col items-start justify-center px-2'>
                Vademecum: 
                <label htmlFor="vademecum-si" className='text-xs ml-2'>
                  <input 
                    type="radio" 
                    name="vademecum" 
                    id="vademecum-si"
                    value="true"
                    checked={newMedication.vademecum === 'true'}
                    onChange={handleChange}
                  /> Sí
                </label>
                <label htmlFor="vademecum-no" className='text-xs ml-2'>
                  <input 
                    type="radio" 
                    name="vademecum" 
                    id="vademecum-no"
                    value="false" 
                    checked={newMedication.vademecum === 'false'}
                    onChange={handleChange}
                  /> No
                </label>
            </div>
            <div className='flex flex-col items-start justify-center px-2'>
                Estado: 
                <label htmlFor="estado-activo" className='text-xs ml-2'>
                  <input 
                    type="radio" 
                    name="estado" 
                    value="true"
                    id="estado-activo" 
                    checked={newMedication.estado === 'true'}
                    onChange={handleChange}
                  /> Activo
                </label>
                <label htmlFor="estado-inactivo" className='text-xs ml-2'>
                  <input 
                    type="radio" 
                    name="estado"
                    value="false" 
                    id="estado-inactivo"
                    checked={newMedication.estado === 'false'}
                    onChange={handleChange} 
                  /> Inactivo
                </label>
            </div>
            <hr />
            <div>
              <h2 className='font-semibold text-lg mt-4'>Presentación farmacéutica</h2>
              <div className='flex flex-col items-start justify-center gap-2'>
                <label className='whitespace-nowrap' title='forma_farmaceutica'>
                  <select 
                    className='w-full pl-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="forma_farmaceutica" id="forma_farmaceutica"
                    name="presentacion"
                    onChange={handleChange}
                    value={newMedication.presentacion}
                  >
                    <option value="comprimidos" selected>Comprimidos</option>
                    <option value="capsulas">Cápsulas</option>
                    <option value="solucion">Solución</option>
                    <option value="suspension">Suspensión</option>
                    <option value="soluble">Soluble</option>
                    <option value="jarabe">Jarabe</option>
                    <option value="crema">Crema</option>
                    <option value="inhalador">Inhalador</option>
                    <option value="inyectable">Inyectable</option>
                    <option value="lapicera">Lapicera inyectable</option>
                  </select>
                </label>
              </div>
              <div>
                {/* <label className='whitespace-nowrap' title='Unidades por envase'>
                  <input type="number" placeholder='Unidades por envase' className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'/>
                </label> */}
                  <input 
                    className='leading-none px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' 
                    placeholder='Ej: 600' 
                    type="number"
                    name='concentracionBase'
                    value={newMedication.concentracionBase}
                    onChange={handleChange}
                    />
                  <select 
                    name="unidad_medida" 
                    id="unidad_medida" 
                    className='!appearance-none py-0.5 pl-2 bg-transparent border-0 border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'
                    name='unidad'
                    onChange={handleChange}
                    value={newMedication.unidad}
                  >
                    {/* atrapar el valor de la option y cargarlo en setMedicationBaseConcentrationUnit */}
                    <option value="comp" selected>comp.</option>
                    <option value="mg">mg</option>
                    <option value="ml">ml</option>
                    <option value="g">g</option>
                    <option value="ui">ui</option>
                  </select>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4 border-2 p-4 rounded-lg col-span-5'>
            <div className='flex flex-col gap-2 w-full'>
              <div>
                <h2 className='font-semibold text-xl'>Composición</h2>
                <table className='w-full border mt-1 text-sm text-left text-gray-500'>
                  <thead>
                    <tr className='border bg-gray-100 text-gray-700 uppercase'>
                      <th className='border'>Droga</th>
                      <th className='border'>Unidad</th>
                      <th className='border'>Concentracion</th>
                      <th className='border'>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drugsInMedicationBase.map((drug, index) => (
                      <tr className='border hover:bg-gray-100' key={index}>
                        <td className='border'>{drug.name}</td>
                        <td className='border'>{drug.unit}</td>
                        {
                          (newMedication.unidad) == 'comp'
                          ?
                            (
                              <td className='border'>
                                {drug.concentration} {drug.unit} x {drug.baseUnit}
                              </td>
                            )
                            :
                              <td className='border'>
                                {drug.concentration} {drug.unit} en {drug.base} {drug.baseUnit}
                              </td>
                        }
                        <td className='border text-red-500 hover:bg-red-500 hover:text-white px-1 py-0.5 rounded-md transition-colors duration-200 cursor-pointer'>
                          <button onClick={() => handleRemoveDrug(drug.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button 
                  className='border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-1 py-0.5 rounded-md transition-colors duration-200'
                  onClick={() => handleCreateNewCatalogDrug()}
                >+ Agregar droga</button>
              </div>
                <h2 className='font-semibold text-xl'>Condiciones especiales</h2>
              <div className='flex items-start justify-start gap-2'>
                <div className='border px-2 py-0.5 rounded-lg'>
                  <p>Requiere refrigeración</p>
                  <input 
                    type="checkbox" 
                    name="requireColdStorage"
                    checked={newMedication.requireColdStorage}
                    id="refrigeracion"
                    onChange={handleChange} 
                  />
                </div>
                <div className='border px-2 py-0.5 rounded-lg'>
                  <p>Ranurable</p>
                  <input 
                    type="checkbox" 
                    name="ranurable"
                    checked={newMedication.ranurable}  
                    id="ranurable" 
                    onChange={handleChange} 
                  />
                </div>
                <div className='border px-2 py-0.5 rounded-lg'>
                  <p>Venta bajo receta</p>
                  <input 
                    type="checkbox" 
                    name="ventaBajoReceta" 
                    checked={newMedication.ventaBajoReceta} 
                    id="venta_bajo_receta"
                    onChange={handleChange}  
                  />
                </div>
                <div className='border px-2 py-0.5 rounded-lg'>
                  <p>Medicación controlada</p>
                  <input 
                    type="checkbox" 
                    name="medicacionControlada" 
                    checked={newMedication.medicacionControlada} 
                    id="medicacion_controlada"
                    onChange={handleChange}  
                  />
                </div>
              </div>
            </div>
            <div className='h-full flex justify-start items-end gap-4'>
              <button 
                className='border border-green-600 text-green-600 font-bold hover:bg-green-600 hover:text-white px-1 py-0.5 rounded-md transition-colors duration-200'
                onClick={() => console.log(newMedication)}
                >
                Guardar Medicamento
              </button>
              <button className='border border-gray-500 text-gray-500 font-bold hover:bg-gray-500 hover:text-white px-1 py-0.5 rounded-md transition-colors duration-200'>
                Resetear fomulario
              </button>
            </div>
          {/* ------ */}
          </div>
          <Modal show={modal} handleClose={() => setModal(false)}>
            <div className='grid grid-cols-2 max-w-5xl gap-4'>
              <div className='col-span-1 border-2 rounded-lg border-gray-200 px-2 py-4 shadow-md'>
                <div className='flex gap-4 items-start justify-start mb-2'>
                  <input 
                    className='leading-none px-2 py-0.5 bg-transparent border-1 border-blue-400 rounded-md focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' 
                    placeholder='Buscar...' 
                    type="text" 
                  />
                </div>
                <div className='max-h-64 overflow-auto'>
                  <table className='w-full border mt-1 text-sm text-left text-gray-500 overflow-auto'>
                    <thead>
                      <tr className='border bg-gray-100 text-gray-700 uppercase'>
                        <th className='border'>Droga</th>
                      </tr>
                    </thead>
                    <tbody>
                        {drugs == '' ? (
                          <tr className='border'>Cargando...</tr>
                        ) : (
                          drugs.map((drug, index) => (
                            <tr 
                              className={`border hover:bg-gray-200 transition duration-200 cursor-pointer ${selectedDrugName === drug.droga ? 'bg-blue-100' : ''}`}
                              key={index}
                              onClick={() => {
                                setSelectedDrugName(drug.droga);
                                setEnableNewDrugInput(false);
                              }}
                            >
                              {drug.droga}
                            </tr>
                          ))
                        )}
                        
                    </tbody>
                  </table>
                </div>
                <div className='py-2 pl-4 border-2 border-gray-100 rounded-lg mt-4 shadow-sm'>
                  <label htmlFor="ingresada" className='cursor-pointer flex items-center gap-2'>
                    <p className='font-semibold text-slate-500'>La droga que busco no esta en ingresada</p>
                    <input 
                    type="checkbox" 
                    name="ingresada" 
                    id="ingresada" 
                    checked={enableNewDrugInput} 
                    onChange={
                      (e) => {
                        setEnableNewDrugInput(e.target.checked) 
                        setNewDrugName('')
                      }} 
                    />
                  </label>
                </div>
              </div>
              {/* ---------------------- ingresar nueva droga */}
              <div className='flex flex-col border-2 rounded-md border-gray-300 px-2 py-1 mt-4 text-gray-800 shadow-md'>
                <div>
                  {(enableNewDrugInput) ? (
                  <div className={`flex flex-col items-start border-2 ${enableNewDrugInput ? '' : 'bg-gray-200'} p-2 mb-4 rounded-lg shadow-sm`}>
                    <div className='flex items-start'>
                      <p className={`${enableNewDrugInput ? 'text-slate-800' : 'text-gray-400'}`}>Ingresar nueva droga: </p>
                      <input
                        disabled={!enableNewDrugInput}
                        value={enableNewDrugInput ? newDrugName : ''}
                        className={`leading-none px-2 py-0.5 bg-transparent border-0 border-b ${enableNewDrugInput ? 'border-blue-400' : 'border-gray-300'} focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200`} 
                        onChange={(e) => setNewDrugName(e.target.value)}
                        placeholder={enableNewDrugInput ? 'Nombre' : ''}
                        type="text" 
                      />
                    </div>
                    <div className='flex flex-col w-full items-start'>
                      <button 
                        disabled={!enableNewDrugInput || newDrugName.trim() === ''}
                        className={`border w-full ${enableNewDrugInput ? `border-gray-200 text-blue-500 ${newDrugName.trim() === '' ? 'bg-gray-300 border-blue-50 text-gray-50' : 'hover:bg-blue-500 hover:text-white'}` : 'border-gray-300 text-gray-400'} mt-4 px-1 py-0.5 rounded-md transition-colors duration-200`} 
                        onClick={() => handleConfirmCreateDrug()}
                      >
                        Guardar
                      </button>
                    </div>
                    {/* Confirmar creación de droga - MODAL */}
                    <Modal show={confirmationModal} handleClose={() => setConfirmationModal(false)} cancelButtonShown={false}>
                      <h2 className='font-bold text-xl mb-4'>Confirmar creación de droga</h2>
                        <p>¿Estás seguro de que deseas crear esta nueva droga?</p>
                        <div className='flex gap-4 mt-4 justify-end items-center'>
                        <p className='text-xl font-semibold text-blue-400'>{newDrugName}</p>
                          <button 
                            className='border border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-2 py-0.5 rounded-md transition-colors duration-200'
                            onClick={() => setConfirmationModal(false)}
                          >Cancelar</button>
                          <button 
                            className='border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-0.5 rounded-md transition-colors duration-200'
                            onClick={() => {
                              // Lógica para guardar la nueva droga en el catálogo
                              // Enviar la nueva droga a la API para guardarla en la base de datos
                              handleCreateNewDrug(newDrugName);

                              //limpiar estado y cerrar modales
                              setConfirmationModal(false);
                              setEnableNewDrugInput(false);
                              setNewDrugName('');
                              setSelectedDrugName(newDrugName);
                              fetchAllDrugs(setDrugs);
                            }}
                          >
                            Confirmar</button>
                        </div>
                    </Modal>
                  </div>
                  ) : (selectedDrugName === '') && (
                    <p className='text-gray-400'>Selecciona la droga para ingresar su concentración.</p>
                  )}
                  {(selectedDrugName && !enableNewDrugInput) && (
                  <div className='w-full border-2 border-gray-100 rounded-lg p-2 mb-4 shadow-sm bg-lime-600 text-white transition-all duration-200'>
                    <p className='text-lg font-semibold capitalize'>{selectedDrugName}</p>
                  </div>
                  )}
                  <div>
                    <input 
                      className='leading-none px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' 
                      placeholder='Ej: 600' 
                      type="number" 
                      onChange={(e) => setDrugConcentration(e.target.value)}
                      />
                    <select 
                      name="unidad_medida" 
                      id="unidad_medida" 
                      className='!appearance-none py-0.5 bg-transparent border-0 border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'
                      onChange={(e) => setDrugConcentrationUnit(e.target.value)}
                      value={drugConcentrationUnit}
                    >
                      <option value="mg" selected>mg</option>
                      <option value="ml">ml</option>
                    </select>
                    <p className='text-sm px-2 bg-orange-50 rounded-md mt-2'>Ingrese la concentración indicando la cantidad de sustancia activa contenida en una cantidad total del producto.</p>
                    <p className='text-sm px-2 bg-orange-50 rounded-md mt-2'>La concentración debe expresarse de forma clara, por ejemplo: mg/mL, g/L o porcentaje (%).</p>
                    <p className='text-sm px-2 bg-orange-50 rounded-md mt-2'>Asegúrese de que los valores sean correctos, ya que esta información se utiliza para el cálculo de dosis y administración del medicamento.</p>
                    <div className='flex flex-row items-center'>
                      {(
                        (newMedication.unidad) != 'comp' 
                        ? 
                          (
                            <input 
                              className='leading-none px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' 
                              placeholder='Ej: 600' 
                              type="number" 
                              value={newMedication.concentracionBase}
                            />
                          )
                        :
                          ''
                      )}
                      <div className='text-sm px-2 bg-orange-50 rounded-md mt-2'>
                        <p>{newMedication.unidad}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                className='border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white mt-4 px-1 py-0.5 rounded-md transition-colors duration-200'
                onClick={
                  () => {
                    handleAddDrugToForm(),
                    setModal(false)
                  } 
                }
                >
                  Ingresar
                </button>
              </div>
              {/* ----------------------- fin ingresar nueva droga */}
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default AbastecimientoNuevoMed;