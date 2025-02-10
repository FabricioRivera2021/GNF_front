import { Navigate, createBrowserRouter } from "react-router-dom";
import { Login, Logout, Llamador, Dashboard, PanelNumerico, IngresarMed, MedCC } from "./views/index.js";
import { DefaultLayout, GuestLayout } from "./components/index.js";
import { AdminLayout } from "./components/AdminLayout.jsx";
import { TV } from "./views/TV.jsx";
import { Supervisor } from "./views/Supervisor.jsx";
import { ConsultaStock } from "./views/ConsultaStock.jsx";
import { Abastecimiento } from "./views/Abastecimiento.jsx";
import { PedidosRemotos } from "./views/PedidosRemotos.jsx";

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
            {
                path: '/supervisor', //cambiar esto despues de probar a guest
                element: <Supervisor />
            },
            {
                path: '/nuevoIngresoVentanilla', //cambiar esto despues de probar a guest
                element: <IngresarMed />
            },
            {
                path: '/nuevoIngresoVentanillaCC', //cambiar esto despues de probar a guest
                element: <MedCC />
            },
            {
                path: '/consultasStock', //cambiar esto despues de probar a guest
                element: <ConsultaStock />
            },
            {
                path: '/abastecimiento', //cambiar esto despues de probar a guest
                element: <Abastecimiento />
            },
            {
                path: '/TV', //cambiar esto despues de probar a guest
                element: <TV />
            },
            {
                path: '/pedidosRemotos',
                element: <PedidosRemotos />
            }
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
            },
            // {
            //     path: '/TV', //cambiar esto despues de probar a guest
            //     element: <TV />
            // },

        ] 
    },
    { 
        path: '/admin', //cada ves que el usuario valla a esta ruta
        //se dirige al guestlayout que muestra el login
        element: <AdminLayout />
    },
])

export default router;