import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResumes } from '../../hooks/useResumes'
import { useCustomTemplates } from '../../hooks/useCustomTemplates'
import ResumePreview from '../../components/ResumePreview/ResumePreview'

function Preview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getResume } = useResumes()
  const { customTemplates, fetchCustomTemplates } = useCustomTemplates()
  const [resume, setResume] = useState(null)
  const [template, setTemplate] = useState('modern')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomTemplates().catch(err => console.error('Failed to load custom templates in preview page', err))
  }, [fetchCustomTemplates])

  useEffect(() => {
    if (id) {
      getResume(id)
        .then(data => {
          setResume(data)
          setTemplate(data.settings?.theme || data.settings?.template || 'modern')
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to load resume', err)
          navigate('/dashboard')
        })
    } else {
      setLoading(false)
    }
  }, [id, getResume, navigate])

  const handleDownload = () => {
    window.print()
  }

  if (loading) return <div className="preview__loading">Loading...</div>
  if (!resume) return <div className="preview__empty">No resume to preview</div>

  return (
    <div className="preview-page">
      <div className="preview-page__controls">
        <h1 className="preview-page__title">Resume Preview</h1>
        <div className="preview-page__actions">
          <select
            className="preview-page__template-select"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <optgroup label="Standard Templates">
              <option value="modern">Modern Minimalist</option>
              <option value="classic">Classic Professional</option>
              <option value="executive">Elegant Executive</option>
              <option value="tech">Sleek Tech</option>
              <option value="creative">Creative Stylish</option>
            </optgroup>
            {customTemplates.length > 0 && (
              <optgroup label="My Custom Templates">
                {customTemplates.map(t => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <button className="preview-page__download-btn" onClick={handleDownload}>
            Download PDF
          </button>
          <button className="preview-page__edit-btn" onClick={() => navigate(`/editor/${id}`)}>
            Edit Resume
          </button>
        </div>
      </div>
      <div className="preview-page__content">
        <ResumePreview resume={resume} template={template} />
      </div>
    </div>
  )
}

export default Preview
