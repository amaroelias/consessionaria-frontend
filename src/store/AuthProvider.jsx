import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import api from '@/lib/api'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const navigate = useNavigate()

const login = async ({ username, password }) => {
  const { data } = await api.post('/auth/login', { username, password })
  localStorage.setItem('token', data.token)
  setToken(data.token)
  navigate('/dashboard')
}

  const register = async ({ username, password }) => {
    const { data } = await api.post('/auth/register', { username, password })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    navigate('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}