import { NavLink } from 'react-router-dom'

export default function NoMatch() {
  return (
    <div className='container mx-auto py-6 px-4'>
      <h1 className='page-title'>404</h1>
      <p className='my-4 mx-6'>Te encuentras perdido...</p>
      <NavLink
        className='my-4 mx-6 btn'
        to='/'
      >
        Volver al inicio
      </NavLink>
    </div>
  )
}