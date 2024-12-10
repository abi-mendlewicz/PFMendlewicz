import { useContext } from 'react'
import { CartContext } from '../context/AppContext'
import ModalNotification from './ModalNotification'
import priceFormat from '../utils/priceFormat'

export default function CheckoutModal() {
  const {order, orderErrors, setShowCheckoutModal} = useContext(CartContext)
  const {buyer, items, date, total, status} = order
  const {name, lastName, phone, email} = buyer

  const getContent = () => {
    return (orderErrors.length) ? (
      <ul>
        {
          orderErrors.map(error => (
            <li
              className='py-4 px-6'
              key={error.id}
            >
              {error.type == 'existance' &&
              `Lamentablemente el producto ${error.title} ya no está disponible. Por favor, quitalo del carrito e intenta realizar el pedido nuevamente.`
              }
              {error.type == 'stock' &&
              `No hay suficiente stock del producto ${error.title}. Queda${error.stock == 1 ? '' : 'n'} ${error.stock} unidad${error.stock == 1 ? '' : 'es'}. Por favor, corrige la cantidad e intenta realizar el pedido nuevamente.`
              }
            </li>
          ))
        }
      </ul>
    ) : (
      <>
        <h4 className='text-xl'>Número de orden: <span className='font-semibold'>{order.id}</span></h4>
        <p className='flex justify-between'>
          <span>Estado: {status.toUpperCase()}</span>
          <span>Fecha: {new Date(date).toLocaleString()}</span>
        </p>
        <p>A nombre de: {name} {lastName}</p>
        <p>Dirección de correo: {email}</p>
        {phone &&
        <p>Teléfono de contacto: {phone}</p>}
        <h3 className='text-lg font-medium'>Detalle de compra</h3>
        <div className='overflow-x-auto'>
          <table className='table-auto w-max sm:w-full border border-blue-900 border-x-0'>
            <thead>
              <tr className='bg-blue-100'>
                <th>Nombre del producto</th>
                <th className='text-end'>Cantidad</th>
                <th className='px-2 text-end'>Precio unitario</th>
                <th className='text-end'>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
              <tr key={item.id}>
                <td className='border-b border-blue-200'>{item.title}</td>
                <td className='border-b border-blue-200 text-end'>{item.quantity}</td>
                <td className='px-2 border-b border-blue-200 text-end'>{priceFormat(item.price)}</td>
                <td className='border-b border-blue-200 text-end'>{priceFormat(item.price * item.quantity)}</td>
              </tr>
              ))}
              <tr>
                <td className='font-semibold text-end' colSpan={4}>Total: {priceFormat(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  }

  return (
    <ModalNotification
      type={orderErrors.length ? 'error' : 'success'}
      title={orderErrors.length ? 'Algo salió mal.' : 'Orden de compra generada correctamente!'}
      content={getContent()}
      setShowModal={setShowCheckoutModal}
    />
  )
}