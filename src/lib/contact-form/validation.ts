import type {
  ContactFormData,
  ContactFormFieldErrors,
  ContactFormPayload,
} from "./types";

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

/** Digits-only length check for optional phone numbers */
const PHONE_PATTERN = /^[\d\s+().-]{7,25}$/;

const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  companyMax: 200,
  messageMin: 10,
  messageMax: 5000,
} as const;

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isHoneypotFilled(payload: ContactFormPayload): boolean {
  return trim(payload.website).length > 0;
}

export function validateContactForm(
  payload: ContactFormPayload
):
  | { ok: true; data: ContactFormData }
  | { ok: false; fieldErrors: ContactFormFieldErrors; error: string } {
  const fieldErrors: ContactFormFieldErrors = {};

  const name = trim(payload.name);
  if (!name) {
    fieldErrors.name = "Name is required.";
  } else if (name.length < LIMITS.nameMin) {
    fieldErrors.name = `Name must be at least ${LIMITS.nameMin} characters.`;
  } else if (name.length > LIMITS.nameMax) {
    fieldErrors.name = `Name must be at most ${LIMITS.nameMax} characters.`;
  }

  const company = trim(payload.company);
  if (company.length > LIMITS.companyMax) {
    fieldErrors.company = `Company must be at most ${LIMITS.companyMax} characters.`;
  }

  const email = trim(payload.email);
  if (!email) {
    fieldErrors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  const phone = trim(payload.phone);
  if (phone) {
    const digitCount = phone.replace(/\D/g, "").length;
    if (!PHONE_PATTERN.test(phone) || digitCount < 7 || digitCount > 15) {
      fieldErrors.phone = "Enter a valid phone number.";
    }
  }

  const message = trim(payload.message);
  if (!message) {
    fieldErrors.message = "Message is required.";
  } else if (message.length < LIMITS.messageMin) {
    fieldErrors.message = `Message must be at least ${LIMITS.messageMin} characters.`;
  } else if (message.length > LIMITS.messageMax) {
    fieldErrors.message = `Message must be at most ${LIMITS.messageMax} characters.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      fieldErrors,
      error: "Please correct the highlighted fields.",
    };
  }

  return {
    ok: true,
    data: {
      name,
      company,
      email,
      phone,
      message,
    },
  };
}

/** Map server validation messages to localized copy on the client */
export function localizeFieldError(
  field: keyof ContactFormFieldErrors,
  message: string,
  t: (it: string, en: string) => string
): string {
  const map: Record<string, () => string> = {
    "Name is required.": () => t("Il nome è obbligatorio.", "Name is required."),
    "Email is required.": () => t("L'email è obbligatoria.", "Email is required."),
    "Enter a valid email address.": () =>
      t("Inserisci un indirizzo email valido.", "Enter a valid email address."),
    "Message is required.": () =>
      t("Il messaggio è obbligatorio.", "Message is required."),
    "Enter a valid phone number.": () =>
      t("Inserisci un numero di telefono valido.", "Enter a valid phone number."),
    "Please correct the highlighted fields.": () =>
      t("Controlla i campi evidenziati.", "Please correct the highlighted fields."),
  };

  if (message.startsWith("Name must be at least")) {
    return t("Il nome è troppo corto.", "Name is too short.");
  }
  if (message.startsWith("Name must be at most")) {
    return t("Il nome è troppo lungo.", "Name is too long.");
  }
  if (message.startsWith("Company must be at most")) {
    return t("Il nome azienda è troppo lungo.", "Company name is too long.");
  }
  if (message.startsWith("Message must be at least")) {
    return t("Il messaggio è troppo breve.", "Message is too short.");
  }
  if (message.startsWith("Message must be at most")) {
    return t("Il messaggio è troppo lungo.", "Message is too long.");
  }

  const localized = map[message];
  if (localized) return localized();

  if (field === "name") return t("Nome non valido.", "Invalid name.");
  if (field === "email") return t("Email non valida.", "Invalid email.");
  if (field === "phone") return t("Telefono non valido.", "Invalid phone.");
  if (field === "message") return t("Messaggio non valido.", "Invalid message.");
  if (field === "company") return t("Azienda non valida.", "Invalid company.");

  return message;
}
