import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt: string;
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
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-negro)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      <div className="md:hidden flex gap-2 w-full mt-10 px-4">
        <div className="flex-1 flex flex-col gap-2">
          {items.filter((_, i) => i % 2 === 0).map((item, idx) => (
            <div
              key={`mobile-a-${item.src}-${idx}`}
              className="relative aspect-[4/5] rounded-sm overflow-hidden"
            >
              <img
                className="h-full w-full object-cover object-center"
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2 mt-12">
          {items.filter((_, i) => i % 2 === 1).map((item, idx) => (
            <div
              key={`mobile-b-${item.src}-${idx}`}
              className="relative aspect-[4/5] rounded-sm overflow-hidden"
            >
              <img
                className="h-full w-full object-cover object-center"
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
