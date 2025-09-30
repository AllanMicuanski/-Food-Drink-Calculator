// src/components/Button.jsx
import React, { memo } from 'react';

const Button = memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  type = 'button',
  className = '',
  ...rest 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const disabledClass = disabled ? 'btn-disabled' : '';
  const fullClassName = `${baseClass} ${variantClass} ${disabledClass} ${className}`.trim();

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={fullClassName}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
export default Button;
