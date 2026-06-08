import React from 'react'

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
          {contactInfo.email && <span>{contactInfo.email}</span>}
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.location && <span>{contactInfo.location}</span>}
          {contactInfo.linkedin && <span>{contactInfo.linkedin}</span>}
          {contactInfo.github && <span>{contactInfo.github}</span>}
        </div>
      </header>

      {generalInfo.summary && (
        <section className="resume-template__section">
          <h2 className="resume-template__section-title">Professional Summary</h2>
          <p className="resume-template__text">{generalInfo.summary}</p>
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
              {job.description && <p className="resume-template__text">{job.description}</p>}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <ul className="resume-template__responsibilities">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="resume-template__text">{resp}</li>
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
              {edu.description && <p className="resume-template__text">{edu.description}</p>}
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
