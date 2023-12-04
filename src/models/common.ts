interface Option {
  _id: string;
  name: string;
}

interface FormFieldProps {
  name: string;
  label: string;
  error?: string | null;
}

interface ErrorResponse {
  [key: string]: string;
}

interface FormState {
  data: { [key: string]: any };
  errors: ErrorResponse;
}

export type { Option, FormFieldProps, ErrorResponse, FormState };
