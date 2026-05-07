import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import LoginPage from '@/features/auth/LoginPage'
import RegisterPage from '@/features/auth/RegisterPage'
import DashboardPage from '@/features/dashboard/DashboardPage'
import VeiculosPage from '@/features/veiculos/VeiculosPage'
import ClientesPage from '@/features/clientes/ClientesPage'
import FuncionariosPage from '@/features/funcionarios/FuncionariosPage'
import VendasPage from '@/features/vendas/VendasPage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Privadas */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/veiculos" element={<PrivateRoute><VeiculosPage /></PrivateRoute>} />
      <Route path="/clientes" element={<PrivateRoute><ClientesPage /></PrivateRoute>} />
      <Route path="/funcionarios" element={<PrivateRoute><FuncionariosPage /></PrivateRoute>} />
      <Route path="/vendas" element={<PrivateRoute><VendasPage /></PrivateRoute>} />

      {/* Redirecionar raiz */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}