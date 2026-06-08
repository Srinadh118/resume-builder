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

function ResumeTemplate3({ resume }) {
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [], skills = [], certifications = [], settings = {} } = resume

  return (
    <div 
      className="resume-template resume-template--executive" 
      style={{ 
        fontFamily: 'Merriweather, Georgia, serif', 
        color: '#2d3748', 
        lineHeight: '1.7',
        fontSize: settings.fontSize ? `${settings.fontSize}px` : '12px',
        '--resume-accent-color': settings.accentColor || '#6366f1'
      }}
    >
      <header className="resume-template__header" style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1 className="resume-template__name" style={{ fontSize: '2.25rem', fontWeight: '700', color: '#1a202c', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          {generalInfo.firstName || ''} {generalInfo.lastName || ''}
        </h1>
        <p className="resume-template__title" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--resume-accent-color, #718096)', margin: '0 0 12px 0' }}>
          {generalInfo.title || generalInfo.jobTitle || ''}
        </p>
        <div className="resume-template__contact" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.8rem', color: '#4a5568', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '8px 0' }}>
          {contactInfo.email && (
            <span>
              <a href={formatContactLink('email', contactInfo.email)} className="resume-link">
                {contactInfo.email}
              </a>
            </span>
          )}
          {contactInfo.phone && (
            <span>
              <a href={formatContactLink('phone', contactInfo.phone)} className="resume-link">
                {contactInfo.phone}
              </a>
            </span>
          )}
          {contactInfo.location && <span>{contactInfo.location}</span>}
          {contactInfo.website && (
            <span>
              <a href={formatContactLink('website', contactInfo.website)} className="resume-link" target="_blank" rel="noopener noreferrer">
                {contactInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {contactInfo.linkedin && (
            <span>
              <a href={formatContactLink('linkedin', contactInfo.linkedin)} className="resume-link" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </span>
          )}
          {contactInfo.github && (
            <span>
              <a href={formatContactLink('github', contactInfo.github)} className="resume-link" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </span>
          )}
          {contactInfo.twitter && (
            <span>
              <a href={formatContactLink('twitter', contactInfo.twitter)} className="resume-link" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </span>
          )}
        </div>
      </header>

      {generalInfo.summary && (
        <section className="resume-template__section" style={{ marginBottom: '25px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a202c', borderBottom: '1px solid var(--resume-accent-color, #2d3748)', paddingBottom: '4px', marginBottom: '10px', fontWeight: 'bold' }}>
            Executive Profile
          </h2>
          <p className="resume-template__text" style={{ fontSize: '0.875rem', color: '#2d3748', textAlign: 'justify' }}>
            {renderTextWithLinks(generalInfo.summary)}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '25px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a202c', borderBottom: '1px solid var(--resume-accent-color, #2d3748)', paddingBottom: '4px', marginBottom: '10px', fontWeight: 'bold' }}>
            Professional Achievements
          </h2>
          {experience.map((job, index) => (
            <div key={job._id || index} className="resume-template__item" style={{ marginBottom: '20px' }}>
              <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 className="resume-template__item-title" style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                  {job.position}
                </h3>
                <span className="resume-template__item-date" style={{ fontSize: '0.8rem', color: '#718096' }}>
                  {job.startDate ? formatDate(job.startDate) : ''} – {job.current ? 'Present' : (job.endDate ? formatDate(job.endDate) : '')}
                </span>
              </div>
              <p className="resume-template__item-subtitle" style={{ margin: '2px 0 6px 0', fontSize: '0.85rem', color: '#4a5568', fontWeight: 'bold' }}>
                {job.company}
              </p>
              {job.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: '#2d3748', margin: '0 0 6px 0' }}>{renderTextWithLinks(job.description)}</p>}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <ul className="resume-template__responsibilities" style={{ paddingLeft: '20px', margin: '0' }}>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="resume-template__text" style={{ fontSize: '0.85rem', color: '#2d3748', marginBottom: '4px' }}>{renderTextWithLinks(resp)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '25px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a202c', borderBottom: '1px solid var(--resume-accent-color, #2d3748)', paddingBottom: '4px', marginBottom: '10px', fontWeight: 'bold' }}>
            Academic Credentials
          </h2>
          {education.map((edu, index) => (
            <div key={edu._id || index} className="resume-template__item" style={{ marginBottom: '12px' }}>
              <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 className="resume-template__item-title" style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                  {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                </h3>
                <span className="resume-template__item-date" style={{ fontSize: '0.8rem', color: '#718096' }}>
                  {edu.startDate ? formatDate(edu.startDate) : ''} – {edu.current ? 'Present' : (edu.endDate ? formatDate(edu.endDate) : '')}
                </span>
              </div>
              <p className="resume-template__item-subtitle" style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#4a5568' }}>{edu.school}</p>
              {edu.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: '#2d3748', marginTop: '5px' }}>{renderTextWithLinks(edu.description)}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '25px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a202c', borderBottom: '1px solid var(--resume-accent-color, #2d3748)', paddingBottom: '4px', marginBottom: '10px', fontWeight: 'bold' }}>
            Certifications & Achievements
          </h2>
          {certifications.map((cert, index) => (
            <div key={cert._id || index} className="resume-template__item" style={{ marginBottom: '12px' }}>
              <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 className="resume-template__item-title" style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                  {cert.name}
                </h3>
                {cert.date && (
                  <span className="resume-template__item-date" style={{ fontSize: '0.8rem', color: '#718096' }}>
                    {formatDate(cert.date)}
                  </span>
                )}
              </div>
              {cert.issuer && <p className="resume-template__item-subtitle" style={{ margin: '2px 0 6px 0', fontSize: '0.85rem', color: '#4a5568', fontWeight: 'bold' }}>{cert.issuer}</p>}
              {cert.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: '#2d3748', margin: '0 0 6px 0' }}>{renderTextWithLinks(cert.description)}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '25px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a202c', borderBottom: '1px solid var(--resume-accent-color, #2d3748)', paddingBottom: '4px', marginBottom: '10px', fontWeight: 'bold' }}>
            Core Competencies
          </h2>
          <p className="resume-template__text" style={{ fontSize: '0.85rem', color: '#2d3748', letterSpacing: '0.02em' }}>
            {skills.join(' • ')}
          </p>
        </section>
      )}
    </div>
  )
}

export default ResumeTemplate3
