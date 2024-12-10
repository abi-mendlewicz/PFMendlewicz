import { useState } from 'react'
import { usePersistantCart, useCheckoutOrder } from '../hooks/cartHooks'
import { CartContext } from './AppContext'

export default function CartContextProvider({children}) {
  const [cartItems, setCartItems] = usePersistantCart()
  const [awaitingOrderId, order, setOrder, orderErrors, showCheckoutModal, setShowCheckoutModal] = useCheckoutOrder(setCartItems)
  const [showCartModal, setShowCartModal] = useState(false)
  const [cartModalTitle, setCartModalTitle] = useState(false)
  
  const getItemsCount = () => cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)

  const getTotalPrice = () => cartItems.reduce((accumulator, item) => accumulator + item.subtotal, 0)
  
  const isInCart = id => cartItems.some(item => item.id == id)

  const updateItemQuantity = (quantity, id) => {
    setCartItems(cartItems.map(item => {
      if (item.id == id) {
        const quantityUpdated = item.quantity + quantity
        const subtotal = quantityUpdated * item.price

        return {
          ...item,
          quantity: quantityUpdated,
          subtotal,
        }
      }

      return item
    }))
  }

  const onAdd = item => {
    if (isInCart(item.id)) {
      updateItemQuantity(item.quantity, item.id)
    } else {
      setCartItems([
        ...cartItems,
        {...item, subtotal: (item.quantity * item.price)},
      ])
    }

    setShowCartModal(true)
    setCartModalTitle('Se agregó correctamente!')
  }

  const onRemove = itemId => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
    setCartModalTitle('Se quitó correctamente!')
  }

  const deleteCart = () => {
    setCartItems([])
    setCartModalTitle('El carrito se vació correctamente!')
  }

  const generateOrder = buyer => {
    setOrder({
      buyer,
      items: cartItems.map(item => {
        const {id, title, price, quantity} = item
        return {
          id: `items/${id}`,
          title,
          price,
          quantity,
        }
      }),
      total: getTotalPrice(),
      status: 'generada',
      date: Date.now(),
    })
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      getItemsCount,
      getTotalPrice,
      updateItemQuantity,
      onAdd,
      onRemove,
      deleteCart,
      generateOrder,
      order,
      orderErrors,
      awaitingOrderId,
      showCheckoutModal,
      setShowCheckoutModal,
      showCartModal,
      setShowCartModal,
      cartModalTitle,
    }}>
      {children}
    </CartContext.Provider>
  )
}