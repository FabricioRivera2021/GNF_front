import AbastecimientoSideBar from '../components/abastecimiento/AbastecimientoSideBar'
import { Outlet } from 'react-router-dom'

export const Abastecimiento = () => {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50">
        <AbastecimientoSideBar />
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

    </div>
  )
}