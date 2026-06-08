import React from 'react'

const COLOR_PRESETS = [
  { name: 'Classic Black', value: '#171717' },
  { name: 'Vercel Indigo', value: '#6366f1' },
  { name: 'Tech Blue', value: '#0070f3' },
  { name: 'Creative Violet', value: '#7928ca' },
  { name: 'Emerald Green', value: '#10b981' },
  { name: 'Crimson Red', value: '#ef4444' },
  { name: 'Amber Orange', value: '#f5a623' }
]

function SettingsSection({ data = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    onChange({
      ...data,
      [name]: type === 'checkbox' ? checked : (name === 'fontSize' ? parseInt(value, 10) : value)
    })
  }

  const handlePresetSelect = (colorValue) => {
    onChange({
      ...data,
      accentColor: colorValue
    })
  }

  return (
    <div className="section-form">
      <h3 className="section-form__title">Resume Customization</h3>
      <p className="section-form__description">
        Personalize your resume design by adjusting the template theme, text size, and accent highlight colors.
      </p>

      <div className="section-form__group" style={{ marginBottom: '20px' }}>
        <label className="section-form__label">Template Design Theme</label>
        <select
          name="theme"
          value={data.theme || 'modern'}
          onChange={handleChange}
          className="section-form__input"
        >
          <option value="modern">Modern Minimalist</option>
          <option value="classic">Classic Professional</option>
          <option value="executive">Elegant Executive</option>
          <option value="tech">Sleek Tech</option>
          <option value="creative">Creative Stylish</option>
        </select>
      </div>

      <div className="section-form__group" style={{ marginBottom: '20px' }}>
        <label className="section-form__label" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Text Font Size</span>
          <span style={{ fontWeight: 'bold', color: 'var(--accent, #6366f1)' }}>{data.fontSize || 12}px</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '0.8rem', color: '#888' }}>A-</span>
          <input
            type="range"
            name="fontSize"
            min="10"
            max="16"
            step="1"
            value={data.fontSize || 12}
            onChange={handleChange}
            style={{ flexGrow: 1, cursor: 'pointer', height: '6px', accentColor: 'var(--accent, #6366f1)' }}
          />
          <span style={{ fontSize: '1rem', color: '#888' }}>A+</span>
        </div>
      </div>

      <div className="section-form__group" style={{ marginBottom: '20px' }}>
        <label className="section-form__label">Accent Theme Color</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
          <input
            type="color"
            name="accentColor"
            value={data.accentColor || '#6366f1'}
            onChange={handleChange}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '45px',
              height: '45px',
              cursor: 'pointer',
              padding: '2px'
            }}
          />
          <input
            type="text"
            name="accentColor"
            value={data.accentColor || '#6366f1'}
            onChange={handleChange}
            className="section-form__input"
            style={{ flexGrow: 1, textTransform: 'uppercase', fontFamily: 'monospace' }}
            placeholder="#6366F1"
          />
        </div>

        <label className="section-form__label" style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px' }}>Presets</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {COLOR_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePresetSelect(preset.value)}
              style={{
                backgroundColor: preset.value,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: data.accentColor === preset.value ? '2px solid var(--text-primary, #000)' : '1px solid rgba(0,0,0,0.1)',
                cursor: 'pointer',
                boxShadow: data.accentColor === preset.value ? '0 0 4px rgba(0,0,0,0.3)' : 'none',
                transition: 'transform 0.15s ease'
              }}
              title={preset.name}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.15)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsSection
