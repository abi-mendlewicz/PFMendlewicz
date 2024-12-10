import { useParams } from 'react-router-dom'
import { useFetchItems } from '../hooks/productHooks'
import Loader from './Loader'
import ItemDeatail from './ItemDetail'

export default function ItemDetailContainer() {
  const {id} = useParams()
  const {data, isLoading} = useFetchItems('id', id)
  
  if (isLoading) return <Loader />
  
  if (!data) return <p className='py-4 px-6'>No se encontró el producto referido.</p>

  return <ItemDeatail item={data} />
}