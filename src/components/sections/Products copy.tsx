import { Button } from "../ui/button"

const Products = () => {

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
      image: "/OTW-630-SpaceBuds-2.webp",
      description: "Experience premium audio with cutting-edge technology",
      battery: "40h",
      imagePosition: "left"
    },
    {
      id: 2,
      name: "SpaceBuds Elite",
      image: "/OTW-9302.webp",
      description: "Advanced noise cancellation meets premium design",
      battery: "48h",
      imagePosition: "right"
    }
  ]


  return (
    <section className="-mt-24 bg-linear-to-b from-background via-background/50 to-transparent rounded-t-4xl inset-1 shadow-elavation-lg border-foreground/10 border-t">
      {products.map((product, idx) => (

        <div className="min-h-screen flex justify-center items-center px-8 lg:px-16 gap-12 py-20">

          <div className={`w-full lg:w-1/2 flex justify-center ${product.imagePosition === 'right' ? 'lg:order-2' : ''}`}>
            {/*<div className="w-full max-w-xl">*/}
            <img src={product.image} alt={`${product.name} - Premium Wireless Earbuds`} className="w-full aspect-square object-cover rounded-2xl shadow-elevation-lg " />
            {/*</div>*/}
          </div>

          <div className={`w-full lg:w-1/2 flex flex-col justify-center space-y-8 ${product.imagePosition === 'right' ? 'lg:order-1' : ''}`}>
            <div>
              <h2 className="text-forground font-black mb-2">{product.name}</h2>
              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            <ul className="space-y-4">
              {productFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4 text-foreground/80">
                  <span className="text-primary text-xl">✓</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{feature.label}</p>
                    {feature.detail && (
                      <span className="text-sm text-muted-foreground">{feature.detail}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-3 pt-4 border-t border-border">
              <h3 className="text-primary">{product.battery}</h3>
              <p>Long Playtime</p>
            </div>

            <Button variant="default" className="w-fit">Learn More</Button>
          </div>
        </div>
      ))}

    </section>
  )
}

export default Products
