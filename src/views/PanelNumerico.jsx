import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { showInfoMsg } from '../helpers/showInfoMsg';
import { ThreeDots } from 'react-loader-spinner';
import ReactToPrint from 'react-to-print';
import { Modal } from '../components';

export default function panelNumerico() {

	const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [createNumberOk, setCreateNumberOk] = useState(false);
	const [ticketData, setTicketData] = useState({});
  const ticketRef = useRef(null);
  const reactToPrintRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [filasData, setFilasData] = useState([]);
	const [message, setMessage] = useState({
    message: "nones",
    status: "none"
  });

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

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCheckCustomer = () => {
    handleOpenModal();
    //pedir las filas al servidor
    axios
      .get('http://localhost:8000/api/allFilas')
      .then(response => {
        const { data } = response;
        setMessage({
          status: "ok"
        });
        setFilasData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const handleCreateNumber = (fila) => {
    handleCloseModal();
    setIsLoading(true);
    //Crear el numero
    //hacer la peticion al endpoint pasando la cedula
    axios
      .post('http://localhost:8000/api/createNumber', {
        "ci": inputValue,
        "filas": fila
      })
      .then(response => {
        const { data } = response;
        setInputValue('');
        setIsLoading(false);
        setMessage({
          message: "Imprimiendo ticket",
          status: "ok"
        });
        setCreateNumberOk(true);
        setTicketData(data);  // Set the data directly
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setMessage({
          message: "Error en cedula",
          status: "error"
        });
        setCreateNumberOk(true);
      });
  }

  const handleCancelNumber = () => {
    setInputValue('');
  }

	useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (ticketData && Object.keys(ticketData).length > 0) {
      reactToPrintRef.current.handlePrint();
    }
  }, [ticketData]);

  useEffect(() => {
    if (createNumberOk == true) {
      setTimeout(() => {
        setCreateNumberOk(false);
      }, 3000);
    }
  }, [createNumberOk]);

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
										className={`col-span-1 px-5 py-2 text-3xl rounded-md bg-slate-300 border font-semibold text-slate-500 hover:bg-blue-300 text-center ${number === '0' ? 'col-span-2' : ''}`}>
										  {number}
									</button>
								))}
                <button  
									className="col-span-1 px-5 py-2 text-3xl rounded-md bg-orange-300 border font-semibold text-slate-500 hover:bg-blue-300 flex justify-center"
									onClick={() => setInputValue((prev) => prev.slice(0, -1))}>
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
                <button className="border rounded-md bg-red-400 px-3 col-span-3 py-1 font-semibold text-slate-100"
                  onClick={() => handleCancelNumber()}>
                  Cancelar
                </button>
                <button className="border rounded-md bg-blue-400 px-3 col-span-3 py-1 font-semibold text-slate-100"
                  onClick={() => handleCheckCustomer()}>
                  Siguiente
                </button>
                <Modal show={showModal} handleClose={handleCloseModal}>
                    <h2 className="text-2xl font-bold mb-8 text-slate-600 text-center">Elegir fila</h2>
                    <ul>
                      {filasData.map((elem) => (
                       <li>
                          <button className='font-medium mb-2 text-slate-100 text-2xl px-5 py-1.5 w-full bg-blue-600 focus:bg-blue-500'
                            onClick={() => handleCreateNumber(elem.filas)}>
                            {elem.filas}
                          </button>
                        </li>
                      ))}
                    </ul>
                </Modal>
                {
                  (!createNumberOk)
                    ? ''
                    : showInfoMsg(message)
                }
            </div>


            <div className='hidden'>
              <div ref={ticketRef} className="p-20 border-solid w-full m-auto text-center font-roboto">
                <h2 className='text-2xl mb-5'>-TICKET-</h2>
                <p className='p-2 text-xl font-semibold'><strong>NUMERO</strong></p>
                <p className='text-5xl mb-4'>{ticketData.prefijo} {ticketData.numero}</p>
                <p className='p-2'><strong>FILA:</strong> {ticketData.fila}</p>
                <p className='p-2'>NOMBRE: {ticketData.nombre}</p>
                {/* <p className='p-2'>CEDULA: {ticketData.cedula}</p> */}
                <p className='p-2'>-----------------------------------------</p>
              </div>
            </div>

            <ReactToPrint
              trigger={() => <button style={{ display: 'none' }}>Print Ticket</button>}
              content={() => ticketRef.current}
              ref={reactToPrintRef}
            />
            
            {/* <div className="w-3/5 max-w-sm hidden">
                <div className="w-full flex items-center justify-start bg-slate-100">
                    <div className="pl-3 py-1 text-slate-500 flex w-full justify-between">
                        <div><button className="border rounded bg-red-400 shadow-sm text-slate-100 px-2 mr-3">Eliminar</button></div>
                    </div>
                </div>
                <button className="w-full hidden border rounded-xs bg-blue-500 px-3 col-span-3 py-0.5 my-3 text-slate-100 text-sm">Finalizar</button>
            </div> */}

            { (isLoading) 
              ?
              <ThreeDots
                visible={true}
                height="50"
                width="40"
                color="dodgerblue"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              /> 
              : ''
            }

        </div>
    </div>
  )
}