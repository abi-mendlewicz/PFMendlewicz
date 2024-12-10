import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'

export default function Logo() {
  return (
    <Link to='/' className='place-self-start'>
      <img src={logo} alt='Logo' />
    </Link>
  )
}