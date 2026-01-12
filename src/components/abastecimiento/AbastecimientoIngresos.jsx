import React from 'react'

function AbastecimientoIngresos() {
  return (
    <>
<form className="space-y-6 max-w-7xl">

  {/* ================= INGRESOS POR COMPRA ================= */}
  <section className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
    <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">
      Ingresos por compra
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Nro. Remito
        </label>
        <input
          type="text"
          placeholder="Ej: 000123"
          className="w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Proveedor
        </label>

        <div className="flex gap-2">
          <select
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option disabled selected>
              Seleccione proveedor
            </option>
            <option>Megalabs</option>
            <option>Celsius</option>
            <option>Bayer</option>
          </select>

          <button
            type="button"
            className="px-3 py-2 rounded-md border border-blue-400 text-blue-500 hover:bg-blue-50 transition"
          >
            + Nuevo
          </button>
        </div>
      </div>

    </div>
  </section>

  {/* ================= INGRESO DE MEDICACIÓN ================= */}
  <section className="bg-white p-4 rounded-lg border space-y-4">
  <h2 className="text-base font-semibold text-slate-800">
    Ingreso de medicación
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

    <input className="input" placeholder="Droga" />
    <input className="input" placeholder="Marca comercial" />
    <input className="input" placeholder="Unidades por caja" />
    <input className="input" placeholder="Cantidad de cajas" />

    <input className="input" placeholder="Lote" />
    <input className="input" type="date" />

    <select className="input">
      <option>Tipo de ingreso</option>
    </select>

    <input className="input" placeholder="Precio" />

    {/* Campo ancho */}
    <div className="lg:col-span-2">
      <select className="input w-full">
        <option>Presentación</option>
      </select>
    </div>

    <div className="lg:col-span-2 flex gap-2">
      <select className="input flex-1">
        <option>Proveedor</option>
      </select>
      <button className="btn-outline">+ Nuevo</button>
    </div>

  </div>
</section>

  {/* ================= ACCIÓN ================= */}
  <div className="flex justify-end">
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
    >
      Registrar ingreso
    </button>
  </div>
</form>

    </>
  )
}

export default AbastecimientoIngresos