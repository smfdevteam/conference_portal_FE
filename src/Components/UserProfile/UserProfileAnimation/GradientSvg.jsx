import React from "react";

const GradientSvg = () => {
  return (
    <svg
    
    id="svg"
    viewBox="0 0 1440 690"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
  >
    <defs>
      <linearGradient id="gradient" x1="100%" y1="50%" x2="0%" y2="50%">
        <stop offset="25%" stopColor="rgba(130,85,241,1)" />
        <stop offset="100%" stopColor="rgba(13,36,134,1)" />
      </linearGradient>
    </defs>
    <path
      d="M 0,700 C 0,700 0,233 0,233 C 105.67857142857142,180.57142857142856 211.35714285714283,128.14285714285714 335,154 C 458.64285714285717,179.85714285714286 600.2500000000001,284 738,282 C 875.7499999999999,280 1009.6428571428571,171.85714285714283 1126,146 C 1242.357142857143,120.14285714285715 1341.1785714285716,176.57142857142858 1440,233 C 1440,233 1440,700 1440,700 Z"
      stroke="none"
      strokeWidth="0"
      fill="url(#gradient)"
      fillOpacity="0.53"
      className="path-0"
      style={{
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
        transitionDelay: '150ms'
      }}
      transform="rotate(-180 720 350)"
    />
    <path
      d="M 0,700 C 0,700 0,466 0,466 C 101.32142857142858,446.3571428571429 202.64285714285717,426.7142857142857 329,444 C 455.35714285714283,461.2857142857143 606.7500000000001,515.5000000000001 748,538 C 889.2499999999999,560.4999999999999 1020.3571428571427,551.2857142857142 1134,534 C 1247.6428571428573,516.7142857142858 1343.8214285714287,491.3571428571429 1440,466 C 1440,466 1440,700 1440,700 Z"
      stroke="none"
      strokeWidth="0"
      fill="url(#gradient)"
      fillOpacity="1"
      className="path-1"
      style={{
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
        transitionDelay: '150ms'
      }}
      transform="rotate(-180 720 350)"
    />
  </svg>
  );
};

export default GradientSvg;
