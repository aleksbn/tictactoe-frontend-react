interface IOption {
	_id: string;
	name: string;
}

interface IFormFieldProps {
	name: string;
	label: string;
	error?: string | null;
}

interface IErrorResponse {
	[key: string]: string;
}

interface IFormState {
	data: { [key: string]: any };
	errors: IErrorResponse;
}

interface IErrorComponentProps {
	error: IError;
	onClose: () => void;
}

interface IError {
	errorCode: string;
	message: string;
}

interface IDialogComponentProps {
	title: string;
	message: string;
	onClose: () => void;
}

export type {
	IOption,
	IFormFieldProps,
	IErrorResponse,
	IFormState,
	IErrorComponentProps,
	IDialogComponentProps,
};
