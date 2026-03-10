import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shapes')({
    component: Shapes,
})

function Shapes() {
    return (
        <div className="min-h-screen bg-slate-900 p-10 text-white space-y-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">CSS Shapes with <code className="text-pink-500">clip-path</code></h1>
                <p className="text-lg text-slate-400 mb-12">
                    Using <code className="bg-slate-800 px-2 py-1 rounded">polygon()</code> to carve modern UI elements.
                </p>

                {/* Example 1: The Slanted Header/Card */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">1. The Slanted Card</h2>
                        <p className="text-slate-400 mb-4">A simple modern effect often used for hero sections or profile cards.</p>
                        <div className="bg-slate-800 p-4 rounded-lg font-mono text-xs text-pink-300">
                            clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Drop shadow wrapper (filter: drop-shadow works on clipped elements) */}
                        <div className="filter drop-shadow-2xl">
                            <div
                                className="h-64 bg-gradient-to-br from-pink-500 to-purple-600 w-full"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
                            >
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold">Modern Design</h3>
                                    <p className="mt-2 text-white/80">Slanted bottoms utilize white space effectively.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Example 2: Cyberpunk / Notched Card (Rounded + Sharp) */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                        <div className="relative w-full h-48 bg-cyan-500 text-slate-900 rounded-3xl flex items-center justify-center font-bold text-xl hover:bg-cyan-400 transition-colors"
                            style={{
                                clipPath: 'polygon(0 0,85% 0,100% 15 %,100% 100 %,15% 100 %, MODERN SCI- FI(Rounded + Cut)'
                            }}>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <h2 className="text-2xl font-semibold mb-2">2. The "Modern Sci-Fi" Look</h2>
                        <p className="text-slate-400 mb-4">
                            True modern sci-fi often combines <strong>smooth rounded corners</strong> with <strong>sharp technical cuts</strong>.
                            <br /><br />
                            <span className="text-pink-400">Trick:</span> Apply <code className="bg-slate-800 px-1 rounded">rounded-3xl</code> to the element, and then use <code className="bg-slate-800 px-1 rounded">clip-path</code> to cut off <em>just</em> the specific corners you want sharp.
                        </p>
                        <div className="bg-slate-800 p-4 rounded-lg font-mono text-xs text-cyan-300">
                    /* Cut Top-Right & Bottom-Left */ <br />
                            polygon(<br />
                            &nbsp;&nbsp;0 0,       /* TL: Rounded by CSS */ <br />
                            &nbsp;&nbsp;85% 0,     /* Start Cut TR */ <br />
                            &nbsp;&nbsp;100% 15%,  /* End Cut TR */ <br />
                            &nbsp;&nbsp;100% 100%, /* BR: Rounded by CSS */ <br />
                            &nbsp;&nbsp;15% 100%,  /* Start Cut BL */ <br />
                            &nbsp;&nbsp;0 85%      /* End Cut BL */ <br />
                            )
                        </div>
                    </div>
                </section>

                {/* Example 3: Animated Reveal */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">3. Interactive Reveal</h2>
                        <p className="text-slate-400 mb-4">Hover over the image to unclip it.</p>
                        <div className="bg-slate-800 p-4 rounded-lg font-mono text-xs text-green-300">
                            transition: clip-path 0.5s;<br /><br />
              /* State 1: Circle(ish) */ <br />
                            polygon(50% 0, 100% 50%, 50% 100%, 0 50%) <br /><br />
              /* State 2: Full Square */ <br />
                            polygon(0 0, 100% 0, 100% 100%, 0 100%)
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div
                            className="w-64 h-64 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:scale-105 shadow-xl"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' // Diamond
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'} // Square
                            onMouseLeave={(e) => e.currentTarget.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}
                        >
                            <span className="text-2xl font-bold text-white drop-shadow-md">HOVER ME</span>
                        </div>
                    </div>
                </section>            </div >
        </div >
    )
}
