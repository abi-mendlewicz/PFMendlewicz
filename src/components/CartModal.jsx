import { useContext } from 'react'
import { CartContext } from '../context/AppContext'
import CartItemList from './CartItemList'
import { Link } from 'react-router-dom'
import ModalNotification from './ModalNotification'

export default function CartModal() {
  const {cartItems, setShowCartModal, cartModalTitle} = useContext(CartContext)

  const content = (
    <>
      <div className='p-4'>
        <CartItemList />
      </div>
      <div className='flex justify-end px-4 py-3'>
        <Link
          className='me-4 btn'
          to='/category/todo'
        >
          Volver a la tienda
        </Link>
        {cartItems.length > 0 &&
        <Link 
          className='btn'
          to='/cart'
        >
          Finalizar compra
        </Link>}
      </div>
    </>
  )

  return (
    <ModalNotification
      type='success'
      title={cartModalTitle}
      content={content}
      setShowModal={setShowCartModal}
    />
  )
}