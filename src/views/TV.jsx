import React, { useEffect, useState } from 'react'
import { userStateContext } from '../context/ContextProvider';

export const TV = () => {

  // 4 como maximo
  /**
   * !esto deberia ser con websockets
   */

  const { numerosTV, setNumerosTV, addNumeroTV } = userStateContext();

  useEffect(() => {
    const channel = window.Echo.channel('chat');

    channel.listen('Example', (event) => {
        addNumeroTV(event.data);
        console.log('Evento recibido:', event.data);
    });

    return () => channel.stopListening('chat');
  }, []);

  useEffect(() => {
    console.log(numerosTV);
  }, [numerosTV])

  return (
    <div className='w-full flex antialiased p-4 gap-2 bg-slate-300'>
      <div className='w-[73%] h-[100vh] z-50 p-5 bg-underConstruction'>
        <div className='w-full h-full py-1'>
          <p className='text-white w-fit py-3 px-4 text-6xl bg-blue-600 rounded-sm font-semibold'>12:45</p>
        </div>
      </div>
      <div className='w-[25%]'>
        {/* Card */}
        {numerosTV.map((numero, index) => (
          <div key={index} className='flex flex-col justify-around items-center w-full bg-blue-600 rounded text-white mb-4 py-3 px-4'>
            <div className='w-full flex flex-col items-start justify-evenly font-roboto'>
              <h4 className='text-5xl text-white whitespace-nowrap tracking-wide font-semibold uppercase'>{numero.position}</h4>
              <h4 className='text-5xl whitespace-nowrap text-white'>{numero.prefix} {numero.numeroTV}</h4>
            </div>
            <div className='w-full flex flex-col justify-start items-start pt-4 border-t-orange-50 border-t text-white'>
              <p className='text-3xl whitespace-nowrap tracking-widest font-semibold uppercase'>Fila: {numero.fila}</p>
            </div>
          </div>
        ))}
        {/* END Card */}
      </div>
    </div>
  )
}
