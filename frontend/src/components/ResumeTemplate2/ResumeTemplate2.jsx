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

function ResumeTemplate2({ resume }) {
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [], skills = [] } = resume

  return (
    <div className="resume-template resume-template--classic" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
      {/* Sidebar with Profile & Contact details */}
      <aside className="resume-template__sidebar">
        <div className="resume-template__profile">
          <h1 className="resume-template__name">
            {generalInfo.firstName || ''} {generalInfo.lastName || ''}
          </h1>
          <p className="resume-template__title">
            {generalInfo.title || generalInfo.jobTitle || ''}
          </p>
        </div>

        <div className="resume-template__contact-classic">
          {contactInfo.email && (
            <div>
              <strong>Email:</strong>
              <div>
                <a href={formatContactLink('email', contactInfo.email)} className="resume-link">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          )}
          {contactInfo.phone && (
            <div>
              <strong>Phone:</strong>
              <div>
                <a href={formatContactLink('phone', contactInfo.phone)} className="resume-link">
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          )}
          {contactInfo.location && (
            <div>
              <strong>Location:</strong>
              <div>{contactInfo.location}</div>
            </div>
          )}
          {contactInfo.website && (
            <div>
              <strong>Website:</strong>
              <div>
                <a href={formatContactLink('website', contactInfo.website)} className="resume-link" target="_blank" rel="noopener noreferrer">
                  {contactInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          )}
          {contactInfo.linkedin && (
            <div>
              <strong>LinkedIn:</strong>
              <div style={{ wordBreak: 'break-all' }}>
                <a href={formatContactLink('linkedin', contactInfo.linkedin)} className="resume-link" target="_blank" rel="noopener noreferrer">
                  {contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </a>
              </div>
            </div>
          )}
          {contactInfo.github && (
            <div>
              <strong>GitHub:</strong>
              <div style={{ wordBreak: 'break-all' }}>
                <a href={formatContactLink('github', contactInfo.github)} className="resume-link" target="_blank" rel="noopener noreferrer">
                  {contactInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                </a>
              </div>
            </div>
          )}
          {contactInfo.twitter && (
            <div>
              <strong>Twitter:</strong>
              <div style={{ wordBreak: 'break-all' }}>
                <a href={formatContactLink('twitter', contactInfo.twitter)} className="resume-link" target="_blank" rel="noopener noreferrer">
                  @{contactInfo.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '')}
                </a>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content body */}
      <main className="resume-template__main">
        {generalInfo.summary && (
          <section className="resume-template__section">
            <h2 className="resume-template__section-title">
              Professional Summary
            </h2>
            <p className="resume-template__text">
              {renderTextWithLinks(generalInfo.summary)}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="resume-template__section">
            <h2 className="resume-template__section-title">
              Professional Experience
            </h2>
            {experience.map((job, index) => (
              <div key={job._id || index} className="resume-template__item">
                <div className="resume-template__item-header">
                  <span className="resume-template__item-title">{job.position}</span>
                  <span className="resume-template__item-date">
                    {job.startDate ? formatDate(job.startDate) : ''} – {job.current ? 'Present' : (job.endDate ? formatDate(job.endDate) : '')}
                  </span>
                </div>
                <p className="resume-template__item-subtitle">
                  {job.company}
                </p>
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
            <h2 className="resume-template__section-title">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu._id || index} className="resume-template__item">
                <div className="resume-template__item-header">
                  <span className="resume-template__item-title">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</span>
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
            <h2 className="resume-template__section-title">
              Skills & Expertise
            </h2>
            <p className="resume-template__text">
              {skills.join(' | ')}
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

export default ResumeTemplate2


