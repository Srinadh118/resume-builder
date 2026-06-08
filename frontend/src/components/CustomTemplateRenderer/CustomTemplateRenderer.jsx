import React from 'react'
import { formatContactLink, renderTextWithLinks } from '../../utils/linkFormatter'

const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return dateString
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch (e) {
    return dateString
  }
}

function CustomTemplateRenderer({ resume, templateConfig }) {
  if (!resume || !templateConfig) return null

  const {
    generalInfo = {},
    contactInfo = {},
    education = [],
    experience = [],
    skills = [],
    certifications = [],
    settings = {}
  } = resume

  const {
    layout = {
      sections: ['generalInfo', 'contactInfo', 'summary', 'experience', 'education', 'skills', 'certifications'],
      layoutType: 'stacked',
      sidebarSections: ['contactInfo', 'skills'],
      mainSections: ['generalInfo', 'summary', 'experience', 'education', 'certifications']
    },
    styles = {
      fontFamily: 'Inter',
      fontSizeScale: 'medium',
      accentColor: '#6366f1',
      textColor: '#4d4d4d',
      backgroundColor: '#ffffff',
      sectionTitleColor: '#171717',
      spacing: 'comfortable',
      showSeparators: true
    },
    illustrations = {
      type: 'none',
      customSvgCode: '',
      color: '#6366f1'
    }
  } = templateConfig

  // Map styles
  const fontFamilies = {
    'Inter': '"Inter", -apple-system, system-ui, sans-serif',
    'Roboto': '"Roboto", "Helvetica Neue", sans-serif',
    'Satoshi': 'Satoshi, Geist, Inter, sans-serif',
    'Geist': 'Geist, Inter, system-ui, sans-serif',
    'Playfair Display': '"Playfair Display", Georgia, serif',
    'Lora': 'Lora, Georgia, serif',
    'Georgia': 'Georgia, "Times New Roman", serif',
    'Courier New': '"Courier New", Courier, monospace'
  }

  const fontSizes = {
    'small': '11px',
    'medium': '13px',
    'large': '15px'
  }

  const fontStyle = {
    fontFamily: fontFamilies[styles.fontFamily] || fontFamilies['Inter'],
    fontSize: settings.fontSize ? `${settings.fontSize}px` : (fontSizes[styles.fontSizeScale] || '13px'),
    color: styles.textColor || '#4d4d4d',
    backgroundColor: styles.backgroundColor || '#ffffff',
    '--resume-accent-color': styles.accentColor || settings.accentColor || '#6366f1'
  }

  const getSpacingClass = () => {
    switch (styles.spacing) {
      case 'compact': return 'custom-template--compact';
      case 'loose': return 'custom-template--loose';
      default: return 'custom-template--comfortable';
    }
  }

  // Render sub-components
  const renderSectionHeader = (title) => (
    <h3 
      className="custom-template__section-title"
      style={{ 
        color: styles.sectionTitleColor || '#171717', 
        borderColor: styles.showSeparators ? 'var(--resume-accent-color)' : 'transparent',
        borderBottomStyle: styles.showSeparators ? 'solid' : 'none',
        borderBottomWidth: '2px',
        paddingBottom: '4px',
        marginBottom: '12px',
        fontSize: '1.15em',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}
    >
      {title}
    </h3>
  )

  const renderGeneralInfo = () => {
    if (!generalInfo.firstName && !generalInfo.lastName && !generalInfo.title) return null
    return (
      <div className="custom-template__header-block" style={{ marginBottom: '20px' }}>
        <h1 
          className="custom-template__name"
          style={{ 
            fontSize: '2.5em', 
            fontWeight: 700, 
            color: styles.sectionTitleColor || '#171717',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}
        >
          {generalInfo.firstName || ''} {generalInfo.lastName || ''}
        </h1>
        {generalInfo.title && (
          <p 
            className="custom-template__job-title"
            style={{ 
              fontSize: '1.2em', 
              fontWeight: 500, 
              color: 'var(--resume-accent-color)', 
              margin: '4px 0 0 0'
            }}
          >
            {generalInfo.title}
          </p>
        )}
      </div>
    )
  }

  const renderContactInfo = () => {
    const hasContact = contactInfo.email || contactInfo.phone || contactInfo.location || contactInfo.website || contactInfo.linkedin || contactInfo.github || contactInfo.twitter
    if (!hasContact) return null

    const isTwoCol = layout.layoutType !== 'stacked'

    return (
      <div 
        className={`custom-template__contact-block ${isTwoCol ? 'custom-template__contact-block--vertical' : 'custom-template__contact-block--horizontal'}`}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: isTwoCol ? '8px' : '15px',
          flexDirection: isTwoCol ? 'column' : 'row',
          marginBottom: '20px',
          fontSize: '0.9em'
        }}
      >
        {contactInfo.email && (
          <div className="custom-template__contact-item">
            <a href={formatContactLink('email', contactInfo.email)} className="resume-link" style={{ color: 'inherit', textDecoration: 'none' }}>
              ✉ {contactInfo.email}
            </a>
          </div>
        )}
        {contactInfo.phone && (
          <div className="custom-template__contact-item">
            <a href={formatContactLink('phone', contactInfo.phone)} className="resume-link" style={{ color: 'inherit', textDecoration: 'none' }}>
              📞 {contactInfo.phone}
            </a>
          </div>
        )}
        {contactInfo.location && (
          <div className="custom-template__contact-item">
            📍 {contactInfo.location}
          </div>
        )}
        {contactInfo.website && (
          <div className="custom-template__contact-item">
            <a href={formatContactLink('website', contactInfo.website)} className="resume-link" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              🌐 {contactInfo.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {contactInfo.linkedin && (
          <div className="custom-template__contact-item">
            <a href={formatContactLink('linkedin', contactInfo.linkedin)} className="resume-link" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              🔗 LinkedIn
            </a>
          </div>
        )}
        {contactInfo.github && (
          <div className="custom-template__contact-item">
            <a href={formatContactLink('github', contactInfo.github)} className="resume-link" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              💻 GitHub
            </a>
          </div>
        )}
        {contactInfo.twitter && (
          <div className="custom-template__contact-item">
            <a href={formatContactLink('twitter', contactInfo.twitter)} className="resume-link" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              🐦 Twitter
            </a>
          </div>
        )}
      </div>
    )
  }

  const renderSummary = () => {
    if (!generalInfo.summary) return null
    return (
      <div className="custom-template__section" style={{ marginBottom: '20px' }}>
        {renderSectionHeader('Professional Summary')}
        <p className="custom-template__text" style={{ margin: 0, lineHeight: 1.6 }}>
          {renderTextWithLinks(generalInfo.summary)}
        </p>
      </div>
    )
  }

  const renderExperience = () => {
    if (experience.length === 0) return null
    return (
      <div className="custom-template__section" style={{ marginBottom: '20px' }}>
        {renderSectionHeader('Work Experience')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {experience.map((job, index) => (
            <div key={job._id || index} className="custom-template__item">
              <div style={{ display: 'flex', justifyContent: 'span-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ margin: 0, fontSize: '1.05em', fontWeight: 600, color: styles.sectionTitleColor || '#171717' }}>{job.position}</h4>
                <span style={{ fontSize: '0.85em', color: '#666', marginLeft: 'auto' }}>
                  {job.startDate ? formatDate(job.startDate) : ''} – {job.current ? 'Present' : (job.endDate ? formatDate(job.endDate) : '')}
                </span>
              </div>
              <p style={{ margin: '2px 0 6px 0', fontWeight: 500, color: 'var(--resume-accent-color)' }}>{job.company}</p>
              {job.description && <p style={{ margin: '0 0 6px 0', lineHeight: 1.5 }}>{renderTextWithLinks(job.description)}</p>}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: 1.5 }}>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{renderTextWithLinks(resp)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderEducation = () => {
    if (education.length === 0) return null
    return (
      <div className="custom-template__section" style={{ marginBottom: '20px' }}>
        {renderSectionHeader('Education')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {education.map((edu, index) => (
            <div key={edu._id || index} className="custom-template__item">
              <div style={{ display: 'flex', justifyContent: 'span-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ margin: 0, fontSize: '1.05em', fontWeight: 600, color: styles.sectionTitleColor || '#171717' }}>
                  {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                </h4>
                <span style={{ fontSize: '0.85em', color: '#666', marginLeft: 'auto' }}>
                  {edu.startDate ? formatDate(edu.startDate) : ''} – {edu.current ? 'Present' : (edu.endDate ? formatDate(edu.endDate) : '')}
                </span>
              </div>
              <p style={{ margin: '2px 0 4px 0', fontWeight: 500, color: 'var(--resume-accent-color)' }}>{edu.school}</p>
              {edu.description && <p style={{ margin: 0, lineHeight: 1.5 }}>{renderTextWithLinks(edu.description)}</p>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSkills = () => {
    if (skills.length === 0) return null
    const isSidebar = layout.layoutType !== 'stacked'

    return (
      <div className="custom-template__section" style={{ marginBottom: '20px' }}>
        {renderSectionHeader('Skills')}
        {isSidebar ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map((skill, index) => (
              <span 
                key={index} 
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.05)', 
                  padding: '3px 8px', 
                  borderRadius: '4px',
                  fontSize: '0.85em'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, lineHeight: 1.6, wordBreak: 'break-word' }}>
            {skills.join(' • ')}
          </p>
        )}
      </div>
    )
  }

  const renderCertifications = () => {
    if (certifications.length === 0) return null
    return (
      <div className="custom-template__section" style={{ marginBottom: '20px' }}>
        {renderSectionHeader('Certifications')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {certifications.map((cert, index) => (
            <div key={cert._id || index} className="custom-template__item">
              <div style={{ display: 'flex', justifyContent: 'span-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ margin: 0, fontSize: '1.05em', fontWeight: 600, color: styles.sectionTitleColor || '#171717' }}>{cert.name}</h4>
                {cert.date && (
                  <span style={{ fontSize: '0.85em', color: '#666', marginLeft: 'auto' }}>
                    {formatDate(cert.date)}
                  </span>
                )}
              </div>
              {cert.issuer && <p style={{ margin: '2px 0 4px 0', fontWeight: 500, color: 'var(--resume-accent-color)' }}>{cert.issuer}</p>}
              {cert.description && <p style={{ margin: 0, lineHeight: 1.5 }}>{renderTextWithLinks(cert.description)}</p>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSectionByKey = (key) => {
    switch (key) {
      case 'generalInfo': return renderGeneralInfo();
      case 'contactInfo': return renderContactInfo();
      case 'summary': return renderSummary();
      case 'experience': return renderExperience();
      case 'education': return renderEducation();
      case 'skills': return renderSkills();
      case 'certifications': return renderCertifications();
      default: return null;
    }
  }

  // Illustrations rendering
  const renderIllustration = () => {
    const color = illustrations.color || styles.accentColor || '#6366f1'
    switch (illustrations.type) {
      case 'top-banner':
        return (
          <div 
            style={{ 
              height: '12px', 
              background: `linear-gradient(90deg, ${color}, rgba(255, 255, 255, 0))`, 
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }} 
          />
        )
      case 'left-border':
        return (
          <div 
            style={{ 
              width: '6px', 
              backgroundColor: color,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0
            }} 
          />
        )
      case 'geometric-header':
        return (
          <svg 
            style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', pointerEvents: 'none' }}
            viewBox="0 0 100 100"
          >
            <polygon points="0,0 100,0 100,100" fill={color} opacity="0.1" />
            <polygon points="50,0 100,0 100,50" fill={color} opacity="0.15" />
          </svg>
        )
      case 'custom-svg':
        if (!illustrations.customSvgCode) return null
        return (
          <div 
            style={{ position: 'absolute', top: '10px', right: '10px', pointerEvents: 'none' }}
            dangerouslySetInnerHTML={{ __html: illustrations.customSvgCode }}
          />
        )
      default:
        return null
    }
  }

  // Build structure based on layoutType
  const isSidebarLayout = layout.layoutType === 'sidebar-left' || layout.layoutType === 'sidebar-right'

  return (
    <div 
      className={`resume-template custom-template ${getSpacingClass()}`}
      style={{
        ...fontStyle,
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        minHeight: '297mm', // Approximate A4 length
        padding: styles.spacing === 'compact' ? '24px 30px' : (styles.spacing === 'loose' ? '45px 55px' : '35px 45px'),
      }}
    >
      {renderIllustration()}

      {isSidebarLayout ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header block is always printed at the top spanning full width */}
          {renderGeneralInfo()}
          
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: layout.layoutType === 'sidebar-left' ? 'row' : 'row-reverse',
              gap: '30px',
              marginTop: '10px'
            }}
          >
            {/* Sidebar Column */}
            <aside 
              style={{ 
                width: '32%', 
                flexShrink: 0, 
                borderRight: layout.layoutType === 'sidebar-left' ? '1px solid #eee' : 'none',
                borderLeft: layout.layoutType === 'sidebar-right' ? '1px solid #eee' : 'none',
                paddingRight: layout.layoutType === 'sidebar-left' ? '20px' : '0',
                paddingLeft: layout.layoutType === 'sidebar-right' ? '20px' : '0',
              }}
            >
              {layout.sidebarSections && layout.sidebarSections.map(secKey => (
                // generalInfo is already drawn at the top
                secKey !== 'generalInfo' && (
                  <div key={secKey}>
                    {renderSectionByKey(secKey)}
                  </div>
                )
              ))}
            </aside>

            {/* Main Content Column */}
            <main style={{ flexGrow: 1, width: '65%' }}>
              {layout.mainSections && layout.mainSections.map(secKey => (
                // generalInfo is already drawn at the top
                secKey !== 'generalInfo' && (
                  <div key={secKey}>
                    {renderSectionByKey(secKey)}
                  </div>
                )
              ))}
            </main>
          </div>
        </div>
      ) : (
        // Stacked Layout
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {layout.sections && layout.sections.map(secKey => (
            <div key={secKey}>
              {renderSectionByKey(secKey)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomTemplateRenderer
