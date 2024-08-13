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

  console.log(numero);

  useEffect(() => {
    
  }, [numero])

  return (
    <div className='w-screen h-screen flex antialiased'>
      <div className='w-[65%] h-screen z-50 p-2'>
        <div className='w-full h-full'>
          <p className='text-white w-fit p-5 text-6xl bg-blue-400 rounded-sm font-semibold'>12:45</p>
        </div>
      </div>
      <div className='w-[32%]'>
        {/* Card */}
        <div className='flex flex-col justify-around items-center w-full py-5 bg-blue-500 rounded text-white mt-2 gap-4'>
          <div className='w-3/4 flex gap-5 items-end justify-center'>
            <h4 className='text-5xl text-center whitespace-nowrap tracking-widest font-semibold uppercase'>{numero.lugar}</h4>
            <p className='text-5xl text-left font-semibold whitespace-nowrap rounded-sm px-2 bg-slate-50 text-slate-600'>{numero.prefix} {numero.nro}</p>
          </div>
          <div className='w-3/4 flex flex-col justify-center items-start px-4 rounded-md'>
            <p className='text-4xl text-center self-center whitespace-nowrap tracking-widest font-semibold uppercase text-slate-100'>{numero.fila}</p>
          </div>
        </div>
        {/* END Card */}
      </div>
    </div>
  )
}
