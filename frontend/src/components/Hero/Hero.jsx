import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Hero() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Build Your Perfect Resume</h1>
        <p className="hero__subtitle">
          Create professional, ATS-optimized resumes in minutes. Stand out to recruiters with our intelligent resume builder.
        </p>
        <div className="hero__actions">
          {user ? (
            <button className="hero__cta hero__cta--primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          ) : (
            <button className="hero__cta hero__cta--primary" onClick={() => navigate('/register')}>
              Get Started Free
            </button>
          )}
          <button className="hero__cta hero__cta--secondary" onClick={() => navigate('/editor')}>
            Try Editor
          </button>
        </div>
      </div>
      <div className="hero__graphic">
        <div className="hero__card hero__card--1" />
        <div className="hero__card hero__card--2" />
        <div className="hero__card hero__card--3" />
      </div>
    </section>
  )
}

export default Hero
