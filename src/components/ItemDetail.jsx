import { useContext, useEffect } from 'react'
import { CartContext } from '../context/AppContext'
import AddToCart from './AddToCart'
import CartModal from './CartModal'
import priceFormat from '../utils/priceFormat'

export default function ItemDeatail({item}) {
  const {title, description, price, pictureUrl, stock} = item
  const {showCartModal, setShowCartModal} = useContext(CartContext)

  useEffect(() => {
    return () => {
      setShowCartModal(false)
    }
  }, [])
  
  return (
    <>
      <div className='main-container'>
        <div className='relative basis-full mb-4 sm:basis-1/2'>
          <img src={pictureUrl} alt={title} className='rounded-3xl' />
          {stock == 0 &&
          <span className='caution-tag'>AGOTADO</span>}
        </div>
        <div className='basis-full sm:basis-1/2 ps-6'>
          <h1 className='pb-4'>{title}</h1>
          <p>{description}</p>
          <p className='py-4 text-xl font-semibold'>{priceFormat(price)}</p>
          <AddToCart item={item} />
        </div>
      </div>
      {showCartModal && <CartModal />}
    </>
  )
}