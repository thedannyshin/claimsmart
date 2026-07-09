import { useRef } from "react";
import type { ClaimPhoto } from "../types";

const MAX_PHOTOS = 5;
const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/webp"];

interface PhotoUploadProps {
  photos: ClaimPhoto[];
  onChange: (photos: ClaimPhoto[]) => void;
  error?: string;
  onError: (message: string) => void;
}

export function PhotoUpload({ photos, onChange, error, onError }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    onError("");

    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      onError(`You can attach up to ${MAX_PHOTOS} photos.`);
      return;
    }

    const newPhotos: ClaimPhoto[] = [];

    for (const file of Array.from(fileList).slice(0, remaining)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        onError("Please use JPG, PNG, HEIC, or WebP images.");
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        onError(`Each photo must be under ${MAX_SIZE_MB} MB.`);
        continue;
      }
      newPhotos.push({
        id: `${Date.now()}-${file.name}`,
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    if (newPhotos.length > 0) {
      onChange([...photos, ...newPhotos]);
    }
  }

  function removePhoto(id: string) {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.previewUrl);
    onChange(photos.filter((p) => p.id !== id));
    onError("");
  }

  return (
    <div>
      <label className="block text-sm font-medium text-ink">
        Photos of damage{" "}
        <span className="font-normal text-ink-faint">(optional, up to {MAX_PHOTOS})</span>
      </label>
      <p className="mt-1 text-xs text-ink-muted">
        Help your adjuster assess the claim faster. JPG, PNG, HEIC, or WebP · max {MAX_SIZE_MB} MB each.
      </p>

      {photos.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.id} className="overflow-hidden rounded-xl border border-border bg-surface">
              <img
                src={photo.previewUrl}
                alt={`Damage photo: ${photo.file.name}`}
                className="aspect-square w-full object-cover"
              />
              <div className="flex items-center justify-between gap-2 border-t border-border px-2 py-1.5">
                <p className="min-w-0 truncate text-[11px] text-ink-faint">{photo.file.name}</p>
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  className="shrink-0 rounded-md px-2 py-1 text-[10px] font-medium text-ink-muted transition hover:bg-hover-neutral"
                  aria-label={`Remove ${photo.file.name}`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {photos.length < MAX_PHOTOS && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-subtle px-4 py-8 transition hover:border-border-strong hover:bg-hover-neutral"
        >
          <svg className="h-7 w-7 text-ink-faint" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
            />
          </svg>
          <span className="mt-2 text-sm font-medium text-ink">
            {photos.length === 0 ? "Add photos" : "Add more photos"}
          </span>
          <span className="mt-0.5 text-xs text-ink-faint">Tap to browse or take a photo</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        capture="environment"
        multiple
        className="sr-only"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
