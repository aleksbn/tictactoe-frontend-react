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

export type { Option, FormFieldProps, ErrorResponse };
