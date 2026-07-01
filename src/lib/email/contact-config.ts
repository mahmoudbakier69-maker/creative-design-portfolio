export type ContactEmailConfig = {
  resendApiKey: string | undefined;
  contactEmail: string | undefined;
  fromEmail: string | undefined;
};

/** Read contact email settings from environment variables (server-only). */
export function getContactEmailConfig(): ContactEmailConfig {
  return {
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL,
    fromEmail: process.env.FROM_EMAIL,
  };
}

export function assertContactEmailConfig(
  config: ContactEmailConfig
): asserts config is {
  resendApiKey: string;
  contactEmail: string;
  fromEmail: string;
} {
  if (!config.resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  if (!config.contactEmail) {
    throw new Error("CONTACT_EMAIL is not configured.");
  }
  if (!config.fromEmail) {
    throw new Error("FROM_EMAIL is not configured.");
  }
}
