import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCustomTemplates } from '../../hooks/useCustomTemplates'
import CustomTemplateRenderer from '../../components/CustomTemplateRenderer/CustomTemplateRenderer'
import { ArrowLeft, ArrowUp, ArrowDown, MoveLeft, MoveRight, Save, Layout, Sliders, Palette, HeartHandshake } from 'lucide-react'

const DUMMY_RESUME = {
  generalInfo: {
    firstName: 'Alex',
    lastName: 'Morgan',
    title: 'Senior UX Designer & Developer',
    summary: 'Passionate and detail-oriented professional with 6+ years of experience crafting modern web interfaces and scalable systems. Proven expertise in React, CSS architecture, and visual design.'
  },
  contactInfo: {
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.design',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan'
  },
  experience: [
    {
      company: 'DesignFlow Inc.',
      position: 'Lead Interface Engineer',
      startDate: '2022-03-01',
      current: true,
      description: 'Led a design system engineering team of 4. Collaborated with product designers to build accessible UI libraries.',
      responsibilities: [
        'Built dynamic React component library used by 20+ internal products.',
        'Improved load times by 35% through code splitting and tree-shaking.',
        'Mentored junior frontend developers and conducted design-code reviews.'
      ]
    },
    {
      company: 'PixelPerfect Agency',
      position: 'Frontend Developer',
      startDate: '2020-01-01',
      endDate: '2022-02-28',
      current: false,
      description: 'Created highly interactive bespoke marketing websites and single page applications for tech clients.',
      responsibilities: [
        'Delivered 15+ responsive websites using clean HTML, SCSS, and JavaScript.',
        'Wrote robust unit and integration tests using Jest.'
      ]
    }
  ],
  education: [
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Cognitive Science & Human-Computer Interaction',
      startDate: '2016-09-01',
      endDate: '2019-06-01',
      current: false,
      description: 'Focused on UI design, psychology, and software development methodologies.'
    }
  ],
  skills: ['React', 'CSS/SCSS', 'TypeScript', 'UI/UX Design', 'Figma', 'Node.js', 'Web Accessibility (a11y)'],
  certifications: [
    {
      name: 'Google UX Design Professional Certificate',
      issuer: 'Coursera / Google',
      date: '2021-08-01',
      description: 'Completed 7-course curriculum covering user research, wireframing, and high-fidelity prototyping.'
    }
  ]
}

const SECTION_LABELS = {
  generalInfo: 'Header/Name',
  contactInfo: 'Contact Info',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  certifications: 'Certifications'
}

function CustomTemplateBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCustomTemplate, createCustomTemplate, updateCustomTemplate, loading: apiLoading } = useCustomTemplates()
  
  const [activeTab, setActiveTab] = useState('layout')
  const [saving, setSaving] = useState(false)
  const [template, setTemplate] = useState({
    name: 'My Custom Template',
    layout: {
      sections: ['generalInfo', 'contactInfo', 'summary', 'experience', 'education', 'skills', 'certifications'],
      layoutType: 'stacked', // 'stacked', 'sidebar-left', 'sidebar-right'
      sidebarSections: ['contactInfo', 'skills'],
      mainSections: ['generalInfo', 'summary', 'experience', 'education', 'certifications']
    },
    styles: {
      fontFamily: 'Inter',
      fontSizeScale: 'medium', // 'small', 'medium', 'large'
      accentColor: '#6366f1',
      textColor: '#4d4d4d',
      backgroundColor: '#ffffff',
      sectionTitleColor: '#171717',
      spacing: 'comfortable', // 'compact', 'comfortable', 'loose'
      showSeparators: true
    },
    illustrations: {
      type: 'none', // 'none', 'top-banner', 'left-border', 'geometric-header', 'custom-svg'
      customSvgCode: '',
      color: '#6366f1'
    }
  })

  useEffect(() => {
    if (id) {
      getCustomTemplate(id)
        .then(data => {
          // Normalize structure in case properties are missing
          setTemplate({
            name: data.name || 'My Custom Template',
            layout: {
              sections: data.layout?.sections || ['generalInfo', 'contactInfo', 'summary', 'experience', 'education', 'skills', 'certifications'],
              layoutType: data.layout?.layoutType || 'stacked',
              sidebarSections: data.layout?.sidebarSections || ['contactInfo', 'skills'],
              mainSections: data.layout?.mainSections || ['generalInfo', 'summary', 'experience', 'education', 'certifications']
            },
            styles: {
              fontFamily: data.styles?.fontFamily || 'Inter',
              fontSizeScale: data.styles?.fontSizeScale || 'medium',
              accentColor: data.styles?.accentColor || '#6366f1',
              textColor: data.styles?.textColor || '#4d4d4d',
              backgroundColor: data.styles?.backgroundColor || '#ffffff',
              sectionTitleColor: data.styles?.sectionTitleColor || '#171717',
              spacing: data.styles?.spacing || 'comfortable',
              showSeparators: data.styles?.showSeparators !== undefined ? data.styles.showSeparators : true
            },
            illustrations: {
              type: data.illustrations?.type || 'none',
              customSvgCode: data.illustrations?.customSvgCode || '',
              color: data.illustrations?.color || '#6366f1'
            }
          })
        })
        .catch(err => {
          console.error('Failed to load template', err)
          navigate('/settings')
        })
    }
  }, [id, getCustomTemplate, navigate])

  const handleNameChange = (e) => {
    setTemplate(prev => ({ ...prev, name: e.target.value }))
  }

  const handleStyleChange = (name, value) => {
    setTemplate(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        [name]: value
      }
    }))
  }

  const handleIllustrationsChange = (name, value) => {
    setTemplate(prev => ({
      ...prev,
      illustrations: {
        ...prev.illustrations,
        [name]: value
      }
    }))
  }

  const handleLayoutTypeChange = (type) => {
    setTemplate(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        layoutType: type
      }
    }))
  }

  // Move items in list
  const moveItem = (listName, index, direction) => {
    const list = [...template.layout[listName]]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= list.length) return
    
    const temp = list[index]
    list[index] = list[targetIndex]
    list[targetIndex] = temp

    setTemplate(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        [listName]: list
      }
    }))
  }

  // Move item between sidebar and main
  const transferItem = (fromList, toList, index) => {
    const from = [...template.layout[fromList]]
    const to = [...template.layout[toList]]
    const [item] = from.splice(index, 1)
    to.push(item)

    setTemplate(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        [fromList]: from,
        [toList]: to
      }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (id) {
        await updateCustomTemplate(id, template)
      } else {
        await createCustomTemplate(template)
      }
      navigate('/settings')
    } catch (err) {
      console.error('Failed to save template', err)
      alert('Failed to save template. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="template-builder">
      {/* Top Header */}
      <div className="template-builder__header">
        <button className="template-builder__back-btn" onClick={() => navigate('/settings')}>
          <ArrowLeft size={16} />
          Back to Settings
        </button>
        <input 
          type="text" 
          className="template-builder__name-input" 
          value={template.name} 
          onChange={handleNameChange}
          placeholder="Template Name"
        />
        <button className="template-builder__save-btn" onClick={handleSave} disabled={saving || apiLoading}>
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Template'}
        </button>
      </div>

      <div className="template-builder__workspace">
        {/* Left Control Panel */}
        <div className="template-builder__controls">
          <div className="template-builder__tabs">
            <button 
              className={`template-builder__tab ${activeTab === 'layout' ? 'template-builder__tab--active' : ''}`}
              onClick={() => setActiveTab('layout')}
            >
              <Layout size={16} />
              Layout
            </button>
            <button 
              className={`template-builder__tab ${activeTab === 'style' ? 'template-builder__tab--active' : ''}`}
              onClick={() => setActiveTab('style')}
            >
              <Sliders size={16} />
              Styles
            </button>
            <button 
              className={`template-builder__tab ${activeTab === 'illustrations' ? 'template-builder__tab--active' : ''}`}
              onClick={() => setActiveTab('illustrations')}
            >
              <Palette size={16} />
              Illustrations
            </button>
          </div>

          <div className="template-builder__tab-content">
            {/* LAYOUT TAB */}
            {activeTab === 'layout' && (
              <div className="template-builder__group-container">
                <h4 className="template-builder__section-label">1. Column Layout Pattern</h4>
                <div className="template-builder__layout-options">
                  <button 
                    className={`template-builder__layout-opt ${template.layout.layoutType === 'stacked' ? 'template-builder__layout-opt--active' : ''}`}
                    onClick={() => handleLayoutTypeChange('stacked')}
                  >
                    <div className="layout-preview-icon layout-preview-icon--stacked" />
                    Single Stacked
                  </button>
                  <button 
                    className={`template-builder__layout-opt ${template.layout.layoutType === 'sidebar-left' ? 'template-builder__layout-opt--active' : ''}`}
                    onClick={() => handleLayoutTypeChange('sidebar-left')}
                  >
                    <div className="layout-preview-icon layout-preview-icon--sidebar-left" />
                    Sidebar Left
                  </button>
                  <button 
                    className={`template-builder__layout-opt ${template.layout.layoutType === 'sidebar-right' ? 'template-builder__layout-opt--active' : ''}`}
                    onClick={() => handleLayoutTypeChange('sidebar-right')}
                  >
                    <div className="layout-preview-icon layout-preview-icon--sidebar-right" />
                    Sidebar Right
                  </button>
                </div>

                <h4 className="template-builder__section-label" style={{ marginTop: '24px' }}>2. Section Placement & Hierarchy</h4>
                
                {template.layout.layoutType === 'stacked' ? (
                  <div>
                    <p className="template-builder__help-text">Arrange the vertical display order of your resume sections.</p>
                    <div className="template-builder__list">
                      {template.layout.sections.map((section, idx) => (
                        <div key={section} className="template-builder__list-item">
                          <span>{SECTION_LABELS[section] || section}</span>
                          <div className="template-builder__item-controls">
                            <button onClick={() => moveItem('sections', idx, -1)} disabled={idx === 0} title="Move Up">
                              <ArrowUp size={14} />
                            </button>
                            <button onClick={() => moveItem('sections', idx, 1)} disabled={idx === template.layout.sections.length - 1} title="Move Down">
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="template-builder__split-editor">
                    <div>
                      <span className="template-builder__col-title">Sidebar Column</span>
                      <div className="template-builder__list">
                        {template.layout.sidebarSections.map((section, idx) => (
                          <div key={section} className="template-builder__list-item">
                            <span style={{ fontSize: '0.85em' }}>{SECTION_LABELS[section] || section}</span>
                            <div className="template-builder__item-controls">
                              <button onClick={() => moveItem('sidebarSections', idx, -1)} disabled={idx === 0} title="Move Up">
                                <ArrowUp size={12} />
                              </button>
                              <button onClick={() => moveItem('sidebarSections', idx, 1)} disabled={idx === template.layout.sidebarSections.length - 1} title="Move Down">
                                <ArrowDown size={12} />
                              </button>
                              {section !== 'generalInfo' && (
                                <button onClick={() => transferItem('sidebarSections', 'mainSections', idx)} title="Move to Main">
                                  <MoveRight size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                      <span className="template-builder__col-title">Main Content Column</span>
                      <div className="template-builder__list">
                        {template.layout.mainSections.map((section, idx) => (
                          <div key={section} className="template-builder__list-item">
                            <span style={{ fontSize: '0.85em' }}>{SECTION_LABELS[section] || section}</span>
                            <div className="template-builder__item-controls">
                              <button onClick={() => moveItem('mainSections', idx, -1)} disabled={idx === 0} title="Move Up">
                                <ArrowUp size={12} />
                              </button>
                              <button onClick={() => moveItem('mainSections', idx, 1)} disabled={idx === template.layout.mainSections.length - 1} title="Move Down">
                                <ArrowDown size={12} />
                              </button>
                              {section !== 'generalInfo' && (
                                <button onClick={() => transferItem('mainSections', 'sidebarSections', idx)} title="Move to Sidebar">
                                  <MoveLeft size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STYLE TAB */}
            {activeTab === 'style' && (
              <div className="template-builder__group-container">
                <div className="template-builder__form-group">
                  <label className="template-builder__label">Font Typography Family</label>
                  <select 
                    className="template-builder__select"
                    value={template.styles.fontFamily}
                    onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                  >
                    <option value="Inter">Inter (Sans-Serif)</option>
                    <option value="Roboto">Roboto (Clean Sans)</option>
                    <option value="Satoshi">Satoshi (Modern Geometric)</option>
                    <option value="Geist">Geist (Developer Sans)</option>
                    <option value="Georgia">Georgia (Classic Serif)</option>
                    <option value="Lora">Lora (Elegant Editorial)</option>
                    <option value="Playfair Display">Playfair Display (Bold Serif)</option>
                    <option value="Courier New">Courier New (Technical Monospace)</option>
                  </select>
                </div>

                <div className="template-builder__form-group">
                  <label className="template-builder__label">Base Font Size Scale</label>
                  <select 
                    className="template-builder__select"
                    value={template.styles.fontSizeScale}
                    onChange={(e) => handleStyleChange('fontSizeScale', e.target.value)}
                  >
                    <option value="small">Small (11px base)</option>
                    <option value="medium">Medium (13px base)</option>
                    <option value="large">Large (15px base)</option>
                  </select>
                </div>

                <div className="template-builder__form-group">
                  <label className="template-builder__label">Layout Content Spacing</label>
                  <select 
                    className="template-builder__select"
                    value={template.styles.spacing}
                    onChange={(e) => handleStyleChange('spacing', e.target.value)}
                  >
                    <option value="compact">Compact (Tighter gutters)</option>
                    <option value="comfortable">Comfortable (Balanced padding)</option>
                    <option value="loose">Loose (More whitespace)</option>
                  </select>
                </div>

                <div className="template-builder__form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox" 
                    id="showSeparators"
                    checked={template.styles.showSeparators}
                    onChange={(e) => handleStyleChange('showSeparators', e.target.checked)}
                  />
                  <label htmlFor="showSeparators" className="template-builder__label" style={{ margin: 0, cursor: 'pointer' }}>
                    Show separator lines under section titles
                  </label>
                </div>

                <hr style={{ border: 'none', borderBottom: '1px solid #eee', margin: '20px 0' }} />

                <h4 className="template-builder__section-label">Color Swatches</h4>
                
                <div className="template-builder__color-row">
                  <div className="template-builder__color-item">
                    <label className="template-builder__label">Accent Highlight</label>
                    <div className="template-builder__color-input-wrapper">
                      <input 
                        type="color" 
                        value={template.styles.accentColor} 
                        onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                      />
                      <input 
                        type="text" 
                        value={template.styles.accentColor} 
                        onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="template-builder__color-item">
                    <label className="template-builder__label">Section Headings</label>
                    <div className="template-builder__color-input-wrapper">
                      <input 
                        type="color" 
                        value={template.styles.sectionTitleColor} 
                        onChange={(e) => handleStyleChange('sectionTitleColor', e.target.value)}
                      />
                      <input 
                        type="text" 
                        value={template.styles.sectionTitleColor} 
                        onChange={(e) => handleStyleChange('sectionTitleColor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="template-builder__color-row" style={{ marginTop: '12px' }}>
                  <div className="template-builder__color-item">
                    <label className="template-builder__label">Body Text Color</label>
                    <div className="template-builder__color-input-wrapper">
                      <input 
                        type="color" 
                        value={template.styles.textColor} 
                        onChange={(e) => handleStyleChange('textColor', e.target.value)}
                      />
                      <input 
                        type="text" 
                        value={template.styles.textColor} 
                        onChange={(e) => handleStyleChange('textColor', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="template-builder__color-item">
                    <label className="template-builder__label">Canvas Background</label>
                    <div className="template-builder__color-input-wrapper">
                      <input 
                        type="color" 
                        value={template.styles.backgroundColor} 
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      />
                      <input 
                        type="text" 
                        value={template.styles.backgroundColor} 
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ILLUSTRATIONS TAB */}
            {activeTab === 'illustrations' && (
              <div className="template-builder__group-container">
                <p className="template-builder__help-text">Add dynamic decorative illustration accents or frame vector geometry to polish your resume style.</p>

                <div className="template-builder__form-group">
                  <label className="template-builder__label">Illustration Style</label>
                  <select 
                    className="template-builder__select"
                    value={template.illustrations.type}
                    onChange={(e) => handleIllustrationsChange('type', e.target.value)}
                  >
                    <option value="none">None (Plain minimalist)</option>
                    <option value="top-banner">Top Banner Bar (Accent strip)</option>
                    <option value="left-border">Left Edge Border (Sleek divider)</option>
                    <option value="geometric-header">Top Right Corner Polygon Accent</option>
                    <option value="custom-svg">Custom Raw SVG Code</option>
                  </select>
                </div>

                {template.illustrations.type !== 'none' && (
                  <div className="template-builder__form-group">
                    <label className="template-builder__label">Illustration / SVG Color Accent</label>
                    <div className="template-builder__color-input-wrapper">
                      <input 
                        type="color" 
                        value={template.illustrations.color} 
                        onChange={(e) => handleIllustrationsChange('color', e.target.value)}
                      />
                      <input 
                        type="text" 
                        value={template.illustrations.color} 
                        onChange={(e) => handleIllustrationsChange('color', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {template.illustrations.type === 'custom-svg' && (
                  <div className="template-builder__form-group">
                    <label className="template-builder__label">Custom SVG Markup Code</label>
                    <textarea 
                      className="template-builder__textarea" 
                      rows="8"
                      value={template.illustrations.customSvgCode}
                      onChange={(e) => handleIllustrationsChange('customSvgCode', e.target.value)}
                      placeholder='e.g., <svg width="50" height="50"><circle cx="25" cy="25" r="20" fill="#6366F1"/></svg>'
                    />
                    <span style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>
                      Input raw inline HTML/SVG code. Ensure widths/heights and viewbox align properly.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Live Preview Area */}
        <div className="template-builder__preview-pane">
          <div className="template-builder__preview-container">
            <CustomTemplateRenderer resume={DUMMY_RESUME} templateConfig={template} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomTemplateBuilder
