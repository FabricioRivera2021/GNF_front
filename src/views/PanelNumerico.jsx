import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

export default function panelNumerico() {

	const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	const [inputValue, setInputValue] = useState('');
	const [cedulas, setCedulas] = useState([]);
	const [cedula, setCedula] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onPanelClick = (number) => {
		setCedula = number;
	}

  const handleKeyPress = (event) => {
    const { key } = event;
    if (numbers.includes(key)) {
      setInputValue((prev) => prev + key);
    } else if (key === 'Backspace') {
      setInputValue((prev) => prev.slice(0, -1));
    }
  };

	useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
        <div className="w-screen h-screen flex flex-col justify-start items-center pt-20">
            <h1 className="text-xl uppercase font-semibold text-slate-500 mb-1">Ingrese su documento</h1>
            <h2 className="text-sm font-semibold text-slate-500 mb-10">Sin puntos ni guiones</h2>

            <div className="w-3/5 max-w-sm grid grid-cols-3 grid-rows-4 gap-1">
								{numbers.map((number, index) => (
									<button
										key={index}
										onClick={() => setInputValue((prev) => prev + number)}
										className={`col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center ${number === '0' ? 'col-span-2' : ''}`}
									>
										{number}
									</button>
								))}
                <button  
									className="col-span-1 px-5 py-2 text-3xl rounded-md bg-orange-300 border font-semibold text-slate-500 hover:bg-blue-300 flex justify-center"
									onClick={() => setInputValue((prev) => prev.slice(0, -1))}
								>
                  <ArrowLeftIcon className='w-10' />
                </button>
            </div>

            <input 
							className="my-5 px-5 py-2 border-slate-300 rounded-md w-3/5 max-w-sm antialiased text-slate-400 text-center font-semibold bg-slate-50" 
							type="text" 
							readOnly
							placeholder={inputValue}
						/>
            
            <div className="flex flex-col gap-1 w-3/5 max-w-sm">
                <button className="border rounded-xs bg-red-400 px-3 col-span-3 py-1 font-semibold text-slate-100">Cancelar</button>
                <button className="border rounded-xs bg-blue-400 px-3 col-span-3 py-1 font-semibold text-slate-100">Agregar Cedula</button>
            </div>
            
            <div className="w-3/5 max-w-sm hidden">
                <div className="w-full flex items-center justify-start bg-slate-100">
                    <div className="pl-3 py-1 text-slate-500 flex w-full justify-between">
                        <div><button className="border rounded bg-red-400 shadow-sm text-slate-100 px-2 mr-3">Eliminar</button></div>
                    </div>
                </div>
                <button className="w-full hidden border rounded-xs bg-blue-500 px-3 col-span-3 py-0.5 my-3 text-slate-100 text-sm">Finalizar</button>
            </div>
        </div>
    </div>
  )
}
