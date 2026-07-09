import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HOVER_NEUTRAL } from "../lib/ui";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { Disclaimer } from "../components/Disclaimer";
import { PhotoUpload } from "../components/PhotoUpload";
import { INCIDENT_TYPES, MOCK_POLICY } from "../data/mock";
import type { ClaimPhoto, FnolFormData } from "../types";

const STEPS = [
  { id: 1, title: "Incident details", description: "When and what happened" },
  { id: 2, title: "Description", description: "Tell us more about the loss" },
  { id: 3, title: "Contact & submit", description: "Confirm and file your claim" },
];

const initialForm: FnolFormData = {
  incidentDate: "",
  incidentType: "",
  description: "",
  location: "",
  contactPhone: "",
  contactEmail: MOCK_POLICY.email,
};

export function FnolFlowPage() {
  useRequireAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FnolFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [claimNumber, setClaimNumber] = useState("");
  const [photos, setPhotos] = useState<ClaimPhoto[]>([]);
  const [photoError, setPhotoError] = useState("");
  const photosRef = useRef(photos);
  photosRef.current = photos;

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, []);

  function updateField<K extends keyof FnolFormData>(key: K, value: FnolFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext(e: FormEvent) {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setClaimNumber(`CLM-2026-${Math.floor(10000 + Math.random() * 90000)}`);
      setSubmitted(true);
    }
  }

  function canProceed(): boolean {
    if (step === 1) return !!(form.incidentDate && form.incidentType && form.location);
    if (step === 2) return form.description.trim().length >= 20;
    if (step === 3) return !!(form.contactPhone && form.contactEmail);
    return false;
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-surface">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Claim submitted</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Your first notice of loss has been filed. Track progress anytime in ClaimSmart. An adjuster will review within 1–2 business days.
          </p>
          <div className="mt-6 w-full rounded-2xl border border-border bg-surface p-5 text-left shadow-soft">
            <p className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">Claim number</p>
            <p className="mt-1 font-mono text-lg font-semibold text-ink">{claimNumber}</p>
            <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-ink-faint">Policy</p>
            <p className="mt-1 text-sm text-ink-muted">{MOCK_POLICY.policyNumber}</p>
            {photos.length > 0 && (
              <>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-ink-faint">Photos attached</p>
                <p className="mt-1 text-sm text-ink-muted">{photos.length} image{photos.length !== 1 ? "s" : ""} uploaded</p>
              </>
            )}
          </div>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <Link
              to="/assistant"
              className="flex-1 rounded-full bg-ink py-3 text-sm font-medium text-white transition hover:bg-ink-hover"
            >
              Track claim in ClaimSmart
            </Link>
          </div>
        </main>

        <Disclaimer />
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* Tally-style progress bar */}
      <div className="h-1 bg-border">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${(step / STEPS.length) * 100}%` }}
        />
      </div>

      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:px-6">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-1 text-sm text-ink-muted transition hover:text-ink"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back to chat
        </Link>

        <p className="mt-6 text-xs font-medium uppercase tracking-wider text-ink-faint">
          Step {step} of {STEPS.length}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{STEPS[step - 1].title}</h1>
        <p className="mt-1 text-sm text-ink-muted">{STEPS[step - 1].description}</p>

        <form onSubmit={handleNext} className="mt-8 space-y-5">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="incidentDate" className="block text-sm font-medium text-ink">
                  Date of incident
                </label>
                <input
                  id="incidentDate"
                  type="date"
                  required
                  value={form.incidentDate}
                  onChange={(e) => updateField("incidentDate", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="incidentType" className="block text-sm font-medium text-ink">
                  Type of incident
                </label>
                <select
                  id="incidentType"
                  required
                  value={form.incidentType}
                  onChange={(e) => updateField("incidentType", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select type…</option>
                  {INCIDENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-ink">
                  Location of incident
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  placeholder="Address or description of location"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className={inputClass}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-ink">
                  Incident description
                </label>
                <textarea
                  id="description"
                  required
                  rows={5}
                  placeholder="Describe the damage or loss in your own words…"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className={`${inputClass} resize-none`}
                />
                <p className="mt-1 text-xs text-ink-faint">{form.description.length} characters · min 20</p>
              </div>

              <PhotoUpload
                photos={photos}
                onChange={setPhotos}
                error={photoError}
                onError={setPhotoError}
              />
            </>
          )}

          {step === 3 && (
            <>
              <div className="rounded-2xl border border-border bg-surface p-4 text-sm shadow-soft">
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Date</dt>
                    <dd className="font-medium text-ink">{form.incidentDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Type</dt>
                    <dd className="font-medium text-ink">{form.incidentType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Location</dt>
                    <dd className="max-w-[60%] text-right font-medium text-ink">{form.location}</dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-border pt-3 text-ink-muted">{form.description}</p>
                {photos.length > 0 && (
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="text-xs font-medium text-ink-muted">
                      {photos.length} photo{photos.length !== 1 ? "s" : ""} attached
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {photos.map((photo) => (
                        <img
                          key={photo.id}
                          src={photo.previewUrl}
                          alt={`Damage: ${photo.file.name}`}
                          className="h-14 w-14 rounded-lg object-cover ring-1 ring-border"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-ink">
                  Phone number
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  value={form.contactPhone}
                  onChange={(e) => updateField("contactPhone", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-ink">
                  Email address
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  required
                  value={form.contactEmail}
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                  className={inputClass}
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className={`rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink ${HOVER_NEUTRAL}`}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={!canProceed()}
              className="flex-1 rounded-full bg-ink py-2.5 text-sm font-medium text-white transition hover:bg-ink-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 3 ? "Submit claim" : "Continue"}
            </button>
          </div>
        </form>
      </main>

      <Disclaimer />
    </div>
  );
}
