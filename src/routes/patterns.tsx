import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patterns')({
    component: Patterns,
})

function Patterns() {
    return (
        <div className="min-h-screen bg-white p-10 text-slate-800 space-y-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">CSS Background Patterns</h1>
                <p className="text-lg text-slate-600 mb-8">
                    The power of <code className="bg-slate-100 px-2 py-1 rounded">linear-gradient</code>,{' '}
                    <code className="bg-slate-100 px-2 py-1 rounded">radial-gradient</code>, and{' '}
                    <code className="bg-slate-100 px-2 py-1 rounded">background-size</code>.
                </p>

                {/* Example 1: Dotted Grid */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Polka Dots (Radial Gradient)</h2>
                    <div className="h-64 w-full rounded-xl border border-slate-200 relative overflow-hidden bg-slate-50">
                        {/* The Pattern */}
                        <div
                            className="absolute inset-0 opacity-40"
                            style={{
                                backgroundImage: 'radial-gradient(#3b82f6 2px, transparent 2px)',
                                backgroundSize: '30px 30px',
                            }}
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg shadow-sm border border-slate-200 text-xs font-mono">
                            background-image: radial-gradient(#3b82f6 2px, transparent 2px);<br />
                            background-size: 30px 30px;
                        </div>
                    </div>
                </section>

                {/* Example 2: Graph Paper */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Blueprint / Graph Paper</h2>
                    <div className="h-64 w-full rounded-xl border border-slate-200 relative overflow-hidden bg-[#f0f4f8]">
                        {/* The Pattern */}
                        <div
                            className="absolute inset-0 opacity-100"
                            style={{
                                backgroundImage: `
                  linear-gradient(#cad2c5 1px, transparent 1px),
                  linear-gradient(90deg, #cad2c5 1px, transparent 1px),
                  linear-gradient(#84a98c 2px, transparent 2px),
                  linear-gradient(90deg, #84a98c 2px, transparent 2px)
                `,
                                backgroundSize: `
                  20px 20px,
                  20px 20px,
                  100px 100px,
                  100px 100px
                `,
                            }}
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg shadow-sm border border-slate-200 text-xs font-mono">
              /* 2 layers: Small grid (20px) & Big grid (100px) */
                        </div>
                    </div>
                </section>

                {/* Example 3: Isometric / Diagonal */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Diagonal Stripes</h2>
                    <div className="h-64 w-full rounded-xl border border-slate-200 relative overflow-hidden bg-indigo-50">
                        {/* The Pattern */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    'repeating-linear-gradient(45deg, #6366f1 0, #6366f1 2px, transparent 0, transparent 50%)',
                                backgroundSize: '20px 20px',
                            }}
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg shadow-sm border border-slate-200 text-xs font-mono">
                            repeating-linear-gradient(45deg, #6366f1 0, #6366f1 2px, transparent 0, transparent 50%)
                        </div>
                    </div>
                </section>

                {/* Example 4: Checkerboard */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Checkerboard (Conic Gradient)</h2>
                    <div className="h-64 w-full rounded-xl border border-slate-200 relative overflow-hidden bg-white">
                        {/* The Pattern */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `conic-gradient(
                    #000 90deg,
                    transparent 90deg 180deg,
                    #000 180deg 270deg,
                    transparent 270deg
                )`,
                                backgroundSize: '40px 40px',
                            }}
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg shadow-sm border border-slate-200 text-xs font-mono">
                            conic-gradient(...) + background-size: 40px 40px
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
