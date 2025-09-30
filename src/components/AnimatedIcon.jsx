// src/components/AnimatedIcon.jsx
import React from 'react';

const AnimatedIcon = ({ 
  icon, 
  size = 'medium', 
  animation = 'none',
  color = 'inherit',
  className = ''
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'icon-small';
      case 'medium': return 'icon-medium';
      case 'large': return 'icon-large';
      case 'xl': return 'icon-xl';
      default: return 'icon-medium';
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'bounce': return 'icon-bounce';
      case 'pulse': return 'icon-pulse';
      case 'spin': return 'icon-spin';
      case 'shake': return 'icon-shake';
      case 'float': return 'icon-float';
      default: return '';
    }
  };

  return (
    <span 
      className={`animated-icon ${getSizeClass()} ${getAnimationClass()} ${className}`}
      style={{ color }}
      role="img"
      aria-label={`Icon: ${icon}`}
    >
      {icon}
    </span>
  );
};

export default AnimatedIcon;