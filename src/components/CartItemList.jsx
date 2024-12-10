import { useContext } from 'react'
import { CartContext } from '../context/AppContext'
import CartItemRow from './CartItemRow'
import { Link } from 'react-router-dom'
import priceFormat from '../utils/priceFormat'

export default function CartItemList() {
  const {cartItems, getTotalPrice, deleteCart} = useContext(CartContext)
  
  const itemList = cartItems.map(item => (
    <li className='pb-4 border-b border-blue-900' key={item.id}>
      <CartItemRow item={item} />
    </li>
  ))

  const itemsSummary = (
    <>
      <p className='text-end'>
        <button className='btn' onClick={deleteCart}>Vaciar carrito</button>
      </p>
      <ul>{itemList}</ul>
      <p className='py-4 border-b border-blue-900 text-end text-lg font-bold'>
        Total: {priceFormat(getTotalPrice())}
      </p>
    </>
  )

  const emptyCart = (
    <p className='py-4 px-6'>
      Tu carrito está vacío.
      <Link className='ms-2 text-blue-500 underline hover:text-blue-700' to='/category/todo'>Volver a la tienda.</Link>
    </p>
  )

  return cartItems.length ? itemsSummary : emptyCart
}