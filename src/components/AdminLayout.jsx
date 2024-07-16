import React, { useEffect } from 'react'
import { userStateContext } from '../context/ContextProvider'
import { redirect } from 'react-router-dom';
import axios from 'axios';

export const AdminLayout = () => {
    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user');
            if (response.data.roles_id == 1) {
                // Usuario autenticado, maneja los datos del usuario
                setCurrentUser(response.data);
                console.log('User is authenticated', response.data);
            }
        } catch (error) {
            setUserToken(null);
            redirect('/');
        }
    };

    const { currentUser, userToken, setCurrentUser, setUserToken, position, setPosition, numero, isChangingPosition, setIsChangingPosition} = userStateContext();

    // Llama a checkAuth al cargar la aplicación
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div>AdminLayout</div>
    )
}
