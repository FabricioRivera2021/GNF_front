import React from 'react'

export const IngresarMed = () => {
return (
    <div className="flex">
            <div className="w-1/2 p-4">
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-6">Ingresar Medicación</h2>
                            <form>
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
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dosage">
                                                    Dosis
                                            </label>
                                            <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="dosage"
                                                    type="text"
                                                    placeholder="Dosis"
                                            />
                                    </div>
                                    <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequency">
                                                    Frecuencia
                                            </label>
                                            <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="frequency"
                                                    type="text"
                                                    placeholder="Frecuencia"
                                            />
                                    </div>
                                    <div className="flex items-center justify-between">
                                            <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    type="button"
                                            >
                                                    Ingresar
                                            </button>
                                    </div>
                            </form>
                    </div>
            </div>
            <div className="w-1/2 p-4">
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-6">Medicación Actual</h2>
                            <ul>
                                    <li>Medicamento 1</li>
                                    <li>Medicamento 2</li>
                                    <li>Medicamento 3</li>
                            </ul>
                    </div>
            </div>
    </div>
)
}
