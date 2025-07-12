export const buttonConfig = {
  // Base classes that apply to all buttons
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',

  // Size variants
  sizes: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  },

  // Style variants
  variants: {
    primary:
      'bg-black text-white hover:bg-gray-800 border-2 border-black focus:ring-gray-500',
    secondary:
      'bg-white text-black border-2 border-black hover:bg-black hover:text-white focus:ring-gray-500',
    outline:
      'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white focus:ring-gray-500',
    ghost:
      'bg-transparent text-black hover:bg-gray-100 border-2 border-transparent focus:ring-gray-500',
    danger:
      'bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500',
  },

  // Shape variants
  shapes: {
    square: 'rounded-none',
    rounded: 'rounded-md',
    pill: 'rounded-full',
  },
};

// Default props
export const defaultButtonProps = {
  variant: 'primary',
  size: 'md',
  shape: 'square',
  disabled: false,
  type: 'button',
};

// Helper function to combine classes
export const getButtonClasses = ({ variant, size, shape, className = '' }) => {
  const classes = [
    buttonConfig.base,
    buttonConfig.variants[variant],
    buttonConfig.sizes[size],
    buttonConfig.shapes[shape],
    className,
  ];

  return classes.filter(Boolean).join(' ');
};
