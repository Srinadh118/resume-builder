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

function ResumeTemplate1({ resume }) {
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [], skills = [] } = resume

  return (
    <div className="resume-template resume-template--modern" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <header className="resume-template__header">
        <h1 className="resume-template__name">
          {generalInfo.firstName || ''} {generalInfo.lastName || ''}
        </h1>
        <p className="resume-template__title">{generalInfo.title || generalInfo.jobTitle || ''}</p>
        <div className="resume-template__contact">
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
        <section className="resume-template__section">
          <h2 className="resume-template__section-title">Professional Summary</h2>
          <p className="resume-template__text">{renderTextWithLinks(generalInfo.summary)}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="resume-template__section">
          <h2 className="resume-template__section-title">Work Experience</h2>
          {experience.map((job, index) => (
            <div key={job._id || index} className="resume-template__item">
              <div className="resume-template__item-header">
                <h3 className="resume-template__item-title">{job.position}</h3>
                <span className="resume-template__item-date">
                  {job.startDate ? formatDate(job.startDate) : ''} – {job.current ? 'Present' : (job.endDate ? formatDate(job.endDate) : '')}
                </span>
              </div>
              <p className="resume-template__item-subtitle">{job.company}</p>
              {job.description && <p className="resume-template__text">{renderTextWithLinks(job.description)}</p>}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <ul className="resume-template__responsibilities">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="resume-template__text">{renderTextWithLinks(resp)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-template__section">
          <h2 className="resume-template__section-title">Education</h2>
          {education.map((edu, index) => (
            <div key={edu._id || index} className="resume-template__item">
              <div className="resume-template__item-header">
                <h3 className="resume-template__item-title">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</h3>
                <span className="resume-template__item-date">
                  {edu.startDate ? formatDate(edu.startDate) : ''} – {edu.current ? 'Present' : (edu.endDate ? formatDate(edu.endDate) : '')}
                </span>
              </div>
              <p className="resume-template__item-subtitle">{edu.school}</p>
              {edu.description && <p className="resume-template__text">{renderTextWithLinks(edu.description)}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-template__section">
          <h2 className="resume-template__section-title">Skills</h2>
          <p className="resume-template__text" style={{ wordBreak: 'break-word', lineHeight: '1.6' }}>
            {skills.join(' • ')}
          </p>
        </section>
      )}
    </div>
  )
}

export default ResumeTemplate1
