import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div>
        {/* En este outlet se ven los children que se definieron
        en el archivo de rutas */}
        <Outlet />
    </div>
  )
}
