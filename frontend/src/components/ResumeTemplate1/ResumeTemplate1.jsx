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
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [] } = resume

  return (
    <div className="resume-template resume-template--modern">
      <header className="resume-template__header">
        <h1 className="resume-template__name">
          {generalInfo.firstName} {generalInfo.lastName}
        </h1>
        <p className="resume-template__title">{generalInfo.title || generalInfo.jobTitle}</p>
        <div className="resume-template__contact">
          {contactInfo.email && <span>{contactInfo.email}</span>}
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.location && <span>{contactInfo.location}</span>}
        </div>
      </header>

      {generalInfo.summary && (
        <section className="resume-template__section">
          <h2 className="resume-template__section-title">Summary</h2>
          <p className="resume-template__text">{generalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="resume-template__section">
          <h2 className="resume-template__section-title">Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className="resume-template__item">
              <h3 className="resume-template__item-title">{job.position || job.title}</h3>
              <p className="resume-template__item-subtitle">
                {job.company} | {job.startDate ? (job.current ? `${formatDate(job.startDate)} - Present` : `${formatDate(job.startDate)} - ${formatDate(job.endDate)}`) : (job.endDate || 'Present')}
              </p>
              <p className="resume-template__text">{job.description}</p>
              {job.responsibilities && job.responsibilities.length > 0 && (
                <ul className="resume-template__responsibilities" style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
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
            <div key={index} className="resume-template__item">
              <h3 className="resume-template__item-title">{edu.degree}</h3>
              <p className="resume-template__item-subtitle">
                {edu.school || edu.institution} | {edu.graduationYear || (edu.startDate ? (edu.current ? `${formatDate(edu.startDate)} - Present` : `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`) : '')}
              </p>
              {edu.description && <p className="resume-template__text">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default ResumeTemplate1
