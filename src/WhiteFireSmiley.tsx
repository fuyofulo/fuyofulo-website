import React from 'react'
import smileSrc from './assets/fuyosmile-removebg-preview.png'

const WhiteFireSmiley: React.FC = () => {
  return (
    <div className="smiley-container">
      <svg
        viewBox="0 0 71 58"
        xmlns="http://www.w3.org/2000/svg"
        className="fire-svg"
        role="img"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="up-flame" x="-35%" y="-50%" width="170%" height="230%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.55 0.07"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="7s"
                values="0.55 0.07; 0.55 0.1; 0.55 0.07"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            >
              <animate
                attributeName="scale"
                dur="6s"
                values="6; 8; 6"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
            <feComponentTransfer in="displaced" result="white">
              <feFuncR type="linear" slope="0" intercept="1" />
              <feFuncG type="linear" slope="0" intercept="1" />
              <feFuncB type="linear" slope="0" intercept="1" />
              <feFuncA type="linear" slope="1" intercept="0" />
            </feComponentTransfer>
            <feGaussianBlur in="white" stdDeviation="0.7" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="white" />
            </feMerge>
          </filter>
        </defs>

        <image
          href={smileSrc}
          width="71"
          height="58"
          x="0"
          y="0"
          preserveAspectRatio="xMidYMid meet"
          filter="url(#up-flame)"
          style={{ imageRendering: 'pixelated' }}
        />
      </svg>
    </div>
  )
}

export default WhiteFireSmiley

