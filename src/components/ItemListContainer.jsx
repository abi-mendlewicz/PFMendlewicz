import { useParams } from 'react-router-dom'
import { useFetchItems } from '../hooks/productHooks'
import Loader from './Loader'
import ItemList from './ItemList'

export default function ItemListContainer() {
  const {category} = useParams()
  const {data, isLoading} = useFetchItems('category', category || 'todo')
  
  if (isLoading) return <Loader />
  if (!data || !data.length) return <p className="py-4 px-6">No se encontraron productos.</p>

  return <ItemList data={data} />
}