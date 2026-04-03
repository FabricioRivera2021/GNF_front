import React from 'react'

function AbastecimientoIngresos() {
  return (
    <>
      <form className="space-y-6 max-w-7xl">
        {/* ================= INGRESO DE MEDICACIÓN ================= */}
        <section className="bg-white p-4 rounded-lg border space-y-4">
          <h2 className="text-base font-semibold text-slate-800">
            Ingreso de medicación
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/**
           * Zona del formulario de ingreso de medicacion
           * 
           */}

          <div>
            <div className='flex items-center gap-4'>
              <label htmlFor="" className='whitespace-nowrap'>Marca comercial</label>
              <input type="text" />
            </div>
            <input type="text" placeholder='Laboratorio' />
            <input type="text" placeholder='Lote' />
            <br />
            <label htmlFor="">Vencimiento
              <input type="date" />
            </label>
            <input type="text" placeholder='Cantidad' />
            <input type="text" placeholder='Via administracion' />
          </div>

          <div>
            
          </div>
          {/* ================= FIN FORMULARIO ================= */}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              Registrar ingreso
            </button>
          </div>
        </section>
      </form>
    </>
  )
}

export default AbastecimientoIngresos