import React, { FC } from 'react';

interface ButtonProps {
  name: string;
  label: string;
  style?: {
    [key: string]: any;
  };
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
  name,
  label,
  style = { width: '100%', height: 60, marginBottom: 30 },
  className = 'btn btn-primary',
  ...rest
}) => {
  return (
    <button name={name} {...rest} style={style} className={className}>
      {label}
    </button>
  );
};

export default Button;
