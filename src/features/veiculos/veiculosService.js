import api from '@/lib/api'

export const veiculosService = {
  listar: () => api.get('/veiculos'),
  buscarPorId: (id) => api.get(`/veiculos/${id}`),
  criar: (data) => api.post('/veiculos', data),
  atualizar: (id, data) => api.put(`/veiculos/${id}`, data),
  deletar: (id) => api.delete(`/veiculos/${id}`),
}