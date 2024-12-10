import { useState, useEffect } from 'react'
import { setTransctionOrder } from '../utils/db'

export const usePersistantCart = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartContent')) || [])

  useEffect(() => {
    localStorage.setItem('cartContent', JSON.stringify(cartItems))
  }, [cartItems])

  return [cartItems, setCartItems]
}

export const useCheckoutOrder = setCartItems => {
  const [order, setOrder] = useState()
  const [orderErrors, setOrderErrors] = useState([])
  const [awaitingOrderId, setAwaitingOrderId] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  useEffect(() => {
    if (order) {
      if (!('id' in order)) {
        setAwaitingOrderId(true)
        setTransctionOrder(order).then(response => {
          if (Array.isArray(response)) {
            setOrderErrors(response)
          } else if (response) {
            setOrder({id: response, ...order})
          }
        })
      } else {
        setCartItems([])
        setAwaitingOrderId(false)
        setShowCheckoutModal(true)
      }
    }
  }, [order])

  useEffect(() => {
    if (awaitingOrderId) {
      setAwaitingOrderId(false)
      setShowCheckoutModal(true)
    }
  }, [orderErrors])

  useEffect(() => {
    if (!showCheckoutModal) {
      setOrderErrors([])
    }
  }, [showCheckoutModal])

  return [awaitingOrderId, order, setOrder, orderErrors, showCheckoutModal, setShowCheckoutModal]
}