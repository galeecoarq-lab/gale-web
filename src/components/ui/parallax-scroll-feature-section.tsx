"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface ParallaxFeature {
    id: string | number;
    title: string;
    description: string;
    imageUrl: string;
    spriteUrl?: string;
    /**
     * Optional video that replaces the sprite image. The `spriteUrl` PNG is
     * used as the poster so the still frame is visible until the video can play.
     */
    spriteVideoUrl?: string;
    reverse?: boolean;
}

interface Props {
    eyebrow?: string;
    headline?: string;
    intro?: string;
    sections: ParallaxFeature[];
}

const ParallaxScrollFeatureSection = ({
    eyebrow = "Cómo trabajamos",
    headline = "Un proceso claro y a la medida.",
    intro,
    sections,
}: Props) => {
    return (
        <section
            id="proceso"
            className="relative w-full bg-white text-[var(--color-negro)]"
        >
            {/* Top fade: bleeds the cream from the section above into this
                white section so the seam disappears. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-48 z-10 bg-gradient-to-b from-[var(--color-cultivado)] to-transparent"
            />
            <div className="w-full flex flex-col items-center justify-center px-6 pt-24 pb-12 md:pt-32 md:pb-16">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px 0px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-azul)]"
                >
                    {eyebrow}
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px 0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                    className="mt-6 max-w-3xl text-center font-semibold leading-[1.05] tracking-tight text-balance"
                    style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 4.5rem)" }}
                >
                    {headline}
                </motion.h2>
                {intro && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px 0px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                        className="mt-8 max-w-xl text-center text-base lg:text-lg leading-relaxed text-[var(--color-negro)]/70"
                    >
                        {intro}
                    </motion.p>
                )}
            </div>

            <div className="flex flex-col md:px-0 px-6 pb-24">
                {sections.map((section, index) => (
                    <FeatureRow
                        key={section.id}
                        section={section}
                        index={index}
                    />
                ))}
            </div>
            {/* Bottom fade: white section bg → cream so the next section's
                cream bg picks up seamlessly. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-48 z-10 bg-gradient-to-b from-transparent to-[var(--color-cultivado)]"
            />
        </section>
    );
};

interface FeatureRowProps {
    section: ParallaxFeature;
    index: number;
}

const FeatureRow = ({ section, index }: FeatureRowProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref as RefObject<HTMLElement>,
        offset: ["start end", "center start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
    const clipPath = useTransform(
        scrollYProgress,
        [0, 0.7],
        ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
    );
    const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);

    return (
        <div
            ref={ref}
            className={`relative flex flex-col md:flex-row items-center justify-center md:gap-24 gap-10 py-12 md:py-16 ${
                section.reverse ? "md:flex-row-reverse" : ""
            }`}
        >
            <motion.div style={{ y }} className="max-w-sm">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px 0px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-azul)]"
                >
                    {String(index + 1).padStart(2, "0")}
                </motion.div>
                <motion.h3
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px 0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                    className="mt-4 font-semibold leading-[1.05] tracking-tight text-balance"
                    style={{ fontSize: "clamp(2rem, 3vw + 0.5rem, 3.5rem)" }}
                >
                    {section.title}
                </motion.h3>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px 0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                    className="mt-8 after:content-[''] after:block after:clear-both"
                >
                    {section.spriteUrl && (
                        <SpriteMedia
                            spriteUrl={section.spriteUrl}
                            spriteVideoUrl={section.spriteVideoUrl}
                        />
                    )}
                    <p className="text-base leading-relaxed text-[var(--color-negro)]/70">
                        {section.description}
                    </p>
                </motion.div>
            </motion.div>
            <motion.div
                style={{ opacity, clipPath }}
                className="relative"
            >
                <img
                    src={section.imageUrl}
                    className="h-64 w-64 md:h-80 md:w-80 object-cover rounded-md shadow-[0_30px_60px_-30px_rgba(20,27,35,0.35)]"
                    alt={section.title}
                />
            </motion.div>
        </div>
    );
};

interface SpriteMediaProps {
    spriteUrl: string;
    spriteVideoUrl?: string;
}

/**
 * Renders the floated person sprite. When a video URL is provided, plays it
 * silently on loop and uses the still PNG as the poster so the image is
 * visible until the video buffers enough to play.
 */
const SpriteMedia = ({ spriteUrl, spriteVideoUrl }: SpriteMediaProps) => {
    // Always float the sprite to the right of the text block, independent of
    // which side the section's main image is on. Gives every row a consistent
    // reading flow: text starts left, sprite waves in from the right.
    const floatClasses = "float-right ml-4 -mr-4 md:-mr-8 shape-outside-[circle()]";
    // The clips carry a real alpha channel, so they composite straight onto the
    // page — no blend-mode/filter cleanup needed. (The old mix-blend-darken hack
    // was a workaround for an opaque white card; it also silently broke on iOS,
    // where mix-blend-mode on <video> is unreliable.)
    const baseClasses = `w-28 md:w-36 h-auto mt-1 mb-2 ${floatClasses}`;

    if (spriteVideoUrl) {
        // iOS Safari can't render WebM/VP9 alpha — it drops the alpha and shows
        // the opaque base layer as a white rectangle. (HEVC-with-alpha .mov
        // didn't render on iPhone either.) So on iOS we swap the looping video
        // for a transparent still frame extracted from the same clip.
        //
        // The swap is pure CSS (`.sprite-clip` / `.sprite-ios-still` in
        // global.css, gated on the iOS-only `@supports (-webkit-touch-callout)`
        // query) so it applies on first paint — no JS, no hydration flash, no
        // white box ever. Both elements ship; CSS shows exactly one.
        const stillSrc = spriteVideoUrl.replace(/\.webm$/, ".png");
        return (
            <>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className={`${baseClasses} sprite-clip`}
                >
                    <source src={spriteVideoUrl} type="video/webm" />
                </video>
                <img
                    src={stillSrc}
                    loading="lazy"
                    alt=""
                    aria-hidden="true"
                    className={`${baseClasses} sprite-ios-still`}
                />
            </>
        );
    }

    return (
        <img
            src={spriteUrl}
            alt=""
            aria-hidden="true"
            className={baseClasses}
        />
    );
};

export default ParallaxScrollFeatureSection;
