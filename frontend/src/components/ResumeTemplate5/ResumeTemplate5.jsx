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

function ResumeTemplate5({ resume }) {
  const { generalInfo = {}, contactInfo = {}, education = [], experience = [], skills = [] } = resume

  return (
    <div className="resume-template resume-template--creative" style={{ fontFamily: '"Open Sans", sans-serif', color: '#334155', display: 'flex', gap: '30px', padding: '10px 0', lineHeight: '1.6' }}>
      
      {/* LEFT COLUMN - Sidebar */}
      <aside className="resume-template__sidebar" style={{ width: '220px', flexShrink: 0, borderRight: '1px solid #e2e8f0', paddingRight: '20px' }}>
        <div style={{ marginBottom: '25px' }}>
          <h1 className="resume-template__name" style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', lineHeight: '1.2' }}>
            {generalInfo.firstName || ''}<br />{generalInfo.lastName || ''}
          </h1>
          <p className="resume-template__title" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0070f3', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 15px 0' }}>
            {generalInfo.title || generalInfo.jobTitle || ''}
          </p>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', margin: '0 0 10px 0', fontWeight: 'bold' }}>
            Contact Info
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {contactInfo.email && <li style={{ wordBreak: 'break-all' }}><strong>Email:</strong> {contactInfo.email}</li>}
            {contactInfo.phone && <li><strong>Phone:</strong> {contactInfo.phone}</li>}
            {contactInfo.location && <li><strong>Location:</strong> {contactInfo.location}</li>}
            {contactInfo.linkedin && <li style={{ wordBreak: 'break-all' }}><strong>LinkedIn:</strong> {contactInfo.linkedin}</li>}
            {contactInfo.github && <li style={{ wordBreak: 'break-all' }}><strong>GitHub:</strong> {contactInfo.github}</li>}
          </ul>
        </div>

        {skills.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              Expertise
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    fontSize: '0.75rem', 
                    background: '#f1f5f9', 
                    color: '#334155', 
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    border: '1px solid #e2e8f0' 
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
            <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '5px', marginBottom: '10px' }}>
              Professional Summary
            </h2>
            <p className="resume-template__text" style={{ fontSize: '0.85rem', color: '#334155' }}>
              {generalInfo.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="resume-template__section" style={{ marginBottom: '25px' }}>
            <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '5px', marginBottom: '10px' }}>
              Professional History
            </h2>
            {experience.map((job, index) => (
              <div key={job._id || index} className="resume-template__item" style={{ marginBottom: '18px' }}>
                <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 className="resume-template__item-title" style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    {job.position}
                  </h3>
                  <span className="resume-template__item-date" style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                    {job.startDate ? formatDate(job.startDate) : ''} – {job.current ? 'Present' : (job.endDate ? formatDate(job.endDate) : '')}
                  </span>
                </div>
                <p className="resume-template__item-subtitle" style={{ margin: '1px 0 5px 0', fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>
                  {job.company}
                </p>
                {job.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: '#334155', margin: '0 0 5px 0' }}>{job.description}</p>}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <ul className="resume-template__responsibilities" style={{ paddingLeft: '18px', margin: 0 }}>
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="resume-template__text" style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '3px' }}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="resume-template__section" style={{ marginBottom: '25px' }}>
            <h2 className="resume-template__section-title" style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '5px', marginBottom: '10px' }}>
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu._id || index} className="resume-template__item" style={{ marginBottom: '12px' }}>
                <div className="resume-template__item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 className="resume-template__item-title" style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </h3>
                  <span className="resume-template__item-date" style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                    {edu.startDate ? formatDate(edu.startDate) : ''} – {edu.current ? 'Present' : (edu.endDate ? formatDate(edu.endDate) : '')}
                  </span>
                </div>
                <p className="resume-template__item-subtitle" style={{ margin: '1px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{edu.school}</p>
                {edu.description && <p className="resume-template__text" style={{ fontSize: '0.85rem', color: '#334155', marginTop: '5px' }}>{edu.description}</p>}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default ResumeTemplate5
