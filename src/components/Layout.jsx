import CartContextProvider from '../context/CartContextProvider'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <>
      <CartContextProvider>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer />
      </CartContextProvider>
    </>
  )
}