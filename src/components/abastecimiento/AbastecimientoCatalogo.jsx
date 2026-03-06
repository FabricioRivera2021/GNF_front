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
              <th className='border'>Estado</th>
              <th className='border'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border hover:bg-gray-100'>
              <td className='border'>Perifar 600</td>
              <td className='border'>Comprimido</td>
              <td className='border'>Roe</td>
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
              <td className='border'>Inactivo</td>
              <td className='border'>
                <button className='bg-blue-500 text-white px-2 py-1 rounded'>Ver</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button 
          className='bg-green-500 text-white px-4 py-2 rounded mt-4'
          onClick={() => handleCreateNewCatalogDrug()}  
        >+ Nuevo Medicamento</button>
      </div>

      {/* Modal para crear nuevo medicamento */}
    <Modal show={modal} handleClose={() => setModal(false)}>
      <div className='bg-white p-6 rounded-lg w-full max-w-2xl overflow-auto max-h-[80vh]'>
        <h1 className='font-bold text-2xl'>Crear Medicamento</h1>

        <h2 className='font-semibold text-xl'>Datos comerciales</h2>
        <p>Nombre comercial: [________________________________]</p>
        <p>Laboratorio: [ Select ▼ ]</p>
        <p>Categoría: [ Vademecum ▼ ]</p>
        <p>Código interno: [________________]</p>
        <p>Código de barras: [________________]</p>
        <p>Estado: (•) Activo   ( ) Inactivo</p>

        <h2 className='font-semibold text-xl'>Presentación farmacéutica</h2>
        <p>Forma farmacéutica: [ Comprimido ▼ ]</p>
        <p>Unidades por envase: [ 30 ]</p>
        <p>Unidad del envase: [ comprimidos ▼ ]</p>

        <h2 className='font-semibold text-xl'>Unidad de dispensación</h2>
        <p>Unidad mínima dispensable: [ comprimido ▼ ]</p>

        <h2 className='font-semibold text-xl'>Concentración principal</h2>
        <p>Cantidad: [ 600 ]</p>
        <p>Unidad: [ mg ▼ ]</p>
        <p>Por: [ comprimido ▼ ]</p>

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

        <button>[ Cancelar ]</button>
        <button>[ Guardar Medicamento ]</button>           <p>Formulario para crear nuevo medicamento...</p>
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