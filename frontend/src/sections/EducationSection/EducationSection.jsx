import React, { useState } from 'react'

function EducationSection({ data = [], onChange }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [tempItem, setTempItem] = useState(null)

  const handleAdd = () => {
    const newItem = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    setEditingIndex(data.length)
    setTempItem(newItem)
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
  }

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
    if (editingIndex === index) {
      setEditingIndex(null)
      setTempItem(null)
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
    if (!tempItem.school?.trim() || !tempItem.degree?.trim() || !tempItem.startDate) {
      alert('School, Degree, and Start Date are required fields.')
      return
    }

    const updated = [...data]
    const itemToSave = {
      ...tempItem,
      endDate: tempItem.current ? null : (tempItem.endDate || null)
    }

    updated[editingIndex] = itemToSave
    onChange(updated)
    setEditingIndex(null)
    setTempItem(null)
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setTempItem(null)
  }

  return (
    <div className="section-form">
      <div className="section-form__header-row">
        <div>
          <h3 className="section-form__title">Education</h3>
          <p className="section-form__description">Add your academic qualifications, degrees, and institutions.</p>
        </div>
        {editingIndex === null && (
          <button type="button" onClick={handleAdd} className="section-form__add-btn">
            + Add Education
          </button>
        )}
      </div>

      {editingIndex !== null && tempItem && (
        <div className="section-form__card">
          <h4 className="section-form__card-title">
            {editingIndex >= data.length ? 'Add Education' : 'Edit Education'}
          </h4>

          <div className="section-form__grid">
            <div className="section-form__group">
              <label className="section-form__label">School / University *</label>
              <input
                type="text"
                name="school"
                value={tempItem.school}
                onChange={handleTempChange}
                className="section-form__input"
                placeholder="Harvard University"
                required
              />
            </div>
            <div className="section-form__group">
              <label className="section-form__label">Degree *</label>
              <input
                type="text"
                name="degree"
                value={tempItem.degree}
                onChange={handleTempChange}
                className="section-form__input"
                placeholder="Bachelor of Science"
                required
              />
            </div>
          </div>

          <div className="section-form__group">
            <label className="section-form__label">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={tempItem.fieldOfStudy}
              onChange={handleTempChange}
              className="section-form__input"
              placeholder="Computer Science"
            />
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
              I am currently studying here
            </label>
          </div>

          <div className="section-form__group">
            <label className="section-form__label">Description</label>
            <textarea
              name="description"
              value={tempItem.description}
              onChange={handleTempChange}
              className="section-form__textarea"
              placeholder="Relevant coursework, honors, or activities..."
              rows="4"
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
            <p className="section-form__empty-msg">No education entries added yet.</p>
          ) : (
            data.map((item, index) => (
              <div key={item._id || index} className="section-form__list-item">
                <div className="section-form__list-item-content">
                  <h4 className="section-form__list-item-title">{item.degree}</h4>
                  <p className="section-form__list-item-subtitle">
                    {item.school} {item.fieldOfStudy ? `in ${item.fieldOfStudy}` : ''}
                  </p>
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

export default EducationSection
