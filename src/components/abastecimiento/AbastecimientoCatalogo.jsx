import React, { useEffect, useState } from 'react'
import Modal from '../Modal';
import { fetchAllMedicamentos } from '../../API/apiServices';

function AbastecimientoCatalogo() {

  const [modal, setModal] = useState(false);
  const [medication, setMedication] = useState([]);

  const handleCreateNewCatalogDrug = () => {
    setModal(true);
  }

  useEffect(() => {
    fetchAllMedicamentos(setMedication);
  }, [])
  
  useEffect(() => {
    console.log(medication);
  }, [medication])


  return (
    <>
    {/* get this content to be scrollable if it gets outside the screen */}
    <div className='w-full p-4 flex flex-col justify-between h-[calc(100vh-4rem)] overflow-auto' > 
      <div>
        <h1 className='font-bold text-2xl'>Catálogo de Medicamentos</h1>

        <div className="w-full max-w-sm mt-5">
          <input 
            type="text"
            placeholder="Buscar medicamento..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 transition"
          />
        </div>
        <div className='mt-5'>
          <select className='w-36 px-4 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 transition' name="filtros" id="filtros">
            <option value="laboratorio">Laboratorio</option>
            <option value="presentacion">Presentación</option>
            <option value="estado">Estado</option>
          </select>
        </div>

        <div>
          {/* Aquí iría la tabla de medicamentos, hecha con tarjetas horizontales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-2">
            {/* tarjeta de medicacion */}
            {medication.map((med, index) => (
              <div key={med.id} className="bg-gray-100 group text-gray-700 pt-4 flex flex-col justify-between space-between rounded-lg col-span-1 shadow-lg cursor-pointer border hover:shadow-xl hover:border hover:border-cyan-500 transition">
                <div>
                  <h2 className="text-xl px-4 font-bold text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition">{med.nombre_comercial}</h2>
                  <hr />
                  <div className='text-sm flex gap-8 mt-4 px-4'>
                    <div>
                      <p>Laboratorio: {med.laboratorio.razon_social}</p>
                      <p>Presentación: {med.presentacion_farmaceutica.nombre}</p>
                      {med.tiene_contenido_x_unidad ? 
                        (
                          <>
                            <p>Contenido: {Math.floor(med.contenido)} {med.presentacion_farmaceutica.nombre}</p>
                            <p>Contenido por tableta: {med.contenido_por_unidad} {med.unidad.codigo}</p>
                          </>
                        )
                        :
                        (
                          <p>Contenido: {med.contenido} {med.unidad.codigo}</p>
                        )
                      }
                    </div>
                    <div>
                      <h3>Composición</h3>
                        <ul className='list-disc list-inside'>
                        {med.drogas.map((droga) => (
                          <li key={droga.id}>{droga.droga} 12mg</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-4 bg-slate-400 rounded text-gray-100 items-center justify-end px-2 py-1'>
                  <p>Estado: Disponible</p>
                  <p>Venta bajo receta</p>
                </div>
              </div>
            ))}
            {/* FIN-- tarjeta de medicacion --FIN */}
          </div>
        </div>

        
        <div className='flex gap-4 mt-4'>
          <button 
            className='bg-green-500 text-white px-4 py-2 rounded mt-4'
          >+ Nuevo Medicamento</button>
          <button 
            className='bg-green-500 text-white px-4 py-2 rounded mt-4' 
          >+ Nueva droga</button>
        </div>
      </div>

      {/* Modal para crear nuevo medicamento */}
    
    </div>
    </>
  )
}

export default AbastecimientoCatalogo