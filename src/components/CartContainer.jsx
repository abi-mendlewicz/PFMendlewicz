import { useContext } from 'react'
import { CartContext } from '../context/AppContext'
import CartItemList from './CartItemList'
import CheckoutFormContainer from './CheckoutFormContainer'
import CheckoutModal from './CheckoutModal'

export default function CartContainer() {
  const {cartItems, showCheckoutModal} = useContext(CartContext)
  
  return (
    <>
      <h1 className='page-title'>Carrito de compras</h1>
      <div className='flex px-6 flex-wrap md:flex-nowrap'>
        <div className='basis-full grow mb-6 md:basis-1/2 md:pe-12 md:mb-0'>
          {cartItems.length > 0 && 
          <h2 className='mb-6 text-xl font-semibold'>Lista de compra</h2>}
          <CartItemList />
        </div>
        {cartItems.length > 0 && 
        <div className='basis-full md:basis-1/2'>
          <CheckoutFormContainer />
        </div>}
        {showCheckoutModal && <CheckoutModal />}
      </div>
    </>
  )
}