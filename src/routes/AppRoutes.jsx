import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import MainLayout from '@/components/shared/MainLayout'

import LoginPage from '@/features/auth/LoginPage'
import RegisterPage from '@/features/auth/RegisterPage'
import DashboardPage from '@/features/dashboard/DashboardPage'
import VeiculosPage from '@/features/veiculos/VeiculosPage'
import ClientesPage from '@/features/clientes/ClientesPage'
import FuncionariosPage from '@/features/funcionarios/FuncionariosPage'
import VendasPage from '@/features/vendas/VendasPage'

function PrivateWithLayout({ children }) {
  return (
    <PrivateRoute>
      <MainLayout>{children}</MainLayout>
    </PrivateRoute>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Privadas com layout */}
      <Route path="/dashboard" element={<PrivateWithLayout><DashboardPage /></PrivateWithLayout>} />
      <Route path="/veiculos" element={<PrivateWithLayout><VeiculosPage /></PrivateWithLayout>} />
      <Route path="/clientes" element={<PrivateWithLayout><ClientesPage /></PrivateWithLayout>} />
      <Route path="/funcionarios" element={<PrivateWithLayout><FuncionariosPage /></PrivateWithLayout>} />
      <Route path="/vendas" element={<PrivateWithLayout><VendasPage /></PrivateWithLayout>} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}