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

function Editor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createResume, updateResume, getResume } = useResumes()
  const [activeSection, setActiveSection] = useState('generalInfo')
  const [saving, setSaving] = useState(false)
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
    <div className="editor">
      <div className="editor__sidebar">
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
            {saving ? 'Saving...' : 'Save Resume'}
          </button>
          <button 
            className="editor__preview-btn" 
            onClick={() => id ? navigate(`/preview/${id}`) : alert('Please save the resume first before previewing')}
            disabled={!id}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="editor__content">
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
    </div>
  )
}

export default Editor
