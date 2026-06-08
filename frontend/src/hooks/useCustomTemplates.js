import { useState, useCallback } from 'react'
import api from '../api/axios'

export function useCustomTemplates() {
  const [customTemplates, setCustomTemplates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCustomTemplates = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/api/custom-templates')
      setCustomTemplates(res.data)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch templates')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const getCustomTemplate = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(`/api/custom-templates/${id}`)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch template')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createCustomTemplate = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/api/custom-templates', data)
      setCustomTemplates(prev => [res.data, ...prev])
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create template')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCustomTemplate = useCallback(async (id, data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.put(`/api/custom-templates/${id}`, data)
      setCustomTemplates(prev => prev.map(t => t._id === id ? res.data : t))
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update template')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteCustomTemplate = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      await api.delete(`/api/custom-templates/${id}`)
      setCustomTemplates(prev => prev.filter(t => t._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete template')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    customTemplates,
    loading,
    error,
    fetchCustomTemplates,
    getCustomTemplate,
    createCustomTemplate,
    updateCustomTemplate,
    deleteCustomTemplate
  }
}
