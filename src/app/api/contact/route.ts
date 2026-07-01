import { NextResponse } from "next/server";
import type { ContactApiResponse, ContactFormPayload } from "@/lib/contact-form/types";
import { isHoneypotFilled, validateContactForm } from "@/lib/contact-form/validation";
import { ContactEmailError, sendContactEmail } from "@/lib/email/send-contact-email";

export async function POST(request: Request) {
  let payload: ContactFormPayload;

  try {
    payload = (await request.json()) as ContactFormPayload;
  } catch {
    const body: ContactApiResponse = {
      success: false,
      error: "Invalid request body.",
    };
    return NextResponse.json(body, { status: 400 });
  }

  if (isHoneypotFilled(payload)) {
    const body: ContactApiResponse = { success: true };
    return NextResponse.json(body);
  }

  const validation = validateContactForm(payload);
  if (!validation.ok) {
    const body: ContactApiResponse = {
      success: false,
      error: validation.error,
      fieldErrors: validation.fieldErrors,
    };
    return NextResponse.json(body, { status: 400 });
  }

  try {
    await sendContactEmail(validation.data);
    const body: ContactApiResponse = { success: true };
    return NextResponse.json(body);
  } catch (error) {
    const message =
      error instanceof ContactEmailError
        ? error.message
        : "Unable to send your message. Please try again later.";

    console.error("[contact]", error);

    const body: ContactApiResponse = {
      success: false,
      error: message,
    };
    return NextResponse.json(body, { status: 503 });
  }
}
