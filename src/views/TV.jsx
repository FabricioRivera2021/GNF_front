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
      <div className='w-[73%] h-screen z-50'>
        <div className='w-full h-full'>
          <p className='text-white w-fit py-3 text-6xl bg-blue-600 rounded-sm font-semibold'>12:45</p>
        </div>
      </div>
      <div className='w-[25%]'>
        {/* Card */}
        <div className='flex flex-col justify-around items-center w-full bg-blue-600 rounded text-white mt-4 py-3'>
          <div className='w-full flex flex-col items-start justify-evenly font-roboto'>
            <h4 className='text-6xl text-white whitespace-nowrap tracking-wide font-semibold uppercase'>{numero.lugar}</h4>
            <h4 className='text-6xl whitespace-nowrap text-white'>{numero.prefix} {numero.nro}</h4>
          </div>
          <div className='w-full flex flex-col justify-start items-start pt-4 border-t-orange-50 border-t text-white'>
            <p className='text-3xl whitespace-nowrap tracking-widest font-semibold uppercase'>Fila: {numero.fila}</p>
          </div>
        </div>
        {/* END Card */}
      </div>
    </div>
  )
}
