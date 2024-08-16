import React, { useEffect } from 'react'
import { userStateContext } from '../context/ContextProvider';

export const TV = () => {

  // 6 como maximo
  /**
   * un endpoint que checkee en que estan los numeros
   * se podria tene un contexto global que tenga una variable que cambie cada vez que se llama un numero
   * y al llamarla un useeffct que atualiza los numeros
   */
  const { numero } = userStateContext();

  
  useEffect(() => {
    console.log(numero);
    
  }, [numero])

  return (
    <div className='w-screen h-screen flex antialiased'>
      <div className='w-[65%] h-screen z-50 p-2'>
        <div className='w-full h-full'>
          <p className='text-slate-700 w-fit py-3 px-5 text-6xl bg-blue-300 rounded-sm font-semibold'>12:45</p>
        </div>
      </div>
      <div className='w-[32%]'>
        {/* Card */}
        <div className='flex flex-col justify-around items-center w-full bg-blue-800 rounded text-white mt-2 py-5 px-1'>
          <div className='w-full flex items-end justify-evenly'>
            <h4 className='text-4xl text-slate-50 whitespace-nowrap tracking-wide font-semibold uppercase'>{numero.lugar}</h4>
            <h4 className='text-6xl font-bold whitespace-nowrap pr-5 pl-2 text-orange-400'>{numero.prefix} {numero.nro}</h4>
          </div>
          <div className='w-full flex flex-col justify-center items-start px-4 bg-white pt-4'>
            <p className='text-3xl text-center self-center whitespace-nowrap tracking-widest font-semibold uppercase text-slate-600'>Numero {numero.fila}</p>
            <p className='text-2xl text-center self-center whitespace-nowrap tracking-widest font-semibold text-slate-600'>Pepita Perez</p>
          </div>
        </div>
        {/* END Card */}
      </div>
    </div>
  )
}
