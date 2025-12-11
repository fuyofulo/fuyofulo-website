import React from 'react'

type SkillPillProps = {
  label: string
  imageSrc?: string
  iconText?: string
  background?: string
  border?: string
}

const SkillPill: React.FC<SkillPillProps> = ({
  label,
  imageSrc,
  iconText,
  background,
  border,
}) => {
  return (
    <div
      className="skill-pill"
      style={{
        ...(background ? { background } : {}),
        ...(border ? { borderColor: border } : {}),
      }}
    >
      <div className="skill-pill__logo">
        {imageSrc ? (
          <img src={imageSrc} alt="" className="skill-pill__img" />
        ) : (
          <span className="skill-pill__icon">{iconText}</span>
        )}
      </div>
      <div className="skill-pill__text">
        <span className="skill-pill__label">{label}</span>
      </div>
    </div>
  )
}

export default SkillPill

