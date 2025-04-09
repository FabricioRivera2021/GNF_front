import React, { useState } from 'react'
import Modal from './Modal'
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { userStateContext } from '../context/ContextProvider';

const LlamadorPanel = ({numero, handleSetNextState, handleDerivateTo, handleDerivateToPosition, handlePauseNumber, handleCancelNumber}) => {
  const {showModal, setShowModal, allDerivates, setAllDerivates} = userStateContext();
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div className="w-full">
        {
            numero.nro != null && (
                <div className="bg-slate-100 flex justify-start items-center pt-2 w-full h-full">
                    <div className="h-[10vh] w-56 flex ml-1 flex-col justify-center items-center rounded shadow-sm bg-blue-500 mb-2">
                        <p className="text-6xl text-white font-semibold whitespace-nowrap">{numero.prefix} {numero.nro}</p>
                    </div>
                    <div className=" flex flex-col justify-center items-center w-[50rem]">
                        <div className="flex px-14 rounded w-full gap-6 mb-2 text-slate-500">
                            <p>Nombre: Nombre generico</p>
                            <p>CI: 45062412</p>
                            <p>Ultima concurrencia: 24/02/24</p>
                        </div>
                        <div className="flex px-14 rounded w-full gap-6">
                            <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                ${(numero.nro) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                disabled={!numero.nro}            
                                                onClick={() => handleSetNextState(numero.nro)}
                            >Derivar</button>
                            <div>
                                <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                ${(numero.nro) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                disabled={!numero.nro}
                                                onClick={() => handleDerivateTo(numero.nro, setShowModal, setAllDerivates)}
                                >Derivar a..</button>
                                <Modal show={showModal} handleClose={handleCloseModal}>
                                    <h2 className="text-xl font-bold mb-2">Derivar a..</h2>
                                    <table className="min-w-full text-left text-sm font-roboto font-medium text-slate-600 text-surface">
                                        <tbody className="odd">
                                            {allDerivates.map((item, index) => (
                                                <tr key={index} className="border-b-2">
                                                    <td className="whitespace-nowrap px-1 py-1">{item.estado}</td>
                                                    <td className="whitespace-nowrap px-1 py-1">
                                                        <button
                                                            onClick={() => handleDerivateToPosition(numero.nro, item.estado, setShowModal)}
                                                        >
                                                            <ArrowRightCircleIcon 
                                                                className="w-6 stroke-blue-500 hover:stroke-blue-400" 
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Modal>
                            </div>
                            <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                ${(numero) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                disabled={!numero}
                                                onClick={() => handlePauseNumber(numero)}
                            >Pausar</button>
                            <button className={`bg-slate-300 text-slate-700 px-2 rounded-md shadow-md
                                                ${(numero) ? '!bg-blue-400 !text-slate-100 hover:!bg-blue-500' : ''}`}
                                                disabled={!numero}
                                                onClick={() => handleCancelNumber(numero)}
                            >Cancelar</button>
                        </div>

                    </div>
                </div>
            )
        }
    </div>
  )
}

export default LlamadorPanel