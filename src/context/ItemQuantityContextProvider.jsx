import { useState } from 'react'
import { ItemQuantityContext } from './AppContext'

export default function ItemQuantityContextProvider({initial, children}) {
  const [quantity, setQuantity] = useState(initial || 1)

  const increment = () => setQuantity(quantity => quantity + 1)
  const decrement = () => quantity > 1 && setQuantity(quantity => quantity - 1)

  return (
    <ItemQuantityContext.Provider value={{quantity, increment, decrement}}>
      {children}
    </ItemQuantityContext.Provider>
  )
  
}