import React, { FC } from "react";

interface ButtonProps {
  name: string;
  label: string;
  style?: React.CSSProperties;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Renders a button component with the provided props.
 *
 * @param {ButtonProps} props - The props for the button.
 * @param {string} props.name - The name of the button.
 * @param {string} props.label - The label of the button.
 * @param {React.CSSProperties} [props.style={ width: "100%", height: 60, marginBottom: 30 }] - The style of the button.
 * @param {string} [props.className="btn btn-primary"] - The class name of the button.
 * @param {(e: React.MouseEvent<HTMLButtonElement>) => void} props.onClick - The click event handler.
 * @param {...any} rest - Additional props for the button.
 * @return {JSX.Element} The rendered button.
 */
const Button: FC<ButtonProps> = ({
  name,
  label,
  style = { width: "100%", height: 60, marginBottom: 30 },
  className = "btn btn-primary",
  onClick,
  ...rest
}) => {
  return (
    <button
      name={name}
      onClick={onClick}
      {...rest}
      style={style}
      className={className}
    >
      {label}
    </button>
  );
};

export default Button;
