import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt: string;
  /** Project name. */
  title: string;
  /** Secondary line, e.g. "Panadería y restaurante · Jaén". */
  meta?: string;
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
  const [isTouch, setIsTouch] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setIsTouch(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
      className={cn("w-full flex flex-col items-center justify-start", className)}
    >
      <div className="max-w-3xl text-center px-4">
        {eyebrow ? (
          <span className="eyebrow text-[var(--color-azul)]">{eyebrow}</span>
        ) : null}
        <h2 className="display-xl text-balance mt-4">{title}</h2>
        {description ? (
          <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--color-grafito)] text-pretty">
            {description}
          </p>
        ) : null}
      </div>

      {/* Horizontal accordion — md+ only. Expands on hover (pointer) or tap (touch). */}
      <div className="hidden md:flex items-stretch gap-2 h-[440px] w-full max-w-6xl mt-12 px-4">
        {items.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={`h-${idx}`}
              onClick={isTouch ? () => setActiveIdx(isActive ? null : idx) : undefined}
              className={cn(
                "relative group flex-grow transition-all w-56 rounded-md overflow-hidden h-full duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                !isTouch && "hover:w-full",
                isTouch && "cursor-pointer",
                isActive && "w-full"
              )}
            >
              <img
                className={cn(
                  "h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105",
                  isActive && "scale-105"
                )}
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-[var(--color-negro)]/80 via-[var(--color-negro)]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                  isActive && "opacity-100"
                )}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <div
                  className={cn(
                    "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive && "opacity-100 translate-y-0"
                  )}
                >
                  <p
                    className="text-[var(--color-cultivado)] text-xl md:text-2xl font-medium tracking-tight whitespace-nowrap"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </p>
                  {item.meta ? (
                    <p className="mt-1 text-[var(--color-cultivado)]/75 text-xs uppercase tracking-[0.16em] whitespace-nowrap">
                      {item.meta}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vertical accordion — mobile only. Same flex-grow mechanic, rotated 90°.
          flex-basis: 0 means all height comes from flex-grow, so the ratio is
          exact: active item gets 5 shares, each collapsed item gets 1 share. */}
      <div className="flex md:hidden flex-col h-[480px] gap-2 w-full px-4 mt-10">
        {items.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={`v-${idx}`}
              onClick={() => setActiveIdx(isActive ? null : idx)}
              className={cn(
                "relative basis-0 overflow-hidden rounded-md cursor-pointer",
                "transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive ? "[flex-grow:5]" : "[flex-grow:1]"
              )}
            >
              <img
                className={cn(
                  "h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive && "scale-105"
                )}
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-[var(--color-negro)]/80 via-[var(--color-negro)]/15 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
                  isActive && "opacity-100"
                )}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <div
                  className={cn(
                    "opacity-0 translate-y-2 transition-all duration-500 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive && "opacity-100 translate-y-0"
                  )}
                >
                  <p
                    className="text-[var(--color-cultivado)] text-lg font-medium tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </p>
                  {item.meta ? (
                    <p className="mt-0.5 text-[var(--color-cultivado)]/75 text-xs uppercase tracking-[0.14em]">
                      {item.meta}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {preview ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={preview.title}
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-50 bg-[var(--color-negro)]/95 flex items-center justify-center animate-[fade-in_200ms_ease-out] cursor-zoom-out"
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
            className="max-h-[82vh] max-w-[95vw] object-contain"
          />
          <div className="absolute bottom-7 left-0 right-0 text-center px-6">
            <p
              className="text-[var(--color-cultivado)] text-lg font-medium tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {preview.title}
            </p>
            {preview.meta ? (
              <p className="mt-1 text-[var(--color-cultivado)]/75 text-xs uppercase tracking-[0.16em]">
                {preview.meta}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
