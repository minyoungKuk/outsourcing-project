import React from 'react';

const Button = ({ size, color, children, ...props }) => {
  let buttonBaseStyled = 'rounded py-3 transition font-bold ';

  if (size === 'small') {
    buttonBaseStyled += 'w-20 ';
  } else if (size === 'medium') {
    buttonBaseStyled += 'w-36 ';
  } else if (size === 'large') {
    buttonBaseStyled += 'w-full ';
  }

  if (color === 'primary') {
    buttonBaseStyled += 'bg-primary text-white hover:bg-primary-hover';
  } else if (color === 'secondary') {
    buttonBaseStyled += 'bg-secondary text-white hover:bg-secondary-hover';
  } else if (color === 'danger') {
    buttonBaseStyled += 'bg-danger text-white hover:bg-danger-hover';
  } else if (color === 'sub') {
    buttonBaseStyled +=
      'bg-sub border border-primary text-primary hover:bg-sub-hover hover:text-white';
  }

  return (
    <button className={buttonBaseStyled} {...props}>
      {children}
    </button>
  );
};

export default Button;
