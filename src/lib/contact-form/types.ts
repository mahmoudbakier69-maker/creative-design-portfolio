export type ContactFormPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  /** Honeypot — must stay empty for legitimate submissions */
  website?: string;
};

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormField = keyof ContactFormData;

export type ContactFormFieldErrors = Partial<Record<ContactFormField, string>>;

export type ContactApiSuccess = { success: true };

export type ContactApiFailure = {
  success: false;
  error: string;
  fieldErrors?: ContactFormFieldErrors;
};

export type ContactApiResponse = ContactApiSuccess | ContactApiFailure;
