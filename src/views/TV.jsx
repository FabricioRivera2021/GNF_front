/**
 * LLamador de tv no implementado todavia
 */

import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function llamadorTV() {
  return (
    <div>
        <div className="w-screen h-screen flex flex-col justify-start items-center pt-20">
            <h1 className="text-xl uppercase font-semibold text-slate-500 mb-1">Ingrese su documento</h1>
            <h2 className="text-sm font-semibold text-slate-500 mb-10">Sin puntos ni guiones</h2>

            <div className="w-3/5 max-w-sm grid grid-cols-3 grid-rows-4 gap-1">
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">1</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">2</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">3</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">4</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">5</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">6</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">7</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">8</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">9</div> 
                <div  className="col-span-2 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center">0</div> 
                <div  className="col-span-1 px-5 py-2 text-3xl rounded-md bg-orange-300 border font-semibold text-slate-500 hover:bg-blue-300 flex justify-center">
                  <ArrowLeftIcon className='w-10' /> 
                </div>
            </div>

            <input className="my-5 px-5 py-2 border-slate-300 rounded-md w-3/5 max-w-sm antialiased text-slate-400 text-center font-semibold bg-slate-50" type="text" wire:model="displayNumber" readonly />       
            
            <div className="flex flex-col gap-1 w-3/5 max-w-sm">
                <button wire:click="clear" className="border rounded-xs bg-red-400 px-3 col-span-3 py-1 font-semibold text-slate-100">Cancelar</button>
                <button wire:click="add" className="border rounded-xs bg-blue-400 px-3 col-span-3 py-1 font-semibold text-slate-100">Agregar Cedula</button>
            </div>
            
            <div className="w-3/5 max-w-sm" 
                x-data="{ showFinalizar: false }"
                x-init="@this.on('numberAdded', () => { showFinalizar = true });
                        @this.on('clearDisplay', () => { showFinalizar = false });"
            >
                <div className="w-full flex items-center justify-start bg-slate-100">
                    <div className="pl-3 py-1 text-slate-500 flex w-full justify-between">
                        <div><button wire:click="deleteCi({{$key}})" className="border rounded bg-red-400 shadow-sm text-slate-100 px-2 mr-3">Eliminar</button></div>
                    </div>
                </div>
                <p></p>
                <button className="w-full border rounded-xs bg-blue-500 px-3 col-span-3 py-0.5 my-3 text-slate-100 text-sm">Finalizar</button>
            </div>
        </div>
    </div>
  )
}
