import React from "react"

const Loader = () => (
  <div>
    <svg
      style={{ margin: "auto", display: "block", shapeRendering: "auto" }}
      width="64px"
      height="64px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#0b3d91"
        strokeWidth="8"
        r="24"
        strokeDasharray="113.09733552923255 39.69911184307752"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  </div>
)

export default Loader
