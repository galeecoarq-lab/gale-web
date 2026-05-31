"use client";
import * as React from "react";

import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";

/** Spins a numeric string (e.g. "+50") from 0 to its target value on mount. */
const CountUp: React.FC<{ value: string }> = ({ value }) => {
    const match = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
    if (!match) return <>{value}</>;

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        // Start after BlurFade has revealed the strip (~700 ms delay + buffer)
        const DELAY = 820;
        const DURATION = 1600;

        let rafId: number;
        const timerId = setTimeout(() => {
            let startTime: number | null = null;
            const step = (ts: number) => {
                if (!startTime) startTime = ts;
                const elapsed = ts - startTime;
                const progress = Math.min(elapsed / DURATION, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(eased * target));
                if (progress < 1) rafId = requestAnimationFrame(step);
            };
            rafId = requestAnimationFrame(step);
        }, DELAY);

        return () => {
            clearTimeout(timerId);
            cancelAnimationFrame(rafId);
        };
    }, [target]);

    // A hidden spacer reserves the full final-value width so the adjacent
    // label text never shifts as the digit count grows during the animation.
    return (
        <span style={{ display: "inline-block", position: "relative" }}>
            <span aria-hidden="true" style={{ visibility: "hidden" }}>{value}</span>
            <span style={{ position: "absolute", left: 0, top: 0 }}>{prefix}{count}{suffix}</span>
        </span>
    );
};

import { BlurFade } from "./blur-fade";

interface HeroCta {
    label: string;
    href: string;
    variant: "solid" | "outline" | "link";
    icon?: boolean;
}

interface HeroStat {
    value: string;
    label: string;
}

interface iISmoothScrollHeroProps {
    /** Height of the scroll section in pixels. @default 800 */
    scrollHeight: number;
    /** Background image URL for desktop view */
    desktopImage: string;
    /** Background image URL for mobile view */
    mobileImage: string;
    /** Clip-path inset percentage the image collapses into. @default 25 */
    initialClipPercentage: number;
    /** Clip-path outset percentage the image collapses into. @default 75 */
    finalClipPercentage: number;
    /** Hero copy + actions. */
    title: string;
    subtitle: string;
    ctas: HeroCta[];
    stats: HeroStat[];
    presenceLabel: string;
    presenceCities: string[];
    presenceSuffix?: string;
    /** When true, render the title in azul cerúleo instead of off-white. */
    titleInAzul?: boolean;
}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroProps> = ({
    scrollHeight,
    desktopImage,
    mobileImage,
    initialClipPercentage,
    finalClipPercentage,
    title,
    subtitle,
    ctas,
    stats,
    presenceLabel,
    presenceCities,
    presenceSuffix,
    titleInAzul,
}) => {
    const { scrollY } = useScroll();

    // Start full-bleed and contract toward the configured clip percentages as
    // the user scrolls down. `inset()` (rather than `polygon()`) is used so the
    // window can carry a `round` radius — top/left inset grows from 0, while the
    // right/bottom inset grows from 0 to (100 − finalClipPercentage).
    const insetTopLeft = useTransform(scrollY, [0, scrollHeight], [0, initialClipPercentage]);
    const insetBottomRight = useTransform(scrollY, [0, scrollHeight], [0, 100 - finalClipPercentage]);
    // Corners round in as the image contracts — flush at full-bleed (no notched
    // viewport corners), softened once it pulls into its centered window.
    const cornerRadius = useTransform(scrollY, [0, scrollHeight], [0, 28]);
    const clipPath = useMotionTemplate`inset(${insetTopLeft}% ${insetBottomRight}% ${insetBottomRight}% ${insetTopLeft}% round ${cornerRadius}px)`;

    // Slow zoom while scrolling — keeps `background-size: cover` honest on
    // portrait viewports (a percentage size would leave gutters).
    const scale = useTransform(scrollY, [0, scrollHeight + 500], [1, 1.7]);

    // Hero content sits on top of the image and lifts away the instant the user
    // starts scrolling — no hold — so it never collides with the contracting
    // window. The fade fully resolves well before the clip animation completes.
    const contentOpacity = useTransform(
        scrollY,
        [0, scrollHeight * 0.3],
        [1, 0],
    );
    const contentY = useTransform(scrollY, [0, scrollHeight * 0.3], [0, -40]);

    const titleColor = titleInAzul ? "var(--color-azul)" : "var(--color-cultivado)";

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* Image layer — clips + scales on scroll. Scrims live inside so the
                gradient tracks the image as it contracts. */}
            <motion.div
                className="absolute inset-0 bg-[var(--color-cultivado)]"
                style={{ clipPath, willChange: "clip-path, transform" }}
            >
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
                {/* Two-axis scrim: a left→right ramp builds a readable column
                    under the copy while the right half of the photo stays
                    vibrant; a bottom wash anchors the stats strip; a faint top
                    wash keeps the dark navbar legible. */}
                <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(20,27,35,0.82) 0%, rgba(20,27,35,0.64) 24%, rgba(20,27,35,0.40) 42%, rgba(20,27,35,0.12) 60%, rgba(20,27,35,0) 74%), linear-gradient(to top, rgba(20,27,35,0.74) 0%, rgba(20,27,35,0.34) 22%, rgba(20,27,35,0) 48%, rgba(20,27,35,0) 88%, rgba(20,27,35,0.10) 100%)",
                    }}
                />
            </motion.div>

            {/* Content overlay — independent of the clip so it stays crisp. */}
            <motion.div
                className="absolute inset-0 z-20 flex flex-col justify-end"
                style={{ opacity: contentOpacity, y: contentY }}
            >
                <div className="container-wide w-full pb-6 md:pb-10">
                    <BlurFade delay={0.25} yOffset={16}>
                        <h1
                            className="max-w-[16ch] font-semibold leading-[0.98] tracking-tight"
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(2.25rem, 5.5vw + 0.6rem, 6rem)",
                                color: titleColor,
                                textShadow: "0 2px 20px rgba(20,27,35,0.55)",
                            }}
                        >
                            {title}
                        </h1>
                    </BlurFade>

                    <BlurFade delay={0.4} yOffset={14}>
                        <p
                            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[var(--color-cultivado)]/85 sm:mt-6 sm:text-lg"
                            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
                        >
                            {subtitle}
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.55} yOffset={12}>
                        <div className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                            {ctas.map((cta) => (
                                <a
                                    key={cta.label}
                                    href={cta.href}
                                    className={
                                        cta.variant === "solid"
                                            ? "group inline-flex items-center gap-2 rounded-full bg-[var(--color-cultivado)] px-6 py-3.5 text-sm font-medium tracking-wide text-[var(--color-negro)] transition-colors duration-300 hover:bg-[var(--color-azul)] hover:text-[var(--color-cultivado)]"
                                            : cta.variant === "outline"
                                            ? "group inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-cultivado)_45%,transparent)] px-6 py-3.5 text-sm font-medium tracking-wide text-[var(--color-cultivado)] transition-colors duration-300 hover:border-[var(--color-azul)] hover:text-[var(--color-azul)]"
                                            : "group inline-flex items-center gap-1.5 pl-6 text-sm font-medium tracking-wide text-[color-mix(in_oklab,var(--color-cultivado)_70%,transparent)] underline underline-offset-4 decoration-[color-mix(in_oklab,var(--color-cultivado)_30%,transparent)] transition-colors duration-300 hover:text-[var(--color-cultivado)] hover:decoration-[var(--color-cultivado)]"
                                    }
                                >
                                    {cta.label}
                                    {cta.icon !== false && (
                                        <svg
                                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    )}
                                </a>
                            ))}
                        </div>
                    </BlurFade>
                </div>

                {/* Indicators strip — an editorial facts bar, not a metric grid. */}
                <BlurFade delay={0.7} yOffset={0}>
                    <div className="border-t border-[color-mix(in_oklab,var(--color-cultivado)_18%,transparent)]">
                        <div className="container-wide flex flex-col gap-2.5 py-4 md:gap-3 md:py-6">
                            <dl className="grid grid-cols-3 gap-x-4 md:flex md:flex-wrap md:items-baseline md:gap-x-10">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-2"
                                    >
                                        <dt className="sr-only">{stat.label}</dt>
                                        <dd className="contents">
                                            <span
                                                className="font-semibold leading-none text-[var(--color-cultivado)]"
                                                style={{
                                                    fontFamily: "var(--font-display)",
                                                    fontSize: "clamp(1.5rem, 1.4vw + 1rem, 2rem)",
                                                }}
                                            >
                                                <CountUp value={stat.value} />
                                            </span>
                                            <span className="text-[0.625rem] uppercase leading-tight tracking-[0.14em] text-[var(--color-cultivado)]/70 sm:text-xs">
                                                {stat.label}
                                            </span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <p className="max-w-3xl text-[0.6875rem] leading-relaxed text-[var(--color-cultivado)]/65 sm:text-xs">
                                <span className="text-[var(--color-cultivado)]/85">{presenceLabel}:</span>{" "}
                                {presenceCities.join(", ")}
                                {presenceSuffix ? ` ${presenceSuffix}.` : "."}
                            </p>
                        </div>
                    </div>
                </BlurFade>
            </motion.div>
        </div>
    );
};

/**
 * Smooth-scroll hero. The image starts full-bleed and contracts into a centred
 * window as the user scrolls; the hero copy sits on top and fades away.
 */
const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = (props) => {
    return (
        <div
            style={{ height: `calc(${props.scrollHeight}px + 100vh)` }}
            className="relative w-full bg-[var(--color-cultivado)]"
        >
            <SmoothScrollHeroBackground {...props} />
        </div>
    );
};

export default SmoothScrollHero;
