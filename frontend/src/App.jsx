import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Editor from './pages/Editor/Editor'
import Preview from './pages/Preview/Preview'
import Settings from './pages/Settings/Settings'
import CustomTemplateBuilder from './pages/CustomTemplateBuilder/CustomTemplateBuilder'
import { useAuth } from './context/AuthContext'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__spinner" />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="editor/:id?" element={<Editor />} />
        <Route path="preview/:id?" element={<Preview />} />
        <Route path="settings" element={<Settings />} />
        <Route path="templates/new" element={<CustomTemplateBuilder />} />
        <Route path="templates/edit/:id" element={<CustomTemplateBuilder />} />
      </Route>
    </Routes>
  )
}

export default App
