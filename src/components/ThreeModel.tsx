import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

gsap.registerPlugin(ScrollTrigger)

interface ThreeModelProps {
  modelPath?: string
  scale?: number
  autoRotate?: boolean
}

const ThreeModel = ({
  modelPath = '/3d_assets/spline_3_d_starter_file.glb',
  scale = 1,
  autoRotate = true
}: ThreeModelProps) => {

  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)


  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.Fog(0x000000, 10, 50)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambietLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambietLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 7)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Point Light for accent
    const pointLight = new THREE.PointLight(0x00ff88, 1, 100)
    pointLight.position.set(-5, 5, 5)
    scene.add(pointLight)

    // Load 3D model
    const loader = new GLTFLoader()
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene
        model.scale.set(scale, scale, scale)

        // Center the model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)

        scene.add(model)
        modelRef.current = model

        // Scroll animation - only if constainer exists
        if (containerRef.current) {
          gsap.to(model.rotation, {
            x: Math.PI * 4,
            y: Math.PI * 4,
            z: Math.PI * 2,
            duration: 2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 2,
            }
          })

          // Position animation on scroll
          gsap.to(model.position, {
            x: 3,
            y: 2,
            duration: 2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top current',
              end: 'bottom center',
              scrub: 1.5,
            },
          })
        }

      },
      (progress) => {
        console.log('Loading:', (progress.loaded / progress.total) * 100 + '%')
      },
      (error) => {
        console.error('Error loading model:', error)
      }
    )
    // Animation loop
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      if (modelRef.current && autoRotate) {
        modelRef.current.rotation.x += 0.001
        modelRef.current.rotation.y += 0.002
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle Window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.addEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)

      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }

  }, [modelPath, scale, autoRotate])


  return (
    <div
      ref={containerRef}
      className='w-full h-screen relative overflow-hidden bg-linear-to-b from-background via-background/50 to-background'
      style={{ perspective: '1000px' }}

    >
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-10'>
        <div className='text-center'>
          <h2 className='font-black mb-4 text-foreground'>
            Scroll to Explore
          </h2>
          <p className='text-muted-foreground'>
            Watch the 3D model transform as you scroll
          </p>
        </div>
      </div>
    </div>
  )
}


export default ThreeModel
