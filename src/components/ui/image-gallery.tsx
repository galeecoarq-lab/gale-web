import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageGalleryProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: GalleryItem[];
  className?: string;
}

export default function ImageGallery({
  eyebrow,
  title,
  description,
  items,
  className,
}: ImageGalleryProps) {
  const [preview, setPreview] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [preview]);

  return (
    <section
      className={cn(
        "w-full flex flex-col items-center justify-start",
        className,
      )}
    >
      <div className="max-w-3xl text-center px-4">
        {eyebrow ? (
          <span className="eyebrow text-[var(--color-niebla)]">{eyebrow}</span>
        ) : null}
        <h2 className="display-xl text-balance mt-4">{title}</h2>
        {description ? (
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--color-niebla)]">
            {description}
          </p>
        ) : null}
      </div>

      <div className="hidden md:flex items-center gap-2 h-[400px] w-full max-w-6xl mt-12 px-4">
        {items.map((item, idx) => (
          <div
            key={`${item.src}-${idx}`}
            className="relative group flex-grow transition-all w-56 rounded-sm overflow-hidden h-[400px] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:w-full"
          >
            <img
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-negro)]/60 via-[var(--color-negro)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              aria-hidden="true"
            />
            {item.caption ? (
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <p className="text-[var(--color-cultivado)] text-lg md:text-xl font-medium tracking-wide opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap">
                  {item.caption}
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="md:hidden flex gap-2 w-full mt-10 px-4">
        <div className="flex-1 flex flex-col gap-2">
          {items.filter((_, i) => i % 2 === 0).map((item, idx) => (
            <button
              type="button"
              key={`mobile-a-${item.src}-${idx}`}
              onClick={() => setPreview(item)}
              className="relative aspect-[4/5] rounded-sm overflow-hidden block w-full text-left cursor-zoom-in"
              aria-label={`Ver ${item.alt} a pantalla completa`}
            >
              <img
                className="h-full w-full object-cover object-center"
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              {item.caption ? (
                <>
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-negro)]/80 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <p className="absolute bottom-0 left-0 right-0 px-3 pb-2 text-[var(--color-cultivado)] text-xs font-medium tracking-wide pointer-events-none">
                    {item.caption}
                  </p>
                </>
              ) : null}
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2 mt-12">
          {items.filter((_, i) => i % 2 === 1).map((item, idx) => (
            <button
              type="button"
              key={`mobile-b-${item.src}-${idx}`}
              onClick={() => setPreview(item)}
              className="relative aspect-[4/5] rounded-sm overflow-hidden block w-full text-left cursor-zoom-in"
              aria-label={`Ver ${item.alt} a pantalla completa`}
            >
              <img
                className="h-full w-full object-cover object-center"
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              {item.caption ? (
                <>
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-negro)]/80 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <p className="absolute bottom-0 left-0 right-0 px-3 pb-2 text-[var(--color-cultivado)] text-xs font-medium tracking-wide pointer-events-none">
                    {item.caption}
                  </p>
                </>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {preview ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={preview.alt}
          onClick={() => setPreview(null)}
          className="md:hidden fixed inset-0 z-50 bg-[var(--color-negro)]/95 flex items-center justify-center animate-[fade-in_200ms_ease-out] cursor-zoom-out"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
            }}
            aria-label="Cerrar vista previa"
            className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-[var(--color-cultivado)]/10 backdrop-blur-sm text-[var(--color-cultivado)] flex items-center justify-center text-xl leading-none"
          >
            ×
          </button>
          <img
            src={preview.src}
            alt={preview.alt}
            className="max-h-[90vh] max-w-[95vw] object-contain"
          />
          {preview.caption ? (
            <p className="absolute bottom-6 left-0 right-0 text-center text-[var(--color-cultivado)] text-sm font-medium tracking-wide px-6">
              {preview.caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
