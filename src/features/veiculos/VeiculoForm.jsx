import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { veiculosService } from './veiculosService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

const schema = z.object({
  marca: z.string().min(1, 'Marca obrigatória'),
  modelo: z.string().min(1, 'Modelo obrigatório'),
  ano: z.string().min(4, 'Ano obrigatório'),
  preco: z.string().min(1, 'Preço obrigatório'),
  placa: z.string().min(1, 'Placa obrigatória'),
  chassi: z.string().min(1, 'Chassi obrigatório'),
})

export default function VeiculoForm({ veiculo, onClose }) {
  const queryClient = useQueryClient()
  const isEditing = !!veiculo

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (veiculo) {
      reset({
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        preco: String(veiculo.preco),
        placa: veiculo.placa,
        chassi: veiculo.chassi,
      })
    }
  }, [veiculo, reset])

  const mutation = useMutation({
    mutationFn: (data) => {
      const payload = { ...data, preco: parseFloat(data.preco) }
      return isEditing
        ? veiculosService.atualizar(veiculo.veiculoID, payload)
        : veiculosService.criar(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veiculos'] })
      onClose()
    },
  })

  const onSubmit = (data) => mutation.mutate(data)

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-white font-semibold text-lg">
            {isEditing ? 'Editar Veículo' : 'Novo Veículo'}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-zinc-300">Marca</Label>
              <Input {...register('marca')} placeholder="Ex: Toyota" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.marca && <p className="text-red-400 text-xs">{errors.marca.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">Modelo</Label>
              <Input {...register('modelo')} placeholder="Ex: Corolla" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.modelo && <p className="text-red-400 text-xs">{errors.modelo.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">Ano</Label>
              <Input {...register('ano')} placeholder="Ex: 2023" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.ano && <p className="text-red-400 text-xs">{errors.ano.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">Preço</Label>
              <Input {...register('preco')} placeholder="Ex: 85000.00" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.preco && <p className="text-red-400 text-xs">{errors.preco.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">Placa</Label>
              <Input {...register('placa')} placeholder="Ex: ABC1D23" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.placa && <p className="text-red-400 text-xs">{errors.placa.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">Chassi</Label>
              <Input {...register('chassi')} placeholder="Ex: 9BWZZZ377VT004251" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.chassi && <p className="text-red-400 text-xs">{errors.chassi.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" onClick={onClose} variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSubmitting ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}