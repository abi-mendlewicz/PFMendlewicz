import { useContext } from 'react'
import { useCheckoutForm } from '../hooks/formHooks'
import { CartContext } from '../context/AppContext'
import CheckoutForm from './CheckoutForm'

export default function CheckoutFormContainer() {
  const {formData, formWasValidated, setFormWasValidated, formInvalidFields} = useCheckoutForm()
  const {generateOrder} = useContext(CartContext)

  const onOrderSubmit = e => {
    e.preventDefault()
    
    if (!formInvalidFields.length) {
      const {name, lastName, phone, email} = formData
      const buyer = {
        name: name.value,
        lastName: lastName.value,
        email: email.value,
      }

      if (phone.value) {
        buyer.phone = phone.value
      }

      generateOrder(buyer)
    } else if (!formWasValidated) {
      setFormWasValidated(true)
    }
  }

  return <CheckoutForm formData={formData} formWasValidated={formWasValidated} formInvalidFields={formInvalidFields} onOrderSubmit={onOrderSubmit} />
}