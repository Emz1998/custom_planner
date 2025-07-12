import React from 'react';
import { getButtonClasses, defaultButtonProps } from '../config/buttonConfig';

const Button = ({
  children,
  variant = defaultButtonProps.variant,
  size = defaultButtonProps.size,
  shape = defaultButtonProps.shape,
  disabled = defaultButtonProps.disabled,
  type = defaultButtonProps.type,
  className = '',
  onClick,
  ...props
}) => {
  console.log('Button component loaded');
  const buttonClasses = getButtonClasses({
    variant,
    size,
    shape,
    className,
  });

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
