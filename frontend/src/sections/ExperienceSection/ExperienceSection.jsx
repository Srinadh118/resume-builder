import React, { useState } from 'react'

function ExperienceSection({ data = [], onChange }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [tempItem, setTempItem] = useState(null)
  const [responsibilitiesText, setResponsibilitiesText] = useState('')

  const handleAdd = () => {
    const newItem = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [],
      description: ''
    }
    setEditingIndex(data.length)
    setTempItem(newItem)
    setResponsibilitiesText('')
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    const item = data[index]
    const formatInputDate = (d) => {
      if (!d) return ''
      try {
        const dateObj = new Date(d)
        if (isNaN(dateObj.getTime())) return ''
        return dateObj.toISOString().split('T')[0]
      } catch (e) {
        return ''
      }
    }
    setTempItem({
      ...item,
      startDate: formatInputDate(item.startDate),
      endDate: formatInputDate(item.endDate)
    })
    setResponsibilitiesText(item.responsibilities ? item.responsibilities.join('\n') : '')
  }

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
    if (editingIndex === index) {
      setEditingIndex(null)
      setTempItem(null)
      setResponsibilitiesText('')
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  const handleTempChange = (e) => {
    const { name, value, type, checked } = e.target
    setTempItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = () => {
    if (!tempItem.company?.trim() || !tempItem.position?.trim() || !tempItem.startDate) {
      alert('Company, Position, and Start Date are required fields.')
      return
    }

    const updated = [...data]
    const listResps = responsibilitiesText
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean)

    const itemToSave = {
      ...tempItem,
      responsibilities: listResps,
      endDate: tempItem.current ? null : (tempItem.endDate || null)
    }

    updated[editingIndex] = itemToSave
    onChange(updated)
    setEditingIndex(null)
    setTempItem(null)
    setResponsibilitiesText('')
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setTempItem(null)
    setResponsibilitiesText('')
  }

  return (
    <div className="section-form">
      <div className="section-form__header-row">
        <div>
          <h3 className="section-form__title">Work Experience</h3>
          <p className="section-form__description">Detail your work experience, positions, responsibilities, and achievements.</p>
        </div>
        {editingIndex === null && (
          <button type="button" onClick={handleAdd} className="section-form__add-btn">
            + Add Experience
          </button>
        )}
      </div>

      {editingIndex !== null && tempItem && (
        <div className="section-form__card">
          <h4 className="section-form__card-title">
            {editingIndex >= data.length ? 'Add Experience' : 'Edit Experience'}
          </h4>

          <div className="section-form__grid">
            <div className="section-form__group">
              <label className="section-form__label">Company Name *</label>
              <input
                type="text"
                name="company"
                value={tempItem.company}
                onChange={handleTempChange}
                className="section-form__input"
                placeholder="Google"
                required
              />
            </div>
            <div className="section-form__group">
              <label className="section-form__label">Job Position *</label>
              <input
                type="text"
                name="position"
                value={tempItem.position}
                onChange={handleTempChange}
                className="section-form__input"
                placeholder="Senior Software Engineer"
                required
              />
            </div>
          </div>

          <div className="section-form__grid">
            <div className="section-form__group">
              <label className="section-form__label">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={tempItem.startDate}
                onChange={handleTempChange}
                className="section-form__input"
                required
              />
            </div>
            {!tempItem.current && (
              <div className="section-form__group">
                <label className="section-form__label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={tempItem.endDate || ''}
                  onChange={handleTempChange}
                  className="section-form__input"
                />
              </div>
            )}
          </div>

          <div className="section-form__group section-form__group--checkbox">
            <label className="section-form__checkbox-label">
              <input
                type="checkbox"
                name="current"
                checked={tempItem.current}
                onChange={handleTempChange}
                className="section-form__checkbox"
              />
              I currently work here
            </label>
          </div>

          <div className="section-form__group">
            <label className="section-form__label">Job Description</label>
            <textarea
              name="description"
              value={tempItem.description}
              onChange={handleTempChange}
              className="section-form__textarea"
              placeholder="Provide a general overview of your role..."
              rows="3"
            />
          </div>

          <div className="section-form__group">
            <label className="section-form__label">Key Responsibilities & Achievements (One per line)</label>
            <textarea
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              className="section-form__textarea"
              placeholder="Designed and developed high-scale microservices&#10;Led a team of 5 front-end engineers to deliver the product v2&#10;Optimized website performance, increasing conversion by 20%"
              rows="5"
            />
          </div>

          <div className="section-form__card-actions">
            <button type="button" onClick={handleSave} className="section-form__save-btn">
              Save Item
            </button>
            <button type="button" onClick={handleCancel} className="section-form__cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}

      {editingIndex === null && (
        <div className="section-form__list">
          {data.length === 0 ? (
            <p className="section-form__empty-msg">No experience entries added yet.</p>
          ) : (
            data.map((item, index) => (
              <div key={item._id || index} className="section-form__list-item">
                <div className="section-form__list-item-content">
                  <h4 className="section-form__list-item-title">{item.position}</h4>
                  <p className="section-form__list-item-subtitle">{item.company}</p>
                  <p className="section-form__list-item-date">
                    {item.startDate ? new Date(item.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ''} -{' '}
                    {item.current ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ''}
                  </p>
                </div>
                <div className="section-form__list-item-actions">
                  <button type="button" onClick={() => handleEdit(index)} className="section-form__edit-btn-sm">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(index)} className="section-form__delete-btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ExperienceSection
