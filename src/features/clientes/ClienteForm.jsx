import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clientesService } from './clientesService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

const schema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(1, 'Telefone obrigatório'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos').max(11, 'CPF deve ter 11 dígitos'),
})

export default function ClienteForm({ cliente, onClose }) {
  const queryClient = useQueryClient()
  const isEditing = !!cliente

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (cliente) {
      reset({
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
      })
    }
  }, [cliente, reset])

  const mutation = useMutation({
    mutationFn: (data) =>
      isEditing
        ? clientesService.atualizar(cliente.clienteId, data)
        : clientesService.criar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
      onClose()
    },
  })

  const onSubmit = (data) => mutation.mutate(data)

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-white font-semibold text-lg">
            {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 col-span-2">
              <Label className="text-zinc-300">Nome</Label>
              <Input {...register('nome')} placeholder="Nome completo" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.nome && <p className="text-red-400 text-xs">{errors.nome.message}</p>}
            </div>

            <div className="space-y-1 col-span-2">
              <Label className="text-zinc-300">E-mail</Label>
              <Input {...register('email')} type="email" placeholder="email@exemplo.com" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">Telefone</Label>
              <Input {...register('telefone')} placeholder="(00) 00000-0000" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.telefone && <p className="text-red-400 text-xs">{errors.telefone.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">CPF</Label>
              <Input {...register('cpf')} placeholder="00000000000" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              {errors.cpf && <p className="text-red-400 text-xs">{errors.cpf.message}</p>}
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