import React from 'react'
import ResumeTemplate1 from '../ResumeTemplate1/ResumeTemplate1'
import ResumeTemplate2 from '../ResumeTemplate2/ResumeTemplate2'

function ResumePreview({ resume, template = 'modern' }) {
  if (!resume) return null

  return (
    <div className="resume-preview">
      {template === 'modern' ? (
        <ResumeTemplate1 resume={resume} />
      ) : (
        <ResumeTemplate2 resume={resume} />
      )}
    </div>
  )
}

export default ResumePreview
