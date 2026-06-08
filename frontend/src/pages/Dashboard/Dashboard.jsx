import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useResumes } from '../../hooks/useResumes'
import ATSProgress from '../../components/ATSProgress/ATSProgress'

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { resumes, loading, error, fetchResumes, deleteResume } = useResumes()

  useEffect(() => {
    fetchResumes()
  }, [fetchResumes])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this resume?')) return
    try {
      await deleteResume(id)
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">My Resumes</h1>
        <Link to="/editor" className="dashboard__new-btn">
          + Create New Resume
        </Link>
      </div>

      {loading && <div className="dashboard__loading">Loading...</div>}
      {error && <div className="dashboard__error">{error}</div>}

      {!loading && !error && resumes.length === 0 && (
        <div className="dashboard__empty">
          <div className="dashboard__empty-icon">📄</div>
          <h3 className="dashboard__empty-title">No resumes yet</h3>
          <p className="dashboard__empty-text">Create your first resume to get started</p>
          <Link to="/editor" className="dashboard__new-btn">
            Create Resume
          </Link>
        </div>
      )}

      {resumes.length > 0 && (
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
                <p className="resume-card__job-title">{resume.generalInfo?.title || resume.generalInfo?.jobTitle || 'No Title Specified'}</p>
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
      )}
    </div>
  )
}

export default Dashboard
