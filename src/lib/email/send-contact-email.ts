import type { ContactFormData } from "@/lib/contact-form/types";
import {
  assertContactEmailConfig,
  getContactEmailConfig,
} from "./contact-config";

export class ContactEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactEmailError";
  }
}

function buildPlainTextBody(data: ContactFormData): string {
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Company: ${data.company || "—"}`,
    "",
    "Message:",
    data.message,
  ];

  return lines.join("\n");
}

/**
 * Deliver a contact form submission via Resend.
 *
 * TODO: Install Resend when credentials are ready:
 *   npm install resend
 *
 * TODO: Uncomment the Resend send block below after setting:
 *   RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const config = getContactEmailConfig();

  try {
    assertContactEmailConfig(config);
  } catch (error) {
    throw new ContactEmailError(
      error instanceof Error ? error.message : "Email service is not configured."
    );
  }

  // TODO: Replace this stub with the Resend integration below once RESEND_API_KEY is set.
  void buildPlainTextBody(data);

  throw new ContactEmailError(
    "Resend delivery is not enabled yet. Wire sendContactEmail in src/lib/email/send-contact-email.ts."
  );

  /*
  import { Resend } from "resend";

  const resend = new Resend(config.resendApiKey);
  const subject = `Contact form: ${data.name}`;
  const text = buildPlainTextBody(data);

  const { error } = await resend.emails.send({
    from: config.fromEmail,
    to: config.contactEmail,
    replyTo: data.email,
    subject,
    text,
  });

  if (error) {
    throw new ContactEmailError(error.message || "Failed to send contact email.");
  }
  */
}
