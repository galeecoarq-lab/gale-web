"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";

interface MosaicItem {
    image: string;
    label: string;
}

interface Props {
    items: MosaicItem[];
    heroImage: string;
    /** Reveal copy that sits behind the contracting hero image. */
    statementLine1?: string;
    statementLine2?: string;
}

const SECTION_HEIGHT = 2500;

export default function ImageMosaicParallax({
    items,
    heroImage,
    statementLine1,
    statementLine2,
}: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={sectionRef}
            style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
            className="relative w-full bg-[var(--color-cultivado)]"
        >
            <CenterImage
                image={heroImage}
                sectionRef={sectionRef}
                statementLine1={statementLine1}
                statementLine2={statementLine2}
            />
            <ParallaxImages items={items} />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-[var(--color-cultivado)]"
            />
        </section>
    );
}

interface CenterImageProps {
    image: string;
    sectionRef: RefObject<HTMLDivElement | null>;
    statementLine1?: string;
    statementLine2?: string;
}

const CenterImage = ({
    image,
    sectionRef,
    statementLine1,
    statementLine2,
}: CenterImageProps) => {
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const clip1 = useTransform(scrollYProgress, [0, 0.6], [25, 0]);
    const clip2 = useTransform(scrollYProgress, [0, 0.6], [75, 100]);
    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

    const scale = useTransform(scrollYProgress, [0, 0.8], [1.7, 1]);
    const opacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

    const hasStatement = Boolean(statementLine1 || statementLine2);

    return (
        <motion.div
            className="sticky top-0 h-screen w-full overflow-hidden"
            style={{ clipPath, opacity, willChange: "clip-path, opacity" }}
        >
            <motion.div
                className="absolute inset-0"
                style={{
                    scale,
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    willChange: "transform",
                }}
            />
            {hasStatement && (
                <div className="pointer-events-none absolute inset-x-0 bottom-[8vh] flex justify-center px-6">
                    <h2
                        className="max-w-4xl text-center font-semibold leading-[1.05] tracking-tight text-[var(--color-cultivado)]"
                        style={{ fontSize: "clamp(1.5rem, 3vw + 0.5rem, 3rem)" }}
                    >
                        {statementLine1 && <span className="block">{statementLine1}</span>}
                        {statementLine2 && <span className="block">{statementLine2}</span>}
                    </h2>
                </div>
            )}
        </motion.div>
    );
};

const PARALLAX_LAYOUT = [
    { start: -200, end: 200, className: "w-3/5 md:w-1/3" },
    { start: 200, end: -250, className: "mx-auto w-4/5 md:w-2/3" },
    { start: -200, end: 200, className: "ml-auto w-3/5 md:w-1/3" },
    { start: 0, end: -500, className: "ml-8 w-7/12 md:ml-24 md:w-5/12" },
    { start: 200, end: -200, className: "ml-auto w-3/5 md:w-1/3" },
    { start: -150, end: 250, className: "mr-auto w-3/5 md:w-1/3" },
] as const;

const ParallaxImages = ({ items }: { items: MosaicItem[] }) => {
    const tiles = items.slice(0, PARALLAX_LAYOUT.length);
    return (
        <div className="mx-auto max-w-5xl px-4 pt-[200px]">
            {tiles.map((item, i) => {
                const layout = PARALLAX_LAYOUT[i];
                return (
                    <ParallaxImg
                        key={`${item.image}-${i}`}
                        src={item.image}
                        alt={`Proyecto categoría ${item.label}`}
                        label={item.label}
                        start={layout.start}
                        end={layout.end}
                        className={layout.className}
                    />
                );
            })}
        </div>
    );
};

interface ParallaxImgProps {
    className: string;
    alt: string;
    src: string;
    label: string;
    start: number;
    end: number;
}

const ParallaxImg = ({ className, alt, src, label, start, end }: ParallaxImgProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        // Cast: framer-motion's Offset typing rejects template-literal strings even though they're valid at runtime.
        offset: [`${start}px end`, `end ${end * -1}px`] as never,
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.figure
            ref={ref}
            className={`${className} relative mb-12`}
            style={{ transform, opacity }}
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-md object-cover shadow-[0_30px_60px_-30px_rgba(20,27,35,0.35)]"
            />
            <figcaption className="absolute bottom-3 left-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--color-cultivado)] mix-blend-difference">
                {label}
            </figcaption>
        </motion.figure>
    );
};
