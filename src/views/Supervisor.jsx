import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Message from '../components/Message';

export const Supervisor = () => {

    const [message, setMessage] = useState(null);
    const [puestos, setPuestos] = useState([]);
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        axios
        .get("http://localhost:8000/api/usersInPositions")
        .then(({data}) => {
            setUsers(data.users);
            console.log(data.users);
        })
    }

    const getAllPuestos = () => {
        axios
        .get("http://localhost:8000/api/allPositions")
        .then(({data}) => {
            setPuestos(data)
            console.log(data);
        })
    }

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

    useEffect(() => {
      getAllPuestos()
      getUsers()
    }, [])
    

    return (
        <>
        <div className='flex justify-center'>
            <div className='flex flex-col mt-5 w-3/5 gap-6'>
                <h3 className='text-center text-2xl pb-5'>Menu Posiciones</h3>
                <div className='flex flex-col gap-4 items-start'>
                    <h2 className='text-center text-xl pb-5'>Administrar Posiciones</h2>
                    <table className="table-auto w-full">
                        <thead className='mb-4'>
                            <tr className='text-left bg-blue-400 text-white'>
                                <th>Posicion</th>
                                <th>Puesto</th>
                                <th>Atendiendo</th>
                                <th>T. espera</th>
                                <th>Usuario</th>
                                <th></th> {/*espacio en blanco*/}
                                <th></th> {/*espacio en blanco*/}
                                <th></th> {/*espacio en blanco*/}
                            </tr>
                        </thead>
                        <tbody>
                                {puestos.map((puesto) => {
                                    const assignedUser = users.find(user => user.positions_id === puesto.id);

                                    return(
                                    <tr key={puesto.id} className={`rounded-sm py-1 text-left pl-1 capitalize font-roboto text-sm odd:bg-slate-50 even:bg-gray-100`}>
                                        <td className='py-1'>{puesto.position}</td>
                                        <td>{puesto.occupied ? 'Ocupado' : 'Libre'}</td>
                                        <td>ATENCION EN PROCESO</td>
                                        <td>10:15</td>
                                        <td>{assignedUser ? assignedUser.name : '-'}</td>
                                        <td><button className='bg-slate-500 hover:bg-blue-400 text-white px-4 shadow-md rounded-sm'>Editar</button></td>
                                        <td><button className='bg-slate-500 hover:bg-blue-400 text-white px-4 shadow-md rounded-sm'>Liberar</button></td>
                                        <td className='flex py-1 items-center gap-2'>{puesto.active ? 'Activo' : 'Anulado'} <div className='w-4 h-4 bg-green-400'></div></td>
                                    </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    <div className='flex gap-4'>
                        <button onClick={handleClickClearPositions} className='bg-blue-400 hover:bg-blue-500 text-slate-50 px-3 py-1 font-semibold text-sm'>+ Nueva Posicion</button>
                        <button onClick={handleClickClearPositions} className='bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 text-sm'>Limpiar posiciones</button>
                    </div>
                </div>
                <hr />
                <h2 className='text-xl pb-1'>Posiciones actualmente asignadas</h2>
                <table className="table-auto">
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
                            <td><button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Liberar</button></td>
                        </tr>
                        <tr>
                            <td>Ventanilla 2</td>
                            <td>SI</td>
                            <td>Usuario Nombre</td>
                            <td>12:32</td>
                            <td><button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Liberar</button></td>
                        </tr>
                        <tr>
                            <td>Caja 1</td>
                            <td>SI</td>
                            <td>Usuario Nombre</td>
                            <td>12:32</td>
                            <td><button className='bg-slate-500 hover:bg-slate-600 text-white px-4 shadow-md rounded-sm'>Liberar</button></td>
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
