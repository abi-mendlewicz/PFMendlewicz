export default function priceFormat(price) {
  return new Intl.NumberFormat(
    'es-UY',
    {
      style: 'currency',
      currency: 'UYU'
    }
  ).format(price)
}