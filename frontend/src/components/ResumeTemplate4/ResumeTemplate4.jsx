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

function ResumeTemplate4({ resume }) {
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [], skills = [], certifications = [], settings = {} } = resume

  return (
    <div 
      className="resume-template resume-template--tech" 
      style={{ 
        fontFamily: 'Roboto, sans-serif', 
        color: 'var(--text-secondary)', 
        lineHeight: '1.5',
        fontSize: settings.fontSize ? `${settings.fontSize}px` : '12px',
        '--resume-accent-color': settings.accentColor || '#0070f3'
      }}
    >
      <header className="resume-template__header" style={{ marginBottom: '20px' }}>
        <h1 className="resume-template__name" style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
          {generalInfo.firstName || ''} {generalInfo.lastName || ''}
        </h1>
        <p className="resume-template__title" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.85rem', fontWeight: '500', color: 'var(--resume-accent-color, #0070f3)', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
          // {generalInfo.title || generalInfo.jobTitle || ''}
        </p>
        <div className="resume-template__contact" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {contactInfo.email && (
            <span>
              email:{' '}
              <a href={formatContactLink('email', contactInfo.email)} className="resume-link">
                {contactInfo.email}
              </a>
            </span>
          )}
          {contactInfo.phone && (
            <span>
              tel:{' '}
              <a href={formatContactLink('phone', contactInfo.phone)} className="resume-link">
                {contactInfo.phone}
              </a>
            </span>
          )}
          {contactInfo.location && <span>loc: {contactInfo.location}</span>}
          {contactInfo.website && (
            <span>
              web:{' '}
              <a href={formatContactLink('website', contactInfo.website)} className="resume-link" target="_blank" rel="noopener noreferrer">
                {contactInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {contactInfo.linkedin && (
            <span>
              ln:{' '}
              <a href={formatContactLink('linkedin', contactInfo.linkedin)} className="resume-link" target="_blank" rel="noopener noreferrer">
                {contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </span>
          )}
          {contactInfo.github && (
            <span>
              git:{' '}
              <a href={formatContactLink('github', contactInfo.github)} className="resume-link" target="_blank" rel="noopener noreferrer">
                {contactInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </span>
          )}
          {contactInfo.twitter && (
            <span>
              tw:{' '}
              <a href={formatContactLink('twitter', contactInfo.twitter)} className="resume-link" target="_blank" rel="noopener noreferrer">
                {contactInfo.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '')}
              </a>
            </span>
          )}
        </div>
      </header>

      {generalInfo.summary && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
            [01] summary
          </h2>
          <p className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {renderTextWithLinks(generalInfo.summary)}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
            [02] experience
          </h2>
          {experience.map((job, index) => (
            <div key={job._id || index} className="resume-template__item" style={{ marginBottom: '15px' }}>
              <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 className="resume-template__item-title" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                  {job.position}
                </h3>
                <span className="resume-template__item-date" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  {job.startDate ? formatDate(job.startDate) : ''} - {job.current ? 'PRESENT' : (job.endDate ? formatDate(job.endDate) : '')}
                </span>
              </div>
              <p className="resume-template__item-subtitle" style={{ fontFamily: '"Roboto Mono", monospace', margin: '2px 0 6px 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                @ {job.company}
              </p>
              {job.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{renderTextWithLinks(job.description)}</p>}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <ul className="resume-template__responsibilities" style={{ paddingLeft: '15px', margin: '4px 0 0 0' }}>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{renderTextWithLinks(resp)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
            [03] education
          </h2>
          {education.map((edu, index) => (
            <div key={edu._id || index} className="resume-template__item" style={{ marginBottom: '10px' }}>
              <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 className="resume-template__item-title" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                  {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                </h3>
                <span className="resume-template__item-date" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  {edu.startDate ? formatDate(edu.startDate) : ''} - {edu.current ? 'PRESENT' : (edu.endDate ? formatDate(edu.endDate) : '')}
                </span>
              </div>
              <p className="resume-template__item-subtitle" style={{ fontFamily: '"Roboto Mono", monospace', margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                @ {edu.school}
              </p>
              {edu.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{renderTextWithLinks(edu.description)}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
            [04] certifications & achievements
          </h2>
          {certifications.map((cert, index) => (
            <div key={cert._id || index} className="resume-template__item" style={{ marginBottom: '15px' }}>
              <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 className="resume-template__item-title" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                  {cert.name}
                </h3>
                {cert.date && (
                  <span className="resume-template__item-date" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {formatDate(cert.date)}
                  </span>
                )}
              </div>
              {cert.issuer && (
                <p className="resume-template__item-subtitle" style={{ fontFamily: '"Roboto Mono", monospace', margin: '2px 0 6px 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  @ {cert.issuer}
                </p>
              )}
              {cert.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{renderTextWithLinks(cert.description)}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px', marginBottom: '8px' }}>
            [05] skills
          </h2>
          <p className="resume-template__text" style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', wordBreak: 'break-word', lineHeight: '1.6' }}>
            {skills.join(', ')}
          </p>
        </section>
      )}
    </div>
  )
}

export default ResumeTemplate4
