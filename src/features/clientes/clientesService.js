import api from '@/lib/api'

export const clientesService = {
  listar: () => api.get('/clientes'),
  buscarPorId: (id) => api.get(`/clientes/${id}`),
  criar: (data) => api.post('/clientes', data),
  atualizar: (id, data) => api.put(`/clientes/${id}`, data),
  deletar: (id) => api.delete(`/clientes/${id}`),
}