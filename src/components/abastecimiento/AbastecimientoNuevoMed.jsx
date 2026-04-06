import React, { useState } from 'react'
import Modal from '../Modal';

function AbastecimientoNuevoMed() {

  const [modal, setModal] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)

  const handleCreateNewCatalogDrug = () => {
    setModal(true);
  }

  const handleConfirmCreateDrug = () => {
    setConfirmationModal(true);
  }

  const [newDrugName, setNewDrugName] = useState('');
  const [selectedDrugName, setSelectedDrugName] = useState('');
  const [enableNewDrugInput, setEnableNewDrugInput] = useState(false);

  const scrolllock = modal ? 'hidden' : 'auto';
  document.body.style.overflow = scrolllock;

  return (
    <>
      <div className='bg-white p-6 rounded-lg w-full overflow-auto '>
        <h1 className='font-bold text-2xl'>Crear Medicamento</h1>
        <div className='grid grid-cols-7 gap-6 mt-4'>
          <div className='border-2 p-4 col-span-2 rounded-lg'>
            <h2 className='font-semibold text-lg mb-2'>Datos generales</h2>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='nombre comercial'>
                <input type="text" placeholder='Nombre Comercial' className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'/>
              </label>
            </div>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='laboratorio'>
                <select className='w-full pl-2 py-0.5 bg-transparent border-0 border-b rounded-sm border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="laboratorio" id="laboratorio">
                  <option value="roche" selected>Roche</option>
                  <option value="megalabs">Megalabs</option>
                  <option value="celsius">Celsius</option>
                  <option value="abbot">Abbot</option>
                </select>
              </label>
            </div>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='Codigo interno'>
                <input type="text" placeholder='Código Interno' className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'/>
              </label>
            </div>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='Codigo de barras'>
                <input type="text" placeholder='Código de Barras' className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'/>
              </label>
            </div>
            <div className='flex flex-col items-start justify-center px-2'>
                Vademecum: 
                <label htmlFor="vademecum-si" className='text-xs ml-2'>
                  <input type="radio" name="vademecum" id="vademecum-si" /> Sí
                </label>
                <label htmlFor="vademecum-no" className='text-xs ml-2'>
                  <input type="radio" name="vademecum" id="vademecum-no" /> No
                </label>
            </div>
            <div className='flex flex-col items-start justify-center px-2'>
                Estado: 
                <label htmlFor="estado-activo" className='text-xs ml-2'>
                  <input type="radio" name="estado" id="estado-activo" /> Activo
                </label>
                <label htmlFor="estado-inactivo" className='text-xs ml-2'>
                  <input type="radio" name="estado" id="estado-inactivo" /> Inactivo
                </label>
            </div>
            <hr />
            <div>
              <h2 className='font-semibold text-lg mt-4'>Presentación farmacéutica</h2>
              <div className='flex flex-col items-start justify-center gap-2'>
                <label className='whitespace-nowrap' title='forma_farmaceutica'>
                  <select className='w-full pl-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="forma_farmaceutica" id="forma_farmaceutica">
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
                    />
                  <select name="unidad_medida" id="unidad_medida" className='!appearance-none py-0.5 pl-2 bg-transparent border-0 border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'>
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
            {/* 
              unidad minima de dispensacion, lo dejo por las dudas pero creo que no va
              <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='unidad minima dispensable'>
                <select className='w-full px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="unidad_minima_dispensable" id="unidad_minima_dispensable">
                  <option value="">Unidad de dispensación</option>
                  <option value="comprimidos">mg</option>
                  <option value="jarabe">ml</option>
                  <option value="crema">g</option>
                  <option value="inhalador">U.I.</option>
                  <option value="inhalador">porcentaje</option>
                </select>
              </label>
            </div> */}
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
                    <tr className='border hover:bg-gray-100'>
                      <td className='border'> -- </td>
                      <td className='border'> -- </td>
                      <td className='border'> -- </td>
                      <td className='border text-red-500 hover:bg-red-500 hover:text-white px-1 py-0.5 rounded-md transition-colors duration-200 cursor-pointer'> -- </td>
                    </tr>
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
                  <input type="checkbox" name="refrigeracion" id="refrigeracion" />
                </div>
                <div className='border px-2 py-0.5 rounded-lg'>
                  <p>Ranurable</p>
                  <input type="checkbox" name="ranurable" id="ranurable" />
                </div>
                <div className='border px-2 py-0.5 rounded-lg'>
                  <p>Venta bajo receta</p>
                  <input type="checkbox" name="venta_bajo_receta" id="venta_bajo_receta" />
                </div>
                <div className='border px-2 py-0.5 rounded-lg'>
                  <p>Medicación controlada</p>
                  <input type="checkbox" name="medicacion_controlada" id="medicacion_controlada" />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 items-start justify-between'>
              <h2 className='font-semibold text-lg whitespace-nowrap'>Concentracion general</h2>
              <div className='flex border-2 p-2 rounded-lg gap-4'>
                <div className='border-2'>
                  <div className='flex flex-col items-start justify-center gap-2'>
                    <label className='whitespace-nowrap' title='unidad de concentracion'>
                      <select className='w-full px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="unidad" id="unidad">
                        <option value="">Unidades en</option>
                        <option value="mg">mg</option>
                        <option value="ml">ml</option>
                        <option value="g">g</option>
                        <option value="unidades_internacionales">U.I.</option>
                        <option value="porcentaje">porcentaje</option>
                      </select>
                    </label>
                  </div>
                  <div className='flex flex-col items-start justify-center gap-2'>
                    <label className='whitespace-nowrap' title='cantidad de concentracion'>
                      <input type="number" placeholder='Cantidad de concentracion' className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'/>
                    </label>
                  </div>
                </div>
                <hr />
                <div className='border-2'>
                  <div className='flex flex-col items-start justify-center gap-2'>
                    <label className='whitespace-nowrap' title='unidad de concentracion'>
                      <select className='w-full px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="unidad" id="unidad">
                        <option value="">en tanto de producto</option>
                        <option value="mg">mg</option>
                        <option value="ml">ml</option>
                        <option value="g">g</option>
                        <option value="unidades_internacionales">U.I.</option>
                        <option value="porcentaje">porcentaje</option>
                      </select>
                    </label>
                  </div>
                  <div className='flex flex-col items-start justify-center gap-2'>
                    <label className='whitespace-nowrap' title='cantidad de concentracion'>
                      <input type="number" placeholder='Cantidad de concentracion' className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'/>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h2 className='font-semibold text-xl'>Observaciones</h2>
                <textarea name="observaciones" id="observaciones">
                  {/* coso coso */}
                </textarea>
              </div>
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
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Ibuprofeno')}>Ibuprofeno</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Paracetamol')}>Paracetamol</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Amoxicilina')}>Amoxicilina</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
                      <tr className='border hover:bg-gray-200 transition duration-200 cursor-pointer'>
                        <td className='border' onClick={() => setSelectedDrugName('Acido clavulánico')}>Acido clavulánico</td>
                      </tr>
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
                        disabled={!enableNewDrugInput}
                        className={`border w-full ${enableNewDrugInput ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white' : 'border-gray-300 text-gray-400'} mt-4 px-1 py-0.5 rounded-md transition-colors duration-200`} 
                        onClick={() => handleConfirmCreateDrug()}
                      >
                        Guardar
                      </button>
                    </div>
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
                              setConfirmationModal(false);
                            }}
                          >
                            Confirmar</button>
                        </div>
                    </Modal>
                  </div>
                  <div className='w-full border-2 border-gray-100 rounded-lg p-2 mb-4 shadow-sm bg-lime-600 text-white'>
                    <p className='text-lg font-semibold capitalize'>{selectedDrugName}</p>
                  </div>
                  <input 
                    className='leading-none px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' 
                    placeholder='Ej: 600' 
                    type="number" 
                  />
                  <select name="unidad_medida" id="unidad_medida" className='!appearance-none py-0.5 bg-transparent border-0 border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'>
                    <option value="mg" selected>mg</option>
                    <option value="ml">ml</option>
                  </select>
                  <p className='text-sm px-2 bg-orange-50 rounded-md mt-2'>Ingrese la concentración indicando la cantidad de sustancia activa contenida en una cantidad total del producto.</p>
                  <p className='text-sm px-2 bg-orange-50 rounded-md mt-2'>La concentración debe expresarse de forma clara, por ejemplo: mg/mL, g/L o porcentaje (%).</p>
                  <p className='text-sm px-2 bg-orange-50 rounded-md mt-2'>Asegúrese de que los valores sean correctos, ya que esta información se utiliza para el cálculo de dosis y administración del medicamento.</p>
                  <input 
                    className='leading-none px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' 
                    placeholder='Ej: 600' 
                    type="number" 
                  />
                  <select name="unidad_medida" id="unidad_medida" className='!appearance-none py-0.5 bg-transparent border-0 border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'>
                    <option value="mg" selected>mg</option>
                    <option value="ml">ml</option>
                    <option value="comp">comp</option>
                  </select>
                </div>
                <button className='border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white mt-4 px-1 py-0.5 rounded-md transition-colors duration-200'>Ingresar</button>
              </div>
              {/* ----------------------- fin ingresar nueva droga */}
            </div>
          </Modal>
        </div>
      <button>[ Guardar Medicamento ]</button>           
      <button>[ Formulario para crear nuevo medicamento...] </button>
      </div>
    </>
  )
}

export default AbastecimientoNuevoMed;