import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function Settings() {
  const { user, logout } = useAuth()
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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
