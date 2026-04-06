import React, { useState } from 'react'
import Modal from '../Modal';

function AbastecimientoCatalogo() {

  const [modal, setModal] = useState(false)

  const handleCreateNewCatalogDrug = () => {
    setModal(true);
  }

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

        <table className='w-full border mt-6 text-sm text-left text-gray-500'>
          <thead>
            <tr className='border bg-gray-100 text-gray-700 uppercase'>
              <th className='border'>Nombre</th>
              <th className='border'>Presentación</th>
              <th className='border'>Lab</th>
              <th className='border'>Composición</th>
              <th className='border'>Estado</th>
              <th className='border'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border hover:bg-gray-100'>
              <td className='border'>Perifar 600</td>
              <td className='border'>Comprimido</td>
              <td className='border'>Roe</td>
              <td className='border'>Ibuprofeno</td>
              <td className='border'>Activo</td>
              <td className='border'>
                <button className='bg-blue-500 text-white px-2 py-1 rounded'>Ver</button>
                <button className='bg-green-500 text-white px-2 py-1 rounded ml-2'>Editar</button>
              </td>
            </tr>
            <tr className='border hover:bg-gray-100'>
              <td className='border'>Actron 600</td>
              <td className='border'>Cápsula</td>
              <td className='border'>Bay</td>
              <td className='border'>Ibuprofeno</td>
              <td className='border'>Activo</td>
              <td className='border'>
                <button className='bg-blue-500 text-white px-2 py-1 rounded'>Ver</button>
                <button className='bg-green-500 text-white px-2 py-1 rounded ml-2'>Editar</button>
              </td>
            </tr>
            <tr className='border hover:bg-gray-100'>
              <td className='border'>Amoxidal 500</td>
              <td className='border'>Comprimido</td>
              <td className='border'>Roe</td>
              <td className='border'>Amoxicilina</td>
              <td className='border'>Inactivo</td>
              <td className='border'>
                <button className='bg-blue-500 text-white px-2 py-1 rounded'>Ver</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='flex gap-4 mt-4'>
          <button 
            className='bg-green-500 text-white px-4 py-2 rounded mt-4'
            onClick={() => handleCreateNewCatalogDrug()}  
          >+ Nuevo Medicamento</button>
          <button 
            className='bg-green-500 text-white px-4 py-2 rounded mt-4'
            onClick={() => handleCreateNewCatalogDrug()}  
          >+ Nueva droga</button>
        </div>
      </div>

      {/* Modal para crear nuevo medicamento */}
    <Modal show={modal} handleClose={() => setModal(false)}>
      <div className='bg-white p-6 rounded-lg w-full max-w-4xl overflow-auto max-h-[80vh]'>
        <h1 className='font-bold text-2xl'>Crear Medicamento</h1>
        <div className='grid grid-cols-3 gap-6 mt-4'>
          <div className='border-2 p-4 rounded-lg'>
            <h2 className='font-semibold text-lg mb-2'>Datos generales</h2>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='nombre comercial'>
                <input type="text" placeholder='Nombre Comercial' className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'/>
              </label>
            </div>
            <div className='flex flex-col items-start justify-center gap-2'>
              <label className='whitespace-nowrap' title='laboratorio'>
                <select className='w-full px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="laboratorio" id="laboratorio">
                  <option value="">Laboratorio---------</option>
                  <option value="lab1">Laboratorio 1</option>
                  <option value="lab2">Laboratorio 2</option>
                  <option value="lab3">Laboratorio 3</option>
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
                  <select className='w-full px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="forma_farmaceutica" id="forma_farmaceutica">
                    <option value="">Forma farmacéutica</option>
                    <option value="comprimidos">Comprimidos</option>
                    <option value="jarabe">Jarabe</option>
                    <option value="crema">Crema</option>
                    <option value="inhalador">Inhalador</option>
                  </select>
                </label>
              </div>
              <div className='flex flex-col items-start justify-center gap-2'>
                <label className='whitespace-nowrap' title='Unidades por envase'>
                  <input type="number" placeholder='Unidades por envase' className='leading-none px-2 py-0.5 w-full bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200'/>
                </label>
              </div>
            </div>
          </div>

          <div className='flex gap-4 border-2 p-4 rounded-lg col-span-2'>
            <div>

            </div>
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
            <div>
              <h2 className='font-semibold text-lg'>Concentracion</h2>
              <div className='flex flex-col items-start justify-center gap-2'>
                <label className='whitespace-nowrap' title='unidad de concentracion'>
                  <select className='w-full px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="unidad" id="unidad">
                    <option value="">Unidad de concentracion</option>
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
              <div className='flex flex-col items-start justify-center gap-2'>
                <label className='whitespace-nowrap' title='unidad de concentracion por item'>
                  <select className='w-full px-2 py-0.5 bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-blue-500 transition-colors duration-200' name="unidad_por_item" id="unidad_por_item">
                    <option value="">Por:</option>
                    <option value="comprimidos">Comprimidos</option>
                    <option value="mg">mg</option>
                    <option value="ml">ml</option>
                    <option value="g">g</option>
                    <option value="unidades_internacionales">U.I.</option>
                    <option value="porcentaje">porcentaje</option>
                  </select>
                </label>
              </div>
            </div>
            <div>
              <h2 className='font-semibold text-xl'>Composición</h2>
              <p>Droga: [ Ibuprofeno ▼ ]</p>
              <p>Cantidad: [600]</p>
              <p>Unidad: [mg ▼]</p>
              <p>Acción: [Eliminar]</p>
              <button>[ + Agregar droga ]</button>

              <h2 className='font-semibold text-xl'>Condiciones especiales</h2>
              <p>[ ] Requiere refrigeración</p>
              <p>[ ] Ranurable</p>
              <p>[ ] Venta bajo receta</p>
              <p>[ ] Medicación controlada</p>

              <h2 className='font-semibold text-xl'>Observaciones</h2>
              <p>[__________________________________________]</p>
              <p>[__________________________________________]</p>
            </div>
          </div>
        </div>
      <button>[ Guardar Medicamento ]</button>           
      <button>[ Formulario para crear nuevo medicamento...] </button>
      </div>
    </Modal>
    </div>
    </>
  )
}

export default AbastecimientoCatalogo


/**
 * 
 * ========================================================
                MEDICAMENTOS
========================================================

Buscar: [________________________]  [🔍 Buscar]

Filtros:
[ Laboratorio ▼ ] [ Presentación ▼ ] [ Estado ▼ ]

--------------------------------------------------------
| Nombre        | Presentación | Lab | Estado | Acciones |
--------------------------------------------------------
| Perifar 600   | Comprimido   | Roe | Activo | [Ver] [Editar]
| Actron 600    | Cápsula      | Bay | Activo | [Ver] [Editar]
| Amoxidal 500  | Comprimido   | Roe | Inactivo | [Ver]
--------------------------------------------------------

                    [ + Nuevo Medicamento ]
 */


/**
 * 
 * 🧾 Formulario Maestro — Crear Medicamento (ADMIN)
====================================================
           CREAR MEDICAMENTO (MAESTRO)
====================================================
1️⃣ Datos comerciales
----------------------------------------------------
DATOS GENERALES
----------------------------------------------------

Nombre comercial (*) :
[________________________________]

Laboratorio (*) :
[ Select ▼ ]

Categoría :
[ Vademecum ▼ ]

Código interno :
[________________]

Código de barras :
[________________]

Estado :
(•) Activo   ( ) Inactivo
2️⃣ Presentación farmacéutica
----------------------------------------------------
PRESENTACIÓN
----------------------------------------------------

Forma farmacéutica (*) :
[ Comprimido ▼ ]

Unidades por envase (*) :
[ 30 ]

Unidad del envase (*) :
[ comprimidos ▼ ]

Ejemplos:

Forma	Unidad
Comprimido	comprimidos
Jarabe	ml
Crema	g
Inhalador	dosis
3️⃣ Unidad de dispensación (lo que consume el paciente)
----------------------------------------------------
UNIDAD DE DISPENSACIÓN
----------------------------------------------------

Unidad mínima dispensable (*) :
[ comprimido ▼ ]

👉 Esto será clave para tratamientos.

4️⃣ Concentración principal

(para casos simples)

----------------------------------------------------
CONCENTRACIÓN
----------------------------------------------------

Cantidad (*) :
[ 600 ]

Unidad :
[ mg ▼ ]

Por :
[ comprimido ▼ ]

Resultado lógico:

600 mg / comprimido
5️⃣ Composición (Drogas)

⚠️ SECCIÓN DINÁMICA (array en React)

----------------------------------------------------
COMPOSICIÓN
----------------------------------------------------

Droga                Cantidad    Unidad    Acción
----------------------------------------------------------
[ Ibuprofeno ▼ ]     [600]       [mg ▼]    [Eliminar]

[ + Agregar droga ]

👉 Permite:

medicamentos simples ✅

medicamentos compuestos ✅

6️⃣ Condiciones especiales
----------------------------------------------------
CONDICIONES
----------------------------------------------------

[ ] Requiere refrigeración
[ ] Ranurable
[ ] Venta bajo receta
[ ] Medicación controlada
7️⃣ Observaciones
----------------------------------------------------
OBSERVACIONES
----------------------------------------------------

[__________________________________________]
[__________________________________________]
8️⃣ Acciones
----------------------------------------------------

[ Cancelar ]        [ Guardar Medicamento ]
 */