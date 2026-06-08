import React, { useEffect } from 'react'
import ResumeTemplate1 from '../ResumeTemplate1/ResumeTemplate1'
import ResumeTemplate2 from '../ResumeTemplate2/ResumeTemplate2'
import ResumeTemplate3 from '../ResumeTemplate3/ResumeTemplate3'
import ResumeTemplate4 from '../ResumeTemplate4/ResumeTemplate4'
import ResumeTemplate5 from '../ResumeTemplate5/ResumeTemplate5'
import CustomTemplateRenderer from '../CustomTemplateRenderer/CustomTemplateRenderer'
import { useCustomTemplates } from '../../hooks/useCustomTemplates'

function ResumePreview({ resume, template = 'modern' }) {
  const { customTemplates, fetchCustomTemplates } = useCustomTemplates()
  
  const cleanTemplateId = template.startsWith('custom_') ? template.replace('custom_', '') : template
  const isCustom = template && (template.startsWith('custom_') || /^[0-9a-fA-F]{24}$/.test(template))

  useEffect(() => {
    if (isCustom && customTemplates.length === 0) {
      fetchCustomTemplates().catch(err => console.error('Failed to load custom templates in preview', err))
    }
  }, [isCustom, fetchCustomTemplates, customTemplates.length])

  if (!resume) return null

  if (isCustom) {
    const customTemplate = customTemplates.find(t => t._id === cleanTemplateId)
    if (customTemplate) {
      return <CustomTemplateRenderer resume={resume} templateConfig={customTemplate} />
    }
    return <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Loading custom template...</div>
  }

  return (
    <div className="resume-preview">
      {(() => {
        switch (template) {
          case 'modern':
            return <ResumeTemplate1 resume={resume} />
          case 'classic':
            return <ResumeTemplate2 resume={resume} />
          case 'executive':
            return <ResumeTemplate3 resume={resume} />
          case 'tech':
            return <ResumeTemplate4 resume={resume} />
          case 'creative':
            return <ResumeTemplate5 resume={resume} />
          default:
            return <ResumeTemplate1 resume={resume} />
        }
      })()}
    </div>
  )
}

export default ResumePreview
