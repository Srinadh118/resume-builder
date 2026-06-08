import React from 'react'
import ResumeTemplate1 from '../ResumeTemplate1/ResumeTemplate1'
import ResumeTemplate2 from '../ResumeTemplate2/ResumeTemplate2'
import ResumeTemplate3 from '../ResumeTemplate3/ResumeTemplate3'
import ResumeTemplate4 from '../ResumeTemplate4/ResumeTemplate4'
import ResumeTemplate5 from '../ResumeTemplate5/ResumeTemplate5'

function ResumePreview({ resume, template = 'modern' }) {
  if (!resume) return null

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
