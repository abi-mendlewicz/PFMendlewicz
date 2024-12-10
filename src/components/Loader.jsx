import loadingDog from '../assets/images/loading-dog.webp'

export default function Loader() {
  return (
    <div className='flex flex-col items-center justify-center h-dvh'>
      <img src={loadingDog} alt='Loading dog' className='w-24' />
      <p className='motion-safe:animate-pulse'>Cargando...</p>
    </div>
  )
}