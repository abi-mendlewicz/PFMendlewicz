import { useItemQuantity } from '../hooks/productHooks'

export default function ItemQuantitySelector({params}) {
  const [quantity, increment, decrement] = useItemQuantity(params)

  return (
    <>
      <p className='font-medium'>Cantidad</p>
      <p>
        <span className='inline-flex my-2 border border-blue-900 rounded-full'>
          <button
            type='button'
            className='px-4 rounded-l-full hover:bg-blue-900 hover:text-white'
            onClick={decrement}
          >
            -
          </button>
          <span className='px-2 text-lg'>{quantity}</span>
          <button
            type='button'
            className='px-4 rounded-r-full hover:bg-blue-900 hover:text-white'
            onClick={increment}
          >
            +
          </button>
        </span>
      </p>
    </>
  )
}