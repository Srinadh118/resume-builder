import React from 'react'

function ATSProgress({ score, small = false }) {
  const percentage = Math.min(100, Math.max(0, score))
  let status = 'low'
  if (percentage >= 80) status = 'high'
  else if (percentage >= 50) status = 'medium'

  return (
    <div className={`ats-progress ${small ? 'ats-progress--small' : ''}`}>
      <div className="ats-progress__label">
        <span className="ats-progress__text">ATS Score</span>
        <span className="ats-progress__value">{percentage}%</span>
      </div>
      <div className="ats-progress__bar">
        <div
          className={`ats-progress__fill ats-progress__fill--${status}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ATSProgress
