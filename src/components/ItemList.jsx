import ItemCard from './ItemCard'

export default function ItemList({data}) {
  const productList = data.map(product => 
    <ItemCard
      className=''
      key={product.id}
      {...product}
    />
  )

  return (
    <>
      <div className='container mx-auto py-4 px-6'>
        <h1 className='page-title'>
          Productos
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 animate-fadeIn'>
          {productList}
        </div>
      </div>
    </>
  )
}