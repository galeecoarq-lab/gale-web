import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

interface Props {
  testimonials: readonly Testimonial[];
  autoplayMs?: number;
}

export default function EditorialTestimonial({ testimonials, autoplayMs }: Props) {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1;
    goTo(newIndex);
  };

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1;
    goTo(newIndex);
  };

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplayMs || !isVisible || testimonials.length < 2) return;
    const id = window.setInterval(() => {
      setIsTransitioning(true);
      window.setTimeout(() => {
        setActive((i) => (i + 1) % testimonials.length);
        window.setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, isVisible, testimonials.length, active]);

  const current = testimonials[active];

  return (
    <div ref={rootRef} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        <span
          className="hidden md:inline-block text-[120px] font-light leading-none select-none transition-all duration-500 text-[var(--color-azul)]"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 md:pt-6">
          <blockquote
            className={`text-xl sm:text-2xl md:text-3xl font-light leading-relaxed tracking-tight text-[var(--color-negro)] transition-all duration-300 ${
              isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            }`}
          >
            “{current.quote}”
          </blockquote>

          <div
            className={`mt-8 md:mt-10 group cursor-default transition-all duration-300 delay-100 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <span
              className="md:hidden block text-6xl font-light leading-none select-none text-[var(--color-azul)] mb-4"
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {String(active + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden ring-2 ring-[color-mix(in_oklab,var(--color-negro)_10%,transparent)] group-hover:ring-[color-mix(in_oklab,var(--color-negro)_30%,transparent)] transition-all duration-300">
                <img
                  src={current.image}
                  alt={current.author}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <p className="font-medium text-[var(--color-negro)]">{current.author}</p>
                <p className="text-sm text-[var(--color-grafito)]">
                  {current.role}
                  <span className="mx-2 text-[color-mix(in_oklab,var(--color-negro)_20%,transparent)]">/</span>
                  <span className="group-hover:text-[var(--color-azul)] transition-colors duration-300">
                    {current.company}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Ver testimonio ${index + 1}`}
                className="group relative py-4"
              >
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? 'w-12 bg-[var(--color-azul)]'
                      : 'w-6 bg-[color-mix(in_oklab,var(--color-negro)_20%,transparent)] group-hover:w-8 group-hover:bg-[color-mix(in_oklab,var(--color-negro)_40%,transparent)]'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs tracking-widest uppercase text-[var(--color-azul)]">
            {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            aria-label="Testimonio anterior"
            className="p-2 rounded-full text-[color-mix(in_oklab,var(--color-negro)_40%,transparent)] hover:text-[var(--color-negro)] hover:bg-[color-mix(in_oklab,var(--color-negro)_5%,transparent)] transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Siguiente testimonio"
            className="p-2 rounded-full text-[color-mix(in_oklab,var(--color-negro)_40%,transparent)] hover:text-[var(--color-negro)] hover:bg-[color-mix(in_oklab,var(--color-negro)_5%,transparent)] transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
