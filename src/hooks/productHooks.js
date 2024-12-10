import { useState, useEffect } from 'react'
import { getCategories } from '../utils/db'
import { getAllItems, getItemsByCategory, getItemById } from '../utils/db'
import { getImageUrl } from '../data/localImages'

export const useFetchCategories = defaultCategories => {
  const [categories, setCategories] = useState(defaultCategories)

  useEffect(() => {
    getCategories().then(dbCategories => {
      setCategories([
        ...defaultCategories,
        ...dbCategories,
      ])
    })
  }, [])

  return [categories]
}

export const useFetchItems = (filterBy = 'category', value = 'todo') => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (filterBy == 'category') {
      const getQuery = value == 'todo' ? getAllItems() : getItemsByCategory(value)

      getQuery.then(querySnapshot => {
        setData(querySnapshot.docs.map(item => {
          const data = item.data()
          
          return {id: item.id, ...data, pictureUrl: getImageUrl(data.pictureUrl)}
        }))
        setIsLoading(false)
      }).catch(error => {
        setIsLoading(false)
      })
    } else if (filterBy == 'id') {
      getItemById(value).then(snapshot => {
        const data = snapshot.data()
        setData({id: snapshot.id, ...data, pictureUrl: getImageUrl(data.pictureUrl)})
        setIsLoading(false)
      }).catch(error => {
        setIsLoading(false)
      })
    }

    return () => {
      setIsLoading(true)
    }
  }, [value])

  return {data, isLoading}
}

export const useItemQuantity = ({initial, updateCallback, itemId}) => {
  const [quantity, setQuantity] = useState(initial || 1)

  useEffect(() => {
    if (!itemId) {
      updateCallback(quantity)
    }
  }, [quantity])

  const increment = () => {
    setQuantity(quantity => quantity + 1)

    if (itemId) {
      updateCallback(1, itemId)
    }
  }
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity => quantity - 1)

      if (itemId) {
        updateCallback(-1, itemId)
      }
    }
  }

  return [quantity, increment, decrement]
}