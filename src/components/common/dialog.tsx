import React, { useEffect, useState } from "react";
import "../../style/containerStyle.css";
import Button from "./button";
import { IDialogComponentProps } from "../../models/common";

const DialogComponent: React.FC<IDialogComponentProps> = ({
	title,
	message,
	onClose,
}) => {
	const [dialogTitle, setDialogTitle] = useState<string>("");
	const [dialogMessage, setDialogMessage] = useState<string>("");

	useEffect(() => {
		setDialogTitle(title);
		setDialogMessage(message);
	}, [title, message]);

	return (
		<React.Fragment>
			<div className="backdrop" onClick={onClose}></div>
			<div className="containerStyle">
				<h1 style={{ textAlign: "center" }}>{dialogTitle}</h1>
				<p className="message">
					<span>{dialogMessage}</span>
				</p>
				<Button
					style={{ width: "100%", padding: "25px" }}
					name="dialogBtn"
					label="Close"
					onClick={onClose}
				/>
			</div>
		</React.Fragment>
	);
};

export default DialogComponent;
