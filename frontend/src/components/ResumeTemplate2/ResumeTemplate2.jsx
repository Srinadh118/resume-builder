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
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [], skills = [] } = resume

  return (
    <div className="resume-template resume-template--classic" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <header className="resume-template__header" style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 className="resume-template__name" style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 5px 0', color: '#111' }}>
          {generalInfo.firstName || ''} {generalInfo.lastName || ''}
        </h1>
        <p className="resume-template__title" style={{ fontSize: '1.1rem', fontStyle: 'italic', margin: '0 0 10px 0', color: '#444' }}>
          {generalInfo.title || generalInfo.jobTitle || ''}
        </p>
        <div className="resume-template__contact" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '0.85rem', color: '#555' }}>
          {contactInfo.email && <span>Email: {contactInfo.email}</span>}
          {contactInfo.phone && <span>Phone: {contactInfo.phone}</span>}
          {contactInfo.location && <span>Location: {contactInfo.location}</span>}
          {contactInfo.linkedin && <span>LinkedIn: {contactInfo.linkedin}</span>}
          {contactInfo.github && <span>GitHub: {contactInfo.github}</span>}
        </div>
      </header>

      {generalInfo.summary && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.2rem', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '3px', color: '#222' }}>
            Professional Summary
          </h2>
          <p className="resume-template__text" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#333' }}>
            {generalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.2rem', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '3px', color: '#222' }}>
            Professional Experience
          </h2>
          {experience.map((job, index) => (
            <div key={job._id || index} className="resume-template__item" style={{ marginBottom: '15px' }}>
              <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span style={{ fontSize: '1rem', color: '#111' }}>{job.position}</span>
                <span style={{ fontSize: '0.9rem', color: '#555' }}>
                  {job.startDate ? formatDate(job.startDate) : ''} – {job.current ? 'Present' : (job.endDate ? formatDate(job.endDate) : '')}
                </span>
              </div>
              <p className="resume-template__item-subtitle" style={{ margin: '2px 0 5px 0', fontStyle: 'italic', color: '#444' }}>
                {job.company}
              </p>
              {job.description && <p className="resume-template__text" style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#333' }}>{job.description}</p>}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <ul className="resume-template__responsibilities" style={{ paddingLeft: '20px', marginTop: '5px' }}>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="resume-template__text" style={{ fontSize: '0.9rem', color: '#333', marginBottom: '3px' }}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.2rem', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '3px', color: '#222' }}>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={edu._id || index} className="resume-template__item" style={{ marginBottom: '10px' }}>
              <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span style={{ fontSize: '1rem', color: '#111' }}>{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</span>
                <span style={{ fontSize: '0.9rem', color: '#555' }}>
                  {edu.startDate ? formatDate(edu.startDate) : ''} – {edu.current ? 'Present' : (edu.endDate ? formatDate(edu.endDate) : '')}
                </span>
              </div>
              <p className="resume-template__item-subtitle" style={{ margin: '2px 0 5px 0', fontStyle: 'italic', color: '#444' }}>{edu.school}</p>
              {edu.description && <p className="resume-template__text" style={{ fontSize: '0.9rem', color: '#333' }}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-template__section" style={{ marginBottom: '20px' }}>
          <h2 className="resume-template__section-title" style={{ fontSize: '1.2rem', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '3px', color: '#222' }}>
            Skills & Expertise
          </h2>
          <p className="resume-template__text" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#333' }}>
            {skills.join(' | ')}
          </p>
        </section>
      )}
    </div>
  )
}

export default ResumeTemplate2
