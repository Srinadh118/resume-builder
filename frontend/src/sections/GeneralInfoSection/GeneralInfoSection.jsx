import React from 'react'

function GeneralInfoSection({ data = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({
      ...data,
      [name]: name === 'age' ? (value ? parseInt(value, 10) : null) : value
    })
  }

  return (
    <div className="section-form">
      <h3 className="section-form__title">General Information</h3>
      <p className="section-form__description">Provide your basic personal details and professional summary.</p>
      
      <div className="section-form__grid">
        <div className="section-form__group">
          <label className="section-form__label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="John"
          />
        </div>
        <div className="section-form__group">
          <label className="section-form__label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="section-form__grid section-form__grid--2-1">
        <div className="section-form__group">
          <label className="section-form__label">Professional Title</label>
          <input
            type="text"
            name="title"
            value={data.title || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="Full Stack Web Developer"
          />
        </div>
        <div className="section-form__group">
          <label className="section-form__label">Age (Optional)</label>
          <input
            type="number"
            name="age"
            value={data.age !== undefined && data.age !== null ? data.age : ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="25"
          />
        </div>
      </div>

      <div className="section-form__group">
        <label className="section-form__label">Professional Summary</label>
        <textarea
          name="summary"
          value={data.summary || ''}
          onChange={handleChange}
          className="section-form__textarea"
          placeholder="Brief summary of your professional background, skills, and key achievements..."
          rows="5"
        />
      </div>
    </div>
  )
}

export default GeneralInfoSection
