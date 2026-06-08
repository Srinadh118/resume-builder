import React, { useState } from 'react'

function CertificationsSection({ data = [], onChange }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [tempItem, setTempItem] = useState(null)

  const handleAdd = () => {
    const newItem = {
      name: '',
      issuer: '',
      date: '',
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
      date: formatInputDate(item.date)
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
    const { name, value } = e.target
    setTempItem(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    if (!tempItem.name?.trim()) {
      alert('Certification/Achievement Name is required.')
      return
    }

    const updated = [...data]
    updated[editingIndex] = {
      ...tempItem,
      date: tempItem.date || null
    }
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
          <h3 className="section-form__title">Certifications & Achievements</h3>
          <p className="section-form__description">Add your professional certifications, course completions, awards, or achievements.</p>
        </div>
        {editingIndex === null && (
          <button type="button" onClick={handleAdd} className="section-form__add-btn">
            + Add Certification
          </button>
        )}
      </div>

      {editingIndex !== null && tempItem && (
        <div className="section-form__card">
          <h4 className="section-form__card-title">
            {editingIndex >= data.length ? 'Add Certification/Achievement' : 'Edit Certification/Achievement'}
          </h4>

          <div className="section-form__grid">
            <div className="section-form__group">
              <label className="section-form__label">Name *</label>
              <input
                type="text"
                name="name"
                value={tempItem.name}
                onChange={handleTempChange}
                className="section-form__input"
                placeholder="AWS Certified Solutions Architect"
                required
              />
            </div>
            <div className="section-form__group">
              <label className="section-form__label">Issuing Organization / Authority</label>
              <input
                type="text"
                name="issuer"
                value={tempItem.issuer}
                onChange={handleTempChange}
                className="section-form__input"
                placeholder="Amazon Web Services"
              />
            </div>
          </div>

          <div className="section-form__group">
            <label className="section-form__label">Date Issued</label>
            <input
              type="date"
              name="date"
              value={tempItem.date}
              onChange={handleTempChange}
              className="section-form__input"
            />
          </div>

          <div className="section-form__group">
            <label className="section-form__label">Description</label>
            <textarea
              name="description"
              value={tempItem.description}
              onChange={handleTempChange}
              className="section-form__textarea"
              placeholder="Provide more details about the certification or achievement credentials..."
              rows="3"
            />
            <p className="section-form__input-help" style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #666)', marginTop: '4px' }}>
              Supports markdown links (e.g. <code>[Credential](https://example.com)</code>) and plain URLs.
            </p>
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
            <p className="section-form__empty-msg">No certifications or achievements added yet.</p>
          ) : (
            data.map((item, index) => (
              <div key={item._id || index} className="section-form__list-item">
                <div className="section-form__list-item-content">
                  <h4 className="section-form__list-item-title">{item.name}</h4>
                  <p className="section-form__list-item-subtitle">
                    {item.issuer} {item.date ? `| Issued: ${new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}` : ''}
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

export default CertificationsSection
