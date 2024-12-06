import React, { useState } from 'react'
import axios from 'axios'
import Message from '../components/Message';

export const Supervisor = () => {

    const [message, setMessage] = useState(null);

    const handleClickClearPositions = () => {
        axios
        .post("http://localhost:8000/api/clearAllPositions")
        .then(({data}) => {
            setMessage("Posiciones liberadas");
            setTimeout(() => {
                setMessage(null);
            }, 2000);
            console.log(data);
        })
        .catch((error) => {
            setMessage(error);
            console.log(error);
        })
    }

    const handleClickClearPosition = () => {
        axios
        .post("http://localhost:8000/api/clearPosition", {
            "id": 2 //hardcodeado
        })
        .then(({data}) => {
            setMessage("Posicion N liberada");
            setTimeout(() => {
                setMessage(null);
            }, 2000);
            console.log(data);
        })
        .catch((error) => {
            setMessage(error);
            console.log(error);
        })
    }

    return (
        <>
        <div className='flex justify-center'>
            <div className='flex flex-col mt-5 w-1/2 gap-6'>
                <h3 className='text-center text-2xl pb-5'>Menu Posiciones</h3>
                <div className='flex flex-col gap-4 items-start'>
                    <h2 className='text-center text-xl pb-5'>Administrar Posiciones</h2>
                    <table class="table-auto w-full">
                        <thead className='mb-4'>
                            <tr className='text-left bg-blue-400 text-white'>
                                <th>Posicion</th>
                                <th>Puede llamar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ventanilla 1</td>
                                <td>SI</td>
                                <button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Editar</button>
                            </tr>
                            <tr>
                                <td>Ventanilla 2</td>
                                <td>SI</td>
                                <button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Editar</button>
                            </tr>
                            <tr>
                                <td>Caja 1</td>
                                <td>SI</td>
                                <button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Editar</button>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button onClick={handleClickClearPositions} className='bg-blue-400 hover:bg-blue-500 text-slate-50 px-3 py-1 font-semibold text-sm'>+ Nueva Posicion</button>
                    </div>
                </div>
                <hr />
                <h2 className='text-xl pb-1'>Posiciones actualmente asignadas</h2>
                <table class="table-auto">
                    <thead>
                        <tr className='text-left bg-blue-400 text-white'>
                            <th>Posicion</th>
                            <th>Ocupada</th>
                            <th>Usuario</th>
                            <th>Tiempo</th>
                            <th>Liberar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ventanilla 1</td>
                            <td>SI</td>
                            <td>Usuario Nombre</td>
                            <td>12:32</td>
                            <button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Liberar</button>
                        </tr>
                        <tr>
                            <td>Ventanilla 2</td>
                            <td>SI</td>
                            <td>Usuario Nombre</td>
                            <td>12:32</td>
                            <button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Liberar</button>
                        </tr>
                        <tr>
                            <td>Caja 1</td>
                            <td>SI</td>
                            <td>Usuario Nombre</td>
                            <td>12:32</td>
                            <button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Liberar</button>
                        </tr>
                    </tbody>
                </table>
                <div className='w-full flex justify-start'>
                    <div>
                        <button onClick={handleClickClearPositions} className='bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 text-sm'>Limpiar posiciones</button>
                    </div>
                </div>
            </div>

            {message ? <Message className="translate-x-0" message={message} /> : <Message className="translate-x-100" message={message} />}
            </div>
        </>
    )
}
