import { Button } from "../ui/button"

const Hero = () => {
  return (
    <div className='min-h-screen flex justify-center items-center px-8 lg:px-16 gap-12 -mt-24'>
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4">
        <h1>
          Your Sound.<br />
          <em>Style, Soul</em>
        </h1>

        <p className='text-xl text-muted-foreground mb-8 leading-relaxed'>
          Connect, control and manipulate your Surrounding with Intuitive Music.
        </p>

        <div className='flex gap-4'>
          <Button variant="default" className='font-semibold transition-opacity'>
            Get Started
          </Button>
          <Button variant="outline" className='font-semibold transition-colors'>
            Learn More
          </Button>
        </div>
      </div>
      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <div
          className='w-full max-w-4xl aspect-square rounded-lg bg-[url("/full_pods.png")] bg-contain bg-center bg-no-repeat drop-shadow-2xl shadow-black'
        />
      </div>
    </div>
  )
}

export default Hero
