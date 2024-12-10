import Logo from './Logo'
import CategoriesNav from './CategoriesNav'
import CartWidget from './CartWidget'

export default function Navbar() {
  return (
    <div className='navbar-container'>
      <div>
        <Logo />
      </div>
      <div className='flex gap-x-4'>
        <CategoriesNav />
        <CartWidget />
      </div>
    </div>
  )
}