import React, { FC } from "react";

interface ButtonProps {
	name: string;
	label: string;
	style?: React.CSSProperties;
	className?: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

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
