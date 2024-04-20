import React, { useState, useEffect } from "react";
import "../../style/containerStyle.css";
import Button from "./button";
import "../../style/errorComponentStyle.css";
import { IErrorComponentProps } from "../../models/common";

const ErrorComponent: React.FC<IErrorComponentProps> = ({ error, onClose }) => {
	const [errorState, setErrorState] = useState({
		errorCode: "",
		message: "",
	});

	useEffect(() => {
		setErrorState(error);
	}, [error]);

	return (
		<>
			<div className="backdrop" onClick={onClose}></div>
			<div className="containerStyle">
				<h1>There was an error!</h1>
				<p className="errorCode">
					Status code: <span>{errorState.errorCode}</span>
				</p>
				<p className="message">
					<span>{errorState.message}</span>
				</p>
				<Button
					style={{
						backgroundColor: "red",
						width: "100%",
						padding: "25px",
						borderRadius: "15px",
						fontSize: "1.4rem",
					}}
					name="errorBtn"
					label="Close"
					onClick={onClose}
				/>
			</div>
		</>
	);
};

export default ErrorComponent;
