import { useContext } from 'react'
import { CartContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom'
import { CgShoppingCart } from 'react-icons/cg'

export default function CartWidget() {
  const {getItemsCount} = useContext(CartContext)
  
  return (
    <NavLink
      className={({isActive}) => isActive ? 'relative me-4 nav-link-active' : 'relative me-4 hover:text-yellow-600'}
      to='/cart'
    >
      <CgShoppingCart size={24} />
      <span className='cart-badge'>{getItemsCount()}</span>
    </NavLink>
  )
}