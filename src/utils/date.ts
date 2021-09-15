

export const createPrettyDate = (date: number | string | Date) => {
  return new Date(date).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })
}