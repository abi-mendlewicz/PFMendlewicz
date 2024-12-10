import {
  getFirestore,
  runTransaction,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where
} from 'firebase/firestore'

export const getCategories = async () => {
  const db = getFirestore()
  const categoriesRef = collection(db, 'categories')
  const q = query(categoriesRef, orderBy('index'))

  try {
    const querySnapshot = await getDocs(q)
    const categories = []

    querySnapshot.forEach(doc => {
      categories.push({...doc.data(), id: doc.id})
    })
    
    return categories
  } catch (error) {
    return []
  }
}

export const getAllItems = async () => {
  const db = getFirestore()
  const querySnapshot = await getDocs(collection(db, 'items'))
  
  return querySnapshot
}

export const getItemsByCategory = async category => {
  const db = getFirestore()
  const itemsRef = collection(db, 'items')
  const q = query(itemsRef, where('categoryId', '==', category))
  const querySnapshot = await getDocs(q)

  return querySnapshot
}

export const getItemById = async id => {
  const db = getFirestore()
  const itemRef = doc(db, 'items', id)
  const snapshot = await getDoc(itemRef)

  return snapshot
}

export const setTransctionOrder = async order => {
  const db = getFirestore()
  const invalidItems = []
  let newOrderId = 0
  
  try {
    await runTransaction(db, async transaction => {
      const validItems = []

      const errorItems = await Promise.all(order.items.map(async item => {
        const itemRef = doc(db, item.id)
        const itemDoc = await transaction.get(itemRef)

        if (!itemDoc.exists()) {
          return {
            id: item.id,
            title: item.title,
            type: 'existence',
          }
        } else if (itemDoc.data().stock < item.quantity) {
          return {
            id: item.id,
            title: item.title,
            stock: itemDoc.data().stock,
            type: 'stock',
          }
        } else {
          validItems.push([itemRef, itemDoc.data().stock - item.quantity])
        }
      }))

      errorItems.forEach(item => {
        if (item) {
          invalidItems.push(item)
        }
      })

      if (invalidItems.length) {
        return Promise.reject('Algunos productos no están disponibles o su stock es insuficiente.')
      }

      await Promise.all(validItems.map(item => {
        const [docRef, stockUpdated] = item
        transaction.update(docRef, {stock: stockUpdated})
      }))

      const orderRef = doc(collection(db, 'orders'))
      
      transaction.set(orderRef, order)
      newOrderId = orderRef.id
    })
  } catch (error) {
    return invalidItems
  }

  return newOrderId
}