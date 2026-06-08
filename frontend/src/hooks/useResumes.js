import { useState, useEffect, useCallback } from 'react'
import api from '../api/axios'

export function useResumes() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchResumes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/api/resumes')
      setResumes(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resumes')
    } finally {
      setLoading(false)
    }
  }, [])

  const createResume = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/api/resumes', data)
      setResumes(prev => [...prev, res.data])
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create resume')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateResume = useCallback(async (id, data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.put(`/api/resumes/${id}`, data)
      setResumes(prev => prev.map(r => r._id === id ? res.data : r))
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update resume')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteResume = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      await api.delete(`/api/resumes/${id}`)
      setResumes(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete resume')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const getResume = useCallback(async (id) => {
    try {
      const res = await api.get(`/api/resumes/${id}`)
      return res.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resume')
      throw err
    }
  }, [])

  return {
    resumes,
    loading,
    error,
    fetchResumes,
    createResume,
    updateResume,
    deleteResume,
    getResume,
  }
}
