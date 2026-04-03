import AbastecimientoSideBar from '../components/abastecimiento/AbastecimientoSideBar'
import { Outlet } from 'react-router-dom'

export const Abastecimiento = () => {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50">
        <AbastecimientoSideBar />
      </aside>

      {/* Contenido */}
      <main className="w-full">
        <Outlet />
      </main>

    </div>
  )
}