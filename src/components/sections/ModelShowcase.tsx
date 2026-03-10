import ThreeModel from '../ThreeModel'

const ModelShowcase = () => {
  return (
    <section className='relative'>
      <ThreeModel
        modelPath='/3d_assets/spline_3_d_starter_file.glb'
        scale={2}
        autoRotate={true}
      />
    </section>
  )
}

export default ModelShowcase
