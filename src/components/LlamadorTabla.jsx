import React from 'react'
import renderLoadingLines from '../helpers/renderLoadingLines'
import { calculateTimeDifference } from '../Utils/utils'
import { CheckCircleIcon, XCircleIcon, PauseCircleIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { userStateContext } from '../context/ContextProvider';

export default function LlamadorTabla({ numeros, comparePosition, position, isChangingPosition, error, handleLlamarNumero }){

  const { numero } = userStateContext();

  return (
    <div className="min-h-20 pb-3 overflow-auto">
        <table  className="min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface">
            <thead className="border-b dark:border-neutral-500 bg-blue-400 sticky top-0">
                <tr>
                    <th scope="col" className="px-1 py-1 text-slate-100">Accion</th>
                    <th scope="col" className="px-1 py-1 text-slate-100">Nro.</th>
                    <th scope="col" className="px-1 py-1 text-slate-100">Fila</th>
                    <th scope="col" className="px-1 py-1 text-slate-100">T. de espera</th>
                    <th scope="col" className="px-1 py-1 text-slate-100">Estado</th>
                    <th scope="col" className="px-1 py-1 text-slate-100">Nombre</th>
                    <th scope="col" className="px-1 py-1 text-slate-100">T. de espera total</th>
                    <th scope="col" className="px-1 py-1 text-slate-100"></th>
                </tr>
            </thead>
            <tbody className="odd">
                { isChangingPosition ? (
                    <tr>
                        {renderLoadingLines(7)}
                    </tr>
                    ) : error ? (
                    <tr>
                    <td> Error: {error.message} </td>
                    </tr>
                    ) : (numeros == '') ? (
                        <tr className="odd:bg-slate-50 even:bg-gray-300">
                            <td className='whitespace-nowrap px-1 py-1'>No hay numeros que mostrar</td>
                        </tr>
                    ) : (
                    numeros.map((item, index) => (
                        <tr key={index} className={`odd:bg-slate-50 even:bg-gray-100 ${(numero.nro == item.numero) ? '!bg-blue-400 text-slate-100' : ''}`}>
                            <td className="whitespace-nowrap px-1 flex items-center font-normal">
                                {item.estado.includes(comparePosition) && position.includes(comparePosition) && item.pausado != 1 && item.cancelado != 1 && (numero.nro != item.numero) && (
                                    <button className={`bg-blue-500 px-2 mr-2 rounded-md hover:bg-blue-400 text-xs text-slate-100 font-roboto font-semibold
                                                        ${(numero.nro != null) ? 'bg-gray-400 hover:bg-gray-400' : ''}`}
                                        onClick={() => handleLlamarNumero(item.nombre[0].numeros_id, item.pausado, item.cancelado)}
                                        disabled={(numero.nro != null || item.pausado == 1 || item.cancelado == 1)}
                                    ><SpeakerWaveIcon title="Llamar numero" className="w-6 text-white" /></button>
                                )}
                                {item.estado.includes(comparePosition) && position.includes(comparePosition) && item.pausado != 1 && item.cancelado != 1 && (numero.nro != item.numero) && (
                                    <button className={`bg-blue-100 px-2 rounded-md hover:bg-blue-400 text-xs text-slate-100 font-roboto font-semibold
                                                        ${(numero.nro != null) ? 'bg-gray-400 hover:bg-gray-400' : ''}`}
                                        onClick={() => handleLlamarNumero(item.nombre[0].numeros_id, item.pausado, item.cancelado)}
                                        disabled={(numero.nro != null || item.pausado == 1 || item.cancelado == 1)}
                                    ><SpeakerXMarkIcon title="Llamar numero en silencio" className="w-6 text-blue-500" /></button>
                                )}
                                {item.estado.includes(comparePosition) && position.includes(comparePosition) && item.pausado == 1 && (
                                    <button className={`bg-blue-500 px-2 rounded-md hover:bg-blue-400 text-xs text-slate-100 font-roboto font-semibold
                                                        ${(numero.nro != null) ? '!bg-gray-400 hover:!bg-gray-400' : ''}`}
                                        onClick={() => handleLlamarNumero(item.nombre[0].numeros_id, item.pausado, item.cancelado)}
                                        disabled={(numero.nro != null)}
                                    ><SpeakerWaveIcon title="Llamar numero pausado" className="w-6 text-white" /></button>
                                )}
                                {item.estado.includes(comparePosition) && position.includes(comparePosition) && item.cancelado == 1 && (
                                    <button className={`bg-blue-500 px-2 rounded-md hover:bg-blue-400 text-xs text-slate-100 font-roboto font-semibold
                                                        ${(numero.nro != null) ? '!bg-gray-400 hover:!bg-gray-400' : ''}`}
                                        onClick={() => handleLlamarNumero(item.nombre[0].numeros_id, item.pausado, item.cancelado)}
                                        disabled={(numero.nro != null)}
                                    ><SpeakerWaveIcon title="Llamar numero cancelado" className="w-6 text-white" /></button>
                                )}
                            </td>
                            <td className="whitespace-nowrap px-1 py-1">{item.fila_prefix} {item.numero}</td>
                            <td className="whitespace-nowrap px-1 py-1">{item.fila}</td>
                            <td className="whitespace-nowrap px-1 py-1">{calculateTimeDifference(item.modified_at)}</td>
                            <td className="whitespace-nowrap px-1 py-1"><div className="flex items-center">{item.estado} {item.estado == 'finalizado' 
                                                                                                    ? <CheckCircleIcon className="w-6 text-green-500" /> 
                                                                                                    : item.pausado == 1
                                                                                                        ? <PauseCircleIcon title="Numero pausado" className="w-6 text-yellow-500" />
                                                                                                        : item.cancelado == 1
                                                                                                            ? <XCircleIcon title="Numero cancelado" className="w-6 text-red-500" />
                                                                                                            : ''}
                            </div></td>
                            <td className="whitespace-nowrap px-1 py-1">                                          
                                {item.nombre.map((elem, idx) => (
                                    <span key={idx}>{elem.name}</span>
                                ))}
                            </td>
                            <td className="whitespace-nowrap px-1 py-1">{calculateTimeDifference(item.created_at)}</td>
                            <td className="whitespace-nowrap px-1 py-1">{item.user}</td>
                        </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    </div>
  )
}
