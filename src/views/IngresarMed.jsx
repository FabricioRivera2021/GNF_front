import React from 'react'

export const IngresarMed = () => {
  return (
    <>
        <div>Nombre</div>
        <div>CI</div>
        <div>Numero asignado</div>
        <div>
            <h2>Ultimos retiros</h2>
            <table class="table-fixed">
                <thead>
                    <tr>
                    <th class=" px-4 py-2">Fecha de retiro</th>
                    <th class=" px-4 py-2">Medicacion</th>
                    <th class=" px-4 py-2">Marca</th>
                    <th class=" px-4 py-2">Medico</th>
                    <th class=" px-4 py-2">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border px-4 py-2">12/08/24</td>
                        <td class="border px-4 py-2">Paracetamol</td>
                        <td class="border px-4 py-2">Zolben</td>
                        <td class="border px-4 py-2">Sin nombre</td>
                        <td class="border px-4 py-2">2 (cajas)</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">12/08/24</td>
                        <td class="border px-4 py-2">Paracetamol</td>
                        <td class="border px-4 py-2">Zolben</td>
                        <td class="border px-4 py-2">Sin nombre</td>
                        <td class="border px-4 py-2">2 (cajas)</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">12/08/24</td>
                        <td class="border px-4 py-2">Paracetamol</td>
                        <td class="border px-4 py-2">Zolben</td>
                        <td class="border px-4 py-2">Sin nombre</td>
                        <td class="border px-4 py-2">2 (cajas)</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">12/08/24</td>
                        <td class="border px-4 py-2">Paracetamol</td>
                        <td class="border px-4 py-2">Zolben</td>
                        <td class="border px-4 py-2">Sin nombre</td>
                        <td class="border px-4 py-2">2 (cajas)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
  )
}
