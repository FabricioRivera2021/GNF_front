import { Navigate, Outlet } from "react-router-dom";
import { userStateContext } from "../context/ContextProvider";

export default function GuestLayout() {

  const { userToken } = userStateContext();

  if (userToken) {
    return <Navigate to="/" />
  }

  return (
    <div>
      {/* En este outlet se ven los children que se definieron
        en el archivo de rutas */}
      <Outlet />
    </div>
  );
}
