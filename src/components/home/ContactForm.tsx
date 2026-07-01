"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/lib/contact";
import type { ContactApiResponse, ContactFormFieldErrors } from "@/lib/contact-form/types";
import { localizeFieldError } from "@/lib/contact-form/validation";

type FormStatus = "idle" | "loading" | "success" | "error";

function firstFieldError(
  fieldErrors: ContactFormFieldErrors | undefined,
  t: (it: string, en: string) => string
): string | null {
  if (!fieldErrors) return null;

  for (const [field, message] of Object.entries(fieldErrors)) {
    if (message) {
      return localizeFieldError(
        field as keyof ContactFormFieldErrors,
        message,
        t
      );
    }
  }

  return null;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const form = event.currentTarget;
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok || !data.success) {
        const fieldError = firstFieldError(
          !data.success ? data.fieldErrors : undefined,
          t
        );

        setStatus("error");
        setErrorMessage(
          fieldError ??
            (!data.success
              ? data.error
              : t(
                  "Impossibile inviare il messaggio. Riprova.",
                  "Unable to send your message. Please try again."
                ))
        );
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        t(
          "Errore di connessione. Controlla la rete e riprova.",
          "Connection error. Check your network and try again."
        )
      );
    }
  };

  const submitLabel = isLoading
    ? t("Invio in corso…", "Sending…")
    : isSuccess
      ? t("Messaggio Inviato", "Message Sent")
      : t("Invia Messaggio", "Send Message");

  return (
    <div className="contact-form__shell">
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <div className="contact-form__honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8">
          <div className="contact-form__field">
            <label htmlFor="contact-name" className="contact-form__label">
              {t("Nome *", "Name *")}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="contact-form__input"
              placeholder={t("Il vostro nome", "Your name")}
              disabled={isLoading}
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-email" className="contact-form__label">
              {t("Email *", "Email *")}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="contact-form__input"
              placeholder="email@company.com"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-8">
          <div className="contact-form__field">
            <label htmlFor="contact-phone" className="contact-form__label">
              {t("Telefono", "Phone")}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              className="contact-form__input"
              placeholder={CONTACT.phoneDisplay}
              disabled={isLoading}
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-company" className="contact-form__label">
              {t("Azienda", "Company")}
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              className="contact-form__input"
              placeholder={t("Nome azienda", "Company name")}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="contact-form__field">
          <label htmlFor="contact-message" className="contact-form__label">
            {t("Messaggio *", "Message *")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className="contact-form__input contact-form__textarea"
            placeholder={t("Raccontateci il vostro progetto…", "Tell us about your project…")}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className={`contact-submit ${isSuccess ? "contact-submit--sent" : ""}`}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          <span className="contact-submit__frame" aria-hidden />
          <span className="contact-submit__inner">
            <span className="contact-submit__text">{submitLabel}</span>
            <span className="contact-submit__track" aria-hidden>
              <span className="contact-submit__fill" />
            </span>
          </span>
        </button>

        <div
          className={`contact-form__feedback${status === "error" ? " contact-form__feedback--error" : ""}${status === "success" ? " contact-form__feedback--success" : ""}`}
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
          aria-atomic="true"
        >
          {status === "error" && errorMessage}
          {status === "success" &&
            t(
              "Grazie — il messaggio è stato consegnato. Vi risponderemo al più presto.",
              "Thank you — your message was delivered. We will reply soon."
            )}
        </div>
      </form>
    </div>
  );
}
