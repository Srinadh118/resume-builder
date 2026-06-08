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

function ResumeTemplate5({ resume }) {
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [], skills = [], certifications = [], settings = {} } = resume

  return (
    <div 
      className="resume-template resume-template--creative" 
      style={{ 
        fontFamily: '"Open Sans", sans-serif', 
        color: 'var(--text-secondary)', 
        display: 'flex', 
        gap: '30px', 
        padding: '10px 0', 
        lineHeight: '1.6',
        fontSize: settings.fontSize ? `${settings.fontSize}px` : '12px',
        '--resume-accent-color': settings.accentColor || '#0070f3'
      }}
    >
      
      {/* LEFT COLUMN - Sidebar */}
      <aside className="resume-template__sidebar" style={{ width: '220px', flexShrink: 0, borderRight: '1px solid var(--border-light)', paddingRight: '20px' }}>
        <div style={{ marginBottom: '25px' }}>
          <h1 className="resume-template__name" style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 4px 0', lineHeight: '1.2' }}>
            {generalInfo.firstName || ''}<br />{generalInfo.lastName || ''}
          </h1>
          <p className="resume-template__title" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--resume-accent-color, #0070f3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 15px 0' }}>
            {generalInfo.title || generalInfo.jobTitle || ''}
          </p>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', margin: '0 0 10px 0', fontWeight: 'bold' }}>
            Contact Info
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {contactInfo.email && (
              <li style={{ wordBreak: 'break-all' }}>
                <strong>Email:</strong>{' '}
                <a href={formatContactLink('email', contactInfo.email)} className="resume-link">
                  {contactInfo.email}
                </a>
              </li>
            )}
            {contactInfo.phone && (
              <li>
                <strong>Phone:</strong>{' '}
                <a href={formatContactLink('phone', contactInfo.phone)} className="resume-link">
                  {contactInfo.phone}
                </a>
              </li>
            )}
            {contactInfo.location && <li><strong>Location:</strong> {contactInfo.location}</li>}
            {contactInfo.website && (
              <li style={{ wordBreak: 'break-all' }}>
                <strong>Website:</strong>{' '}
                <a href={formatContactLink('website', contactInfo.website)} className="resume-link" target="_blank" rel="noopener noreferrer">
                  {contactInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </li>
            )}
            {contactInfo.linkedin && (
              <li style={{ wordBreak: 'break-all' }}>
                <strong>LinkedIn:</strong>{' '}
                <a href={formatContactLink('linkedin', contactInfo.linkedin)} className="resume-link" target="_blank" rel="noopener noreferrer">
                  {contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </a>
              </li>
            )}
            {contactInfo.github && (
              <li style={{ wordBreak: 'break-all' }}>
                <strong>GitHub:</strong>{' '}
                <a href={formatContactLink('github', contactInfo.github)} className="resume-link" target="_blank" rel="noopener noreferrer">
                  {contactInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                </a>
              </li>
            )}
            {contactInfo.twitter && (
              <li style={{ wordBreak: 'break-all' }}>
                <strong>Twitter:</strong>{' '}
                <a href={formatContactLink('twitter', contactInfo.twitter)} className="resume-link" target="_blank" rel="noopener noreferrer">
                  {contactInfo.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '').startsWith('@')
                    ? contactInfo.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '')
                    : `@${contactInfo.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '')}`}
                </a>
              </li>
            )}
          </ul>
        </div>

        {skills.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              Expertise
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    fontSize: '0.75rem', 
                    background: 'var(--bg-element)', 
                    color: 'var(--text-primary)', 
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    border: '1px solid var(--border-light)' 
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* RIGHT COLUMN - Main Content */}
      <main className="resume-template__main" style={{ flexGrow: 1 }}>
        {generalInfo.summary && (
          <section className="resume-template__section" style={{ marginBottom: '25px' }}>
            <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', borderBottom: '2px solid var(--border-light)', paddingBottom: '5px', marginBottom: '10px' }}>
              Professional Summary
            </h2>
            <p className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {renderTextWithLinks(generalInfo.summary)}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="resume-template__section" style={{ marginBottom: '25px' }}>
            <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', borderBottom: '2px solid var(--border-light)', paddingBottom: '5px', marginBottom: '10px' }}>
              Professional History
            </h2>
            {experience.map((job, index) => (
              <div key={job._id || index} className="resume-template__item" style={{ marginBottom: '18px' }}>
                <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 className="resume-template__item-title" style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                    {job.position}
                  </h3>
                  <span className="resume-template__item-date" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: '500' }}>
                    {job.startDate ? formatDate(job.startDate) : ''} – {job.current ? 'Present' : (job.endDate ? formatDate(job.endDate) : '')}
                  </span>
                </div>
                <p className="resume-template__item-subtitle" style={{ margin: '1px 0 5px 0', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-tertiary)' }}>
                  {job.company}
                </p>
                {job.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 5px 0' }}>{renderTextWithLinks(job.description)}</p>}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <ul className="resume-template__responsibilities" style={{ paddingLeft: '18px', margin: 0 }}>
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '3px' }}>{renderTextWithLinks(resp)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="resume-template__section" style={{ marginBottom: '25px' }}>
            <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', borderBottom: '2px solid var(--border-light)', paddingBottom: '5px', marginBottom: '10px' }}>
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu._id || index} className="resume-template__item" style={{ marginBottom: '12px' }}>
                <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 className="resume-template__item-title" style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </h3>
                  <span className="resume-template__item-date" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: '500' }}>
                    {edu.startDate ? formatDate(edu.startDate) : ''} – {edu.current ? 'Present' : (edu.endDate ? formatDate(edu.endDate) : '')}
                  </span>
                </div>
                <p className="resume-template__item-subtitle" style={{ margin: '1px 0 0 0', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{edu.school}</p>
                {edu.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>{renderTextWithLinks(edu.description)}</p>}
              </div>
            ))}
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section className="resume-template__section" style={{ marginBottom: '25px' }}>
            <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', borderBottom: '2px solid var(--border-light)', paddingBottom: '5px', marginBottom: '10px' }}>
              Certifications & Achievements
            </h2>
            {certifications.map((cert, index) => (
              <div key={cert._id || index} className="resume-template__item" style={{ marginBottom: '12px' }}>
                <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 className="resume-template__item-title" style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                    {cert.name}
                  </h3>
                  <span className="resume-template__item-date" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: '500' }}>
                    {formatDate(cert.date)}
                  </span>
                </div>
                {cert.issuer && <p className="resume-template__item-subtitle" style={{ margin: '1px 0 5px 0', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-tertiary)' }}>{cert.issuer}</p>}
                {cert.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>{renderTextWithLinks(cert.description)}</p>}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default ResumeTemplate5
