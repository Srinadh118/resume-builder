import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCustomTemplates } from '../../hooks/useCustomTemplates'
import { useResumes } from '../../hooks/useResumes'
import { FileText, Plus, Trash2, Edit2, Sparkles, AlertCircle, Check, Eye, X } from 'lucide-react'

const STANDARD_TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'A clean, single-column design ideal for technology, business, and executive roles. Prioritizes legibility, clean spacing, and modern typography.',
    layoutType: 'stacked',
    accentColor: '#171717',
  },
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'A traditional sidebar layout displaying contact details, skills, and metadata on the left column, and main experience details on the right.',
    layoutType: 'sidebar-left',
    accentColor: '#0070f3',
  },
  {
    id: 'executive',
    name: 'Elegant Executive',
    description: 'A refined serif layout emphasizing academic, executive, or research background. Uses editorial typography, centered header, and structured dividers.',
    layoutType: 'stacked',
    accentColor: '#7928ca',
  },
  {
    id: 'tech',
    name: 'Sleek Tech',
    description: 'A developer-centric template with monospace headers, labels, and bullet items. Designed specifically for engineering, IT, and product resumes.',
    layoutType: 'stacked',
    accentColor: '#10b981',
  },
  {
    id: 'creative',
    name: 'Creative Stylish',
    description: 'A dynamic visual layout featuring a top header color strip and stylish accent borders. Excellent for designers, marketers, and creative roles.',
    layoutType: 'stacked',
    accentColor: '#eb367f',
  }
]

function Templates() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const { customTemplates, fetchCustomTemplates, deleteCustomTemplate, loading: templatesLoading } = useCustomTemplates()
  const { resumes, fetchResumes, getResume, updateResume, loading: resumesLoading } = useResumes()

  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showUseModal, setShowUseModal] = useState(false)
  const [modalMode, setModalMode] = useState(null) // 'choice', 'apply'
  const [selectedResumeId, setSelectedResumeId] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (user) {
      fetchCustomTemplates().catch(err => console.error('Failed to load custom templates', err))
      fetchResumes().catch(err => console.error('Failed to load resumes', err))
    }
  }, [user, fetchCustomTemplates, fetchResumes])

  const handleUseTemplateClick = (template) => {
    if (!user) {
      alert('Please log in or sign up to create a resume with this template.')
      navigate('/login')
      return
    }
    
    setSelectedTemplate(template)
    // If user has no resumes, directly go to new resume editor
    if (resumes.length === 0) {
      navigate(`/editor?template=${template.id}`)
    } else {
      setModalMode('choice')
      setShowUseModal(true)
    }
  }

  const handleCreateNewResume = () => {
    if (selectedTemplate) {
      setShowUseModal(false)
      navigate(`/editor?template=${selectedTemplate.id}`)
    }
  }

  const handleSelectApplyMode = () => {
    setModalMode('apply')
    if (resumes.length > 0) {
      setSelectedResumeId(resumes[0]._id)
    }
  }

  const handleApplyToResume = async () => {
    if (!selectedResumeId || !selectedTemplate) return
    setIsApplying(true)
    setErrorMsg('')
    try {
      // 1. Fetch full details of target resume
      const resume = await getResume(selectedResumeId)
      if (resume) {
        // 2. Update settings theme with chosen template
        const updatedResume = {
          ...resume,
          settings: {
            ...resume.settings,
            theme: selectedTemplate.id
          }
        }
        // 3. Save resume changes
        await updateResume(selectedResumeId, updatedResume)
        setShowUseModal(false)
        navigate(`/editor/${selectedResumeId}`)
      }
    } catch (err) {
      console.error('Failed to apply template', err)
      setErrorMsg(err.response?.data?.message || 'Failed to update resume. Please try again.')
    } finally {
      setIsApplying(false)
    }
  }

  const handleDeleteCustomTemplate = async (e, id) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this custom template? Resumes using it will fall back to the standard modern template.')) {
      try {
        await deleteCustomTemplate(id)
      } catch (err) {
        console.error('Failed to delete custom template', err)
      }
    }
  }

  const handleEditCustomTemplate = (e, id) => {
    e.stopPropagation()
    navigate(`/templates/edit/${id}`)
  }

  const handleCloseModal = () => {
    setShowUseModal(false)
    setSelectedTemplate(null)
    setModalMode(null)
    setSelectedResumeId('')
    setErrorMsg('')
  }

  return (
    <div className="templates-page">
      {/* Vercel-inspired Hero Band */}
      <div className="templates-page__hero">
        <div className="templates-page__hero-content">
          <div className="templates-page__hero-eyebrow">Visual Architecture</div>
          <h1 className="templates-page__hero-title">Select your canvas.</h1>
          <p className="templates-page__hero-subtitle">
            Choose from professionally structured layouts, or customize design grids, colors, and typography to fit your profile.
          </p>
        </div>
      </div>

      {/* Standard Templates Section */}
      <div className="templates-page__section">
        <div className="templates-page__header-bar">
          <h2 className="templates-page__header-bar-title">Standard Templates</h2>
          <span className="templates-page__header-bar-subtitle" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Designed for ATS optimization
          </span>
        </div>

        <div className="templates-page__grid">
          {STANDARD_TEMPLATES.map((tmpl) => (
            <div key={tmpl.id} className="template-card">
              <div className="template-card__preview-container">
                {/* Visual mockup representation of layout */}
                {tmpl.id === 'modern' && (
                  <div className="template-card__mockup template-card__mockup--modern">
                    <div className="mockup-header">
                      <div className="mock-line mock-line--header" style={{ width: '60%' }} />
                      <div className="mock-line mock-line--accent" style={{ width: '45%' }} />
                      <div className="mock-line mock-line--short" style={{ width: '75%' }} />
                    </div>
                    <div className="mock-line mock-line--title mock-line--accent" style={{ marginTop: '8px' }} />
                    <div className="mock-line" />
                    <div className="mock-line mock-line--medium" />
                    <div className="mock-line mock-line--title mock-line--accent" style={{ marginTop: '8px' }} />
                    <div className="mock-line" />
                    <div className="mock-line mock-line--medium" />
                  </div>
                )}

                {tmpl.id === 'classic' && (
                  <div className="template-card__mockup template-card__mockup--classic">
                    <div className="mockup-sidebar">
                      <div className="mock-line mock-line--header" style={{ width: '100%', height: '18px', borderRadius: '50%', marginBottom: '4px' }} />
                      <div className="mock-line mock-line--accent" style={{ width: '100%' }} />
                      <div className="mock-line" style={{ width: '80%' }} />
                      <div className="mock-line" style={{ width: '90%' }} />
                      <div className="mock-line mock-line--accent" style={{ width: '70%', marginTop: '6px' }} />
                      <div className="mock-line" style={{ width: '100%' }} />
                    </div>
                    <div className="mockup-main">
                      <div className="mock-line mock-line--header" style={{ width: '70%', height: '12px' }} />
                      <div className="mock-line mock-line--accent" style={{ width: '40%' }} />
                      <div className="mock-line mock-line--title" style={{ marginTop: '4px' }} />
                      <div className="mock-line" />
                      <div className="mock-line" />
                      <div className="mock-line mock-line--title" style={{ marginTop: '4px' }} />
                      <div className="mock-line" />
                    </div>
                  </div>
                )}

                {tmpl.id === 'executive' && (
                  <div className="template-card__mockup template-card__mockup--executive">
                    <div className="mockup-header" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <div className="mock-line mock-line--header" style={{ width: '80%', fontFamily: 'Georgia', height: '10px' }} />
                      <div className="mock-line mock-line--short" style={{ width: '50%' }} />
                    </div>
                    <div style={{ borderBottom: '1px solid #171717', width: '100%', margin: '4px 0' }} />
                    <div className="mock-line mock-line--title mock-line--accent" style={{ width: '50%' }} />
                    <div className="mock-line" style={{ height: '3px' }} />
                    <div className="mock-line mock-line--medium" style={{ height: '3px' }} />
                    <div className="mock-line mock-line--title mock-line--accent" style={{ width: '50%', marginTop: '6px' }} />
                    <div className="mock-line" style={{ height: '3px' }} />
                    <div className="mock-line mock-line--medium" style={{ height: '3px' }} />
                  </div>
                )}

                {tmpl.id === 'tech' && (
                  <div className="template-card__mockup template-card__mockup--tech" style={{ borderLeft: '3px solid #10b981' }}>
                    <div className="mock-line mock-line--header" style={{ width: '50%', backgroundColor: '#10b981', height: '8px' }} />
                    <div className="mock-line mock-line--short" style={{ width: '30%', height: '3px' }} />
                    <div className="mock-line mock-line--title" style={{ marginTop: '6px', height: '6px' }} />
                    <div className="mockup-grid">
                      <div className="mock-line" style={{ height: '3px' }} />
                      <div className="mock-line" style={{ height: '3px' }} />
                      <div className="mock-line" style={{ height: '3px' }} />
                      <div className="mock-line" style={{ height: '3px' }} />
                    </div>
                    <div className="mock-line mock-line--title" style={{ marginTop: '6px', height: '6px' }} />
                    <div className="mock-line" style={{ height: '3px' }} />
                    <div className="mock-line" style={{ height: '3px' }} />
                  </div>
                )}

                {tmpl.id === 'creative' && (
                  <div className="template-card__mockup template-card__mockup--creative" style={{ '--template-accent': '#eb367f' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '4px' }}>
                      <div>
                        <div className="mock-line mock-line--header" style={{ width: '110px', height: '14px' }} />
                        <div className="mock-line mock-line--accent" style={{ width: '80px', marginTop: '3px' }} />
                      </div>
                      <div style={{ width: '35px', height: '35px', borderRadius: '4px', backgroundColor: '#eaeaea' }} />
                    </div>
                    <div className="mock-line mock-line--title mock-line--accent" />
                    <div className="mock-line" style={{ width: '100%' }} />
                    <div className="mock-line mock-line--medium" />
                    <div className="mock-line mock-line--title mock-line--accent" style={{ marginTop: '6px' }} />
                    <div className="mock-line" style={{ width: '100%' }} />
                  </div>
                )}

                <div className="template-card__actions">
                  <button 
                    className="template-card__action-btn template-card__action-btn--primary"
                    onClick={() => handleUseTemplateClick(tmpl)}
                  >
                    Use Template
                  </button>
                </div>
              </div>

              <div className="template-card__info">
                <div className="template-card__title-row">
                  <h3 className="template-card__title">{tmpl.name}</h3>
                  <span className="template-card__badge template-card__badge--standard">Standard</span>
                </div>
                <p className="template-card__desc">{tmpl.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Templates Section */}
      {user && (
        <div className="templates-page__section" style={{ marginTop: '24px' }}>
          <div className="templates-page__header-bar">
            <h2 className="templates-page__header-bar-title">My Custom Templates</h2>
            <div className="templates-page__header-bar-action">
              <Link to="/templates/new" className="settings__theme-toggle-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                <Plus size={14} />
                Create Template
              </Link>
            </div>
          </div>

          {templatesLoading && <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-tertiary)' }}>Loading custom templates...</div>}

          {!templatesLoading && customTemplates.length === 0 && (
            <div 
              style={{ 
                border: '1px dashed var(--border-medium)', 
                borderRadius: '12px', 
                padding: '40px 20px', 
                textAlign: 'center',
                backgroundColor: 'var(--bg-element)' 
              }}
            >
              <Sparkles size={32} style={{ color: 'var(--text-tertiary)', marginBottom: '12px' }} />
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>No Custom Templates yet</h4>
              <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                Design custom resume grids, select custom fonts, spacing, accent colors, and custom border/illustration configurations.
              </p>
              <Link to="/templates/new" className="settings__theme-toggle-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={14} />
                Create First Custom Template
              </Link>
            </div>
          )}

          {!templatesLoading && customTemplates.length > 0 && (
            <div className="templates-page__grid">
              {customTemplates.map((tmpl) => {
                const layoutVal = tmpl.layout?.layoutType || 'stacked'
                const isSidebar = layoutVal === 'sidebar-left' || layoutVal === 'sidebar-right'
                const accent = tmpl.styles?.accentColor || '#6366f1'
                const bg = tmpl.styles?.backgroundColor || '#ffffff'
                const text = tmpl.styles?.textColor || '#4d4d4d'

                return (
                  <div key={tmpl._id} className="template-card" style={{ borderColor: 'var(--border-light)' }}>
                    <div className="template-card__preview-container">
                      {/* Dynamic representation of custom layout */}
                      <div 
                        className={`template-card__mockup ${isSidebar ? 'template-card__mockup--classic' : 'template-card__mockup--modern'}`}
                        style={{ 
                          backgroundColor: bg, 
                          borderColor: 'rgba(0,0,0,0.1)', 
                          borderTop: tmpl.illustrations?.type === 'top-banner' ? `6px solid ${tmpl.illustrations?.color || accent}` : '1px solid rgba(0,0,0,0.1)',
                          borderLeft: tmpl.illustrations?.type === 'left-border' ? `4px solid ${tmpl.illustrations?.color || accent}` : '1px solid rgba(0,0,0,0.1)'
                        }}
                      >
                        {isSidebar ? (
                          <>
                            <div className="mockup-sidebar" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                              <div className="mock-line" style={{ backgroundColor: accent, width: '100%', height: '8px' }} />
                              <div className="mock-line" style={{ backgroundColor: text, opacity: 0.3, width: '100%', height: '3px' }} />
                              <div className="mock-line" style={{ backgroundColor: text, opacity: 0.3, width: '80%', height: '3px' }} />
                            </div>
                            <div className="mockup-main">
                              <div className="mock-line" style={{ backgroundColor: text, opacity: 0.5, width: '60%', height: '8px' }} />
                              <div className="mock-line" style={{ backgroundColor: accent, width: '30%', height: '4px' }} />
                              <div className="mock-line" style={{ backgroundColor: text, opacity: 0.2, width: '100%', height: '3px', marginTop: '6px' }} />
                              <div className="mock-line" style={{ backgroundColor: text, opacity: 0.2, width: '90%', height: '3px' }} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="mockup-header">
                              <div className="mock-line" style={{ backgroundColor: text, opacity: 0.7, width: '70%', height: '10px' }} />
                              <div className="mock-line" style={{ backgroundColor: accent, width: '40%', height: '4px' }} />
                            </div>
                            <div className="mock-line" style={{ backgroundColor: text, opacity: 0.4, width: '100%', height: '5px', marginTop: '4px' }} />
                            <div className="mock-line" style={{ backgroundColor: text, opacity: 0.2, width: '90%', height: '3px' }} />
                            <div className="mock-line" style={{ backgroundColor: text, opacity: 0.2, width: '100%', height: '3px' }} />
                          </>
                        )}
                      </div>

                      <div className="template-card__actions">
                        <button 
                          className="template-card__action-btn template-card__action-btn--primary"
                          onClick={() => handleUseTemplateClick({ id: tmpl._id, name: tmpl.name })}
                        >
                          Use Template
                        </button>
                      </div>
                    </div>

                    <div className="template-card__info">
                      <div className="template-card__title-row">
                        <h3 className="template-card__title">{tmpl.name}</h3>
                        <span className="template-card__badge template-card__badge--custom">Custom</span>
                      </div>
                      <p className="template-card__desc">
                        Custom layout configuration utilizing {tmpl.styles?.fontFamily || 'Default'} font styles and custom accent color branding.
                      </p>
                    </div>

                    <div className="template-card__footer">
                      <span>Layout: {layoutVal.replace('-', ' ')}</span>
                      <div className="template-card__custom-actions">
                        <button 
                          className="edit"
                          onClick={(e) => handleEditCustomTemplate(e, tmpl._id)}
                          title="Edit Custom Template"
                        >
                          <Edit2 size={12} />
                          Edit
                        </button>
                        <button 
                          className="delete"
                          onClick={(e) => handleDeleteCustomTemplate(e, tmpl._id)}
                          title="Delete Custom Template"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Interactive Modal flow for applying template */}
      {showUseModal && selectedTemplate && (
        <div className="templates-modal-overlay" onClick={handleCloseModal}>
          <div className="templates-modal" onClick={(e) => e.stopPropagation()}>
            <div className="templates-modal__header">
              <h3 className="templates-modal__header-title">Use Template: {selectedTemplate.name}</h3>
              <button className="templates-modal__header-close" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>

            <div className="templates-modal__body">
              {errorMsg && (
                <div style={{ display: 'flex', gap: '8px', padding: '10px 12px', backgroundColor: 'var(--bg-element)', border: '1px solid rgba(238, 0, 0, 0.2)', borderRadius: '6px', color: '#ee0000', fontSize: '0.85rem' }}>
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {modalMode === 'choice' && (
                <>
                  <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    How would you like to build with the <strong>{selectedTemplate.name}</strong> template?
                  </p>
                  
                  <button className="templates-modal__option" onClick={handleCreateNewResume}>
                    <span className="templates-modal__option-title">Create New Resume</span>
                    <span className="templates-modal__option-desc">Start building a fresh resume document with this template layout applied.</span>
                  </button>

                  <button className="templates-modal__option" onClick={handleSelectApplyMode}>
                    <span className="templates-modal__option-title">Apply to Existing Resume</span>
                    <span className="templates-modal__option-desc">Swap the theme layout design of one of your current resumes to this template.</span>
                  </button>
                </>
              )}

              {modalMode === 'apply' && (
                <>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Select which resume you want to apply the <strong>{selectedTemplate.name}</strong> layout to:
                  </p>

                  <select 
                    className="templates-modal__resume-select"
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                  >
                    {resumes.map(r => (
                      <option key={r._id} value={r._id}>
                        {(r.generalInfo?.firstName || r.generalInfo?.lastName)
                          ? `${r.generalInfo?.firstName || ''} ${r.generalInfo?.lastName || ''}`.trim()
                          : (r.title || 'Untitled Resume')}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>

            <div className="templates-modal__footer">
              <button className="cancel-btn" onClick={handleCloseModal} disabled={isApplying}>
                Cancel
              </button>
              {modalMode === 'apply' && (
                <button 
                  className="confirm-btn" 
                  onClick={handleApplyToResume}
                  disabled={isApplying || !selectedResumeId}
                >
                  {isApplying ? 'Applying...' : 'Apply Layout'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Templates
