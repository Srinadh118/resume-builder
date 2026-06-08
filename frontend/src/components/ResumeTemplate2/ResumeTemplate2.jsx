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

function ResumeTemplate2({ resume }) {
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [] } = resume

  return (
    <div className="resume-template resume-template--classic">
      <div className="resume-template__sidebar">
        <div className="resume-template__profile">
          <h1 className="resume-template__name">
            {generalInfo.firstName} {generalInfo.lastName}
          </h1>
          <p className="resume-template__title">{generalInfo.title || generalInfo.jobTitle}</p>
        </div>

        <div className="resume-template__contact-classic">
          {contactInfo.email && <div>{contactInfo.email}</div>}
          {contactInfo.phone && <div>{contactInfo.phone}</div>}
          {contactInfo.location && <div>{contactInfo.location}</div>}
        </div>
      </div>

      <div className="resume-template__main">
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
              <div key={index} className="resume-template__item">
                <div className="resume-template__item-header">
                  <h3 className="resume-template__item-title">{job.position || job.title}</h3>
                  <span className="resume-template__item-date">
                    {job.startDate ? (job.current ? `${formatDate(job.startDate)} - Present` : `${formatDate(job.startDate)} - ${formatDate(job.endDate)}`) : (job.endDate || 'Present')}
                  </span>
                </div>
                <p className="resume-template__item-company">{job.company}</p>
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
                <div className="resume-template__item-header">
                  <h3 className="resume-template__item-title">{edu.degree}</h3>
                  <span className="resume-template__item-date">
                    {edu.graduationYear || (edu.startDate ? (edu.current ? `${formatDate(edu.startDate)} - Present` : `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`) : '')}
                  </span>
                </div>
                <p className="resume-template__item-company">{edu.school || edu.institution}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default ResumeTemplate2
