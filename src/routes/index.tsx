import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className='bg-slate-800 relative w-full min-h-screen p-4'>
      <div className='w-72 h-72 bg-blue-800 rounded-full ani-pulse -right-20 -top-30 blur-3xl opacity-40 fixed'></div>
      <div className='w-md h-112 bg-orange-500 rounded-full animate-pulse -left-30 -bottom-50 blur-3xl opacity-20 fixed'></div>
      <div className='absolute inset-0 bg-grid'></div>

      <div className='text-3xl font-bold'>
        <div className='bg-[clip-path(34px_34px_34px_34px),clip-path(34px_34px_34px_34px)]'></div>
        Home route
      </div>
    </div>
  )
}
