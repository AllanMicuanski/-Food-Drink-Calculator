// src/components/AnimatedIcon.jsx
import React, { memo, useMemo } from 'react';

const AnimatedIcon = memo(({ 
  icon, 
  size = 'medium', 
  animation = 'none',
  color = 'inherit',
  className = ''
}) => {
  const sizeClasses = useMemo(() => ({
    small: 'icon-small',
    medium: 'icon-medium',
    large: 'icon-large',
    xl: 'icon-xl'
  }), []);

  const animationClasses = useMemo(() => ({
    bounce: 'icon-bounce',
    pulse: 'icon-pulse',
    spin: 'icon-spin',
    shake: 'icon-shake',
    float: 'icon-float',
    none: ''
  }), []);

  const finalClassName = useMemo(() => {
    const sizeClass = sizeClasses[size] || 'icon-medium';
    const animationClass = animationClasses[animation] || '';
    return `animated-icon ${sizeClass} ${animationClass} ${className}`.trim();
  }, [size, animation, className, sizeClasses, animationClasses]);

  return (
    <span 
      className={finalClassName}
      style={{ color }}
      role="img"
      aria-label={`Icon: ${icon}`}
    >
      {icon}
    </span>
  );
});

export default AnimatedIcon;