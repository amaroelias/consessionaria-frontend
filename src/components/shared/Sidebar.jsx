import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Car,
  Users,
  UserCog,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/veiculos', icon: Car, label: 'Veículos' },
  { to: '/clientes', icon: Users, label: 'Clientes' },
  { to: '/funcionarios', icon: UserCog, label: 'Funcionários' },
  { to: '/vendas', icon: ShoppingCart, label: 'Vendas' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuth()

  return (
    <aside
      className={`relative flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Logo */}
      <div className="flex flex-row items-center gap-3 px-4 py-5 border-b border-zinc-800">
        <Car className="text-blue-500 shrink-0" size={24} />
        {!collapsed && (
          <span className="text-white font-bold text-lg leading-tight">
            AutoGestor
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-2 flex-1">
        <TooltipProvider delayDuration={0}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <Tooltip key={to}>
              <TooltipTrigger asChild>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex flex-row items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>{label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-zinc-800">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={logout}
                className={`flex flex-row items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-red-400 transition-colors w-full ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                <LogOut size={18} className="shrink-0" />
                {!collapsed && <span>Sair</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>Sair</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Botão recolher */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-7 bg-zinc-800 border border-zinc-700 rounded-full p-0.5 text-zinc-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  )
}