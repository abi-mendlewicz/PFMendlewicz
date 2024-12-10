import { useContext } from 'react'
import { CartContext } from '../context/AppContext'
import { CgSpinner } from 'react-icons/cg'

export default function CheckoutForm({formData, formWasValidated, formInvalidFields, onOrderSubmit}) {
  const {awaitingOrderId} = useContext(CartContext)
  const {
    name,
    lastName,
    phone,
    email,
    email2,
  } = formData
  const inputClasses = ['input', 'input-invalid']
  return (
    <div className='p-12 bg-blue-100 rounded-3xl'>
      <h2 className='mb-6 text-xl font-semibold'>Completa tus datos de contacto</h2>
      <form method='post'>
        <div className='mb-4'>
          <label htmlFor='name'>
            Nombre
            {name.required &&
            <span className='text-red-600'>*</span>}
          </label>
          <input
            id='name'
            className= {formWasValidated && formInvalidFields.includes('name') ? inputClasses.join(' ') : inputClasses[0]}
            type='text'
            defaultValue={name.value}
            onChange={e => name.callback(e.target.value.trim())}
            autoComplete='off'
            required
          />
          {formWasValidated && formInvalidFields.includes('name') &&
          <p className='input-error-msg'>{name.errorMessage}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='lastName'>
            Apellido
            {lastName.required &&
            <span className='text-red-600'>*</span>}
          </label>
          <input
            id='lastName'
            className={formWasValidated && formInvalidFields.includes('lastName') ? inputClasses.join(' ') : inputClasses[0]}
            type='text'
            defaultValue={lastName.value}
            onChange={e => lastName.callback(e.target.value.trim())}
            autoComplete='off'
            required
          />
          {formWasValidated && formInvalidFields.includes('lastName') &&
          <p className='input-error-msg'>{lastName.errorMessage}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='phone'>
            Teléfono
            {phone.required &&
            <span className='text-red-600'>*</span>}
          </label>
          <input
            id='phone'
            className={formWasValidated && formInvalidFields.includes('phone') ? inputClasses.join(' ') : inputClasses[0]}
            type='text'
            defaultValue={phone.value}
            onChange={e => phone.callback(e.target.value.trim())}
            autoComplete='tel'
          />
          {formWasValidated && formInvalidFields.includes('phone') &&
          <p className='input-error-msg'>{phone.errorMessage}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='email'>
            Correo electrónico
            {email.required &&
            <span className='text-red-600'>*</span>}
          </label>
          <input
            id='email'
            className={formWasValidated && formInvalidFields.includes('email') ? inputClasses.join(' ') : inputClasses[0]}
            type='email'
            defaultValue={email.value}
            onChange={e => email.callback(e.target.value.trim())}
            autoComplete='email'
            required
          />
          {formWasValidated && formInvalidFields.includes('email') &&
          <p className='input-error-msg'>{email.errorMessage}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='email2'>
            Repite el correo electrónico
            {email2.required &&
            <span className='text-red-600'>*</span>}
          </label>
          <input
            id='email2'
            className={formWasValidated && formInvalidFields.includes('email2') ? inputClasses.join(' ') : inputClasses[0]}
            type='email'
            defaultValue={email2.value}
            onChange={e => email2.callback(e.target.value.trim())}
            autoComplete='email'
            required
          />
          {formWasValidated && formInvalidFields.includes('email2') &&
          <p className='input-error-msg'>{email2.errorMessage}</p>}
        </div>
        <div>
          <button
            className='btn-main'
            type='button'
            onClick={onOrderSubmit}
            disabled={formWasValidated && formInvalidFields.length}
          >
            {awaitingOrderId && <CgSpinner className='me-2 animate-spin' />}
            {awaitingOrderId ? 'Enviando pedido...' : 'Realizar pedido'}
          </button>
        </div>
      </form>
    </div>
  )
}