
export const getYearAndMonth = (date: Date) => {
  return [date.getFullYear(), date.getMonth() + 1]
}

export const convert = {
  date: {
    toString: (date: Date) => {
      return date.toISOString().slice(0, 10)
    },
    toDate: (date: string) => {
      if (!date) {
        return new Date()
      }

      const slicedDate = date.slice(0, 10)

      const [year, month, day] = slicedDate.includes('-')
        ? slicedDate.split('-')
        : slicedDate.split('/').reverse()

      const parsedYear = parseInt(year, 10)
      const parsedMonth = parseInt(month, 10) - 1
      const parsedDay = parseInt(day, 10)

      if (isNaN(parsedYear) || isNaN(parsedMonth) || isNaN(parsedDay)) {
        throw new Error('Invalid date string')
      }
      return new Date(parsedYear, parsedMonth, parsedDay)
    },
  },
}


export const loadCurrentMonth = (locale: string) => {

  const currentDate = new Date().toLocaleDateString(locale)

  const now = convert.date.toDate(currentDate)
  const [year, month] = getYearAndMonth(now)

  const firstDayOfMonth = new Date(year, month - 1, 1, 0, 0, 0)
  const lastDayOfMonth = new Date(year, month, 0, 0, 0, 0)

  return {
    firstDayOfMonth,
    lastDayOfMonth,
    currentDayOfMonth: now,
  }
}