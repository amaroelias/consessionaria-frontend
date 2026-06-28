import api from '@/lib/api'

export const funcionariosService = {
  listar: () => api.get('/funcionarios'),
  buscarPorId: (id) => api.get(`/funcionarios/${id}`),
  criar: (data) => api.post('/funcionarios', data),
  atualizar: (id, data) => api.put(`/funcionarios/${id}`, data),
  deletar: (id) => api.delete(`/funcionarios/${id}`),
}