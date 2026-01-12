import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Login, Logout, Llamador, Dashboard, PanelNumerico, IngresarMed, MedCC, HistorialRetiros, RetiroActual } from "./views/index.js";
import { DefaultLayout, GuestLayout } from "./components/index.js";
import { AdminLayout } from "./components/AdminLayout.jsx";
import { TV } from "./views/TV.jsx";
import { Supervisor } from "./views/Supervisor.jsx";
import { ConsultaStock } from "./views/ConsultaStock.jsx";
import { Abastecimiento } from "./views/Abastecimiento.jsx";
import { PedidosRemotos } from "./views/PedidosRemotos.jsx";
import Caja from "./views/Caja.jsx";
import Preparacion from "./views/Preparacion.jsx";
import AbastecimientoIngresos from "./components/abastecimiento/AbastecimientoIngresos.jsx";
import AbastecimientoStock from "./components/abastecimiento/AbastecimientoStock.jsx";
import AbastecimientoMovimientos from "./components/abastecimiento/AbastecimientoMovimientos.jsx";
import AbastecimientoAlertas from "./components/abastecimiento/AbastecimientoAlertas.jsx";
import AbastecimientoCatalogo from "./components/abastecimiento/AbastecimientoCatalogo.jsx";

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
                path: '/ventanilla',
                element: <Outlet />, // Optional layout component or just <Outlet />
                children: [
                  {
                    index: true, // this makes it the default route
                    element: <Navigate to="nuevoIngresoVentanilla" />
                  },
                  {
                    path: 'nuevoIngresoVentanilla',
                    element: <IngresarMed />
                  },
                  {
                    path: 'nuevoIngresoVentanillaCC',
                    element: <MedCC />
                  },
                  {
                    path: 'retiroActual',
                    element: <RetiroActual />
                  },
                  {
                    path: 'historialRetiros',
                    element: <HistorialRetiros />
                  }
                ]
            },
            {
                path: '/caja', //cambiar esto despues de probar a guest
                element: <Caja />
            },
            {
                path: '/menuPreparacion', //cambiar esto despues de probar a guest
                element: <Preparacion />
            },
            {
                path: '/consultasStock', //cambiar esto despues de probar a guest
                element: <ConsultaStock />
            },
            {
                path: '/abastecimiento', //cambiar esto despues de probar a guest
                element: <Abastecimiento />,
                children: [
                  {
                    index: true, // this makes it the default route
                    element: <Navigate to="/abastecimiento/medicacion" />
                  },
                  {
                    path: 'medicacion',
                    element: <AbastecimientoIngresos />
                  },
                  {
                    path: 'stock',
                    element: <AbastecimientoStock />
                  },
                  {
                    path: 'catalogos',
                    element: <AbastecimientoCatalogo />
                  },
                  {
                    path: 'movimientos',
                    element: <AbastecimientoMovimientos/>
                  },
                  {
                    path: 'alertas',
                    element: <AbastecimientoAlertas />
                  },
                ]
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