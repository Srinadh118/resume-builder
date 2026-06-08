import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useCustomTemplates } from '../../hooks/useCustomTemplates'
import { Plus, Edit2, Trash2 } from 'lucide-react'

function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { customTemplates, fetchCustomTemplates, deleteCustomTemplate } = useCustomTemplates()
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCustomTemplates().catch(err => console.error('Failed to load templates in settings page', err))
  }, [fetchCustomTemplates])

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this custom template? Resumes using it will fallback to standard modern template.')) {
      try {
        await deleteCustomTemplate(id)
      } catch (err) {
        console.error('Failed to delete template', err)
      }
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    setError('')
    setMessage('Password updated successfully')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div className="settings">
      <div className="settings__container">
        <h1 className="settings__title">Account Settings</h1>

        <div className="settings__section">
          <h2 className="settings__section-title">Profile Information</h2>
          <div className="settings__info">
            <div className="settings__info-item">
              <span className="settings__info-label">Email:</span>
              <span className="settings__info-value">{user?.email}</span>
            </div>
            <div className="settings__info-item">
              <span className="settings__info-label">Name:</span>
              <span className="settings__info-value">{user?.firstName} {user?.lastName}</span>
            </div>
          </div>
        </div>

        <div className="settings__section">
          <h2 className="settings__section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Custom Resume Templates
            <button 
              className="settings__theme-toggle-btn" 
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={() => navigate('/templates/new')}
            >
              <Plus size={14} />
              Create Template
            </button>
          </h2>
          
          {customTemplates.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: '#666', margin: 0, textAlign: 'center', padding: '16px 0' }}>
              You haven't created any custom templates yet. Design one to customize layout, colors, spacing, and styling.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {customTemplates.map(t => (
                <div 
                  key={t._id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '12px 16px',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{t.name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#888', marginLeft: '12px', textTransform: 'capitalize' }}>
                      {t.layout?.layoutType?.replace('-', ' ')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => navigate(`/templates/edit/${t._id}`)}
                      style={{ 
                        background: 'transparent', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)'
                      }}
                      title="Edit Template"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTemplate(t._id)}
                      style={{ 
                        background: 'transparent', 
                        border: '1px solid rgba(238, 0, 0, 0.2)', 
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        color: '#ee0000'
                      }}
                      title="Delete Template"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="settings__section">
          <h2 className="settings__section-title">Change Password</h2>
          {message && <div className="settings__message">{message}</div>}
          {error && <div className="settings__error">{error}</div>}
          <form onSubmit={handleSubmit} className="settings__form">
            <div className="settings__form-group">
              <label className="settings__form-label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="settings__form-input"
              />
            </div>
            <div className="settings__form-group">
              <label className="settings__form-label">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="settings__form-input"
              />
            </div>
            <div className="settings__form-group">
              <label className="settings__form-label">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="settings__form-input"
              />
            </div>
            <button type="submit" className="settings__form-submit">
              Update Password
            </button>
          </form>
        </div>

        <div className="settings__section">
          <h2 className="settings__section-title">Preferences</h2>
          <div className="settings__info">
            <div className="settings__info-item">
              <span className="settings__info-label">Active Theme:</span>
              <button 
                type="button" 
                onClick={toggleTheme} 
                className="settings__theme-toggle-btn"
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
          </div>
        </div>

        <div className="settings__section">
          <h2 className="settings__section-title">Account Actions</h2>
          <button className="settings__logout-btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
