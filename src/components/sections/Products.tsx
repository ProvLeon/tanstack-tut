'use client'

import { useEffect, useRef } from 'react'
import { Button } from "../ui/button"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Products = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const productRefs = useRef<(HTMLDivElement | null)[]>([])

  const productFeatures = [
    { label: "Unique Design of Lunar Eclipse" },
    { label: "Hybrid Noise Canceling", detail: "(50dB)" },
    { label: "Driver and Heavy Base™", detail: "(11mm Dynamic)" },
    { label: "Voice Prompt Customization" },
    { label: "Wide Area Tap Control" },
  ]

  const products = [
    {
      id: 1,
      name: "SpaceBuds Pro",
      image: "/full_pods.png",
      description: "Experience premium audio with cutting-edge technology",
      battery: "40h",
      color: "from-primary/20 to-accent/20",
      imagePosition: "left"
    },
    {
      id: 2,
      name: "SpaceBuds Pro Premium",
      image: "/full_pods1.png",
      description: "Advanced noise cancellation meets premium design",
      battery: "48h",
      color: "from-accent/20 to-primary/20",
      imagePosition: "right"
    }
  ]

  useEffect(() => {
    // Animate each product on scroll
    productRefs.current.forEach((product, idx) => {
      if (!product) return

      gsap.fromTo(
        product,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: product,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            markers: false,
          },
        }
      )

      // Animate image rotation on scroll
      const imgElement = product.querySelector('img')
      if (imgElement) {
        gsap.fromTo(
          imgElement,
          {
            rotation: -5,
            scale: 0.95,
          },
          {
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: product,
              start: "top 80%",
              end: "top 20%",
              scrub: 1.5,
            },
          }
        )
      }

      // Animate text content staggered
      const textElements = product.querySelectorAll('h2, p, li')
      gsap.fromTo(
        textElements,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: product,
            start: "top 70%",
            end: "top 10%",
            scrub: 0.5,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className='-mt-24 bg-linear-to-b from-background via-background/50 to-transparent rounded-t-4xl shadow-elevation-lg border border-foreground/10'
    >
      {products.map((product, idx) => (
        <div
          key={product.id}
          ref={(el) => {
            productRefs.current[idx] = el
          }}
          className={`min-h-screen flex justify-center items-center px-8 lg:px-16 gap-12 relative ${idx === 1 ? '-mt-24' : ''
            }`}
        >
          {/* Animated gradient background */}
          <div
            className={`absolute inset-0 bg-linear-to-r ${product.color} opacity-0 -z-10 rounded-2xl`}
          />

          {/* Product Image */}
          <div
            className={`w-full lg:w-1/2 flex justify-center ${product.imagePosition === 'right' ? 'lg:order-2' : ''
              }`}
          >
            <div className='relative w-full max-w-lg'>
              {/* Glow effect */}
              <div className='absolute -inset-4 bg-linear-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              {/* Image */}
              <img
                src={product.image}
                alt={`${product.name} - Premium Wireless Earbuds`}
                className='relative w-full aspect-square object-contain rounded-2xl drop-shadow-lg transition-transform duration-300'
              />
            </div>
          </div>

          {/* Product Details */}
          <div
            className={`w-full lg:w-1/2 flex flex-col justify-center space-y-8 ${product.imagePosition === 'right' ? 'lg:order-1' : ''
              }`}
          >
            <div>
              <h2 className='text-foreground font-black mb-2 text-4xl'>
                {product.name}
              </h2>
              <p className='text-lg text-muted-foreground'>
                {product.description}
              </p>
            </div>

            {/* Features List */}
            <ul className='space-y-4'>
              {productFeatures.map((feature, featureIdx) => (
                <li
                  key={featureIdx}
                  className='flex items-start gap-4 text-foreground/80 group hover:text-foreground transition-colors duration-200'
                >
                  <span className='text-primary text-xl font-bold group-hover:scale-125 transition-transform duration-200'>✓</span>
                  <div className='flex-1'>
                    <p className='font-semibold text-foreground'>{feature.label}</p>
                    {feature.detail && (
                      <span className='text-sm text-muted-foreground'>{feature.detail}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Battery Life with animation */}
            <div className='flex items-baseline gap-3 pt-4 border-t border-border group'>
              <h3 className='text-5xl font-black text-primary group-hover:scale-110 transition-transform duration-200'>
                {product.battery}
              </h3>
              <p className='text-lg text-muted-foreground'>Long Playtime</p>
            </div>

            {/* CTA Button */}
            <Button
              variant='default'
              className='w-fit hover:shadow-elevation-lg transition-shadow duration-200'
            >
              Learn More
            </Button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Products
