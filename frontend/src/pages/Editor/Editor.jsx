import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResumes } from '../../hooks/useResumes'
import GeneralInfoSection from '../../sections/GeneralInfoSection/GeneralInfoSection'
import ContactInfoSection from '../../sections/ContactInfoSection/ContactInfoSection'
import EducationSection from '../../sections/EducationSection/EducationSection'
import ExperienceSection from '../../sections/ExperienceSection/ExperienceSection'
import SkillsSection from '../../sections/SkillsSection/SkillsSection'
import CertificationsSection from '../../sections/CertificationsSection/CertificationsSection'
import SettingsSection from '../../sections/SettingsSection/SettingsSection'
import ResumePreview from '../../components/ResumePreview/ResumePreview'
import { Sidebar, Eye, EyeOff, Save, FileText } from 'lucide-react'


function Editor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createResume, updateResume, getResume } = useResumes()
  const [activeSection, setActiveSection] = useState('generalInfo')
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [previewWidth, setPreviewWidth] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [resumeData, setResumeData] = useState({
    generalInfo: {},
    contactInfo: {},
    education: [],
    experience: [],
    skills: [],
    certifications: [],
    settings: {
      theme: 'modern',
      fontSize: 12,
      accentColor: '#6366f1'
    }
  })

  useEffect(() => {
    if (id) {
      getResume(id).then(data => {
        setResumeData({
          ...data,
          skills: data.skills || [],
          certifications: data.certifications || [],
          settings: {
            theme: 'modern',
            fontSize: 12,
            accentColor: '#6366f1',
            ...(data.settings || {})
          }
        })
      }).catch(err => {
        console.error('Failed to load resume', err)
        navigate('/dashboard')
      })
    }
  }, [id, getResume, navigate])

  const handleSave = async () => {
    setSaving(true)
    try {
      if (id) {
        const updated = await updateResume(id, resumeData)
        if (updated) {
          setResumeData({
            ...updated,
            skills: updated.skills || [],
            certifications: updated.certifications || [],
            settings: {
              theme: 'modern',
              fontSize: 12,
              accentColor: '#6366f1',
              ...(updated.settings || {})
            }
          })
        }
      } else {
        const newResume = await createResume(resumeData)
        if (newResume) {
          setResumeData({
            ...newResume,
            skills: newResume.skills || [],
            certifications: newResume.certifications || [],
            settings: {
              theme: 'modern',
              fontSize: 12,
              accentColor: '#6366f1',
              ...(newResume.settings || {})
            }
          })
          navigate(`/editor/${newResume._id}`)
        }
      }
    } catch (err) {
      console.error('Save failed', err)
    } finally {
      setSaving(false)
    }
  }

  const updateSection = (section, data) => {
    setResumeData(prev => ({ ...prev, [section]: data }))
  }

  const handleTogglePreview = () => {
    const nextPreviewState = !showPreview
    setShowPreview(nextPreviewState)
    // Auto toggle sidebar: collapse if opening preview alongside editing
    setSidebarCollapsed(nextPreviewState)
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const workspace = document.querySelector('.editor__workspace')
      if (!workspace) return
      
      const rect = workspace.getBoundingClientRect()
      const workspaceWidth = rect.width
      const previewPx = rect.right - e.clientX
      let newPercentage = (previewPx / workspaceWidth) * 100
      
      if (newPercentage < 25) newPercentage = 25
      if (newPercentage > 75) newPercentage = 75
      
      setPreviewWidth(newPercentage)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const sections = [
    { key: 'generalInfo', label: 'General Info', Component: GeneralInfoSection },
    { key: 'contactInfo', label: 'Contact', Component: ContactInfoSection },
    { key: 'education', label: 'Education', Component: EducationSection },
    { key: 'experience', label: 'Experience', Component: ExperienceSection },
    { key: 'skills', label: 'Skills', Component: SkillsSection },
    { key: 'certifications', label: 'Certifications', Component: CertificationsSection },
    { key: 'settings', label: 'Customization', Component: SettingsSection },
  ]

  return (
    <div className={`editor ${showPreview ? 'editor--with-preview' : ''}`}>
      <div className={`editor__sidebar ${sidebarCollapsed ? 'editor__sidebar--collapsed' : ''}`}>
        <h2 className="editor__title">Resume Editor</h2>
        <nav className="editor__nav">
          {sections.map(section => (
            <button
              key={section.key}
              className={`editor__nav-item ${activeSection === section.key ? 'editor__nav-item--active' : ''}`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <div className="editor__actions">
          <button className="editor__save-btn" onClick={handleSave} disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
          <button 
            className="editor__preview-btn" 
            onClick={() => id ? navigate(`/preview/${id}`) : alert('Please save the resume first before previewing')}
            disabled={!id}
          >
            <FileText size={16} />
            Full Preview
          </button>
        </div>
      </div>

      <div className="editor__main-container">
        <div className="editor__toolbar">
          <div className="editor__toolbar-left">
            <button 
              className="editor__toolbar-toggle-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Sidebar size={20} />
            </button>
            <span className="editor__toolbar-title">
              {resumeData.generalInfo?.firstName ? `${resumeData.generalInfo.firstName}'s Resume` : 'Untitled Resume'}
            </span>
          </div>

          <div className="editor__toolbar-right">
            <button 
              className={`editor__toolbar-mode-btn ${!showPreview ? 'editor__toolbar-mode-btn--active' : ''}`}
              onClick={() => {
                setShowPreview(false)
                setSidebarCollapsed(false)
              }}
            >
              Form Editor
            </button>
            <button 
              className={`editor__toolbar-mode-btn ${showPreview ? 'editor__toolbar-mode-btn--active' : ''}`}
              onClick={() => {
                setShowPreview(true)
                setSidebarCollapsed(true)
              }}
            >
              <Eye size={16} style={{ marginRight: '6px' }} />
              Live Preview
            </button>

            <button 
              className="editor__toolbar-save-btn" 
              onClick={handleSave} 
              disabled={saving}
            >
              <Save size={16} style={{ marginRight: '6px' }} />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="editor__workspace">
          <div 
            className="editor__content"
            style={{ 
              width: showPreview ? `${100 - previewWidth}%` : '100%',
              flexGrow: showPreview ? 0 : 1 
            }}
          >
            {sections.map(section => (
              section.key === activeSection && (
                <section.Component
                  key={section.key}
                  data={resumeData[section.key]}
                  onChange={(data) => updateSection(section.key, data)}
                />
              )
            ))}
          </div>

          {showPreview && (
            <>
              <div 
                className="editor__resize-handle"
                onMouseDown={handleMouseDown}
              />
              <div 
                className="editor__preview-pane"
                style={{ 
                  width: `${previewWidth}%`,
                  flexGrow: 0 
                }}
              >
                <ResumePreview resume={resumeData} template={resumeData.settings?.theme || 'modern'} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Editor
