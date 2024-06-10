import { Navigate, createBrowserRouter } from "react-router-dom";
import { Login, Logout, Llamador, Dashboard, PanelNumerico } from "./views/index.js";
import { DefaultLayout, GuestLayout } from "./components/index.js";

// parece que las rutas tienen un orden determinado, ojo con cual 
// va primero en el codigo
const router = createBrowserRouter([
    { 
        path: '/',
        element: <DefaultLayout />, 
        children: [
            {
                path: '/dashboard',
                element: <Navigate to='/' />
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/llamador',
                element: <Llamador />
            },
            { 
                path: '/logout',
                element: <Logout />
            },
        ] 
    },
    { 
        path: '/', //cada ves que el usuario valla a esta ruta
        //se dirige al guestlayout que muestra el login
        element: <GuestLayout />, 
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/panelNumerico',
                element: <PanelNumerico />
            }
        ] 
    },
])

export default router;