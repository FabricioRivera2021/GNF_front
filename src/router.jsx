import { Navigate, createBrowserRouter } from "react-router-dom";
import { Login, Dashboard } from "./views/index.js";
import GuestLayout from "./components/GuestLayout.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import Llamador from "./views/Llamador.jsx";
import Logout from "./views/Logout.jsx";
import TV from "./views/TV.jsx"

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
                path: '/TV',
                element: <TV />
            }
        ] 
    },
])

export default router;