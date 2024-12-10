import { Link } from 'react-router-dom'
import priceFormat from '../utils/priceFormat'

export default function ItemCard({id, title, price, pictureUrl, stock}) {
  return (
    <div>
      <div className='relative'>
        <img src={pictureUrl} alt={title} className='rounded-3xl' />
          {stock == 0 &&
          <span className='caution-tag'>AGOTADO</span>}
      </div>
      <h2 className='text-lg font-bold'>{title}</h2>
      <p>{priceFormat(price)}</p>
      <p className='text-right'>
        <Link
          className='btn'
          to={`/item/${id}`}
        >
          Ver detalles
        </Link>
      </p>
    </div>
  )
}