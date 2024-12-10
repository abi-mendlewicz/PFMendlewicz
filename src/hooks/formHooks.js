import { useState, useEffect } from 'react'

export const useCheckoutForm = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [email2, setEmail2] = useState('')
  const [formData, setFormData] = useState({
    name: {
      value: name,
      callback: setName,
      pattern: /^[a-záéíóú\-.'\s]+/i,
      required: true,
      errorMessage: 'El nombre no puede estar vacío y sólo puede contener letras, guiones, puntos y apóstrofes y no puede tener una longitud mayor a 64 caracteres.',
    },
    lastName: {
      value: lastName,
      callback: setLastName,
      pattern: /^[a-záéíóú\-.'\s]+/i,
      required: true,
      errorMessage: 'El apellido no puede estar vacío y sólo puede contener letras, guiones, puntos y apóstrofes y no puede tener una longitud mayor a 64 caracteres.',
    },
    phone: {
      value: phone,
      callback: setPhone,
      pattern: /^([\+(]*(\d{3})[)]*)?((\d{3})[- ]*(\d{3})([- ]*(\d+))?)$/,
      required: false,
      errorMessage: 'El teléfono sólo puede contener números. Puede contener paréntesis o el símbolo + para el prefijo país y puede contener guiones o espacios entre números.'
    },
    email: {
      value: email,
      callback: setEmail,
      pattern: /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/i,
      required: true,
      errorMessage: 'Proporciona una dirección de correo electrónico válida.'
    },
    email2: {
      value: email2,
      callback: setEmail2,
      pattern: /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/i,
      required: true,
      errorMessage: 'Las direcciones de correo electrónico no coinciden.'
    },
  })
  const [formWasValidated, setFormWasValidated] = useState(false)
  const [formInvalidFields, setFormInvalidFields] = useState([])

  useEffect(() => {
    setFormData({
      name: {
        ...formData.name,
        value: name,
      },
      lastName: {
        ...formData.lastName,
        value: lastName,
      },
      phone: {
        ...formData.phone,
        value: phone,
      },
      email: {
        ...formData.email,
        value: email,
      },
      email2: {
        ...formData.email2,
        value: email2,
      },
    })
  }, [formWasValidated, name, lastName, phone, email, email2])

  useEffect(() => {
    const invalidFields = []

    for (const key in formData) {
      if (key == 'email2') {
        continue
      }

      const {pattern, value, required} = formData[key]
      
      if (value.length > 65 || !pattern.test(value)) {
        const omitInvalid = !value && !required ? true : false
        
        if (!omitInvalid) {
          invalidFields.push(key)
        }
      }
    }

    if (formData.email2.value != formData.email.value) {
      invalidFields.push('email2')
    }

    setFormInvalidFields(invalidFields)
  }, [formData])

  return {formData, setFormData, formWasValidated, setFormWasValidated, formInvalidFields,}
}