"use client";

import { useRef } from "react";
import type { ReactNode, RefObject } from "react";
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

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
    // `scrollYProgress` runs 0 → 1 across the pinned panel — drives the
    // image clip/scale animations.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // `entryProgress` runs 0 → 1 BEFORE the panel pins, while the section
    // is travelling up from the bottom of the viewport. Used to drive the
    // heading reveal so the words finish writing before the image starts
    // expanding.
    const { scrollYProgress: entryProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    });

    const clip1 = useTransform(scrollYProgress, [0, 0.6], [25, 0]);
    const clip2 = useTransform(scrollYProgress, [0, 0.6], [75, 100]);
    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

    const scale = useTransform(scrollYProgress, [0, 0.8], [1.7, 1]);
    const opacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

    // Reveal happens during the section's entry phase, so the heading is
    // already fully written by the time the user reaches the pinned panel
    // and the image starts opening.
    const revealProgress = useTransform(entryProgress, [0.3, 0.95], [0, 1]);

    return (
        <motion.div
            className="sticky top-0 h-screen w-full overflow-hidden"
            style={{ opacity, willChange: "opacity" }}
        >
            {/* Heading sits BEHIND the clipped image. As the image polygon
                expands outward from the centre, the image (which paints on
                top via DOM order) progressively covers this title. */}
            <StatementHeading
                line1={statementLine1}
                line2={statementLine2}
                progress={revealProgress}
            />

            {/* Clipped image — `absolute inset-0` so it covers the entire
                sticky panel. The clipPath polygon limits where it actually
                renders; everything outside the polygon is transparent, so
                the heading bleeds through there. */}
            <motion.div
                className="absolute inset-0"
                style={{ clipPath, willChange: "clip-path" }}
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
            </motion.div>
        </motion.div>
    );
};

interface StatementHeadingProps {
    line1?: string;
    line2?: string;
    progress: MotionValue<number>;
}

/**
 * Black-letter heading at the top of the sticky panel. Uses the same
 * word-by-word reveal vocabulary as the hero. Sits beneath the clipped
 * centre image so the image's polygon visually consumes the title as it
 * expands.
 */
const StatementHeading = ({ line1, line2, progress }: StatementHeadingProps) => {
    const hasStatement = Boolean(line1 || line2);
    const line1Words = (line1 ?? "").split(" ").filter(Boolean);
    const line2Words = (line2 ?? "").split(" ").filter(Boolean);
    const totalWords = line1Words.length + line2Words.length;

    if (!hasStatement) return null;

    return (
        <div className="pointer-events-none absolute inset-x-0 top-[10vh] md:top-[3vh] flex justify-center px-6 mt-0">
            <h2
                className="max-w-4xl text-center font-semibold leading-[1.05] tracking-tight text-[var(--color-negro)] text-balance"
                style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 3.5rem)" }}
            >
                {line1 && (
                    <span className="block">
                        {line1Words.map((word, i) => (
                            <RevealWord
                                key={`l1-${i}`}
                                progress={progress}
                                range={[i / totalWords, (i + 1) / totalWords]}
                            >
                                {word}
                            </RevealWord>
                        ))}
                    </span>
                )}
                {line2 && (
                    <span className="block">
                        {line2Words.map((word, i) => {
                            const idx = line1Words.length + i;
                            return (
                                <RevealWord
                                    key={`l2-${i}`}
                                    progress={progress}
                                    range={[idx / totalWords, (idx + 1) / totalWords]}
                                >
                                    {word}
                                </RevealWord>
                            );
                        })}
                    </span>
                )}
            </h2>
        </div>
    );
};

interface RevealWordProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

/**
 * One word of the statement with a low-opacity "ghost" twin underneath so
 * the line's silhouette is hinted at before its words are scrolled into
 * visibility. Matches the smooth-scroll-hero reveal vocabulary.
 */
const RevealWord = ({ children, progress, range }: RevealWordProps) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative mx-1 inline-block lg:mx-2">
            <span className="absolute inset-0 opacity-[0.04]">{children}</span>
            <motion.span style={{ opacity }} className="relative">
                {children}
            </motion.span>
        </span>
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
