import { useFetchCategories } from '../hooks/productHooks'
import { NavLink } from 'react-router-dom'

export default function CategoriesNav() {
  const [categories] = useFetchCategories([
    {
      id: 'todo',
      slug: 'todo',
      name: 'Todo',
    }
  ])

  return (
    <ul className='flex gap-x-4'>
      {categories.map(({id, slug, name}) => (
        <li
          className='nav-link'
          key={id}
        >
          <NavLink
            className={({isActive}) => isActive ? 'nav-link-active' : ''}
            to={`/category/${slug}`}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}