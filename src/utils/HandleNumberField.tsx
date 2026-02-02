function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function parseCurrency(value: string) {
  return Number(
    value
      .replace(/\D/g, '')
  ) / 100
}

export { formatCurrency, parseCurrency };