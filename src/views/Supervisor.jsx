import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Message from '../components/Message';
import { calculateTimeDifference } from '../Utils/utils';

export const Supervisor = () => {
    const [message, setMessage] = useState(null);
    const [puestos, setPuestos] = useState([]);
    const [users, setUsers] = useState([]);
    const [isProcesingNumber, setIsProcesingNumber] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getAllPuestos()
        getUsers()
        getUserIsProcesingNumber()
      }, [])

    const getUsers = () => {
        axios
        .get("http://localhost:8000/api/usersInPositions")
        .then(({data}) => {
            setUsers(data.users);
            console.log(data.users);
        })
    }

    const getUserIsProcesingNumber = () => {//saber si el usuario esta atendiendo a alguien o no
        axios
        .get("http://localhost:8000/api/isProcesingNumber")
        .then(({data}) => {
            setIsProcesingNumber(data);
        })
    }

    const getAllPuestos = () => {
        axios
        .get("http://localhost:8000/api/allPositions")
        .then(({data}) => {
            data.shift()
            setPuestos(data)
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

    return (
        <>
        <div className='flex justify-center'>
            <div className='flex flex-col mt-5 w-3/5 gap-6'>
                <div className='flex flex-col gap-4 items-start'>
                    <h2 className='text-center text-xl font-bold text-slate-600'>Administrar Posiciones</h2>
                    <table className="table-fixed w-full">
                        <thead className='mb-4'>
                            <tr className='text-left bg-blue-400 text-white'>
                                <th>Posicion</th>
                                <th>Puesto</th>
                                <th>Atendiendo</th>
                                <th>T. espera</th>
                                <th>Usuario</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                                {puestos.map((puesto) => {
                                    const assignedUser = users.find(user => user.positions_id === puesto.id);
                                    //si el numero tiene un usuario asignado eso quiere decir que esta siendo atendido
                                            // Check if a processing number exists for the assigned user
                                    const procesingNumber = assignedUser
                                    ? isProcesingNumber.find(number => number.user_id === assignedUser.id)
                                    : null;
                                    return(
                                    <tr key={puesto.id} className={`rounded-sm py-1 text-left pl-1 capitalize font-roboto text-sm odd:bg-slate-50 even:bg-gray-100`}>
                                        <td className='py-1'>{puesto.position}</td>
                                        <td>{puesto.occupied ? 'Ocupado' : 'Libre'}</td>
                                        <td>{procesingNumber ? 'En atención' : 'Sin número'}</td>
                                        <td>{procesingNumber ? calculateTimeDifference(procesingNumber.updated_at) : ' '}</td>
                                        <td>{assignedUser ? assignedUser.name : ' '}</td>
                                        <td><button className='bg-slate-500 hover:bg-blue-400 text-white px-4 shadow-md rounded-sm'>Editar puesto</button></td>
                                        <td><button className='bg-slate-500 hover:bg-blue-400 text-white px-4 shadow-md rounded-sm'>Liberar</button></td>
                                        <td className='flex py-1 items-center gap-2'>{puesto.active ? 'Activo' : 'Anulado'}<div className='w-4 h-4 bg-green-400'></div></td>
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
            </div>
            {message ? <Message className="translate-x-0" message={message} /> : <Message className="translate-x-100" message={message} />}
            </div>
        </>
    )
}
