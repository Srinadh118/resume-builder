import React, { useState } from 'react'

function SkillsSection({ data = [], onChange }) {
  const [skillInput, setSkillInput] = useState('')

  const handleAddSkill = (e) => {
    e.preventDefault()
    const trimmed = skillInput.trim()
    if (!trimmed) return

    if (data.includes(trimmed)) {
      alert('This skill has already been added.')
      return
    }

    const updated = [...data, trimmed]
    onChange(updated)
    setSkillInput('')
  }

  const handleRemoveSkill = (skillToRemove) => {
    const updated = data.filter(s => s !== skillToRemove)
    onChange(updated)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill(e)
    }
  }

  return (
    <div className="section-form">
      <h3 className="section-form__title">Skills & Expertise</h3>
      <p className="section-form__description">
        Add relevant industry skills, technologies, frameworks, or competencies. They will help improve your resume ATS score.
      </p>

      <form onSubmit={handleAddSkill} className="section-form__add-skill-form" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React, Node.js, Project Management"
          className="section-form__input"
          style={{ flexGrow: 1 }}
        />
        <button 
          type="submit" 
          className="section-form__add-btn" 
          style={{ 
            marginTop: 0, 
            height: '40px',
            backgroundColor: 'var(--accent, #6366f1)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '0 16px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Add Skill
        </button>
      </form>

      <div className="skills-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
        {data.length === 0 ? (
          <p className="section-form__empty-msg" style={{ width: '100%' }}>No skills added yet.</p>
        ) : (
          data.map((skill, index) => (
            <span 
              key={index} 
              className="skill-tag"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--bg-element, #f1f5f9)',
                color: 'var(--text-primary, #1e293b)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '500',
                border: '1px solid var(--border-light, #e2e8f0)'
              }}
            >
              {skill}
              <button 
                type="button" 
                onClick={() => handleRemoveSkill(skill)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary, #64748b)',
                  marginLeft: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 2px'
                }}
                title={`Remove ${skill}`}
              >
                &times;
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  )
}

export default SkillsSection
