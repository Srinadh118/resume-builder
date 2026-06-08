import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useResumes } from '../../hooks/useResumes'
import { demoHighATS, demoLowATS } from '../../api/demoResumes'
import ATSProgress from '../../components/ATSProgress/ATSProgress'

function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { resumes, dashboardData, loading, error, fetchDashboardData, deleteResume, createResume } = useResumes()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const handleDelete = async (id) => {
    try {
      await deleteResume(id)
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  const handleCloneDemo = async (demoData) => {
    try {
      const cleanData = { ...demoData }
      // Remove any unwanted metadata
      delete cleanData._id
      delete cleanData.user
      delete cleanData.isDummy

      const newResume = await createResume(cleanData)
      if (newResume) {
        alert(`Successfully cloned "${cleanData.generalInfo.firstName}'s" resume!`)
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Clone failed', err)
      alert('Failed to clone demo resume.')
    }
  }

  // Determine highest and lowest from current resumes
  const highestScoreVal = dashboardData?.highestScore?.atsScore ?? 0
  const lowestScoreVal = dashboardData?.lowestScore?.atsScore ?? 0

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Welcome back, {user?.firstName || ''}</h1>
          <p className="dashboard__subtitle">Build, manage, and optimize your ATS-approved resumes.</p>
        </div>
        <Link to="/editor" className="dashboard__new-btn">
          + Create New Resume
        </Link>
      </div>

      {/* Stats Bar */}
      {resumes.length > 0 && (
        <div className="dashboard__stats-bar">
          <div className="stat-card">
            <span className="stat-card__label">Total Resumes</span>
            <span className="stat-card__val">{resumes.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Highest ATS Score</span>
            <span className="stat-card__val stat-card__val--high">{highestScoreVal}/100</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Lowest ATS Score</span>
            <span className="stat-card__val stat-card__val--low">{lowestScoreVal}/100</span>
          </div>
        </div>
      )}

      {(authLoading || loading) && <div className="dashboard__loading">Loading dashboard...</div>}
      {error && <div className="dashboard__error">{error}</div>}

      {!loading && !error && resumes.length === 0 && (
        <div className="dashboard__empty">
          <div className="dashboard__empty-icon">📄</div>
          <h3 className="dashboard__empty-title">No resumes yet</h3>
          <p className="dashboard__empty-text">Create your first resume or clone one of our expert examples below to get started.</p>
          <Link to="/editor" className="dashboard__new-btn">
            Create Custom Resume
          </Link>
        </div>
      )}

      {!loading && resumes.length > 0 && (
        <div className="dashboard__section">
          <h2 className="dashboard__section-title">My Resumes</h2>
          <div className="dashboard__grid">
            {resumes.map(resume => (
              <div key={resume._id} className="resume-card">
                <div className="resume-card__header">
                  <h3 className="resume-card__title">
                    {(resume.generalInfo?.firstName || resume.generalInfo?.lastName)
                      ? `${resume.generalInfo?.firstName || ''} ${resume.generalInfo?.lastName || ''}`.trim()
                      : (resume.title || 'Untitled Resume')}
                  </h3>
                  <span className="resume-card__date">
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="resume-card__body">
                  <p className="resume-card__job-title">
                    {resume.generalInfo?.title || resume.generalInfo?.jobTitle || 'No Title Specified'}
                  </p>
                  {resume.atsScore !== undefined && (
                    <div className="resume-card__score">
                      <ATSProgress score={resume.atsScore} small />
                    </div>
                  )}
                </div>
                <div className="resume-card__actions">
                  <button
                    className="resume-card__btn resume-card__btn--edit"
                    onClick={() => navigate(`/editor/${resume._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="resume-card__btn resume-card__btn--preview"
                    onClick={() => navigate(`/preview/${resume._id}`)}
                  >
                    Preview
                  </button>
                  <button
                    className="resume-card__btn resume-card__btn--delete"
                    onClick={() => handleDelete(resume._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demo Resumes Section */}
      <div className="dashboard__section dashboard__section--demos">
        <h2 className="dashboard__section-title">Cloneable Demo Resumes</h2>
        <p className="dashboard__section-subtitle">
          Use these pre-filled templates to see how ATS scoring works and jump-start your own layout.
        </p>
        <div className="dashboard__grid">
          {/* Sarah Chen (High ATS) */}
          <div className="resume-card resume-card--demo resume-card--high-ats">
            <div className="resume-card__header">
              <h3 className="resume-card__title">Sarah Chen (High ATS score example)</h3>
              <span className="demo-badge demo-badge--high">95 ATS</span>
            </div>
            <div className="resume-card__body">
              <p className="resume-card__job-title">Senior Software Engineer</p>
              <p className="resume-card__desc">
                Includes detailed experience descriptions, quantified achievements, and strong industry keywords.
              </p>
            </div>
            <div className="resume-card__actions">
              <button
                className="resume-card__btn resume-card__btn--edit"
                onClick={() => handleCloneDemo(demoHighATS)}
              >
                Clone & Customize
              </button>
            </div>
          </div>

          {/* John Doe (Low ATS) */}
          <div className="resume-card resume-card--demo resume-card--low-ats">
            <div className="resume-card__header">
              <h3 className="resume-card__title">John Doe (Low ATS score example)</h3>
              <span className="demo-badge demo-badge--low">25 ATS</span>
            </div>
            <div className="resume-card__body">
              <p className="resume-card__job-title">Worker</p>
              <p className="resume-card__desc">
                Minimal details, missing dates/locations, lack of impact descriptions, and very few core keywords.
              </p>
            </div>
            <div className="resume-card__actions">
              <button
                className="resume-card__btn resume-card__btn--edit"
                onClick={() => handleCloneDemo(demoLowATS)}
              >
                Clone & Customize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
