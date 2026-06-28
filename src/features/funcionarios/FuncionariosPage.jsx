import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { funcionariosService } from './funcionariosService'
import FuncionarioForm from './FuncionarioForm'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function FuncionariosPage() {
  const queryClient = useQueryClient()
  const [formOpen, setFormOpen] = useState(false)
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['funcionarios'],
    queryFn: () => funcionariosService.listar().then((r) => r.data),
  })

  const deletar = useMutation({
    mutationFn: (id) => funcionariosService.deletar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['funcionarios'] }),
  })

  const handleEditar = (funcionario) => {
    setFuncionarioSelecionado(funcionario)
    setFormOpen(true)
  }

  const handleNovo = () => {
    setFuncionarioSelecionado(null)
    setFormOpen(true)
  }

  const handleFechar = () => {
    setFuncionarioSelecionado(null)
    setFormOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Funcionários</h1>
          <p className="text-zinc-400 text-sm mt-1">Gerencie os funcionários da concessionária</p>
        </div>
        <Button onClick={handleNovo} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Plus size={16} />
          Novo Funcionário
        </Button>
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-zinc-400">
            <tr>
              <th className="text-left px-4 py-3">Nome</th>
              <th className="text-left px-4 py-3">E-mail</th>
              <th className="text-left px-4 py-3">Telefone</th>
              <th className="text-left px-4 py-3">CPF</th>
              <th className="text-left px-4 py-3">Cargo</th>
              <th className="text-left px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-zinc-500">
                  Carregando...
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-zinc-500">
                  Nenhum funcionário cadastrado
                </td>
              </tr>
            ) : (
              data?.map((funcionario) => (
                <tr key={funcionario.funcionarioId} className="border-t border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-3 text-zinc-200">{funcionario.nome}</td>
                  <td className="px-4 py-3 text-zinc-200">{funcionario.email}</td>
                  <td className="px-4 py-3 text-zinc-200">{funcionario.telefone}</td>
                  <td className="px-4 py-3 text-zinc-200">{funcionario.cpf}</td>
                  <td className="px-4 py-3 text-zinc-200">{funcionario.cargo}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditar(funcionario)}
                        className="p-1.5 rounded text-zinc-400 hover:text-blue-400 hover:bg-zinc-700 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => deletar.mutate(funcionario.funcionarioId)}
                        className="p-1.5 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <FuncionarioForm
          funcionario={funcionarioSelecionado}
          onClose={handleFechar}
        />
      )}
    </div>
  )
}