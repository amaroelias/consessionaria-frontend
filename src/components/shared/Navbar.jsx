import { UserCircle } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
      <span className="text-zinc-400 text-sm">
        Bem-vindo ao sistema de gestão
      </span>
      <div className="flex items-center gap-3">
        <UserCircle size={28} className="text-zinc-400" />
      </div>
    </header>
  )
}