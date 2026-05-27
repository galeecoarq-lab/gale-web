"use client";
import * as React from "react";
import type { ReactNode } from "react";

import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

import { BlurFade } from "./blur-fade";

interface iISmoothScrollHeroProps {
    /**
     * Height of the scroll section in pixels
     * @default 1500
     */
    scrollHeight: number;
    /**
     * Background image URL for desktop view
     */
    desktopImage: string;
    /**
     * Background image URL for mobile view
     */
    mobileImage: string;
    /**
     * Final clip-path inset percentage (the window the image collapses into).
     * @default 25
     */
    initialClipPercentage: number;
    /**
     * Final clip-path outset percentage (the window the image collapses into).
     * @default 75
     */
    finalClipPercentage: number;
    /**
     * Brand statement rendered below the image as it collapses on scroll.
     */
    statementLine1?: string;
    statementLine2?: string;
}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroProps> = ({
    scrollHeight,
    desktopImage,
    mobileImage,
    initialClipPercentage,
    finalClipPercentage,
    statementLine1,
    statementLine2,
}) => {
    const {scrollY} = useScroll();

    // Reversed: start full-bleed (0% / 100%) and contract toward the
    // initial/final clip percentages as the user scrolls down.
    const clipStart = useTransform(
        scrollY,
        [0, scrollHeight],
        [0, initialClipPercentage],
    );
    const clipEnd = useTransform(
        scrollY,
        [0, scrollHeight],
        [100, finalClipPercentage],
    );

    const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

    // Zoom via transform/scale so we can keep `background-size: cover` —
    // a percentage size would leave gutters on portrait viewports.
    const scale = useTransform(
        scrollY,
        [0, scrollHeight + 500],
        [1, 1.7],
    );

    const hasStatement = Boolean(statementLine1 || statementLine2);

    // Right-center tagline fades out as the user starts scrolling so it
    // doesn't compete with the bottom statement reveal.
    const taglineOpacity = useTransform(
        scrollY,
        [0, scrollHeight * 0.25, scrollHeight * 0.45],
        [1, 1, 0],
    );

    // Word-by-word reveal driven by the same scroll range that animates the
    // clip-path. The reveal starts at ~55% of the scroll — that's when the
    // contracting image has uncovered enough room at the bottom for the
    // statement to be visible. Mapping the reveal to the full scroll would
    // burn through the first words while they were still hidden, so only the
    // last word or two would visibly animate.
    const line1Words = (statementLine1 ?? "").split(" ").filter(Boolean);
    const line2Words = (statementLine2 ?? "").split(" ").filter(Boolean);
    const totalWords = line1Words.length + line2Words.length;
    const revealProgress = useTransform(
        scrollY,
        [scrollHeight * 0.4, scrollHeight * 0.95],
        [0, 1],
    );

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* Behind layer: statement sits underneath the image and is
                naturally revealed as the clip-path shrinks on scroll. */}
            {hasStatement && (
                <div className="pointer-events-none absolute inset-x-0 bottom-[3vh] flex justify-center px-6 md:bottom-[4vh]">
                    <h2
                        className="max-w-5xl text-center font-semibold leading-[1.05] tracking-tight"
                        style={{ fontSize: "clamp(1.25rem, 2.2vw + 0.3rem, 2.5rem)" }}
                    >
                        {statementLine1 && (
                            <span className="block text-[var(--color-negro)]">
                                {line1Words.map((word, i) => (
                                    <RevealWord
                                        key={`l1-${i}`}
                                        progress={revealProgress}
                                        range={[i / totalWords, (i + 1) / totalWords]}
                                    >
                                        {word}
                                    </RevealWord>
                                ))}
                            </span>
                        )}
                        {statementLine2 && (
                            <span className="block text-[var(--color-negro)]">
                                {line2Words.map((word, i) => {
                                    const idx = line1Words.length + i;
                                    return (
                                        <RevealWord
                                            key={`l2-${i}`}
                                            progress={revealProgress}
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
            )}

            {/* Front layer: clipped image. As the polygon shrinks the area
                outside it becomes transparent and the statement underneath
                shows through. */}
            <motion.div
                className="absolute inset-0 bg-black"
                style={{
                    clipPath,
                    willChange: "clip-path, transform",
                }}
            >
                {/* Mobile background */}
                <motion.div
                    className="absolute inset-0 md:hidden"
                    style={{
                        backgroundImage: `url(${mobileImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        scale,
                    }}
                />
                {/* Desktop background */}
                <motion.div
                    className="absolute inset-0 hidden md:block"
                    style={{
                        backgroundImage: `url(${desktopImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        scale,
                    }}
                />
            </motion.div>

            {/* Right-center tagline — sits on top of the image with the brand
                cream color. Hidden on small screens where the image already
                fills the viewport edge-to-edge. */}
            <motion.div
                className="pointer-events-none absolute right-[clamp(3rem,12vw,10rem)] top-1/2 z-20 hidden -translate-y-1/2 md:block max-w-md lg:max-w-lg xl:max-w-2xl text-right"
                style={{ opacity: taglineOpacity }}
            >
                <BlurFade delay={0.4} yOffset={12}>
                    <p
                        className="font-semibold leading-[1.02] tracking-tight text-[var(--color-cultivado)] [text-shadow:0_2px_26px_rgba(0,0,0,0.55)]"
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(2.5rem, 4vw + 1rem, 5.5rem)",
                        }}
                    >
                        Transformamos tus ideas en espacios
                    </p>
                    <span
                        aria-hidden="true"
                        className="mt-6 ml-auto block h-px w-24 bg-[var(--color-cultivado)]/60"
                    />
                </BlurFade>
            </motion.div>
        </div>
    );
};

/**
 * A smooth scroll hero component with parallax background effect.
 * Reversed direction: image starts wide and contracts into a window on scroll.
 */
 const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
    scrollHeight = 1500,
    desktopImage,
    mobileImage,
    initialClipPercentage = 25,
    finalClipPercentage = 75,
    statementLine1,
    statementLine2,
}) => {
    return (
        <div
            style={{height: `calc(${scrollHeight}px + 100vh)`}}
            className="relative w-full"
        >
            <SmoothScrollHeroBackground
                scrollHeight={scrollHeight}
                desktopImage={desktopImage}
                mobileImage={mobileImage}
                initialClipPercentage={initialClipPercentage}
                finalClipPercentage={finalClipPercentage}
                statementLine1={statementLine1}
                statementLine2={statementLine2}
            />
        </div>
    );
};
export default SmoothScrollHero;

interface RevealWordProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const RevealWord: React.FC<RevealWordProps> = ({ children, progress, range }) => {
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
