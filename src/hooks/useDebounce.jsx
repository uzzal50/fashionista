import { useState, useEffect } from 'react'

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  console.log(debouncedValue)
  useEffect(() => {
    const id = setTimeout(() => {
      console.log('setting new timeout')

      setDebouncedValue(value)
    }, delay)

    return () => {
      console.log('clearing timeout')
      clearTimeout(id)
    }
  }, [value, delay])

  return debouncedValue
}
