import { useContext } from 'react'
import { CartContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import ItemQuantitySelector from './ItemQuantitySelector'
import { CgTrash } from 'react-icons/cg'
import priceFormat from '../utils/priceFormat'

export default function CartItemRow({item}) {
  const {updateItemQuantity, onRemove} = useContext(CartContext)
  const {id, title, price, subtotal, pictureUrl} = item

  return (
    <div className='grid grid-cols-3 gap-y-1 gap-x-3'>
      <div className='col-span-3'>
        <Link to={`/item/${id}`}>
          <h2 className='mb-2 text-lg font-bold hover:text-blue-600 hover:underline'>{title}</h2>
        </Link>
      </div>
      <div>
        <img src={pictureUrl} alt={title} className='w-36 rounded-3xl' />
      </div>
      <div className='col-span-2'>
        <div className='sm:grid sm:grid-cols-2 h-full text-end'>
          <div>
            <ItemQuantitySelector params={{
              initial: item.quantity,
              updateCallback: updateItemQuantity,
              itemId: item.id
            }} />
          </div>
          <div className='place-items-end'>
            <p>{priceFormat(price)}</p>
            <p className='py-2'>
              <button
                type='button'
                className='flex items-center btn'
                onClick={() => onRemove(item.id)}
              >
                Quitar
                <CgTrash className='ms-1' strokeWidth={0.1} size={16} />
              </button>
            </p>
          </div>
          {subtotal && subtotal > price &&
          <p className='col-span-2 place-self-end'>
            <span>Subtotal: {priceFormat(subtotal)}</span>
          </p>}
        </div>
      </div>
    </div>
  )
}