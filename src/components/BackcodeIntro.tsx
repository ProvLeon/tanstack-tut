import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackcodeIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cloudRef = useRef<SVGPathElement>(null);
    const wifiSignalsRef = useRef<SVGGElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const logoImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power2.out' },
                onComplete: () => {
                    // After animation completes, fade out the intro
                    gsap.to(containerRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 1,
                        onComplete: () => {
                            if (containerRef.current) {
                                containerRef.current.style.display = 'none';
                            }
                        }
                    });
                }
            });

            // Phase 1: Draw the cloud/B shape
            tl.fromTo(
                cloudRef.current,
                {
                    strokeDashoffset: 1000,
                    fill: 'transparent',
                },
                {
                    strokeDashoffset: 0,
                    duration: 1.2,
                    ease: 'power2.inOut',
                }
            )
                // Fill the cloud shape
                .to(cloudRef.current, {
                    fill: '#1a1a1a',
                    duration: 0.4,
                }, '-=0.3');

            // Phase 2: Animate wifi signals (stagger in with elastic effect)
            const wifiPaths = wifiSignalsRef.current?.querySelectorAll('path');
            if (wifiPaths) {
                tl.fromTo(
                    wifiPaths,
                    {
                        scale: 0,
                        transformOrigin: 'bottom right',
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'elastic.out(1, 0.5)',
                    },
                    '-=0.2'
                );
            }

            // Phase 3: Reveal text with stagger
            const letters = textRef.current?.querySelectorAll('.letter');
            if (letters) {
                tl.fromTo(
                    letters,
                    {
                        y: 50,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: 'back.out(1.2)',
                    },
                    '-=0.3'
                );
            }

            // Phase 4: Crossfade to actual logo image
            tl.to(
                [cloudRef.current, wifiSignalsRef.current, textRef.current],
                {
                    opacity: 0,
                    duration: 0.3,
                }
            ).fromTo(
                logoImageRef.current,
                {
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.2'
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
        >
            {/* Animated SVG Logo */}
            <div className="relative">
                <svg
                    width="600"
                    height="200"
                    viewBox="0 0 800 200"
                    className="max-w-[90vw]"
                >
                    {/* Cloud/B Shape */}
                    <path
                        ref={cloudRef}
                        d="M 60 50 Q 40 50 40 70 Q 40 85 50 95 Q 50 110 65 110 Q 70 125 90 125 Q 105 125 110 110 Q 125 110 130 95 Q 140 95 145 85 Q 150 70 145 55 Q 135 40 120 40 Q 110 25 90 25 Q 70 25 60 40 Q 45 40 40 55 Z M 70 60 Q 75 55 85 55 Q 95 55 100 65 L 100 90 Q 95 100 85 100 Q 75 100 70 90 Z"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                        filter="url(#glow)"
                    />

                    {/* Wifi Signals */}
                    <g ref={wifiSignalsRef}>
                        <path
                            d="M 30 130 Q 35 125 40 130"
                            stroke="#3b82f6"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            filter="url(#glow)"
                        />
                        <path
                            d="M 20 145 Q 30 135 40 145"
                            stroke="#3b82f6"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            filter="url(#glow)"
                        />
                        <path
                            d="M 10 160 Q 30 140 50 160"
                            stroke="#3b82f6"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            filter="url(#glow)"
                        />
                    </g>

                    {/* Glow Filter */}
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                {/* Animated Text */}
                <div
                    ref={textRef}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 flex gap-1 text-7xl font-bold"
                    style={{ left: '180px' }}
                >
                    {'Backcode'.split('').map((letter, index) => (
                        <span
                            key={index}
                            className="letter inline-block"
                            style={{ color: '#1a1a1a' }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>

                {/* Final Logo Image (crossfade to this) */}
                <img
                    ref={logoImageRef}
                    src="/backcode_logo.jpeg"
                    alt="Backcode Labs"
                    className="absolute inset-0 w-full h-full object-contain opacity-0"
                />
            </div>
        </div>
    );
}
