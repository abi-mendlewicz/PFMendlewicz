import { useState, useContext } from 'react'
import { CartContext } from '../context/AppContext'
import ItemQuantitySelector from './ItemQuantitySelector'

export default function AddToCart({item}) {
  const [quantityToAdd, setQuantityToAdd] = useState(1)
  const {onAdd} = useContext(CartContext)
  
  return (
    <>
      <ItemQuantitySelector params={{
        initial: quantityToAdd,
        updateCallback: setQuantityToAdd,
      }} />
      <button
        type='button'
        className='btn-main'
        onClick={() => onAdd({...item, quantity: quantityToAdd})}
        disabled = {!item.stock}
      >
        Agregar al carrito
      </button>
    </>
  )
}