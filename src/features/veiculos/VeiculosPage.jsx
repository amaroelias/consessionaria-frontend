import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { veiculosService } from './veiculosService'
import VeiculoForm from './VeiculoForm'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function VeiculosPage() {
  const queryClient = useQueryClient()
  const [formOpen, setFormOpen] = useState(false)
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['veiculos'],
    queryFn: () => veiculosService.listar().then((r) => r.data),
  })

  const deletar = useMutation({
    mutationFn: (id) => veiculosService.deletar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['veiculos'] }),
  })

  const handleEditar = (veiculo) => {
    setVeiculoSelecionado(veiculo)
    setFormOpen(true)
  }

  const handleNovo = () => {
    setVeiculoSelecionado(null)
    setFormOpen(true)
  }

  const handleFechar = () => {
    setVeiculoSelecionado(null)
    setFormOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Veículos</h1>
          <p className="text-zinc-400 text-sm mt-1">Gerencie o estoque de veículos</p>
        </div>
        <Button onClick={handleNovo} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Plus size={16} />
          Novo Veículo
        </Button>
      </div>

      {/* Tabela */}
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800 text-zinc-400">
            <tr>
              <th className="text-left px-4 py-3">Marca</th>
              <th className="text-left px-4 py-3">Modelo</th>
              <th className="text-left px-4 py-3">Ano</th>
              <th className="text-left px-4 py-3">Placa</th>
              <th className="text-left px-4 py-3">Chassi</th>
              <th className="text-left px-4 py-3">Preço</th>
              <th className="text-left px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-zinc-500">
                  Carregando...
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-zinc-500">
                  Nenhum veículo cadastrado
                </td>
              </tr>
            ) : (
              data?.map((veiculo) => (
                <tr key={veiculo.veiculoID} className="border-t border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-3 text-zinc-200">{veiculo.marca}</td>
                  <td className="px-4 py-3 text-zinc-200">{veiculo.modelo}</td>
                  <td className="px-4 py-3 text-zinc-200">{veiculo.ano}</td>
                  <td className="px-4 py-3 text-zinc-200">{veiculo.placa}</td>
                  <td className="px-4 py-3 text-zinc-200">{veiculo.chassi}</td>
                  <td className="px-4 py-3 text-zinc-200">
                    {Number(veiculo.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditar(veiculo)}
                        className="p-1.5 rounded text-zinc-400 hover:text-blue-400 hover:bg-zinc-700 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => deletar.mutate(veiculo.veiculoID)}
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

      {/* Form Modal */}
      {formOpen && (
        <VeiculoForm
          veiculo={veiculoSelecionado}
          onClose={handleFechar}
        />
      )}
    </div>
  )
}