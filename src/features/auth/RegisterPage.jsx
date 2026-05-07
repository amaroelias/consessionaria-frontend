import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Car } from 'lucide-react'

const schema = z.object({
  username: z.string().min(3, 'Usuário deve ter ao menos 3 caracteres'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  confirmarPassword: z.string(),
}).refine((data) => data.password === data.confirmarPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmarPassword'],
})

export default function RegisterPage() {
  const { register: registerAuth } = useAuth()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await registerAuth({ username: data.username, password: data.password })
    } catch (err) {
      console.error('Erro ao cadastrar:', err)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <Car size={40} className="text-blue-500" />
          </div>
          <CardTitle className="text-white text-2xl">Criar conta</CardTitle>
          <CardDescription className="text-zinc-400">
            Preencha os dados para se cadastrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label className="text-zinc-300">Usuário</Label>
              <Input
                {...register('username')}
                placeholder="seu usuário"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              {errors.username && (
                <p className="text-red-400 text-xs">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">Senha</Label>
              <Input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-300">Confirmar senha</Label>
              <Input
                {...register('confirmarPassword')}
                type="password"
                placeholder="••••••••"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              {errors.confirmarPassword && (
                <p className="text-red-400 text-xs">{errors.confirmarPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>

            <p className="text-center text-zinc-500 text-sm">
              Já tem conta?{' '}
              <Link to="/login" className="text-blue-400 hover:underline">
                Faça login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}