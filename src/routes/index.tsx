import Hero from '@/components/sections/Hero'
import ModelShowcase from '@/components/sections/ModelShowcase'
import Products from '@/components/sections/Products'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <Products />

      <ModelShowcase />
    </>
  )
}
