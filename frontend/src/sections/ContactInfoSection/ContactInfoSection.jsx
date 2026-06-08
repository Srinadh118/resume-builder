import React from 'react'

function ContactInfoSection({ data = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({
      ...data,
      [name]: value
    })
  }

  return (
    <div className="section-form">
      <h3 className="section-form__title">Contact Information</h3>
      <p className="section-form__description">How can recruiters reach you? Provide your email, phone, location, and social links.</p>
      
      <div className="section-form__grid">
        <div className="section-form__group">
          <label className="section-form__label">Email Address</label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="section-form__group">
          <label className="section-form__label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={data.phone || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="section-form__grid">
        <div className="section-form__group">
          <label className="section-form__label">Location</label>
          <input
            type="text"
            name="location"
            value={data.location || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="section-form__group">
          <label className="section-form__label">Personal Website</label>
          <input
            type="url"
            name="website"
            value={data.website || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>

      <div className="section-form__grid">
        <div className="section-form__group">
          <label className="section-form__label">LinkedIn Profile</label>
          <input
            type="url"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="section-form__group">
          <label className="section-form__label">GitHub Profile</label>
          <input
            type="url"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            className="section-form__input"
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>

      <div className="section-form__group">
        <label className="section-form__label">Twitter/X Profile</label>
        <input
          type="url"
          name="twitter"
          value={data.twitter || ''}
          onChange={handleChange}
          className="section-form__input"
          placeholder="https://twitter.com/johndoe"
        />
      </div>
    </div>
  )
}

export default ContactInfoSection
